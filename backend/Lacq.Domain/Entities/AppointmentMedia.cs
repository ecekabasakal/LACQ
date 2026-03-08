using Lacq.Domain.Enums;

namespace Lacq.Domain.Entities;

public class AppointmentMedia : BaseEntity
{
    public Guid AppointmentId { get; set; }
    public string ImageUrl { get; set; } = string.Empty;
    public MediaType Type { get; set; }

    // Navigation properties
    public Appointment Appointment { get; set; } = null!;
}