const express = require('express');
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");

// **Veritabanı bağlantısı**
const sequelize = require("./database/db");
const userRoutes = require("./routes/userRoutes");

// **EJS & Layout Ayarları**
app.use(expressLayouts); // 📌 Express'e layout özelliğini tanıtıyoruz
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // 📌 Views klasörünü ayarla
app.set("layout", "layout"); // 📌 Varsayılan layout dosyasını tanımla

// **Middleware**
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // 📌 Public klasörünü statik dosyalar için kullan

// **Veritabanı bağlantısını başlat ve tabloları oluştur**
sequelize.sync({ alter: true }) 
    .then(() => console.log("✅ Veritabanı bağlantısı başarılı!"))
    .catch(err => console.error("❌ Veritabanı bağlantı hatası:", err));

// **Rotaları Tanımla**
app.use("/users", userRoutes);

// **Ana Sayfa Yönlendirme**
app.get("/", (req, res) => {
    res.redirect("/users");
});

// **Sunucuyu Başlat**
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);
});
