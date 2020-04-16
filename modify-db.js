const { db,todoList}=require('./db')

async function task(){
    const todo=await todoList.findOne({
        where: {priority: 'medium'}
    })
    console.log(todo)
    console.log("============")

    todo.priority='low'
    console.log(todo)
    console.log("============")

    await todo.save()
    console.log(todo)
    console.log("============")
}
task()