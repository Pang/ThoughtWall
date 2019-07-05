using System.Threading.Tasks;
using ThoughtWall.API.Models;

namespace ThoughtWall.API.Data
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<bool> UserExists(string username);
    }
}