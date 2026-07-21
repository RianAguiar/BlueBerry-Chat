export function TypingIndicator({ typing }) {
    if (!typing) return null
    return (
        <div className="message-typing">
            <small>{typing.username} is typing</small>
        </div>
    )
}

export default TypingIndicator