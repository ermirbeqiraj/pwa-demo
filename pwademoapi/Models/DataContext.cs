using Microsoft.EntityFrameworkCore;

namespace pwademoapi
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<Person> Person { get; set; }
    }
}