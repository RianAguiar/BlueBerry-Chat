import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import Gsc from '../components/Gsc'
import '../styles/index.css'


function Index() {
  const [username, setUsername] = useState('')
  const [nome, setNome] = useState('')
  const navigate = useNavigate()

  function handleKeyDown(e) {
      if (e.key === "Enter") {
          e.preventDefault()

          if (!message.trim()) {
              alert("Digite uma mensagem.")
              return
          }
          enviarDados()
      }
  }

  /*ENVIAR URL(NOME DA SALA)DIGITADO NO FORM */
  async function IrParaSala(e) {
    e.preventDefault()

    localStorage.setItem("username", username)
    const resposta = await fetch(
      `http://127.0.0.1:8000/api/sala/${nome}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
        }),
      }
    )

    if (resposta.ok) {
      navigate(`/sala/${nome}`)
    }
  }
  return (
    <>

      <h1 id='avocadochat' className='avocadochat'><img src="/BlueBerry.png" width='100px'/>BlueBerry Chat</h1>
      <p>Anonymous real-time chat. Create or join a room instantly — no account required</p>

      <div className='indexcontainerdad'>
        <div className='indexcontainer'>
          <div>

            <form onSubmit={IrParaSala} onKeyDown={handleKeyDown}>
              <input type="text" id='name' name='name' placeholder="Your Name" className="indexinput"onChange={(e) => setUsername(e.target.value)}/>
              <input type="text" id='roomname' name='roomname' placeholder="Room Name" className="indexinput"onChange={(e) => setNome(e.target.value)}/>
              < button className="indexenterbutton" type="submit" > Get In</button>
            </form>

          </div>
        </div>
      </div >

      <div>
        <Gsc className='indexeasteregg' />
      </div>
    </>
  )
}


export default Index