import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app=express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : 'irctc'
});

app.post('/irctc', (req,res)=>{
    const sql= "INSERT INTO users (`name`,`email`,`password`) VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql,[values], (err,result)=>{
        if(err) return res.json({Message: "Error in Node"});
        return res.json(result);
    })
})

app.listen(8081, ()=>{
    console.log("Connected to server");
})