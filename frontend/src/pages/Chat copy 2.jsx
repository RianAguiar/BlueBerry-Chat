import { Link } from "react-router-dom";
import { SlArrowRightCircle, SlArrowLeft } from "react-icons/sl";
import { useEffect, useState } from 'react'
import '../styles/Chat.css'

export function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);


    /* SOMENTE PARA TESTE, POSTERIORMENTE VOU PEGAR O USERNAME PELO INPUT DO INDEX */
    const username = 'Ryan'


    /* BUSCAR DADOS(MENSAGENS) NA API */
    async function BuscarMensagens() {
        try {
            const resposta = await fetch('http://127.0.0.1:8000/api/sala/projetochat/mensagens/')

            if (!resposta.ok) { throw new Error('erro ao buscar mensagens') }
            const dados = await resposta.json();
            setMessages(dados);
        }
        catch (erro) { console.log(erro); }
    }
    useEffect(() => { BuscarMensagens(); }, [])



    /* ENVIAR DADOS(MENSAGENS) PARA A API */
    const enviarDados = async () => {
    try {
      const resposta = await fetch("http://127.0.0.1:8000/api/sala/projetochat/mensagens/", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            username : username,
            conteudo : message,
            enviado_as : new Date().toLocaleString()
        })
      })
      if (!resposta.ok) {
        throw new Error("Erro ao enviar as mensagens")}
        const dados = await resposta.json()
        setMessage('')
        console.log(dados)
    }

    catch (erro) {console.error(erro)}
}

    return (
        <>
            <div className="exit">
                <Link to="/"><SlArrowLeft /></Link>
            </div>

            <div className="chat-container">
                <div className="chat-box">
                    <div className="messages">
                        {messages.map((mensagem) => (
                            <div key={mensagem.id} className="message">
                                <strong>{mensagem.username}</strong><br />
                                {mensagem.conteudo}<br />
                                <small>{mensagem.enviado_as}</small>
                            </div>
                        ))}
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Digite uma mensagem..."
                        />
                        <SlArrowRightCircle onClick={enviarDados} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat