using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ThoughtWall.API.Data;
using ThoughtWall.API.Dtos;
using ThoughtWall.API.Models;

namespace ThoughtWall.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly AuthRepository _repo;

        public AuthController(DataContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Register(UserRegisterDto userRegister)
        {
            userRegister.Username = userRegister.Username.ToLower();

            if (await _repo.UserExists(userRegister.Username))
                return BadRequest("Username already exists");

            var userToCreate = new User
            {
                Username = userRegister.Username
            };

            var createdUser = _repo.Register(userToCreate, userRegister.Password);

            return StatusCode(201);
        }
    }
}