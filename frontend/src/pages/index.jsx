import { Link, useNavigate } from "react-router-dom"
import { useState } from 'react'
import Gsc from '../components/Gsc'
import '../styles/index.css'
import { CiUser } from "react-icons/ci"
import { MdOutlineMeetingRoom } from "react-icons/md"
const apiUrl = import.meta.env.VITE_API_URL



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
      `${apiUrl}/api/sala/${nome}/`,
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

      <h1 id='avocadochat' className='avocadochat'><img src="/BlueBerry.png" width='100px' />BlueBerry Chat</h1>
      <p className="index-p">Real-time chat. Create or join a room instantly — no account required</p>

      <div className='indexcontainerdad'>
        <div className='indexcontainer'>
          <div>

            <form onSubmit={IrParaSala} onKeyDown={handleKeyDown}>
              <div className="index-input-container">
                <CiUser className="index-input-icon" />

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className="indexinput"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="index-input-container">
                <MdOutlineMeetingRoom className="index-input-icon" />

                <input
                  type="text"
                  id="roomname"
                  name="roomname"
                  placeholder="Room Name"
                  className="indexinput"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              < button className="indexenterbutton" type="submit" > Get In</button>
            </form>

          </div>
        </div>
      </div >

      <div>
        <Gsc className='indexeasteregg' />
      </div>

      <footer className="index-footer">
        <div className="footer-content">

          <span className="footer-description">
            Privacity • Simple • Real-time
          </span>

          <div className="footer-links">
            <span>© 2026 BlueBerry Chat</span>

            <span>•</span>
            <a
              href="https://github.com/RianAguiar"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <span>•</span>

            <Link to="/about">about</Link>

            <span>•</span>

            <span>
              GSC & RAS
            </span>
          </div>

        </div>
      </footer>
    </>
  )
}


export default Index