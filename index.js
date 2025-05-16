const express = require('express')
const mysql = require('mysql')
const ejs = require('ejs')
const app = express();
const path = require('path')
const cors =require('cors')
const bcrypt =require('bcrypt')
const jwt =require('jsonwebtoken')


const bodyparser=require('body-parser');
const json = require('body-parser/lib/types/json');
const { dirname } = require('path');
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));
app.use(bodyparser.urlencoded({extended:true}));


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

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
)
app.get('/',(req ,res) =>{
    res.render('form')

}
)

// create abook
app.post('/add',(req,res)=>{
 const {book_name,author,publisher} = req.body;
const sql = `INSERT INTO book (book_name, author, publisher) VALUES (?,?,?)`;
db.query(sql,[book_name,author,publisher],(err,data) => {
  if (!err) {
    
   res.status(200).json({message:"user inserted",data})
    
  } else {
    
    res.status(500).json({message:"Failed to insert book." });
    
    
}
})
});

// (read)select book
app.get('/select/:id',(req ,res)=>{
    const {id} = req.params;
    const sql=`select * from book where id='${id}'`;
  
    db.query(sql, (err ,result)=>{
        if(err){
        res.status(200).json({message:"No book found"});
    }
    res.send({book:result [0]  })
    });

});
app.get('/select', (req, res) => {
    const sql = `SELECT * FROM book`;
    db.query(sql, (err, data) => {
      if (err) {
         res.status(500).send("Failed to fetch books.");
      }
     else{
      res.send(data)
    } 
    });
  });


//New path to edit
app.get('/edit/:id',(req,res)=>{
    const {id} =req.params;
    const sql=`SELECT * from book where id='${id}'`;
    db.query(sql,(err,data)=>{
 if(data.length>0){
    res.send({user:data[0]});
 }
 else{
    res.status(500).json({message:"NO update"});
 }
    })

});
// update
app.post('/update/:id',(req ,res)=>{
    const {book_name,author,publisher} =req.body;
    const { id } = req.params;
    const sql=`update book SET book_name='${book_name}', author='${author}', publisher='${publisher}' where id='${id}'`;  
    db.query(sql, (err ,data)=>{
        if(!err){
             res.send(data);
        }
        else{
            res.status(500).json({message:"Not updated"});
        }
       
    })
    

})    
// // new path to delete
// app.delete('/delete/:id',(req,res)=>{
//     const {id} =req.params;
//     const sql=`DELETE from book where id='${id}'`;
//     db.query(sql,[id], (err)=>{
//     if(!err){
//         res.status(200).json({message:"user deleted"})
//     }
// else{
//     res.status(500).json({message:"Not deleted"});}
// });
// })
delete
app.delete('/delete/:id',(req,res)=>{
    const {id}=req.params;
    const sql=`DELETE FROM book WHERE id='${id}'`;
    db.query(sql,[id],(err)=>{
        if(err){
            res.status(500).json({message:"Error to dellete data"});
        }
        else{
              res.send('deleted');
        }
        }
      
);
});   

// //register
// app.post('/register',(req,res)=>{

// }
// )
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
    



app.listen(4000,console.log("server is running at http://localhost:4000"));
