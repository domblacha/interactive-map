using Microsoft.AspNetCore.Identity;

namespace AppServer.Models.Response
{
    public class RegisterUserResponse
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public IEnumerable<IdentityError>? Errors { get; set; }
    }
}