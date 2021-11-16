const nodbConfig = require("..\\config\\nodb.config.js");

const mongoose = require('mongoose');

const db_path = nodbConfig.dialect + '://' + nodbConfig.USER + ':' + nodbConfig.PASSWORD + '@' + nodbConfig.HOST + '/' + nodbConfig.noDB + '?retryWrites=true&w=majority';

mongoose.connect(db_path)
    .then((db) => {
        console.log('DB connnection successful!');
    })
    .catch(err => {
        console.error.bind(console, 'MongoDB connection error:')
    });
