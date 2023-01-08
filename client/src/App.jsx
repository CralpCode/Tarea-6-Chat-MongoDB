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
  });  
  
  function Envio(e) {
    e.preventDefault();
    recargarMsj([...cargarMsj, mensaje])
    socket.emit('cliente:guardarchat', mensaje);
    myRef.current.remove()
  }

  return (
    <div className="App">
      <form onSubmit={Envio}>
        <input type={'text'} ref={myRef} onChange={(e) => {inMensaje({...mensaje, usuario : e.target.value})}} />
        <input type={'text'} onChange={(e) => {inMensaje({...mensaje, mensaje : e.target.value})}}/>
        <button>Enviar</button>
      </form>
      {cargarMsj.map((cargarMsj,i) => {
        return <Mensajes key={i} msj = {cargarMsj}/>
      })}
    </div>
  )
}

export default App
