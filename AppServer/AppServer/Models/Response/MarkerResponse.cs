namespace AppServer.Models.Response
{
    public class MarkerResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string UserId { get; set; }
        public string AuthorName { get; set; }
        public List<CommentResponse> Comments { get; set; }
    }
}