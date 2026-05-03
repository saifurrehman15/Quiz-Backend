import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize(
//     process.env.dbName,
//     process.env.user,
//     process.env.dbpassword,
//     {
//         host: 'localhost',
//         dialect: process.env.database,
//         logging: false,
//     }
// );

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});