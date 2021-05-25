const app=require('express')()
const http = require('http').createServer(app)

const {getUser,getUsersInRoom,addUser,removeUser}=require('./users')

const io = require('socket.io')(http,
    {
    cors:{
        origin:'*'
    }}
    )

const router=require('./router')   
app.use(router)

io.on('connection',(socket)=>{
    socket.on('join',({name,room},callback)=>{
        const {error,user}= addUser ({id:socket.id,name,room})
        if(error) return callback(error)
        socket.join(user.room)
        
        socket.emit('message',{user:'admin',text:`${user.name},welcome to the room ${user.room}`})
        socket.broadcast.to(user.room).emit('message',{user:'admin',text:`${user.name} has joined`})
        
        io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)})
        callback()
    })

    socket.on('sendMessage',function(message,callback){
        const user=getUser(socket.id)
        io.to(user.room).emit('message',{user:user.name,text:message})
        callback()
    })

    // socket.on('chat message',function(payload){
    //     io.emit("chat message", payload)
    //     console.log("message received on server:",payload) 
    // })

    socket.on('disconnect',function(){
        const user =removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message',{user:'admin',text:`${user.name}has left`})
            io.to(user.room).emit('roomData',{room:user.room, users:getUsersInRoom(user.room)})
        }
       
    })

    // ws.on('close',function(closeCode){
    //     console.log("client disconnected");
    // })

})



http.listen(7000,()=>{
    console.log('listening on *:7000');
})