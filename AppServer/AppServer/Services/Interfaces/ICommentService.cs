using AppServer.Models.Request;
using AppServer.Models.Response;

namespace AppServer.Services.Interfaces
{
    public interface ICommentService
    {
        Task<CommentResponse> CreateCommentAsync(CreateCommentDto dto);
    }
}