const MongoClient = require('mongodb');
let url = "mongodb+srv://projects:123456ytrewq@cluster0.0qqnloi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
function db_connect(){
    const client = new MongoClient(url);
    const db = client.db("School_Management");
}
module.exports = db_connect;