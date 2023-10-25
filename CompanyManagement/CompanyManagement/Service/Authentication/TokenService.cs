using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace CompanyManagement.Service.Authentication;

public class TokenService : ITokenService
{
    private const int ExpirationMinutes = 30;

    public string CreateToken(IdentityUser user, string role)
    {
        var expiration = DateTime.UtcNow.AddMinutes(ExpirationMinutes);
        var token = CreateJwtToken(
            CreateClaims(user, role),
            CreateSigningCredentials(),
            expiration
        );
        var tokenHandler = new JwtSecurityTokenHandler();
        return tokenHandler.WriteToken(token);
    }

    private JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials,
        DateTime expiration) =>
        new(
            "apiWithAuthBackend",
            "apiWithAuthBackend",
            claims,
            expires: expiration,
            signingCredentials: credentials
        );

    private List<Claim> CreateClaims(IdentityUser user, string? role)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, "TokenForTheApiWithAuth"),
            new(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)),
            new(ClaimTypes.NameIdentifier, user.Id),
            new(ClaimTypes.Name, user.UserName ?? ""),
            new(ClaimTypes.Email, user.Email ?? ""),
            new ("username", user.UserName ?? ""),
            new ("email", user.Email ?? "")
        };

        if (role != null)
        {
            claims.Add(new Claim("role", role));
        }

        return claims;
    }


    private SigningCredentials CreateSigningCredentials()
    {
        return new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("!SomethingSecret!")
            ),
            SecurityAlgorithms.HmacSha256
        );
    }
}