using AutoMapper;
using ThoughtWall.API.Dtos;
using ThoughtWall.API.Models;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<ThreadPostDto, Thread>();

        CreateMap<Thread, ThreadsGetDto>();
        CreateMap<ThreadsGetDto, Thread>();

    }
}