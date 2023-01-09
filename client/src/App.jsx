import './App.css'
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from 'react';
import {Mensajes} from './components/Mensajes'
const socket = io();

  
  function App() {
    
  const myRef = useRef();
  const [mensaje, inMensaje] = useState({});
  const [cargarMsj,recargarMsj] = useState([]);

  useEffect(() => {
    socket.on("server:cargarchat", (chats) => {
      inMensaje(chats)
      recargarMsj(chats)
    })
      console.log(mensaje)  
  },[mensaje]);  
  
  function Envio(e) {
    e.preventDefault();
    recargarMsj([...cargarMsj, mensaje])
    socket.emit('cliente:guardarchat', mensaje);
    myRef.current.remove()
  }

  return (
    <div className="h-screen bg-slate-800 text-white" >
      {cargarMsj.map((cargarMsj,i) => {
        return <Mensajes key={i} msj = {cargarMsj}/>
      })}
      <form onSubmit={Envio} className="h-20 w-screen flex flex-col justify-center items-center">
        <input type={'text'} ref={myRef} onChange={(e) => {inMensaje({...mensaje, usuario : e.target.value})}} className="w-40" />
        <input type={'text'} onChange={(e) => {inMensaje({...mensaje, mensaje : e.target.value})}} className="w-40"/>
        <button className="w-40">Enviar</button>
      </form>
    </div>
  )
}

export default App
