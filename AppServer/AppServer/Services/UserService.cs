using AppServer.Entities;
using AppServer.Excepions;
using AppServer.Models.Response;
using AppServer.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace AppServer.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;

        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserService(UserManager<User> userManager, IHttpContextAccessor httpContextAccessor)
        {
            _userManager = userManager;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<UserResponse> GetCurrentUserAsync()
        {
            var userName = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.Name)?.Value;

            var user = await _userManager.FindByNameAsync(userName);

            if (user is null)
                throw new BadRequestException("Użytkownik nie istnieje.");

            var roles = await _userManager.GetRolesAsync(user);

            return new UserResponse()
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Roles = roles,
            };
        }
    }
}