using System.ComponentModel.DataAnnotations;

namespace AppServer.Models.Request
{
    public class DeleteMarkerDto
    {
        [Required]
        public Guid Id { get; set; }
    }
}