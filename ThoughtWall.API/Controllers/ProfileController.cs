using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThoughtWall.API.Data;
using ThoughtWall.API.Dtos;
using AutoMapper;
using ThoughtWall.API.Models;
using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using System;

namespace ThoughtWall.API.Controllers
{
    [Authorize]
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public ProfileController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetProfileDetails(string username)
        {
            var profileData = await _context.Users
                .Where(x => x.Username == username)
                .FirstOrDefaultAsync();

            var threads = await _context.Threads
                .Where(x => x.Username == username)
                .OrderByDescending(x => x.TimeStamp)
                .ToListAsync();

            var comments = await _context.Comments
                .Where(x => x.Username == username)
                .OrderByDescending(x => x.TimeStamp)
                .ToListAsync();

            var mappedProfile = _mapper.Map<ProfileDto>(profileData);
            mappedProfile.threads = _mapper.Map<ThreadGetDto[]>(threads);
            mappedProfile.comments = _mapper.Map<CommentGetDto[]>(comments);

            return Ok(mappedProfile);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAccountWithId(int id)
        {
            var profileData = await _context.Users
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            var mappedProfile = _mapper.Map<ProfileDto>(profileData);

            return Ok(mappedProfile);
        }

        [HttpPut ("update")]
        public async Task<IActionResult> UpdateProfileDetails(ProfileDto profileDto)
        {
            if (profileDto.Username != User.FindFirst (ClaimTypes.Name).Value)
                return Unauthorized ();

            var originalUserData = await _context.Users
                .Where(x => x.Id == profileDto.Id)
                .FirstOrDefaultAsync();
            
            originalUserData.Bio = profileDto.Bio;
            originalUserData.Country = profileDto.Country;
            originalUserData.Dob = profileDto.Dob;
            _context.Users.Update(originalUserData);
            await _context.SaveChangesAsync();

            var mappedProfile = _mapper.Map<User>(originalUserData);
            return Ok(mappedProfile);
        }

        [HttpPut ("bookingsEnabled")]
        public async Task<IActionResult> SetBookingsEnabled(ProfileDto profileDto) {
            if (profileDto.Username != User.FindFirst(ClaimTypes.Name).Value) 
                return Unauthorized("User not found");

            var user = await _context.Users.Where(x => x.Id == profileDto.Id).FirstOrDefaultAsync();
            user.BookingsEnabled = !user.BookingsEnabled;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return Ok(user.BookingsEnabled);
        }
    }
}