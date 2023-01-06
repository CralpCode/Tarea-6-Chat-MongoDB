import express from "express";
import morgan from "morgan";
import { Server as SocketServer} from "socket.io";
import http from "http"
import cors from "cors"
import { PORT } from "./config.js";

const app = express();
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors:{
        origin: '*',
        methods: ["GET", "POST"]        
    }
})

app.use(cors())
app.use(morgan("dev"));

io.on('connection', (socket) => {
    console.log('Nuevo usuario' + socket.id)
})

server.listen(PORT)
console.log('server inicado en el puerto ' + PORT)
