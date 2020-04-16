const { db,todoList}=require('./db')
/*db.sync().then(()=> {
    console.log("db works")
    todoList.create({
        title: 'node-js assignment',
        discription: 'todo list manager',
        duedate : '16-04-2020',
        priority: 'high' 
    })


}).catch((err)=>{
    console.error(err)
})*/

async function task(){
    await db.sync({})
    await todoList.create({
        title: 'college assignment',
        discription: 'google classroom',
        duedate : '2020-04-18',
    })
}
task().then(()=> {
    console.log("db works")
   }).catch((err)=>{
    console.error(err)
})