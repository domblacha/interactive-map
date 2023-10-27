using AppServer.Models.Request;
using AppServer.Models.Response;

namespace AppServer.Services.Interfaces
{
    public interface IAuthService
    {
        Task<RegisterUserResponse> RegisterUserAsync(RegisterUserDto dto);

        Task<LoginUserResponse> LoginUserAsync(LoginUserDto dto);

        Task<RefreshTokenResponse> RefreshTokenAsync(TokenDto dto);

        Task LogoutAsync();

        Task ConfirmEmailAsync(string userId, string token);
    }
}