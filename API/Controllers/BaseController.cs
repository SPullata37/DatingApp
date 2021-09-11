using API.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BaseController : ControllerBase
    {

        private DataContext _context;
        public BaseController(DataContext context)
        {
            _context = context;
        }
    }
}
