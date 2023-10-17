const express= require('express')
const bodyparser=require('body-parser')
const mysql=require('mysql2')

const dataBase=mysql.createConnection({
    host:"localhost",
    database:"project",
    user:"root",
    password:"KOLANAVEEN22cs018"
})
dataBase.connect(()=>{
    console.log("Database connected successfully!!!")
})
const myRoute=express.Router()
myRoute.use(bodyparser.urlencoded({extended:true}))
myRoute.use(bodyparser.json())

// Put mapping:update
myRoute.put('/change/:id',async(req,res)=>{ 
    const{seed_name}=req.body
    const sql="update seed_repository set seed_name=? where seed_id=?"
    dataBase.query(sql,[seed_name,req.params.id],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        res.status(200).json  ({message:"Updated"})
    })
})

// delete by key

myRoute.delete('/delkey/:key',async(req,res)=>{
    const sql="delete from employee where id=?"
    dataBase.query(sql,[req.params.key],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(ack.affectedRows==0){
            res.status(404).json({message:"Records not available to delete"})
            return
        }
        res.status(201).json({message:"Records deleted"})
    })
})

//delete by condition 

myRoute.delete('/close/:min',async(req,res)=>{
    const sql="delete from employee where salary<?"
    dataBase.query(sql,[req.params.min],(err,ack)=>{
        if(err){
            res.status(500).json({error:err.message})
            return
        }
        if(ack.affectedRows==0){
            res.status(404).json({message:"Records not available to delete"})
            return
        }
        res.status(201).json({message:"Records deleted"})
    })
})

module.exports=myRoute