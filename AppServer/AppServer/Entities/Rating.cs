using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppServer.Entities
{
    public class Rating
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        public double Value { get; set; }
        public string? UserId { get; set; }
        public Guid MarkerId { get; set; }

        public virtual User User { get; set; }
        public virtual Marker Marker { get; set; }
    }
}