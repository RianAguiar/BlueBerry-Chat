import { Link, useParams } from "react-router-dom";
import { SlArrowRightCircle, SlArrowLeft } from "react-icons/sl";
import { IoTrashOutline } from "react-icons/io5";

import { useEffect, useState } from 'react'
import '../styles/Chat.css'

export function Chat() {
    const { nome } = useParams();
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([]);

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

    /* BUSCANDO O USERNAME NO LOCALSTORAGE(FOI PEGO NO COMPONENTE INDEXFORM) */
    const username = localStorage.getItem('username')

    /* BUSCAR DADOS(MENSAGENS) NA API */
    async function BuscarMensagens() {
        try {
            const resposta = await fetch(`http://127.0.0.1:8000/api/sala/${nome}/mensagens/`)

            if (!resposta.ok) { throw new Error('erro ao buscar mensagens') }
            const dados = await resposta.json();
            setMessages(dados);
        }
        catch (erro) { console.log(erro); }
    }
    useEffect(() => { BuscarMensagens(); }, [])



    /* ENVIAR DADOS(MENSAGENS) PARA A API */
    const enviarDados = async () => {
        if (!message.trim()) return;

        try {
            const resposta = await fetch(`http://127.0.0.1:8000/api/sala/${nome}/mensagens/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    conteudo: message,
                    enviado_as: new Date().toLocaleString()
                })
            })
            if (!resposta.ok) {
                throw new Error("Erro ao enviar as mensagens")
            }
            const dados = await resposta.json()
            setMessage('')
            // chama a função buscardados novamente para atualizar a pagina
            BuscarMensagens();
        }

        catch (erro) { console.error(erro) }
    }

    const excluirMensagem = async (id) => {
        try {
            const resposta = await fetch(`http://127.0.0.1:8000/api/sala/${nome}/mensagens/${id}/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            if (!resposta.ok) {
                throw new Error("Erro ao excluir mensagem")
            }
            // chama a função buscardados novamente para atualizar a pagina
            BuscarMensagens();
        }

        catch (erro) { console.error(erro) }
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
                                <div className="top">
                                    <strong>{mensagem.username}</strong>
                                    <IoTrashOutline onClick={() => excluirMensagem(mensagem.id)} /><br/>
                                </div>
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
                            onKeyDown={handleKeyDown}
                        />
                        <SlArrowRightCircle onClick={enviarDados} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat