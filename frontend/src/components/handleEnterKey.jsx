export default function HandleEnterKey(e, value, callback) {
    
        if (e.key !== "Enter") return
        
        e.preventDefault()

        if (!value.trim()) {
            alert("Digite uma mensagem.")
            return
        }

        callback()

    }