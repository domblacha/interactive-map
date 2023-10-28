using AppServer.Entities;
using AppServer.Excepions;
using AppServer.Helpers;
using AppServer.Helpers.Interfaces;
using AppServer.Models;
using AppServer.Models.Request;
using AppServer.Models.Response;
using AppServer.Services.Interfaces;
using AppServer.Static;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AppServer.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AuthenticationSettings _authSettings;
        private readonly IJwtAuthManager _jwtAuthManager;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMailManager _mailManager;
        private readonly IConfiguration _configuration;

        public AuthService(UserManager<User> userManager, AuthenticationSettings authSettings,
            IJwtAuthManager jwtAuthManager, RoleManager<IdentityRole> roleManager,
            IHttpContextAccessor httpContextAccessor, IMailManager mailManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _authSettings = authSettings;
            _jwtAuthManager = jwtAuthManager;
            _httpContextAccessor = httpContextAccessor;
            _mailManager = mailManager;
            _configuration = configuration;
        }

        public async Task ConfirmEmailAsync(string userId, string token)
        {
            var user = await _userManager.FindByIdAsync(userId);
            if (user is null)
                throw new NotFoundException("Użytkownik nie znaleziony");

            var dekodedToken = WebEncoders.Base64UrlDecode(token);
            string normalToken = Encoding.UTF8.GetString(dekodedToken);

            var result = await _userManager.ConfirmEmailAsync(user, normalToken);

            if (!result.Succeeded)
                throw new Exception("Potwierdzenie email nie udało się, spróbuj później");
        }

        public async Task<LoginUserResponse> LoginUserAsync(LoginUserDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Email);

            if (user is null)
                throw new NotFoundException("Niepoprawny login lub hasło");

            if (!user.EmailConfirmed)
                throw new BadRequestException("Potwierdz email aby sie zalogować.");

            var result = await _userManager.CheckPasswordAsync(user, dto.Password);

            if (!result)
                throw new NotFoundException("Niepoprawny login lub hasło");

            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.UserName),
            };

            var userRoles = await _userManager.GetRolesAsync(user);

            foreach (var userRole in userRoles)
            {
                claims.Add(new Claim(ClaimTypes.Role, userRole));
            }

            var token = _jwtAuthManager.CreateToken(claims);
            var refreshToken = _jwtAuthManager.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.Now.AddDays(_authSettings.JwtRefreshTokenExpireDays);

            var updateTokenResult = await _userManager.UpdateAsync(user);

            if (!updateTokenResult.Succeeded)
            {
                throw new Exception("Brak dostępu, zaloguj się ponownie.");
            }

            return new LoginUserResponse()
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token),
                RefreshToken = refreshToken,
            };
        }

        public async Task LogoutAsync()
        {
            var userName = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Name)?.Value;
            var user = await _userManager.FindByNameAsync(userName);

            if (user is null)
                throw new BadRequestException("Niepoprawna nazwa użytkownika");

            user.RefreshToken = null;
            var result = await _userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                throw new Exception("Nie udało się poprawnie wylogować.");
            }
        }

        public async Task<RefreshTokenResponse> RefreshTokenAsync(TokenDto dto)
        {
            var principal = _jwtAuthManager.GetPrincipalFromExpiredToken(dto.AccessToken);
            if (principal is null)

                throw new BadRequestException("Brak dostępu, zaloguj się ponownie.");

            string userName = principal.Identity.Name;

            var user = await _userManager.FindByNameAsync(userName);

            if (user is null || user.RefreshToken != dto.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                throw new BadRequestException("Brak dostępu, zaloguj się ponownie.");
            }

            var newAccessToken = _jwtAuthManager.CreateToken(principal.Claims.ToList());
            var newRefreshToken = _jwtAuthManager.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            var updateTokenResult = await _userManager.UpdateAsync(user);

            if (!updateTokenResult.Succeeded)
            {
                throw new Exception("Brak dostępu, zaloguj się ponownie.");
            }

            return new RefreshTokenResponse()
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(newAccessToken),
                RefreshToken = newRefreshToken,
            };
        }

        public async Task<RegisterUserResponse> RegisterUserAsync(RegisterUserDto dto)
        {
            if (dto.Password != dto.ConfirmPassword)
                throw new BadRequestException("Hasła nie są zgodne.");

            var user = await _userManager.FindByEmailAsync(dto.Email);

            if (user is not null)
                throw new AlreadyExistsException("Podany email jest już zajęty.");

            var newUser = new User()
            {
                Email = dto.Email,
                UserName = dto.Email
            };

            var createPwdResult = await _userManager.CreateAsync(newUser, dto.Password);

            if (!createPwdResult.Succeeded)
            {
                return new RegisterUserResponse()
                {
                    Message = "Ups! Coś poszło nie tak, spróbuj ponownie później.",
                    IsSuccess = false,
                    Errors = createPwdResult.Errors
                };
            }

            if (await _roleManager.RoleExistsAsync(UserRoles.Admin))
            {
                var addRoleResult = await _userManager.AddToRoleAsync(newUser, UserRoles.Admin);

                if (!addRoleResult.Succeeded)
                    throw new Exception("Ups! Coś poszło nie tak, spróbuj ponownie później.");
            }

            var confirmEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(newUser);

            var encodedEmailToken = Encoding.UTF8.GetBytes(confirmEmailToken);
            var validEmailToken = WebEncoders.Base64UrlEncode(encodedEmailToken);

            string url = $"{_configuration["AppUrl"]}/api/auth/confirm-email?userid={newUser.Id}&token={validEmailToken}";

            await _mailManager.SendEmailAsync(new MailData()
            {
                To = new List<string>() { "natasha0@ethereal.email" },
                DisplayName = "Rental Team",
                Body = $"Potweierdź swój email, <h1>Witamy w RentalApp</h1><p>Proszę potwierdzić swój email klikająć w link <a href={url}>Kliknij tutaj</a>.</p",
                Subject = "Potwierdź swój email"
            }, new CancellationToken());

            return new RegisterUserResponse()
            {
                Message = "Użytkownik został utworzony.",
                IsSuccess = true
            };
        }
    }
}