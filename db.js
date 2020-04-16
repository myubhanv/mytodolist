const Sequelize=require('sequelize')
const db=new Sequelize({

    dialect: 'sqlite',
    storage: __dirname + '/test.db'
})
const todoList=db.define('todolist', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title :{
        type:Sequelize.STRING(40),
        allowNull : false
    },
    discription :{
        type:Sequelize.STRING(100),
        allowNull : true,
        defaultValue : ' '
    },
    duedate :{
        type:Sequelize.DATE,
        allowNull : false
    },
    status:{
        type:Sequelize.BOOLEAN,
        allowNull : true,
        defaultValue: false
    },
    priority :{
        type:Sequelize.STRING(40),
        allowNull : true,
        defaultValue : 'medium'
    }

})

module.exports={
    db,todoList
}