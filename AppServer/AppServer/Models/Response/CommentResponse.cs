namespace AppServer.Models.Response
{
    public class CommentResponse
    {
        public Guid Id { get; set; }
        public Guid MarkerId { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public string AuthorName { get; set; }
    }
}