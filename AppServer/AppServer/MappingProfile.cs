using AppServer.Entities;
using AppServer.Models.Response;
using AutoMapper;

namespace AppServer
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Marker, MarkerResponse>();
        }
    }
}