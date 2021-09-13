using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private DataContext _context;
        private readonly ITokenService _token;
        public AccountController(DataContext context ,ITokenService tokenService)
        {
            _context = context;
            _token = tokenService;
        }


       [HttpPost]
       public async Task<ActionResult<UserDto>> RegisterUser(Register register)
        {

            if (await UserExists(register.UserName)) return Unauthorized("Username is taken");

            using var hmac = new HMACSHA512();
            var user = new AppUser()
            {
                UserName = register.UserName,
                PasswordSlat = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                PasswordHash = hmac.Key
            };

            _context.users.Add(user);
            await _context.SaveChangesAsync();

            return new UserDto { UserName =  user.UserName , Token = _token.CreateToken(user) };
        } 

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(Login login)
        {

            var user =  await _context.users.SingleOrDefaultAsync(x => x.UserName == login.UserName);

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.PasswordSlat);

            var computeHas = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i=0;i< computeHas.Length;i++)
            {

                if (computeHas[i] == user.PasswordHash[i]) return Unauthorized("Invalid Passowrd");
            }

            return new UserDto { UserName = user.UserName, Token = _token.CreateToken(user) };

        }

        private async Task<bool> UserExists(string UserName)
        {
            return await _context.users.AnyAsync(x => x.UserName == UserName.ToLower());
        }
    }
}
