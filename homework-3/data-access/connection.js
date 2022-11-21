const Pool = require('pg').Pool

const pool = new Pool ({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "admin",
    database: "user_db"
})

module.exports = pool