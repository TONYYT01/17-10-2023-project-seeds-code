const express= require('express')
const bodyparser=require('body-parser')
const mysql=require('mysql2')
const upndel = require('./modify')

const dataBase=mysql.createConnection({
    host:"localhost",
    database:"project",
    user:"root",
    password:"KOLANAVEEN22cs018"
})   
dataBase.connect(()=>{
    console.log("Database connected successfully!")
})
const application=express()
application.use('/info',upndel) 
application.use(bodyparser.urlencoded({extended:true}))
application.use(bodyparser.json())
 
application.listen(2056,(err)=>{
    console.log("Webservice running successfully") 
})

//crud operations
//read operation: Get mapping, display all details in the table as json
application.get('/list',async(req,res)=>{
    const sql="select*from seed_repository"
    dataBase.query(sql,(err,records)=>{
        if(err){
            res.status(500).json({error:err.message})
            Return
        }
        if(records.length==0){
            res.status(404).json({message:"No data is available"})
            return
        }
        res.status(200).json(records)
    })
})      
application.post('/new',async(req,res)=>{
    //destructure follows order of parameters
    const{seed_id,seed_name,recommended_period,recommended_season,price,quantity}=req.body 
    const sql="insert into seed_repository values(?,?,?,?,?,?)"
    dataBase.query(sql,[seed_id,seed_name,recommended_period,recommended_season,price,quantity],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        res.status(200).json({message:"data has added"})

    }) 
}) 