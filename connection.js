const mongoose = require("mongoose")
const URL = "mongodb://webhook:webhook@139.59.5.96:27017/webhook"

mongoose.Promise = global.Promise;

module.exports = ()=>{
    return mongoose.connect(URL,{
        useNewUrlParser:true
    }).then(()=>{
        console.log("DATABASE CONNECTION INSTABLISHED");
    }).catch(err =>{
        console.log("DATABASE CONNECTION ERROR",err);
        process.exit();
    });
}