import { SlArrowRightCircle } from "react-icons/sl"

export function ChatInput({ value, onChange, onKeyDown, onSend }) {
    return (
        <div className="input-container">
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Type a message :)"
                onKeyDown={onKeyDown}
            />
            <SlArrowRightCircle onClick={onSend} title="Send message" />
        </div>
    )
}

export default ChatInput