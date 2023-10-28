using AppServer.Entities;
using AppServer.Excepions;
using AppServer.Models.Request;
using AppServer.Models.Response;
using AppServer.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AppServer.Services
{
    public class MarkerService : IMarkerService
    {
        private readonly AppDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MarkerService(AppDbContext dbContext, IMapper mapper, IHttpContextAccessor httpContextAccessor)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _httpContextAccessor = httpContextAccessor;
        }

        public async Task<MarkerResponse> CreateMarkerAsync(CreateMarkerDto dto)
        {
            var userId = _httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userId is null)
            {
                throw new BadRequestException("Coś poszło nie tak, spróbuj później");
            }

            var newMarker = new Marker()
            {
                Name = dto.Name,
                Description = dto.Description,
                Latitude = dto.Latitude,
                Longitude = dto.Longitude,
                UserId = userId,
            };

            await _dbContext.AddAsync(newMarker);
            await _dbContext.SaveChangesAsync();

            return _mapper.Map<MarkerResponse>(newMarker);
        }

        public async Task<IEnumerable<MarkerResponse>> GetAllMarkersAsync()
        {
            var markers = await _dbContext.Markers.ToListAsync();

            return _mapper.Map<List<MarkerResponse>>(markers);
        }
    }
}