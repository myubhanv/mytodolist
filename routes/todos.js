const route=require('express').Router()
const Todos=require('../db').todoList

route.get('/', async function(req, res){
    const todos=await Todos.findAll()
    res.send(todos)
    
})
route.get('/:id',async function(req,res){
    const pk=req.params.id
    if(isNaN(Number(pk)))
    {        return res.status(400).send({error: 'invalid todo id'}) }
    
    const todo=await Todos.findByPk(pk)
    if(!todo){
        return res.status(404).send({error: 'task not found with id:'+pk})  
    }
    res.send(todo)

})

route.post('/',async function(req,res){

    if(typeof req.body.title !== 'string'){
        return res.status(404).send({error: 'task not valid'})
           
    }
    let n=1
    let str1=req.body.priority
    console.log(str1)
    req.body.priority.toLowerCase()
    str1=req.body.priority
    console.log(str1)
    if( !str1.localeCompare("high")){ n=1}
    if(! str1.localeCompare("medium")){ n=2}
    if(! str1.localeCompare("low")){ n=3}
    console.log(n)
    

    const newtodo=await Todos.create({
        title : req.body.title ,
        discription : req.body.discription ,
        duedate: req.body.duedate ,
        priority: n
    })

    res.status(201).send(newtodo)
})

route.get('/sort/:sortvalue', async(req, res) => {
    console.log("sorting starts")
    console.log(req.params.sortvalue)
    const sort = req.params.sortvalue;
    const todos = await Todos.findAll({
        order: [
            [sort, 'ASC']
        ]
    })
    res.send(todos)
  })

  route.patch('/:id',async (req,res)=>{
    console.log("=============patch hit============")

    if(isNaN(Number(req.params.id))){
        return res.status(400).send({
            error: 'Todo ID must be an integer'
        })
    }
   
    const todo = await Todos.findByPk(req.params.id)
    console.log(todo)
    console.log("===========")
   
    if(!todo){
        return res.status(404).send({
            error: " No Todo found with id = " + req.params.id
        })
    }
    console.log("===========")
        todo.duedate =  req.body.update_duedate
        console.log(todo.duedate)
        todo.priority =  req.body.update_priority
        todo.status= req.body.update_status
        
             //db save
             await todo.save()
             console.log("===========")
    res.status(201).send(todo).then(()=> {
        console.log("save works")
        
       }).catch((err)=>{
        console.log("save  not works")
        console.error(err)
    })
    
  })

module.exports=route