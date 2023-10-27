using System.ComponentModel.DataAnnotations;

namespace AppServer.Models.Response
{
    public class LoginUserDto
    {
        [Required]
        [EmailAddress]
        [StringLength(50)]
        public string Email { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 8)]
        public string Password { get; set; }
    }
}