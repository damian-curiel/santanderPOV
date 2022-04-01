module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "pruebaxd",
  DB: "HarnessSantander",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000000
  }
};
