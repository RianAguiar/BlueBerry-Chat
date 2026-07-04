import { Link } from "react-router-dom";
import { useState } from 'react'
import '../styles/App.css'
import Input from '../components/Input'
import Button from '../components/Button'
import Gsc from '../components/Gsc'
import IndexForm from '../components/IndexForm'

function Index() {
  const eastereggemoji = '🧛‍♀️'


  /* ENVIAR DADO(NOME DA SALA) PARA A API */
  const enviarDado = async () => {
    try {
      const resposta = await fetch("http://127.0.0.1:8000/api/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome,
        })
      })
      if (!resposta.ok) {
        throw new Error("Erro ao enviar as mensagens")
      }
      const dados = await resposta.json()
      setMessage('')
      console.log(dados)
    }

    catch (erro) { console.error(erro) }
  }


  return (
    <>
      <Link to="/Chat">Chat</Link>

      <h1 id='avocadochat' className='avocadochat'>🥑Avocado Chat</h1>

      <div className='indexcontainerdad'>
        <div className='indexcontainer'>
          <IndexForm />
        </div>
      </div>

      <div>
        <Gsc className='indexeasteregg' />
      </div>
    </>
  )
}


export default Index