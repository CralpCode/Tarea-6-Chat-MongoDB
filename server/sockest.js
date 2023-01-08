import Chat from "./models/Chat.js"

export default (io) => {
    io.on('connection', (socket) =>{

        console.log('Nuevo usuario ' + socket.id)
        const emitChat = async () => {
            const chats = await Chat.find();
            io.emit("server:cargarchat", chats); 
        };
        emitChat();

        socket.on('cliente:guardarchat', async (data) => {
            const nuevochat = new Chat(data);
            const guardarchat = await nuevochat.save(); 
        })

    })
}