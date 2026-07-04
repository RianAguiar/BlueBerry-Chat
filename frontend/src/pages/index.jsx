import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react'
import '../styles/App.css'
import Input from '../components/Input'
import Button from '../components/Button'
import Gsc from '../components/Gsc'
import IndexForm from '../components/IndexForm'


function Index() {
  const [username, setUsername] = useState('')
  const [nome, setNome] = useState('')
  const navigate = useNavigate();

  function IrParaSala(e) {
    localStorage.setItem('username', username)
    const username = localStorage.getItem('username')
    e.preventDefault()
    navigate(`/sala/${nome}`)
    console.log('user', { username }, 'sended to', { nome })

  }

  return (
    <>
      <Link to="/sala/teste">Chat</Link>

      <h1 id='avocadochat' className='avocadochat'>🥑Avocado Chat</h1>

      <div className='indexcontainerdad'>
        <div className='indexcontainer'>
          <div>

            <form onSubmit={IrParaSala}>

              <input type="text" id='name' name='name' placeholder="Your Name" className="indexinput"
                onChange={(e) => setUsername(e.target.value)} />

              <input type="text" id='roomname' name='roomname' placeholder="Room Name" className="indexinput"
                onChange={(e) => setNome(e.target.value)} />

              <button className="indexenterbutton" type="submit">Get In</button>
            </form>

          </div>
        </div>
      </div>

      <div>
        <Gsc className='indexeasteregg' />
      </div>
    </>
  )
}


export default Index