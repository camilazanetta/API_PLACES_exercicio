const Sequelize = require ('sequelize')

const connection = new Sequelize ({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '20POST23gre',
    port: '5432',
    database: 'place_trindade',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
})

module.exports = connection;