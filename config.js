module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: 'localhost',
            port: 5432,
            user: 'siegfred',
            password: 'susserseele@pg13',
            database: 'development'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host: '172.17.0.2',
            port: 5432,
            user: 'siegfred',
            password: 'susserseele@pg13',
            database: 'development'
        }
    }
}