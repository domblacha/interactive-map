using AppServer.Models.Request;
using AppServer.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AppServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarkerController : ControllerBase
    {
        private readonly IMarkerService _markerService;

        public MarkerController(IMarkerService markerService)
        {
            _markerService = markerService;
        }

        [HttpGet()]
        public async Task<IActionResult> GetAllMarkers()
        {
            var result = await _markerService.GetAllMarkersAsync();

            return Ok(result);
        }

        [HttpPost("create")]
        [Authorize]
        public async Task<IActionResult> CreateMarker(CreateMarkerDto dto)
        {
            var result = await _markerService.CreateMarkerAsync(dto);

            return Ok(result);
        }
    }
}