import { Link, useParams, useNavigate } from "react-router-dom"
import { SlArrowRightCircle, SlArrowLeft } from "react-icons/sl"
import { LuReply } from "react-icons/lu"
import { IoTrashOutline, IoArrowBack } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, useRef } from 'react'
import { handleEnterKey } from "../components/handleEnterKey"
import { debounce } from "../components/debounce"
import pop from "../components/pop"
import '../styles/Chat.css'

export function Chat() {
    const { nome } = useParams()
    const [inputc, setInputc] = useState('')
    const [messages, setMessages] = useState([])
    const [reply, setReply] = useState(null)
    const [typing, setTyping] = useState()
    const socketRef = useRef(null)
    const navigate = useNavigate()

    // Função para poder enviar mensagem usando o "enter"
    function handleKeyDown(e) {
        handleEnterKey(e, inputc, sendMessage)
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
                enviado_as: new Date().toLocaleString(),
                resposta: reply?.id ?? null,
            }))
            pop()
            setInputc('')
            setReply(null)

        }
    }

    const handleReply = (message) => { setReply(message) }


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

    const messageTyping = () => {
            socketRef.current.send(JSON.stringify({
                type: "typing",
                username: username,
            }))
        }

    // está fazendo debounce de 2 segundos em messagetyping para n flodar o servidor
    const messageTypingDebounce = debounce(messageTyping, 505)

    return (
        <>

            <div className="topfunctions">
                <div className="exit">
                    <Link to="/"><SlArrowLeft title="Exit chat room" /></Link>
                </div>

                <div className="chat-n-username">
                    <h4 title="Chat room ">{nome}</h4>
                    <h5 title="Your username">{username}</h5>
                </div>

                <div className="deletarsala">
                    <IoTrashOutline title="Delete chat room" onClick={() => excluirSala(nome)} />
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

                                    {mensagem.resposta && (
                                        <div className="reply-message">
                                            <small>Replying: {mensagem.resposta.username} : </small>
                                            <small>
                                                {mensagem.resposta.conteudo.slice(0, 30)}
                                                {mensagem.resposta.conteudo.length > 30 && "..."}
                                            </small>
                                            
                                        </div>
                                    )}
                                    <div className="top">
                                        
                                        <strong>{mensagem.username}</strong>
                                        <LuReply className="reply" title="Reply message" onClick={() => handleReply(mensagem)} />
                                        <IoTrashOutline className="trash" title="Delete message"
                                            onClick={() => excluirMensagem(mensagem.id)}
                                        />
                                    </div>
                                    <p>{mensagem.conteudo}</p>

                                    <small>{mensagem.enviado_as}</small>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {reply && (
                        <div className="reply-preview">
                            <small>Respondendo a {reply.username}</small>
                            <p>{reply.conteudo}</p>
                            <IoArrowBack onClick={() => setReply(null)} />
                        </div>
                    )}

                    {typing && (
                        <div className="message-typing">
                            <small>{typing.username} is typing</small>
                        </div>
                    )}

                    <div className="input-container">
                        <input
                            type="text"
                            value={inputc}
                            onChange={(e) => setInputc(e.target.value)}
                            placeholder="Type a message :)"
                            onKeyDown={handleKeyDown}
                            onChange={messageTyping}
                        />

                        <SlArrowRightCircle onClick={sendMessage} title="Send message" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat