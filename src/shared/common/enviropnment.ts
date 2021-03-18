/* VARIAVEIS ENVIRONMENT SAO UTILIZADAS COMO GLOBAIS PARA O SERVIDOR */

export const environment = {
  server: { port: process.env.SERVER_PORT || 3000 },
  mongodb_connection: {
    url: process.env.DB_URL || 'mongodb://localhost/lotonest-api',
  },
  /*mysql_connection: {
    type: 'mysql',
    host: '127.0.0.1',
    username: 'root',
    password: '',
    database: '7180',
    synchronize: true,
  },*/
  security: {
    salt_key: process.env.SALT_KEY || 'R348F9HY3-1289E7U4Y9-KLJASwH31289',
    jwtSecretKey: process.env.JWTKEY || 'secret-key',
  },
  log: {
    level: process.env.LOG_LEVEL || 'debug',
    name: 'lotonest-api',
  },
};
