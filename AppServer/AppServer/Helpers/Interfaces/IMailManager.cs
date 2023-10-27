using AppServer.Models;

namespace AppServer.Helpers.Interfaces
{
    public interface IMailManager
    {
        Task<bool> SendEmailAsync(MailData mailData, CancellationToken cancelationToken);
    }
}