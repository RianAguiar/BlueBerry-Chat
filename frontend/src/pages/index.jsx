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

  function handleKeyDown(e) {
      if (e.key === "Enter") {
          e.preventDefault();

          if (!message.trim()) {
              alert("Digite uma mensagem.");
              return;
          }

          enviarDados();
      }
  }

  /*ENVIAR URL(NOME DA SALA)DIGITADO NO FORM */
  async function IrParaSala(e) {
    e.preventDefault();

    localStorage.setItem("username", username);
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
    );

    if (resposta.ok) {
      navigate(`/sala/${nome}`);
    }
  }
  return (
    <>

      <h1 id='avocadochat' className='avocadochat'>🥑Avocado Chat</h1>

      <div className='indexcontainerdad'>
        <div className='indexcontainer'>
          <div>

            <form onSubmit={IrParaSala} onKeyDown={handleKeyDown}>

              <input type="text" id='name' name='name' placeholder="Your Name" className="indexinput"
                onChange={(e) => setUsername(e.target.value)}
               
              />

              <input type="text" id='roomname' name='roomname' placeholder="Room Name" className="indexinput"
                onChange={(e) => setNome(e.target.value)}
                
              />

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