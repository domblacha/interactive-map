using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppServer.Entities
{
    public class Comment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public string Text { get; set; }
        public Guid MarkerId { get; set; }
        public string? UserId { get; set; }

        public virtual Marker Marker { get; set; }
        public virtual User User { get; set; }
    }
}