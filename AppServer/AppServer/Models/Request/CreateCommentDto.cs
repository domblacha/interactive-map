namespace AppServer.Models.Request
{
    public class CreateCommentDto
    {
        public Guid MarkerId { get; set; }
        public string Text { get; set; }
    }
}