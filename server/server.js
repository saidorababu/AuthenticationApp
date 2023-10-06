import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mysql from 'mysql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    port:3307,
    database:'authentication_app'
});

db.connect((err)=>{
    if(err){
        console.error(err.message);
        return;
    }
    console.log("Connected to mySQL as id"+db.threadId);
})

//Register a new user
app.post('/signup',(req,res)=>{
    const {formDetails} = req.body;
    const username = formDetails.username;
    const email = formDetails.email;
    const password = formDetails.password;
    bcrypt.hash(password,10,(err,hash)=>{
        if(err){
            res.status(500).json({error:"Error hashing password"});
        }else{
            const id = 0;
            const sqlQuery = 'INSERT INTO users(username,email,password) VALUES (?,?,?)';
            db.query(sqlQuery,[username,email,hash],(err,result)=>{
                if(err){
                    res.status(500).json({error:'Error registering user'});
                }else{
                    res.status(201).json({data:"Successfully Registered",user:"username"});
                }
            });
        }
    });
});

app.post('/login',async (req,res)=>{
    const {email,password} = req.body;
    const sqlQuery = "Select * from users where email = ?";
    await db.query(sqlQuery,[email],async (err,results)=>{
        if(err){
            res.status(500).json({error:"Error retrieving user"});
        }else{
            if(results.length>0){
                const user = results[0];
                bcrypt.compare(password,user.password,(err,match)=>{
                    if(err){
                        res.status(401).json({error:"Authentication Failed"});
                    }else{
                        const token = jwt.sign({userId : user.id}, 'my_secret_key',{expiresIn:'2h'});
                        res.status(200).json({token,user});
                    }
                })
            }else{
                res.status(401).json({error:"user not found"});
            }
        }
    });

});
const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})