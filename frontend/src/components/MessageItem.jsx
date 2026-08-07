import { motion } from "framer-motion"
import { LuReply } from "react-icons/lu"
import { IoTrashOutline } from "react-icons/io5"

export function MessageItem({ mensagem, onReply, onDelete, }) {
    const BACKEND_URL = "https://blueberry-chat-back.onrender.com"

    return (
        <motion.div
            layout
            className="message"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{
                opacity: 0,
                scale: 1,
                height: 0,
                marginBottom: 0,
                transition: { duration: 0.1 },
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
                <strong className="name">{mensagem.username}</strong>
                <LuReply className="reply" title="Reply message" onClick={() => onReply(mensagem)} />
                <IoTrashOutline className="trash" title="Delete message" onClick={() => onDelete(mensagem.id)} />
            </div>

            {mensagem.image && (
                <div className="image-message">
                    <img style={{maxWidth: "100%", height: "auto", borderRadius: "10px"}} src={`${BACKEND_URL}${mensagem.image.url}`} alt="" />
                </div>
            )}

            <p>{mensagem.conteudo}</p>
            <small className="enviado-as">{mensagem.enviado_as}</small>
        </motion.div>
    )
}

export default MessageItem
