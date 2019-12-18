using AutoMapper;
using ThoughtWall.API.Dtos;
using ThoughtWall.API.Models;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<ThreadPostDto, Thread>();

        CreateMap<Thread, ThreadGetDto>();
        CreateMap<ThreadGetDto, Thread>();

        CreateMap<CommentGetDto, Comment>();
        CreateMap<Comment, CommentGetDto>();

        CreateMap<UserRegisterDto, User>();
    }
}