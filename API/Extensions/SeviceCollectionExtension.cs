using API.Interfaces;
using API.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class SeviceCollectionExtension
    { 

        public static IServiceCollection AddApplicationSerivce(this IServiceCollection services ,IConfiguration config)
        {
            services.AddScoped<ITokenService, TokenServices>();
            services.AddCors(p => p.AddDefaultPolicy(builder => builder.AllowAnyOrigin()));
            return services;
        }
    }
}
