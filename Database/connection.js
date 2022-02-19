const mongoose = require('mongoose');

const mongoClient = mongoose.connect('mongodb://localhost/bookshop').then(()=>{
    console.log("connection successfully");
}).catch(()=>{
    console.log("not connected");
})



module.exports = mongoClient