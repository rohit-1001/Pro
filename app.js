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
const bodyparser = require("body-parser")
const app=express()
const port=80

app.use("/static", express.static("static"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set("view engine", 'html')
app.set("views", path.join(__dirname, "views"))

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

// const user1 = new user({ name: 'user1' , email:'user1@gmail.com', contact:1234567891, password: "user123"});
// user1.save();

var data1;
// user.find().lean().then(res=>{
//         data1=res;
//         console.log(res)
//         console.log(res[0].name)
//         console.log(res[0].email)
//         console.log(res[0].contact)
//         console.log(res[0].password)
// })

user.find(function (err, dt) {
    if (err){
        console.log(err);
    }
    else{
        data1=dt;
        // console.log(data1[0].name)
        // console.log(data1[0].email)
        // console.log(data1[0].contact)
        // console.log(data1[0].password)
    }
});

app.get("/", (req, res)=>{
    // const params={}
    res.status(200).sendFile( __dirname+"/index.html", {data:data1})
    /*const data = await user.find()
    res.status(200).json({
        success:true,
        data:data[0]
    })*/
})

app.post("/contact", (req, res)=>{
    var mydata=new user(req.body)
    mydata.save().then(()=>{
        console.log(data1)
        // res.send("contact form saved")
        console.log('data saved')
    }).catch(()=>{
        // res.status(400).send("Some error occured")
        console.log('data not saved')
    })
    // res.status(200).sendFile("index.html", { root: __dirname })
    res.status(200).sendFile( __dirname+"/index.html", {data: data1})
})

app.listen(port, ()=>{
    console.log("Website hosted")
})