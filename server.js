const express=require('express')
const server=express()
const todoRoute=require('./routes/todos')
const port = process.env.PORT || 2122
const { db }=require('./db')

server.use(express.urlencoded({extended : true}))
server.use(express.json())
server.use('/',express.static(__dirname+'/public'))
server.use('/todos',todoRoute)

db.sync()
.then(()=> {
    console.log("db works")
    server.listen(port)
   }).catch((err)=>{
    console.error(err)
})
