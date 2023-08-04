const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/Plooto_devélopment');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting to mongodb'));

db.once('open',function(){
    console.log("connected to database:: Mongodb");
})

module.exports = db;