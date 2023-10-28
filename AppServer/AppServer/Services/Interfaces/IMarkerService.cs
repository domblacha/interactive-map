using AppServer.Models.Request;
using AppServer.Models.Response;

namespace AppServer.Services.Interfaces
{
    public interface IMarkerService
    {
        Task<IEnumerable<MarkerResponse>> GetAllMarkersAsync();

        Task<MarkerResponse> CreateMarkerAsync(CreateMarkerDto dto);
    }
}