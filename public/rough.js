/*<div class="task-discription">${task.discription}</div>
        <div class="task-duedate">${task.duedate}</div>
        <div class="task-priority">${task.priority}</div>

 sort
        const resp = await fetch('/todos/' + sortval, { method: 'GET' })
    const todos = await resp.json()
    done(todos)


    update
    const resp = await fetch('/todos/' + uniqueid, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
    
        body: JSON.stringify({ update_duedate, update_priority, update_status })
    })

*/