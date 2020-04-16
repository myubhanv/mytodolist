const express=require('express')
const server=express()
const todoRoute=require('./routes/todos')
const { db }=require('./db')

server.use(express.urlencoded({extended : true}))
server.use(express.json())
server.use('/',express.static(__dirname+'/public'))
server.use('/todos',todoRoute)

db.sync()
.then(()=> {
    console.log("db works")
    server.listen(2122)
   }).catch((err)=>{
    console.error(err)
})
