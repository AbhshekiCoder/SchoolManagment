const express = require('express');

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const register = require('../model/register');
const {MongoClient} = require('mongodb');
const jwt = require('jsonwebtoken');





app.use(cors());

app.use(bodyParser.json);

dotenv.config();



const URL = process.env.URL
console.log(URL);
app.use(express.json());
const Router = express.Router();

Router.post('/Signin', async(req, res)=>{
    const { email, password} = req.body;
    console.log(email)
    try{
        const client = new MongoClient(URL);
        const db = client.db("School_Management");
        const collection = db.collection("users");
        await collection.find({$and:[{email: email}, {password: password}]}).toArray().then(result=>{
         if(result.length  === 0){
            res.send({
                "success" : "Invalid email or password"
            })
         
          
           
         }
         else{
            const token = jwt.sign({ email: email }, '123456', { expiresIn: '1m' });
           
           
           res.send({
            success: "signin Success",
            token: token,
            email: email,
            name: result[0].name
    
           });

           
         
      
    
         }
         })

    }
    catch(err){
        console.log(err);
    }
   
});

module.exports = Router;

