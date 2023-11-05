using System.ComponentModel.DataAnnotations;

namespace AppServer.Models.Request
{
    public class CreateCommentDto
    {
        [Required]
        public Guid MarkerId { get; set; }

        [Required]
        public string Text { get; set; }

        [Required]
        public int Rating { get; set; }
    }
}