const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// **Tüm kullanıcıları listele**
router.get("/", async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ["userid", "name", "email"] });
        res.render("index", { users });
    } catch (err) {
        console.error("Kullanıcıları listelerken hata oluştu:", err);
        res.status(500).send("Sunucu hatası.");
    }
});

// **Kullanıcı ekleme sayfası**
router.get("/new", (req, res) => {
    res.render("form", { user: null });
});

// **Edit için kullanıcıyı getir (DÜZELTİLDİ)**
router.get("/edit/:userid", async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userid); // `userid` ile bul
        if (!user) {
            return res.status(404).send("Kullanıcı bulunamadı!");
        }
        res.render("form", { user });
    } catch (err) {
        console.error("Kullanıcı getirilemedi:", err);
        res.status(500).send("Sunucu hatası.");
    }
});

// **Kullanıcı ekleme**
router.post("/", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Şifreyi hash'le
        const hashedPassword = await bcrypt.hash(password, 10);

        // Yeni kullanıcıyı oluştur
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.redirect("/users");
    } catch (err) {
        console.error("Kullanıcı eklerken hata oluştu:", err);
        res.status(500).send("Kullanıcı eklenemedi.");
    }
});

// **Kullanıcı güncelleme (DÜZELTİLDİ)**
router.post("/update/:userid", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Kullanıcıyı bul
        const user = await User.findByPk(req.params.userid);
        if (!user) {
            return res.status(404).send("Kullanıcı bulunamadı!");
        }

        // Eğer yeni bir şifre girildiyse, hash'le
        let hashedPassword = user.password;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        // Kullanıcıyı güncelle
        await User.update(
            { name, email, password: hashedPassword },
            { where: { userid: req.params.userid } }
        );

        res.redirect("/users");
    } catch (err) {
        console.error("Kullanıcı güncellenirken hata oluştu:", err);
        res.status(500).send("Güncelleme başarısız.");
    }
});

// **Kullanıcı silme (DÜZELTİLDİ)**
router.post("/delete/:userid", async (req, res) => {
    try {
        await User.destroy({ where: { userid: req.params.userid } });
        res.redirect("/users");
    } catch (err) {
        console.error("Kullanıcı silinemedi:", err);
        res.status(500).send("Silme işlemi başarısız.");
    }
});

module.exports = router;
