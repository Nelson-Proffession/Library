const express=require('express')
const mysql=require('mysql')
const bodyparser=require('body-parser')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const app=express();
app.use(bodyparser.urlencoded({extended:true}));

const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"book_management",
});

db.connect(err=>{
    if(err){
    console.log("database Not connected");
    }
    else{
        console.log('connected')
    }
}
);
app.post('/register',function(req,res){
    const {username,email,password}=req.body
    bcrypt.hash(password,10,function(err,hash){
        if(err)return
        res.status(500).json({message:"Error Hashing"});
        const sql=`INSERT INTO users (username,email,password) VALUES(?,?,?)`;
        db.query(sql,[username,email,password,hash],function(err,result){
            if(err)return
            res.status(400).json({message:"user exist invali user"});
            res.json({message:"user registered"});
        });
    });

});

// login
app.post('/login',function(req,res){
    const{username,email}=req.body;
    if(err||result.length ===0)return
    res.status(400).json({message:"user Not found"})
    const user=result[0];
    bcrypt.compare(password,user.password,function(err,same){
        if(!same)return
        res.status(401).json({message:"wrong user"});
        const token=jwt.sign({userId:user.id},'secret123',{expresIn:'1h'});
        res.status(200).json({messsage:"Login successful",token:token})
    });
});