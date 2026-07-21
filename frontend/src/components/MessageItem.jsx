import { motion } from "framer-motion"
import { LuReply } from "react-icons/lu"
import { IoTrashOutline } from "react-icons/io5"

export function MessageItem({ mensagem, onReply, onDelete }) {
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
                <strong>{mensagem.username}</strong>
                <LuReply className="reply" title="Reply message" onClick={() => onReply(mensagem)} />
                <IoTrashOutline className="trash" title="Delete message" onClick={() => onDelete(mensagem.id)} />
            </div>

            <p>{mensagem.conteudo}</p>
            <small>{mensagem.enviado_as}</small>
        </motion.div>
    )
}

export default MessageItem