const express = require('express');
const app = express();
const port = 4000;

//database connection
const sequelize = require("./database/db");
const User = require("./models/User");

const userRoutes = require("./routes/userRoutes");

app.use(express.json());
app.use(express.static("public"));


// **Body parser** form
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");


// **Veritabanı bağlantısını başlat ve tabloları oluştur**
sequelize.sync({ alter: true }) // force: true yaparsan tabloyu her başlatmada sıfırlar!
    .then(() => console.log("✅ Veritabanı bağlantısı başarılı!"))
    .catch(err => console.error("❌ Veritabanı bağlantı hatası:", err));



app.use("/users",userRoutes);

// **Ana Sayfa (İsteğe bağlı, kullanıcı yönlendirme yapabilirsin)**
app.get("/", (req, res) => {
  res.redirect("/users");
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});