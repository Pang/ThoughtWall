using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThoughtWall.API.Data;
using ThoughtWall.API.Dtos;
using AutoMapper;

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

        [HttpGet("threads")]
        public async Task<IActionResult> GetUserThreads(int id)
        {
            var threads = await _context.Threads
                .Where(x => x.UserId == id)
                .OrderByDescending(x => x.TimeStamp)
                .ToListAsync();
            var mappedThreads = _mapper.Map<ThreadGetDto[]>(threads);
            return Ok(mappedThreads);
        }

        [HttpGet("comments")]
        public async Task<IActionResult> GetUserComments(int id)
        {
            var comments = await _context.Comments
                .Include(x => x.Thread)
                .Where(x => x.UserId == id)
                .OrderByDescending(x => x.TimeStamp)
                .ToListAsync();
            var mappedComments = _mapper.Map<CommentGetDto[]>(comments);
            return Ok(mappedComments);
        }
    }
}