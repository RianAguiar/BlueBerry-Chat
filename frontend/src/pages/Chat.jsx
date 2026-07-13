import { Link, useParams, useNavigate } from "react-router-dom"
import { SlArrowRightCircle, SlArrowLeft } from "react-icons/sl"
import { IoTrashOutline } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useRef } from 'react'
import '../styles/Chat.css'
import Input from "../components/Input"

export function Chat() {
    const { nome } = useParams()
    const [inputc, setInputc] = useState('')
    const [messages, setMessages] = useState([])
    const socketRef = useRef(null)
    const navigate = useNavigate()

    // Função para poder enviar mensagem usando o "enter"
    function handleKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault()

            if (!inputc.trim()) {
                alert("Digite uma mensagem.")
                return
            }

            sendMessage()
        }
    }


    //BUSCANDO O USERNAME NO LOCALSTORAGE(FOI PEGO NO COMPONENTE INDEXFORM) 
    const username = localStorage.getItem('username')


    //Fazer conexão com o websocket
    useEffect(() => {
        socketRef.current = new WebSocket(
            `ws://localhost:8000/ws/sala/${nome}/mensagens/`
        )

        socketRef.current.onopen = () => {
            console.log("Conectado!")
        }

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("Dado recebido:", data)
            if (data.tipo === "historico") {
                setMessages(data.mensagens)
            } 
            else if (data.type === "delete") {
                setMessages(prev =>
                    prev.filter(msg => msg.id !== data.id)
                )
            }
            else {
                setMessages((prev) => [...prev, data])
            }
        }

        socketRef.current.onclose = () => {
            console.log("Conexão encerrada")
        }

        return () => {
            socketRef.current?.close()
        }
    }, [nome])


    //Enviar mensagem
    const sendMessage = () => {
        if (socketRef.current && inputc.trim() !== '') {
            socketRef.current.send(JSON.stringify({
                username: username,
                conteudo: inputc,
                enviado_as: new Date().toLocaleString()
            }))
            setInputc('')
        }
    }


    /* EXCLUIR Sala */
    const excluirSala = async (nome) => {
        try {
            const resposta = await fetch(`http://127.0.0.1:8000/api/sala/${nome}/`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })

            if (resposta.ok) {
                navigate(`/`)
            }

            else {
                throw new Error("Erro ao excluir sala")
            }
        }

        catch (erro) { console.error(erro) }
    }


    //excluir mensagem
    const excluirMensagem = (id) => {
        socketRef.current.send(JSON.stringify({
            type: "delete",
            id: id,
        }))
        }

    return (
        <>
            <div className="topfunctions">
                <div className="exit">
                    <Link to="/"><SlArrowLeft title="Sair da sala" /></Link>
                </div>

                <div className="deletarsala">
                    <IoTrashOutline title="Excluir sala" onClick={() => excluirSala(nome)} />
                </div>
            </div>

            <div className="chat-container">
                <div className="chat-box">
                    <div className="messages">
                        <AnimatePresence>
                            {messages.map((mensagem) => (
                                <motion.div
                                    key={mensagem.id}
                                    layout
                                    className="message"
                                    initial={{ opacity: 0, y: 0 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{
                                        opacity: 0,
                                        scale: 1,
                                        height: 0,
                                        marginBottom: 0,
                                        transition: {
                                            duration: 0.1,
                                        },
                                    }}
                                >
                                    <div className="top">
                                        <strong>{mensagem.username}</strong>
                                        <IoTrashOutline title="Excluir mensagem"
                                            onClick={() => excluirMensagem(mensagem.id)}
                                        />
                                    </div>

                                    {mensagem.conteudo}
                                    <br />

                                    <small>{mensagem.enviado_as}</small>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="input-container">
                        <input
                            type="text"
                            value={inputc}
                            onChange={(e) => setInputc(e.target.value)}
                            placeholder="Digite uma mensagem..."
                            onKeyDown={handleKeyDown}
                        />
                        <SlArrowRightCircle onClick={sendMessage} title="Enviar mensagem" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat