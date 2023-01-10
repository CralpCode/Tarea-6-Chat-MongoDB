import Chat from "./models/Chat.js"

export default (io) => {
    
    try {
    
        io.on('connection', (socket) =>{

            console.log('Nuevo usuario ' + socket.id)
            const emitChat = async () => {
                const chats = await Chat.find();
                io.emit("server:cargarchat", chats); 
                console.log('emitiendo usuario')
            };
            emitChat();
    
            socket.on('cliente:guardarchat', async (data) => {
                const nuevochat = new Chat(data);
                const guardarchat = await nuevochat.save(); 
                console.log('guardando usuario' + guardarchat)
                emitChat()
            })
    
        })

    } catch (error) {
        console.log('error de sockect')
    }
}