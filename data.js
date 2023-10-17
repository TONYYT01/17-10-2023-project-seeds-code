const refExp = require("express")
const refMysql=require("mysql2")
const app=refExp()
const dbase=refMysql.createConnection({
    "host":"localhost",
    "user":"root",
    "password":"KOLANAVEEN22cs018",
    "port":3306,
    "database":"project"
})
dbase.connect(()=>{
    console.log("Data Base Connected")
})
app.listen(8090,()=>{
    console.log("App is running")
})
app.get('/obtain',async(req,res)=>{
    const sql="select*from seed_repository"
    dbase.query(sql,(err,records)=>{
        if(err){
            res.status(404).json({"error":err.message})
            return
        }
        if(records.length==0){
            res.json(201).json({"message":norecordsfound})
            return
        }
        res.status(200).json({records})
    })
});