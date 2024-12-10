const express = require('express');
const {MongoClient, ObjectId} = require('mongodb')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
const mongodbConnect = require('./config/config');
const Signup = require('./api/Signup');
const moongoose = require('mongoose');
const { default: mongoose } = require('mongoose');
const Signin = require('./api/Signin');
var multer = require('multer');
var fs = require('fs');
var path =  require('path');
var stripe = require('stripe')("sk_test_51PauGq2Lcv7rdblxkMWS7M7aqUjmo0G83boutsqjNAvmzmv6TINlj3kvekfAhVjClyYjIWwf19KiSKwHL1Q9qA3P00FqBeVHYb")
var db_connect = require('./config/mongodbclient');

app.use(cors());
app.use(express.json())

app.use(bodyParser.json())

const url = process.env.url;

moongoose.connect(url);
app.post('/Signup', Signup);

app.post('/Signin', Signin);

app.get('/token',(req, res, next) => {
    const token = req.token
    if (!token) return res.status(403).send('Token is required');
    jwt.verify(token, '123456', (err, decoded) => {
      if (err) return res.status(401).send('Invalid token');
      req.email = decoded.email;
      console.log(decoded.email);
      
      next();
    });
  });

app.post('/role', async(req, res) =>{
  let email = req.body.email;
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("users");
  await collection.find({email: email}).toArray().then(result=>{
    console.log(result);
     res.send(result);
   })
})
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '/images/'); // Change this to your desired directory
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
 
var upload = multer({storage: storage});
app.post('/Student', upload.single('file'), (req, res)=>{
  let {file, name, email, phone, subject, Class, gender, address, password}= req.body;
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Students");
  let obj = {
    name: name,
    email: email,
    address: address,
    gender: gender,
    subject: subject,
    Class: Class,
    password: password,
    phone: phone,
    img: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename))
   
  }
 collection.insertOne(obj).then(result =>{
    if(result){
      collection.find().toArray().then(result1 =>{
        res.send({
          "message": "updated",
           "data": result1
          
        });
     
     })
    

    }
    else{
      res.send("error");
    }
 })


})
app.post('/Students', (req, res)=>{
  
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Students");
  
 collection.find().toArray().then(result =>{
     
      res.send(result);

     
 })

})
app.post('/filter', (req, res)=>{
  let data = req.body.data;
  console.log(data)
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Students");
  
 collection.find({gender: data}).toArray().then(result =>{
      
      res.send(result);
      console.log(result)
    

     
 })

})
app.post('/filter1', (req, res)=>{
  let data = req.body.data;
  console.log(data)
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Students");
  
 collection.find({Class: data}).toArray().then(result =>{
      
      res.send(result);
      console.log(result)
    

     
 })

})
app.post('/filter2', (req, res)=>{
  let data = req.body.data;
  console.log(data)
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Students");
  
 collection.find({$or:[{email: data}, {name: data}]}).toArray().then(result =>{
      
      res.send(result);
    
    

     
 })

})

app.post('/profile', (req, res)=>{
  let id = req.body.id;
  const objectid = new ObjectId(id);
  
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Students");
  
 collection.find({_id: objectid}).toArray().then(result =>{
     
      res.send(result);
     
     
 })

})


app.post('/Teacher', upload.single('file'), (req, res)=>{
  let {file, name, email, phone, subject, Class, gender, address, password}= req.body;
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Teachers");
  let obj = {
    name: name,
    email: email,
    address: address,
    gender: gender,
    subject: subject,
    Class: Class,
    password: password,
    phone: phone,
    img: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename))
   
  }
 collection.insertOne(obj).then(result =>{
    if(result){
      collection.find().toArray().then(result1 =>{
        res.send({
          "message": "updated",
           "data": result1
          
        });
     
     })
    

    }
    else{
      res.send("error");
    }
 })


})
app.post('/Teachers', (req, res)=>{
  
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Teachers");
  
 collection.find().toArray().then(result =>{
     
      res.send(result);

     
 })

})
app.post('/t_filter', (req, res)=>{
  let data = req.body.data;
  console.log(data)
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Teachers");
  
 collection.find({gender: data}).toArray().then(result =>{
      
      res.send(result);
      console.log(result)
    

     
 })

})
app.post('/t_filter1', (req, res)=>{
  let data = req.body.data;
  console.log(data)
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Teachers");
  
 collection.find({Class: data}).toArray().then(result =>{
      
      res.send(result);
      console.log(result)
    

     
 })

})
app.post('/t_filter2', (req, res)=>{
  let data = req.body.data;
  console.log(data)
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Teachers");
  
 collection.find({$or:[{email: data}, {name: data}]}).toArray().then(result =>{
      
      res.send(result);
    
    

     
 })

})

app.post('/t_profile', (req, res)=>{
  let id = req.body.id;
  const objectid = new ObjectId(id);
  
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("Teachers");
  
 collection.find({_id: objectid}).toArray().then(result =>{
     
      res.send(result);
     
     
 })

})

