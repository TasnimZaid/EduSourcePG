module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "12345",
      database: "Master",
    },
  },
  production: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "12345",
      database: "Master",
    },
  },
  migrations: {
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
};
