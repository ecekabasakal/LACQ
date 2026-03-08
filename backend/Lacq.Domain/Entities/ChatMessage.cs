namespace Lacq.Domain.Entities;

public class ChatMessage : BaseEntity
{
    public Guid AppointmentId { get; set; }
    public Guid SenderId { get; set; }
    public string Content { get; set; } = string.Empty;
    public string? ImageUrl { get; set; }
    public bool IsRead { get; set; } = false;

    // Navigation properties
    public Appointment Appointment { get; set; } = null!;
    public User Sender { get; set; } = null!;
}