namespace AppServer.Models.Response
{
    public class MarkerRatingResponse
    {
        public double Value { get; set; }
        public string AuthorName { get; set; }
    }

    public class MarkerCommentResponse
    {
        public string Text { get; set; }
        public string AuthorName { get; set; }
    }

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
        public List<RatingResponse> Ratings { get; set; }
    }
}