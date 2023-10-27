namespace AppServer.Models.Response
{
    public class UserResponse
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public IEnumerable<string> Roles { get; set; }
    }
}