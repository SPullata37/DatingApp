using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API.Services
{
    public class TokenServices : ITokenService
    {
        private readonly SymmetricSecurityKey _key;
      
        public TokenServices(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["SecurityKey"]));
          
        }
        public string CreateToken(AppUser user)
        {
            ///claims register 
            var claim = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.NameId,user.UserName)
            };

            /// credentilas 
            var cred = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            /// setting token requiered details in TokenDescriptor  
            var tokenDescriptor = new SecurityTokenDescriptor
            { 
                Subject = new ClaimsIdentity(claim),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = cred

            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
