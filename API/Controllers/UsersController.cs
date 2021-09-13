using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]    
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet] 
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
                 
               return await _context.users.ToListAsync();
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            var user = await _context.users.Where(x => x.Id == id).FirstOrDefaultAsync();
            return user;
        }

    }
}