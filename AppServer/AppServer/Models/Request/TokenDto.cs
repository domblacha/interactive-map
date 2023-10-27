using System.ComponentModel.DataAnnotations;

namespace AppServer.Models.Request
{
    public class TokenDto
    {
        [Required(ErrorMessage = "Invalid client response")]
        public string AccessToken { get; set; }

        [Required(ErrorMessage = "Invalid client response")]
        public string RefreshToken { get; set; }
    }
}