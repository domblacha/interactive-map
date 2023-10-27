using AppServer.Helpers.Interfaces;
using AppServer.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace AppServer.Helpers
{
    public class MailManager : IMailManager
    {
        private readonly MailSettings _mailSettings;

        public MailManager(MailSettings mailSettings)
        {
            _mailSettings = mailSettings;
        }

        public async Task<bool> SendEmailAsync(MailData mailData, CancellationToken cancelationToken)
        {
            try
            {
                // Initialize a new instance of the MimeKit.MimeMessage class
                var mail = new MimeMessage();

                // Sender
                mail.From.Add(new MailboxAddress(_mailSettings.DisplayName, mailData.From ?? _mailSettings.From));
                mail.Sender = new MailboxAddress(mailData.DisplayName ?? _mailSettings.DisplayName, mailData.From ?? _mailSettings.From);

                // Receiver
                foreach (string mailAddress in mailData.To)
                    mail.To.Add(MailboxAddress.Parse(mailAddress));

                // Set Reply to if specified in mail data
                if (!string.IsNullOrEmpty(mailData.ReplyTo))
                    mail.ReplyTo.Add(new MailboxAddress(mailData.ReplyToName, mailData.ReplyTo));

                // BCC
                // Check if a BCC was supplied in the request
                if (mailData.Bcc != null)
                {
                    // Get only addresses where value is not null or with whitespace. x = value of address
                    foreach (string mailAddress in mailData.Bcc.Where(x => !string.IsNullOrWhiteSpace(x)))
                        mail.Bcc.Add(MailboxAddress.Parse(mailAddress.Trim()));
                }

                // CC
                // Check if a CC address was supplied in the request
                if (mailData.Cc != null)
                {
                    foreach (string mailAddress in mailData.Cc.Where(x => !string.IsNullOrWhiteSpace(x)))
                        mail.Cc.Add(MailboxAddress.Parse(mailAddress.Trim()));
                }

                // Add Content to Mime Message
                var body = new BodyBuilder();
                mail.Subject = mailData.Subject;
                body.HtmlBody = mailData.Body;
                mail.Body = body.ToMessageBody();

                using var smtp = new SmtpClient();

                if (_mailSettings.UseSSL)
                {
                    await smtp.ConnectAsync(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.SslOnConnect, cancelationToken);
                }
                else if (_mailSettings.UseStartTls)
                {
                    await smtp.ConnectAsync(_mailSettings.Host, _mailSettings.Port, SecureSocketOptions.StartTls, cancelationToken);
                }
                await smtp.AuthenticateAsync(_mailSettings.UserName, _mailSettings.Password, cancelationToken);
                await smtp.SendAsync(mail, cancelationToken);
                await smtp.DisconnectAsync(true, cancelationToken);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}