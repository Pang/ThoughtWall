using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace ThoughtWall.API.Hubs
{
    public class PostHub : Microsoft.AspNetCore.SignalR.Hub
    {
        public async Task JoinThread(string roomName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, roomName);
        }

        public Task LeaveThread(string roomName)
        {
            return Groups.RemoveFromGroupAsync(Context.ConnectionId, roomName);
        }
    }
}