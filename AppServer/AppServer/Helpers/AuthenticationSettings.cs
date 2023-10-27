namespace AppServer.Helpers
{
    public class AuthenticationSettings
    {
        public string JwtSecret { get; set; }
        public int JwtAccessTokenExpireMinutes { get; set; }
        public int JwtRefreshTokenExpireDays { get; set; }
        public string JwtIssuer { get; set; }
        public string JwtAudience { get; set; }
    }
}