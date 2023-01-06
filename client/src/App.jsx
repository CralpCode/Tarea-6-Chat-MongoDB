import './App.css'
import { io } from "socket.io-client";
const socket = io('https://cralpcode-zany-garbanzo-q66vrwxjwv63x54-5180.preview.app.github.dev');

function App() {

  return (
    <div className="App">
      <h1>Hola mundooooooo</h1>
    </div>
  )
}

export default App
