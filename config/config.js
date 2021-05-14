"use strict";
require("dotenv").config({ path: '../.env' });
const path = require('path');
const basename = path.basename(__filename);
console.log(process.env.DB_USERNAME);
console.log(basename);
console.log(process.env.DB_HOST);
console.log(process.env.DB_CONNECTION);
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: process.env.DB_CONNECTION,
        port: process.env.DB_PORT,
    },
    test: {
        username: "root",
        password: null,
        database: "database_test",
        host: "127.0.0.1",
        dialect: "mysql",
    },
    production: {
        username: "root",
        password: null,
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql",
    },
};
//# sourceMappingURL=config.js.map