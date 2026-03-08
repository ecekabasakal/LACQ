using Lacq.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Lacq.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Specialist> Specialists => Set<Specialist>();
    public DbSet<SpecialistPortfolio> SpecialistPortfolios => Set<SpecialistPortfolio>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Appointment> Appointments => Set<Appointment>();
    public DbSet<AppointmentMedia> AppointmentMedias => Set<AppointmentMedia>();
    public DbSet<ChatMessage> ChatMessages => Set<ChatMessage>();
    public DbSet<CustomerNote> CustomerNotes => Set<CustomerNote>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ApplicationDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}