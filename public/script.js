$(function() {
    let submit=$('#submit')
    let expand=$('#expand')
    
    let sort=$('#sort')

    let sortvalue = $('#sortvalue') 

    let taskList=$('#task-list')
let name=$('#task')
let about=$('#about')
let due=$('#due')
let rank=$('#rank')

getTodos(function (tasks){
    taskList.empty()
    for(task of tasks){
        taskList.append(showTodos(task))
    }
})
////Submit Button/////
submit.click(function(){
    console.log("button clicked")
    addTodos(name.val(),about.val(),due.val(),rank.val(),
    function(addedtask){
        window.alert("Added"+addedtask.name+"to Database")
        getTodos(function (tasks){
            console.log("get starts")
    taskList.empty()
    for(task of tasks){
        taskList.append(showTodos(task))
    }
})
    })
  })
  
 

///////Sort Button////
     sort.click(function(){
        console.log("sort button clicked")
        console.log(sortvalue.val())
        let sortval=sortvalue.val()
        getSortTodos(sortval,function (tasks){
            taskList.empty()
            for(task of tasks){
                taskList.append(showTodosExpand(task))
            }
        })
              
    
         })

         /////// Expand Button////    
expand.click(function(){

    console.log("expand  button clicked")
    unique = $(this).attr("id")
    console.log(unique)
    
 getTodos(function (tasks){
 taskList.empty()
 for(task of tasks){
     taskList.append(showTodosExpand(task))
 }
})
})
 
})




 /////////Update Button//
var uniqueid
$(document).on('click', '.update', function() {
 
    console.log("qwertyuiosdfghjsdfghj")
     uniqueid = $(this).attr("id")
    console.log(uniqueid)
 
});

$(document).on('click', '#editDetails', async function () {
        console.log("update clicked")
     console.log(uniqueid)
    let update_duedate = $("#update_duedate").val()
     
    let update_priority = $("#update_priority").val()
    
    let update_statusComplete = $('#update_complete').is(":checked")

    let update_status = update_statusComplete ? "1-complete" : "2-incomplete"
    console.log(update_status)

    $.patch('/todos/'+ uniqueid,{ 
        update_duedate:update_duedate,
        update_priority:update_priority,
        update_status:update_status
    },function(data){
        console.log("ooooooooooooooooooooooooo")
        done(data)
    })
 
    
})

/////Get////
function getTodos(done){
    $.get('/todos',function(data){
        done(data)
    })
}

//////Get By Id///
function getTodos(done){
    $.get('/todos',function(data){
        done(data)
    })
}

////Post////
function addTodos(name,about,due,rank,done){
    console.log("post starts")
    console.log(name)
    console.log(about)
    console.log(due)
    $.post('/todos',
           { title:name,
        discription:about,
        duedate:due,
        priority:rank
    },function(data){
        done(data)
    })
}
////Get////
function showTodos(task){
    return $(`
    <div class="col-4 card mx-2 p-4 m-3">
     <h3 class="task-title">${task.title}</h3>
         </div>
    `)
}
//////Expand//////
function showTodosExpand(task){
    let str1=task.priority
    let str2=task.status
    let str='medium'
    let sta='incomplete'
    if(str1 == 1){str='high'}
    else if(str1 == 2){str='medium'}
    else if(str1 == 3){str='low'}
    if(str2==1){sta='complete'}
    
    return $(`
    <div class="col-4 card mx-2 p-4 m-3">
     <h3 class="task-title">${task.title}</h3>
     <div class="task-discription">${task.discription}</div>
     <div class="task-duedate">${task.duedate}</div>
     <div class="task-priority">${str}</div>
     <div class="task-duedate">${sta}</div>
             <input type='button' value='update' class='btn btn-danger update'  id='${task.id}' data-toggle='modal' data-target='#signup' style='margin-left:24px;'>
    </div>
    `)
}
///// Sorting/////
 function getSortTodos(sortval,done){
    console.log(sortval)
    $.get('/todos/sort/'+ sortval,function(data){
        done(data)
    })
    
 }