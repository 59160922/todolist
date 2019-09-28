const express = require('express');
const app = express()
app.use(express.json())

var list = []
class todolist{
    constructor(msg,completed){
        this.completed = completed
        this.msg = msg
    }
}
mock()
function mock(){
    addtodo("hello")
    addtodo("hi")
    list[0].completed=true
   

}
function todoUncompelete(){
    let todoActive=[];
    // for(let i=0;i<list.length;i++){
    //     if(list[i].completed === false){
    //         todoActive.push(list[i])
    //     }
    // }
    
    let result = list.filter(todo =>todo.completed === false)
    return result
}
function todoCompelete(){
    let todoCompeleted=[];
    // for(let i=0;i<list.length;i++){
    //     if(list[i].completed === true){
    //         todoCompeleted.push(list[i])
    //     }
    // }

    let result = list.filter(todo =>todo.completed === true)
    return result 
}
function addtodo(msg){
    let t = new todolist(msg,false)
    t.id = generateId(list.length)
 
    list.push(t)
}
function generateId(num){
    return num+=1
}
app.get('/todolist',(req,res)=>{
    res.status(200).send(list)
})
app.get('/todolistActive',(req,res)=>{
    let listActive = todoUncompelete()
    res.status(200).send(listActive)
})
app.get('/todolistCompeleted',(req,res)=>{
    let listCompeleted = todoCompelete()
    res.status(200).send(listCompeleted)
})
app.put('/updateStatus/:id',(req,res)=>{
   if(list[req.params.id-1].completed === true){
    list[req.params.id-1].completed = false
   }else if(list[req.params.id-1].completed === false){
    list[req.params.id-1].completed = true
   } 
   res.sendStatus(201)
})
app.post('/todolist',(req,res)=>{

    addtodo(req.body.msg)
 
    res.sendStatus(201)

})


app.delete('/todolist/:id',(req,res)=>{
    let id =req.params.id  
    let result = list.filter(todo => todo.id.toString() !== id)
    list = result
    res.sendStatus(204)
})

app.delete('/clearCompeleted',(req,res)=>{
    // let todoCompeleted = todoCompelete()
    // console.log(todoCompeleted)
    // console.log(todoCompeleted[0])
    // for(let i=0;i<todoCompeleted.length;i++){
    //     delete list[todoCompeleted[i].id-1]
    // }
    let result = list.filter(todo => todo.completed === false)
    list = result

    res.sendStatus(204)
})




module.exports = app