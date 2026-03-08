using Lacq.Domain.Enums;

namespace Lacq.Domain.Entities;

public class Appointment : BaseEntity
{
    public Guid ClientId { get; set; }
    public Guid SpecialistId { get; set; }
    public Guid ServiceId { get; set; }
    public DateTime AppointmentDate { get; set; }
    public AppointmentStatus Status { get; set; } = AppointmentStatus.Pending;
    public decimal BasePrice { get; set; }
    public decimal? ExtraCharge { get; set; }
    public decimal FinalPrice { get; set; }
    public string? ExtraChargeNote { get; set; }
    public string? ClientNote { get; set; }

    // Navigation properties
    public User Client { get; set; } = null!;
    public Specialist Specialist { get; set; } = null!;
    public Service Service { get; set; } = null!;
    public ICollection<AppointmentMedia> Media { get; set; } = new List<AppointmentMedia>();
    public ICollection<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();
}