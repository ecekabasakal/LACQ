# Proje Adı: LACQ

## 1. Proje Vizyonu
Bu proje, tekil veya zincir tırnak stüdyoları için geliştirilen; müşteri ile uzmanı buluşturan, sadece randevu değil, işlem öncesi **tırnak sağlığı analizi** ve **fiyatlandırma** süreçlerini dijitalleştiren bir mobil uygulamadır.

## 2. Teknoloji Yığını (Tech Stack)
* **Frontend (Mobil):** React Native (CLI), TypeScript.
* **Backend (API):** .NET 8 Web API (C#).
* **Veritabanı:** PostgreSQL veya MS SQL Server (Entity Framework Core).
* **Real-Time İletişim:** SignalR (Sohbet ve Bildirimler için).
* **Dosya Depolama:** Azure Blob Storage veya AWS S3 (Fotoğraflar için).
* **State Management:** Zustand veya Redux Toolkit.
* **UI Library:** React Native Paper veya Tamagui.

## 3. Kullanıcı Rolleri
1.  **Müşteri (Client):** Randevu alan, model yükleyen, hizmet alan.
2.  **Uzman (Nail Technician):** İşlemi yapan, portfolyo yöneten, fiyat revizesi yapan.
3.  **Admin (Salon Manager):** Genel raporlama, personel ve temel hizmet yönetimi.

## 4. Fonksiyonel Gereksinimler (Detaylı Akış)

### A. Randevu ve Fiyatlandırma Akışı (En Kritik Bölüm)
1.  **Hizmet Seçimi:** Müşteri temel hizmeti seçer (Örn: Protez Tırnak, Kalıcı Oje). Sistem "Baz Fiyat" gösterir.
2.  **İstenen Model (Inspiration):** Müşteri yaptırmak istediği tırnağın fotoğrafını yükler.
3.  **Mevcut Durum (Assessment):**
    * Müşteri kendi elinin/tırnağının güncel fotoğrafını çeker ve yükler.
    * Sistem bu aşamada müşteriye "Tahmini bir fiyat aralığı" sunar ancak **"Kesin fiyat uzman onayından sonra belirlenecektir"** uyarısını verir.
4.  **Uzman Değerlendirmesi:**
    * Uzman, gelen randevu isteğini ve müşterinin tırnak fotoğrafını panelinde görür.
    * Eğer tırnakta hasar, mantar riski veya ekstra işçilik (çıkarma işlemi vb.) varsa randevuya **"Ekstra Ücret / Hasar Payı"** ekler.
    * Müşteriye bildirim gider: "Uzmanınız tırnak durumunuzu inceledi, güncel fiyat teklifi: X TL."
    * Müşteri onaylarsa randevu kesinleşir.

### B. Uzman Seçimi ve Profiller
* **Uzman Listeleme:** Müşteriler salonun uzmanlarını görüntüleyebilir.
* **Portfolyo:** Her uzmanın kendi profili altında "Yaptığım İşler" galerisi bulunur.
* **Müsaitlik:** Uzmanın çalışma saatleri ve dolu olduğu zamanlar takvimde görünür.

### C. İletişim ve Süreç Yönetimi
* **Anlık Sohbet (Chat):**
    * Randevu kesinleşince Müşteri ve Uzman arasında özel bir sohbet penceresi açılır (SignalR ile).
    * Fotoğraf ve metin gönderilebilir.
* **Geç Kalma Bildirimi:**
    * Müşteri randevusuna geç kalacaksa uygulama üzerinden "10 dk Gecikiyorum", "15 dk Gecikiyorum" butonlarına basabilir.
    * Uzmanın ekranına ve telefonuna anında Push Notification düşer.

### D. Uzman Paneli (CRM Özellikleri)
* **Müşteri Kartı:** Uzman, randevuya gelen müşterinin profiline tıkladığında şunları görmelidir:
    * Daha önce yaptırdığı işlemler.
    * Yüklediği tırnak fotoğrafları.
    * **Özel Notlar:** (Örn: "Müşterinin tırnak etleri çok hassas", "Sessizliği seviyor", "Kırmızı rengi tercih ediyor"). Bu notları sadece uzman görür.

## 5. Veritabanı Varlık İlişkileri (Entity Draft)

* **Users:** (Id, Name, Role, Phone, ProfileImage)
* **Specialists:** (Id, UserId, Bio, YearsOfExperience) -> *User tablosu ile ilişkili*
* **SpecialistPortfolio:** (Id, SpecialistId, ImageUrl, Description)
* **Services:** (Id, Name, BasePrice, EstimatedDuration)
* **Appointments:** (Id, ClientId, SpecialistId, ServiceId, AppointmentDate, Status [Pending, Approved, Completed, Cancelled], FinalPrice)
* **AppointmentMedia:** (Id, AppointmentId, Type [TargetLook, CurrentCondition], ImageUrl)
* **ChatMessages:** (Id, SenderId, ReceiverId, MessageContent, SentAt, IsRead)
* **CustomerNotes:** (Id, SpecialistId, CustomerId, NoteContent) -> *Gizli notlar*

## 6. Claude İçin Geliştirme Talimatları
1.  **API First:** Önce Backend modellerini ve Controller'larını oluştur.
2.  **SignalR Hub:** Chat ve Bildirimler için ayrı bir Hub tasarla.
3.  **Image Upload:** Fotoğraf yükleme işlemleri için bir "FileService" arayüzü (Interface) yaz (Mock olarak başlayabiliriz).
4.  **UI Components:** React Native tarafında "ImagePicker" ve "ChatBubble" bileşenlerini modüler tasarla.