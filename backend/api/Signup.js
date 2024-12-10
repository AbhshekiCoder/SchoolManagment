const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const register = require('../model/register');
const {MongoClient} = require('mongodb')





app.use(cors());

app.use(bodyParser.json);

dotenv.config();



const URL = process.env.URL
console.log(URL);
app.use(express.json());
const Router = express.Router();

Router.post('/Signup', async(req, res)=>{
    const {name, email, password, role, address, staff} = req.body;
    const obj = {
        name: name,
        email: email,
        password: password,
        role: role,
        address: address,
        staff: staff


    }
    try{
        const client = new MongoClient(URL);
        const db = client.db("School_Management");
        const collection = db.collection("users");
        await collection.find({email: email}).toArray().then(result=>{
         if(result.length > 0){
           res.send("email already registered");
          
           
         }
         else{
           collection.insertOne(obj);
           res.send("Registered successfully");
         
      
    
         }
         })

    }
    catch(err){
        console.log(err);
    }
   
});

module.exports = Router;

