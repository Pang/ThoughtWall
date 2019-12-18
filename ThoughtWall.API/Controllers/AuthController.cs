using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ThoughtWall.API.Data;
using ThoughtWall.API.Dtos;
using ThoughtWall.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using AutoMapper;

namespace ThoughtWall.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        [ProducesResponseType(400)]
        [ProducesResponseType(201)]
        public async Task<IActionResult> Register(UserRegisterDto userRegister)
        {
            userRegister.Username = userRegister.Username.ToLower();

            if (await _repo.UserExists(userRegister.Username))
                return BadRequest("Username already exists");

            var userToCreate = _mapper.Map<User>(userRegister);
            var createdUser = _repo.Register(userToCreate, userRegister.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        [ProducesResponseType(401)]
        [ProducesResponseType(200)]
        public async Task<IActionResult> Login(UserLoginDto userLogin)
        {
            var userFromRepo = await _repo.Login(userLogin.Username.ToLower(), userLogin.Password);

            if (userFromRepo == null) return Unauthorized();

            // JWT: Part of Payload
            // Uses claims as reference, instead of making calls to the database
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            // JWT: Part of Signature
            var key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            // Aggregating the JWT payload and signature
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            // Creating a token with the data from tokenDescriptor
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {token = tokenHandler.WriteToken(token)});
        }
    }
}