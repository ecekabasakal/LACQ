namespace Lacq.Domain.Entities;

public class Specialist : BaseEntity
{
    public Guid UserId { get; set; }
    public string Bio { get; set; } = string.Empty;
    public int YearsOfExperience { get; set; }
    public bool IsActive { get; set; } = true;

    // Navigation properties
    public User User { get; set; } = null!;
    public ICollection<SpecialistPortfolio> Portfolio { get; set; } = new List<SpecialistPortfolio>();
    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    public ICollection<CustomerNote> CustomerNotes { get; set; } = new List<CustomerNote>();
}