module.exports = session => {
    const MySQLStore = require('express-mysql-session')(session);

    const mysqlOptions = {
        port: process.env.MYSQL_PORT,
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
    };

    return new MySQLStore(mysqlOptions);
}