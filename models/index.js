// const nodbConfig = require("../config/nodb.config.js");

const mongoose = require('mongoose');

// nodbConfig.dialect + '://' + nodbConfig.HOST + '/' + nodbConfig.noDB;
const db_path ='mongodb://proyecto1bda:SZnlfUeKjdnpyl0ovU6S8kAaB4gjiyVA312m7SGAmUmniyiiyGEDwnEiFAA1OwAfTUOIUa4sAwcNHIieNGnYHw==@proyecto1bda.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@proyecto1bda@'

mongoose.connect(db_path)
    .then(() => console.log('DB connnection successful!'))
    .catch(err => {
        console.error.bind(console, 'MongoDB connection error:')
    });
