const { db,todoList}=require('./db')
const {Op}=require('sequelize')

async function task(){
    await db.sync()
    const todolist= await todoList.findAll({
        where: {
            [Op.or] : [
                {status : {[Op.like] : 'incomplete%'}},
                {priority : {[Op.like] : 'high%'}}
            ]
        },
        order:[
            ['duedate','DESC']
        ]
    })
    console.log(todolist.length)
    for(let task of todolist){
    console.log(`${task.title}|| ${task.status}| ${task.priority} | ${task.duedate} `)
    }
}
task().then(()=> {
    console.log("read db works")
   }).catch((err)=>{
    console.error(err)
})