namespace Lacq.Domain.Entities;

public class CustomerNote : BaseEntity
{
    public Guid SpecialistId { get; set; }
    public Guid CustomerId { get; set; }
    public string Content { get; set; } = string.Empty;

    // Navigation properties
    public Specialist Specialist { get; set; } = null!;
    public User Customer { get; set; } = null!;
}