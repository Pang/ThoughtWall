using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ThoughtWall.API.Data;

namespace ThoughtWall.API.Controllers
{
    [Authorize]
    [Route("api/profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly DataContext _context;

        public ProfileController(DataContext context)
        {
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet("threads")]
        public async Task<IActionResult> GetUserThreads(int id)
        {
            var threads = await _context.Threads
                .Where(x => x.UserId == id)
                .OrderByDescending(x => x.TimeStamp)
                .ToListAsync();
            return Ok(threads);
        }
    }
}