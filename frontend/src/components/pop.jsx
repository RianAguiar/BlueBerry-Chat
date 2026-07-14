function pop() {
        const TocarAudio = () => {
        const audio = new Audio('/sounds/pop.mp3')
        audio.volume = 0.30
        audio.play()
    }
    TocarAudio()
}

export default pop