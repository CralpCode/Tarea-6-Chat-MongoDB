import './App.css'
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from 'react';
import {Mensajes} from './components/Mensajes'
import {default as chatMongo} from './assets/chatMongo.png'
const socket = io();

  
  function App() {
    
  const refIn = useRef();
  const refLab = useRef();
  const refChat = useRef();
  const refImg = useRef();
  const refEnv = useRef();
  const refBtn = useRef();
  const refTxt = useRef();
  const refMens = useRef();
  const [mensaje, inMensaje] = useState({});
  const [usuario,nuevUsuario] =useState('');
  const [cargarMsj,recargarMsj] = useState([]);
  const [valor, inValor]= useState(false);

  useEffect(() => {
    try {
        socket.on("server:cargarchat", (chats) => {
        recargarMsj(chats)
        console.log('cargando chats')
      })
    } catch (error) {
        console.log(error)
    }
    refChat.current.scrollTop = refChat.current.scrollHeight;
  },[mensaje]);  

  useEffect(() => {
    refChat.current.style.display ='none' 
  },[]);
   
  useEffect(() => {
    refChat.current.scrollTop = refChat.current.scrollHeight;
  });
  
  function Envio(e) {
    e.preventDefault();     
    console.log(mensaje)
    if (mensaje.usuario === '' || mensaje.mensaje === '' || Object.entries(mensaje).length < 2 || valor === false) {
      recargarMsj(cargarMsj)
      return alert('No deje espacios vacios')
    }
    else{      
      inMensaje({...mensaje,usuario})
      inValor(true)
      recargarMsj([...cargarMsj, { usuario: usuario, mensaje: mensaje.mensaje}])
      console.log(mensaje)
      socket.emit('cliente:guardarchat', { usuario: usuario, mensaje: mensaje.mensaje});
      cambiarEstilo()
      inMensaje({...mensaje,mensaje:''})
    }
    
  }

  function cambiarEstilo() {
    refIn.current.remove()
    refLab.current.remove()
    refMens.current.remove()
    refImg.current.style.display = 'none';
    refChat.current.style.display = 'flex';
    refEnv.current.style.flexDirection = 'row';
    refEnv.current.style.alingItems= 'flex-end'
    refEnv.current.style.justifyContent= 'space-between'
    refEnv.current.style.width = '92%';
    refEnv.current.style.height = '40px';
    refTxt.current.style.width = '85%';
    refTxt.current.value = '';
    refBtn.current.style.margin = '0px';
    refBtn.current.style.width = '10%';
  }

  return (
    <div className="h-screen bg-slate-800 text-white flex flex-col justify-center items-center" >
      <input type={'image'} src={chatMongo} ref={refImg} className='rounded-lg w-80'/>
      <div className='flex flex-col w-11/12 h-4/5 overflow-auto ' ref={refChat} >
            { 
             cargarMsj.map((cargarMsj,i) => {
              if (valor) {
                return(<Mensajes key={i} msj = {cargarMsj}/> )
              }
              })
            }
      </div> 
      <form onSubmit={Envio} className="h-32  w-44 flex flex-col justify-center items-center mt-2" ref={refEnv}>
        <label ref={refLab} className='self-start'>Usuario</label>
        <input type={'text'} ref={refIn} onChange={(e) => {
          nuevUsuario( e.target.value)
          inMensaje({...mensaje, usuario})
        }} className="text-black rounded-lg"  />
        <label className='self-start' ref={refMens}>Mensaje</label>
        <input type={'text'} onChange={(e) => {
          inMensaje({
          ...mensaje,
           mensaje : e.target.value
        })
          inValor(true)
      }} className="text-black rounded-lg" ref={refTxt}/>
        <button className="mt-2 w-44  bg-slate-600 rounded-lg" ref={refBtn}>Enviar</button>
      </form>
    </div>
  )
}

export default App
