require("dotenv").config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    logging: console.log,
  },

  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: false,
      keepAlive: true,
      connectionTimeoutMillis: 30000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
    retry: {
      match: [
        /ECONNRESET/,
        /ETIMEDOUT/,
        /SequelizeConnectionError/
      ],
      max: 5,
    },
    logging: false,
  },
};