using AppServer.Entities;
using AppServer.Models.Response;
using AutoMapper;

namespace AppServer
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Marker, MarkerResponse>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.User.FirstName ?? ""));

            CreateMap<Comment, CommentResponse>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.User.FirstName ?? ""));

            CreateMap<Rating, RatingResponse>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.User.FirstName ?? ""));
        }
    }
}