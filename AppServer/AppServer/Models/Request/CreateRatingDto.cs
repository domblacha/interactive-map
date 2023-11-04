namespace AppServer.Models.Request
{
    public class CreateRatingDto
    {
        public Guid MarkerId { get; set; }
        public double Value { get; set; }
    }
}