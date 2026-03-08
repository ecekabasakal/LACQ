namespace Lacq.Domain.Entities;

public class SpecialistPortfolio : BaseEntity
{
    public Guid SpecialistId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public string? Description { get; set; }

    // Navigation properties
    public Specialist Specialist { get; set; } = null!;
}