module.exports = {
    SERVER_PORT: 4000,
    application: {
        cors: {
            server: [
                {
                    origin: "*", //servidor que deseas "localhost:3000" que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }

    },
    DB_CREDENTIALS:{
        HEROKU:{
            user: "dnsqyiewqxnhty",
            host: "ec2-54-196-89-124.compute-1.amazonaws.com",
            database: "d8gpdgocb6arb6",
            password: "9d243b39cbe9962e1a17f7456cee13b3e4d731d49a38fb0c7b2152eac7e447a4",
            port:  5432,
            ssl: { rejectUnauthorized: false },
        },
        LOCALHOST:{
            user: "",
            host: "",
            database: "",
            password: "",
            port:  5432
        },
        URI: "postgres://dnsqyiewqxnhty:9d243b39cbe9962e1a17f7456cee13b3e4d731d49a38fb0c7b2152eac7e447a4@ec2-54-196-89-124.compute-1.amazonaws.com:5432/d8gpdgocb6arb6"      
    },
    ENCRYPTION_SECRET_KEY:  "www-project",
}