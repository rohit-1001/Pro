// // getting-started.js
// const mongoose = require('mongoose');

// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb+srv://rohitphalke:mongodb@rdb.1atq6vo.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true}, {useUnifiedTopology: true});
// // mongodb+srv://rohitphalke:<password>@rdb.1atq6vo.mongodb.net/?retryWrites=true&w=majority
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));

// db.once('open', function(){
//     console.log('connection established');
// });

// getting-started.js
const express = require("express")
const path = require("path")
const app=express()
const port=8080

app.use(express.urlencoded({ extended: true }));
app.set("view engine", 'html')
app.set("views", path.join(__dirname, "views"))

app.get("/", (res, req)=>{
    const params={}
    res.status(200).render("index.html", params)
})

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://rohitphalke:mongodb@rdb.1atq6vo.mongodb.net/?retryWrites=true&w=majority');
//   await mongoose.connect('mongodb://127.0.0.1:27017/test');
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

db.once('open', function(){
    console.log('connection established');
});

const schema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    password: String
});

const user = mongoose.model('user', schema);

const user1 = new user({ name: 'user1' , email:'user1@gmail.com', contact:1234567891, password: "user123"});

user1.save();

// let a= user.find({ name: user1 });
// console.log(a)

app.listen(port, ()=>{
    console.log("Website hosted")
})