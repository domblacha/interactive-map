namespace AppServer.Models.Request
{
    public class LoginUserResponse
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}