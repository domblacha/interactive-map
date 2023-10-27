using AppServer.Models.Request;
using AppServer.Models.Response;
using AppServer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService, IConfiguration configuration)
        {
            _configuration = configuration;
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUserAsync(RegisterUserDto dto)
        {
            var result = await _authService.RegisterUserAsync(dto);

            if (result.IsSuccess)
                return Ok(result);

            return BadRequest(result);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUserAsync(LoginUserDto dto)
        {
            var result = await _authService.LoginUserAsync(dto);

            return Ok(result);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshTokenAsync(TokenDto dto)
        {
            var result = await _authService.RefreshTokenAsync(dto);

            return Ok(result);
        }

        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> LogoutAsync()
        {
            await _authService.LogoutAsync();

            return Ok();
        }

        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail(string userId, string token)
        {
            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(token))
                return NotFound();

            await _authService.ConfirmEmailAsync(userId, token);

            return Redirect($"{_configuration["FrontendAppUrl"]}/auth");
        }
    }
}