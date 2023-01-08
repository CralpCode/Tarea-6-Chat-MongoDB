import express from "express";
import morgan from "morgan";
import { Server as SocketServer} from "socket.io";
import {connectDB} from './db.js'
import http from "http"
import cors from "cors"
import { PORT } from "./config.js";
import sockest from "./sockest.js";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

connectDB();

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors:{
        origin: '*',
        methods: ["GET"]        
    }
})

app.use(cors())
app.use(morgan("dev"));

sockest(io);

app.use(express.static(join(__dirname,'../client/dist')))

server.listen(PORT)
console.log('server inicado en el puerto ' + PORT)
