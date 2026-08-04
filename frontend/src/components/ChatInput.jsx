import { useRef } from 'react'
import { CiImageOn } from "react-icons/ci"
import { LuSendHorizontal } from "react-icons/lu"

export function ChatInput({ value, onChange, onKeyDown, onSend, onAppend }) {
    const fileInputRef = useRef(null)
    return (
        <div className="input-container">
            <button className='imageButton' title="Send a image" onClick={() => fileInputRef.current.click()} style={{ cursor: "pointer" }}><CiImageOn style={{ color: "gray"}}/></button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={onAppend} style={{ display: "none" }}/>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder="Type a message :)"
                onKeyDown={onKeyDown}
            />

            <button className='sendButton' onClick={onSend} title="Send" style={{ cursor: "pointer"}}><LuSendHorizontal style={{ width: "20px", color: "white"}} /></button>
        </div>
    )
}

export default ChatInput