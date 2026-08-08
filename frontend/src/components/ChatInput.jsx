import { useEffect, useRef } from 'react'
import { CiImageOn } from "react-icons/ci"
import { LuSendHorizontal } from "react-icons/lu"

export function ChatInput({ value, onChange, onKeyDown, onSend, onAppend }) {
    const fileInputRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        const handleViewportResize = () => {
            if (document.activeElement === inputRef.current) {
                setTimeout(() => {
                    inputRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    })
                }, 100)
            }
        }

        if (window.visualViewport) {
            window.visualViewport.addEventListener(
                "resize",
                handleViewportResize
            )
        }

        return () => {
            if (window.visualViewport) {
                window.visualViewport.removeEventListener(
                    "resize",
                    handleViewportResize
                )
            }
        }
    }, [])

    const handleFocus = () => {
        setTimeout(() => {
            inputRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
        }, 300)
    }

    return (
        <div className="input-container">

            <input
                ref={inputRef}
                type="text"
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={handleFocus}
                placeholder="Type a message..."
                autoComplete="off"
            />

            <button
                className="imageButton"
                title="Send a image"
                onClick={() => fileInputRef.current.click()}
                style={{ cursor: "pointer" }}
            >
                <CiImageOn style={{ color: "gray" }} />

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={onAppend}
                    style={{ display: "none" }}
                />
            </button>

            <button
                className="sendButton"
                onClick={onSend}
                title="Send"
                style={{ cursor: "pointer" }}
            >
                <LuSendHorizontal
                    style={{
                        width: "20px",
                        color: "white"
                    }}
                />
            </button>

        </div>
    )
}

export default ChatInput

