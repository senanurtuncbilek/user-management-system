const { Sequelize} = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    dialect:"mysql",
    host: config.db.host
});

async function connect() {
    try {
        await sequelize.authenticate();
        console.log("mysql server bağlantısı yapıldı");
    }
    catch(err) {
        console.log("bağlantı hatası ", err);
    }
}

connect();

module.exports = sequelize;