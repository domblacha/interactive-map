using Microsoft.AspNetCore.Identity;

namespace AppServer.Entities
{
    public class User : IdentityUser
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }

        public ICollection<Marker> Markers { get; set; }
    }
}