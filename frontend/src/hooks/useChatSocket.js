import { useEffect, useRef, useState } from "react"

export function useChatSocket(nome, username) {
    const [messages, setMessages] = useState([])
    const [typing, setTyping] = useState(null)
    const [join, setJoin] = useState(null)

    const socketRef = useRef(null)
    const typingTimeout = useRef(null)
    const joinTimeout = useRef(null)

    useEffect(() => {
        socketRef.current = new WebSocket(
            `ws://localhost:8000/ws/sala/${nome}/mensagens/`
        )

        socketRef.current.onopen = () => {
            console.log("Conectado!")
            socketRef.current.send(JSON.stringify({
                type: "join",
                username: username
            }))
        }

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data)
            console.log("Dado recebido:", data)

            if (data.tipo === "historico") {
                setMessages(data.mensagens)
                return
            }

            if (data.type === "typing") {
                if (data.username !== username) {
                    setTyping(data)
                    clearTimeout(typingTimeout.current)
                    typingTimeout.current = setTimeout(() => setTyping(null), 2000)
                }
                return
            }

            if (data.type === "join") {
                setJoin(data)
                clearTimeout(joinTimeout.current)
                joinTimeout.current = setTimeout(() => setJoin(null), 3000)
                return
            }

            if (data.type === "delete") {
                setMessages(prev => prev.filter(msg => msg.id !== data.id))
                return
            }

            setMessages(prev => [...prev, data])
        }

        socketRef.current.onclose = () => {
            console.log("Conexão encerrada")
        }

        return () => {
            socketRef.current?.close()
        }
    }, [nome, username])

    const sendMessage = (inputc, reply) => {
        if (socketRef.current && inputc.trim() !== '') {
            socketRef.current.send(JSON.stringify({
                username: username,
                conteudo: inputc,
                enviado_as: new Date().toLocaleString(),
                resposta: reply?.id ?? null,
            }))
        }
    }

    const deleteMessage = (id) => {
        socketRef.current.send(JSON.stringify({
            type: "delete",
            id: id,
        }))
    }

    const notifyTyping = () => {
        socketRef.current.send(JSON.stringify({
            type: "typing",
            username: username,
        }))
    }

    return { messages, typing, join, sendMessage, deleteMessage, notifyTyping }
}