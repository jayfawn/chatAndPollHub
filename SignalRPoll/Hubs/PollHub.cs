using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class PollHub : Hub
    {
        public async Task SendUser(string user)
        {
            await Clients.All.SendAsync("ReceiveUser", user);
        }
        public async Task SendMessage(string user, string message, string responseID, string responseVal)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message, responseID, responseVal);
        }
    }
}