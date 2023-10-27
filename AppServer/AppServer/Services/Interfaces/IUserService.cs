using AppServer.Models.Response;

namespace AppServer.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserResponse> GetCurrentUserAsync();
    }
}