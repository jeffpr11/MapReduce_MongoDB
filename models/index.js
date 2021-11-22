const nodbConfig = require("..\\config\\nodb.config.js");

const mongoose = require('mongoose');

const db_path = nodbConfig.dialect + '://' + nodbConfig.USER + ':' + nodbConfig.PASSWORD + '@' + nodbConfig.HOST + '/' + nodbConfig.noDB + nodbConfig.end;
const db_pathAZ = nodbConfig.dialectAZ + '://' + nodbConfig.USERAZ + ':' + nodbConfig.PASSWORDAZ + '@' + nodbConfig.HOSTAZ + '/' + nodbConfig.noDBAZ + nodbConfig.endAZ;

mongoose.connect(db_pathAZ)
    .then((db) => {
        console.log('DB connnection successful!');
    })
    .catch(err => {
        console.error.bind(console, 'MongoDB connection error:')
    });
