# 💅 Lacq — Nail & Beauty Studio Platform

> A mobile platform connecting nail studios with clients — digitizing appointments, nail health assessments, and pricing workflows.

---

## 🌟 Vision

Lacq is a professional nail studio management and booking application built for the Turkish market. It goes beyond simple appointment scheduling by introducing a **nail health assessment flow** and a **dynamic pricing system** — where specialists can review a client's current nail condition and adjust pricing before confirming the appointment.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile Frontend | React Native (CLI) + TypeScript |
| Backend API | .NET 8 Web API (C#) |
| Database | PostgreSQL (Entity Framework Core) |
| Real-Time | SignalR (Chat & Notifications) |
| File Storage | Azure Blob Storage / AWS S3 |
| State Management | Zustand |
| Architecture | Clean Architecture (Domain / Application / Infrastructure / API) |

---

## 👥 User Roles

| Role | Description |
|------|-------------|
| **Client** | Books appointments, uploads nail inspiration photos, tracks appointment history |
| **Nail Technician (Specialist)** | Manages portfolio, reviews client nail conditions, adjusts pricing, chats with clients |
| **Admin (Salon Manager)** | Manages staff, services, and views reports |

---

## ✨ Key Features

### 📅 Appointment & Pricing Flow
1. Client selects a service → system shows **base price**
2. Client uploads **inspiration photo** (target look)
3. Client uploads **current nail condition photo**
4. System shows **estimated price range** with disclaimer
5. Specialist reviews photos and optionally adds **extra charge** (damage, removal, etc.)
6. Client receives notification with updated price → **confirms or cancels**
7. Appointment is finalized

### 👩‍🎨 Specialist Profiles
- Portfolio gallery ("My Work")
- Availability calendar
- Years of experience & bio

### 💬 Real-Time Chat (SignalR)
- Private chat opens between client and specialist after appointment confirmation
- Supports text and image messages
- Late arrival notifications ("I'm 10 min late" / "I'm 15 min late")

### 📋 Specialist CRM Panel
- Full client history per specialist
- Uploaded nail photos per client
- **Private notes** visible only to the specialist (e.g. "sensitive nail beds", "prefers red tones")

---

## 🗄 Database Schema
```
Users               — Base user accounts (all roles)
Specialists         — Extended profile for nail technicians
SpecialistPortfolio — Portfolio images per specialist
Services            — Available services with base price & duration
Appointments        — Core booking entity with status & pricing
AppointmentMedia    — Target look & current condition photos
ChatMessages        — Real-time messages per appointment
CustomerNotes       — Private specialist notes per client
```

### Appointment Status Flow
```
Pending → PriceUpdated → Approved → Completed
                    ↘ Cancelled
```

---

## 🏗 Project Structure
```
LACQ/
├── README.md
├── .gitignore
└── backend/
    ├── Lacq.sln
    ├── Lacq.Domain/
    │   ├── Entities/
    │   │   ├── BaseEntity.cs
    │   │   ├── User.cs
    │   │   ├── Specialist.cs
    │   │   ├── SpecialistPortfolio.cs
    │   │   ├── Service.cs
    │   │   ├── Appointment.cs
    │   │   ├── AppointmentMedia.cs
    │   │   ├── ChatMessage.cs
    │   │   └── CustomerNote.cs
    │   └── Enums/
    │       ├── UserRole.cs
    │       ├── AppointmentStatus.cs
    │       └── MediaType.cs
    ├── Lacq.Application/
    ├── Lacq.Infrastructure/
    │   └── Persistence/
    │       ├── ApplicationDbContext.cs
    │       └── Configurations/
    └── Lacq.API/
        ├── Program.cs
        └── appsettings.json
```

---

## 🚀 Getting Started

### Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js v20+](https://nodejs.org)
- [PostgreSQL 14+](https://www.postgresql.org)
- [React Native CLI](https://reactnative.dev/docs/environment-setup)

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/ecekabasakal/LACQ.git
cd LACQ/backend

# Create the database
psql postgres -c "CREATE DATABASE lacqdb;"

# Update connection string in Lacq.API/appsettings.json
# "DefaultConnection": "Host=localhost;Database=lacqdb;Username=YOUR_USERNAME;Password="

# Restore packages and build
dotnet restore
dotnet build

# Run migrations
dotnet ef database update --project Lacq.Infrastructure --startup-project Lacq.API

# Run the API
dotnet run --project Lacq.API
```

### API Documentation
Once running, Swagger UI is available at:
```
https://localhost:5001/swagger
```

---

## 🎨 Design System — Lumière

Lacq uses the **Lumière** design language — a soft luxury aesthetic built for the beauty industry.

| Token | Value |
|-------|-------|
| Primary Color | `#c9956a` (Terracotta) |
| Background | `#faf6f1` (Warm Cream) |
| Text | `#2a1f1a` (Espresso) |
| Display Font | Cormorant Garamond (Italic) |
| Body Font | DM Sans |

---

## 🗺 Development Roadmap

- [x] Backend solution structure (Clean Architecture)
- [x] Domain entities & enums
- [x] ApplicationDbContext (EF Core + PostgreSQL)
- [ ] EF Core migrations
- [ ] JWT Authentication (Register / Login)
- [ ] Appointment booking API
- [ ] File upload service (S3/Azure Blob)
- [ ] SignalR chat hub
- [ ] React Native project setup
- [ ] UI component library (Lumière Design System)
- [ ] Booking flow screens
- [ ] Specialist panel screens
- [ ] Push notifications (Firebase)

---

## 📄 License

This project is proprietary software. All rights reserved © 2025 Lacq.