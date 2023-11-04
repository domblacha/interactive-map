using AppServer.Models.Request;
using AppServer.Models.Response;

namespace AppServer.Services.Interfaces
{
    public interface IRatingService
    {
        Task<RatingResponse> CreateRatingAsync(CreateRatingDto dto);
    }
}