class SocketController {
    public sendMessage(io:any, socket:any, data:any) {
        console.log(data);
        // ONE TO ONE
        // socket.emit('message:get-all', { messages: [{ text: data.message }] });

        // TO ALL AVOID SENDER
        socket.broadcast.emit('message:get-all', { messages: [{ text: data.message }] });

        // ALL ONLINE USERS
        // io.emit('message:get-all', { messages: [{ text: data.message }] });
    }
}

export const socketController = new SocketController();
