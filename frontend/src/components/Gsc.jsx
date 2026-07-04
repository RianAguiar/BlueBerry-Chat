import '../styles/Gsc.css'

function Gsc(props) {
    const eastereggemoji = '🧛‍♀️'
    const TocarAudio = () => {
        const audio = new Audio('/sounds/GSC.mp3')
        audio.volume = 0.05
        audio.play()
    }

    return (
        <>
            <button onClick={TocarAudio} className={props.className}>{eastereggemoji}</button>
        </>
    )
}

export default Gsc;