app.post('/courses', (req, res)=>{
  let {name, price, detail, duration} = req.body;
  console.log(req.body.name);
  console.log(name);
  
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("courses");
  let obj = {
    name: name,
    price: price,
    detail: detail,
    duration: duration
  }
  collection.insertOne(obj).then(result=>{
    if(result){
      res.send("updated");
    }
  })
 

})
app.post('/courses1', (req, res)=>{
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("courses");
  collection.find().toArray().then(result =>{
    res.send(result);
    console.log(result);
  })
})

app.post('/module_submit', (req, res)=>{
  let {id, name} = req.body;
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("modules");
  let obj = {
    topic_id: id,
    name: name
  }
  collection.insertOne(obj).then(result =>{
    
    if(result){
      collection.find({name: name}).toArray().then(result =>{
        if(result){
          res.send({"success": "updated", "data": result });
        }

      })
    }
  })

})
app.post('/topic_submit', upload.single('file'), (req, res)=>{
  let {title, topic_id, type, course_id} = req.body;
   console.log(fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)))

  let obj = {
    name: title,
    topic_id: topic_id,
    type: type,
    file: fs.readFileSync(path.join(__dirname + '/images/' + req.file.filename)),
    course_id: course_id
    
  }
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("videos");
  try{
    collection.insertOne(obj).then(result =>{
      if(result){
        res.send("updated");
       
      }
     
    });
  

  }catch(err){
    console.log(err.message)
  }
  


})
app.post('/modules', (req, res)=>{
let {id} = req.body;
const client = new MongoClient(url);
const db = client.db("School_Management");
const collection = db.collection("modules");
collection.find({topic_id: id}).toArray().then(result =>{
  res.send(result);
})
  
})
app.post('/topics', (req, res)=>{
  let {name} = req.body;
  console.log(name)
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("videos");

  collection.find({topic_id: name}).toArray().then(result=>{
    res.send(result);
   

  })


})
app.post('/video', (req, res)=>{
  let {id} = req.body;
  console.log(id)
  let objectid = new ObjectId(id);
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("videos");

  collection.find({_id: objectid}).toArray().then(result=>{
    res.send(result);
   
  })


})
app.post('/search', (req, res)=>{
  let {input, email} = req.body;
  console.log(email)
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("courses");
  const collection1 = db.collection("cart");

  collection.findOne({name: {$regex: `${input}`,  $options: 'i'}}).then(result=>{
    
    if(result){
      let id = result._id.toString();
      console.log(id)
  
      collection1.find({$and:[{id : id },{email: email}]}).toArray().then(result1 =>{
        
        if(result1.length > 0){
          res.send({data: result, buy: true});
        }
        else{
          res.send({data: result, buy: false});
        }
  
      })

    }
    else{
      res.send(false)
    }
    
  
    
   

  })


});
app.post('/course_detail_topics', (req, res)=>{
  let {id} = req.body;
 
    const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("modules");

  collection.find({topic_id: id}).toArray().then(result=>{
    res.send(result);
    
   

  })


});
app.post('/course_syllabus_details', (req, res)=>{
  let {id} = req.body;
  console.log(id)
 
    const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("videos");
  collection.find({course_id: id}).toArray().then(result =>{
    res.send(result);
    
  })

  
})
app.post('/payment', async(req, res)=>{
  let {name, price, detail, email, id} = req.body;
  
  let array = [name, price, detail];
  const lineitems =[{
    price_data:{
      currency: "inr",
      product_data:{
        name: name
       
      },
      unit_amount: price * 100,
  
  
    },
  
  
    quantity: 1,
  }
  
  ]
  
  const session = await stripe.checkout.sessions.create({
   payment_method_types: ["card"],
    line_items: lineitems,
    mode: 'payment',
    success_url: `http://localhost:5173`,
    cancel_url: 'https://localhost:5173/Cancel',
    customer_email: email, 
    
  });
  let  data = await stripe.checkout.sessions.retrieve(session.id);
  console.log(data);
  const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("cart");
  let obj = {
    name: name,
    id: id,
    detail: detail,
    email: email,
    training: new Date().getMonth() + 1

  }
  collection.insertOne(obj);
  res.send({id:session.id, data: email, name: name});
  

})
app.post('/cart', (req, res)=>{
  let {email} = req.body;
  console.log(email)
 
    const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("cart");

  collection.find({email: email}).toArray().then(result=>{
    res.send(result);
    
   

  })


});
app.post('/cart1', (req, res)=>{
  let {id, email} = req.body;
  console.log(id)
 
    const client = new MongoClient(url);
  const db = client.db("School_Management");
  const collection = db.collection("videos");
  collection.find().toArray({$and:[{id: id}, {email: email}]}).then(result =>{
    res.send(result);
    
  })

  
})
app.get('/', (req, res)=>{
  res.send('<h1>hello</h1>')
})


app.listen(5000)