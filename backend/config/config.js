
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const URL = process.env.URL;



function mongodbConnect(){
    mongoose.connect(URL).then(()=>{
        console.log('connected');

    }).catch((err)=>{
        console.log(err.message);
    })

}
module.exports = mongodbConnect;



