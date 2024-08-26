require('dotenv').config


if(process.env.ISDEVELOPMENT === "TRUE") {
    module.exports = {
        'HOST': process.env.SQL_DEVELOPMENT_HOST,
        'USER': process.env.SQL_DEVELOPMENT_USERNAME,
        'PASSWORD': process.env.SQL_DEVELOPMENT_PASSWORD,
        'DB': process.env.SQL_DEVELOPMENT_DATABASE,
        'DIALECT': 'mssql',
        'DIALECTMODULE': 'tedious',
        'OPERATORALIASES': false,
        'PORT': 1433,
        'POOL': {
            'MAX': 5,
            'MIN': 0,
            'ACQUIRE': 30000,
            'IDLE': 10000
        }
    }
} else {
    module.exports = {
        'HOST': process.env.SQL_PRODUCTION_HOST,
        'USER': process.env.SQL_PRODUCTION_USERNAME,
        'PASSWORD': process.env.SQL_PRODUCTION_PASSWORD,
        'DB': process.env.SQL_PRODUCTION_DATABASE,
        'DIALECT': 'mssql',
        'DIALECTMODULE': 'tedious',
        'OPERATORALIASES': false,
        'PORT': 1433,
        'POOL': {
            'MAX': 5,
            'MIN': 0,
            'ACQUIRE': 30000,
            'IDLE': 10000
        }
    }
}