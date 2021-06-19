using AutoMapper;
using ThoughtWall.API.Data;
using ThoughtWall.API.Dtos;
using ThoughtWall.API.Models;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        
        CreateMap<BookingDto, Booking>();
        CreateMap<Booking, BookingDto>();

        CreateMap<CommentGetDto, Comment>();
        CreateMap<CommentPostDto, Comment>();
        CreateMap<Comment, CommentGetDto>();

        CreateMap<ThreadPostDto, Thread>();

        CreateMap<ProfileDto, User>();
        CreateMap<User, ProfileDto>();

        CreateMap<Thread, ThreadGetDto>();
        CreateMap<ThreadGetDto, Thread>();

        CreateMap<UserRegisterDto, User>();



    }
}