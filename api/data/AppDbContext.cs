using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace api.data
{
    public class AppDbContext :DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){

        }

        public DbSet<Student> Students {get; set;}

        internal object AsNoTracking()
        {
            throw new NotImplementedException();
        }
    }
}