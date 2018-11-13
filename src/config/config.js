// PORT
process.env.PORT = process.env.PORT || 2323;

// Environment
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// Data base
let urlDB

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/netux';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;