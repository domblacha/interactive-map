using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace AppServer.Helpers.Interfaces
{
    public interface IJwtAuthManager
    {
        JwtSecurityToken CreateToken(List<Claim> claims);

        ClaimsPrincipal? GetPrincipalFromExpiredToken(string token);

        string GenerateRefreshToken();
    }
}