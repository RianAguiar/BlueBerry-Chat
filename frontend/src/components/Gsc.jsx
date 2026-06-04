import '../styles/Gsc.css'

function Gsc(props) {
    const eastereggemoji = '🧛‍♀️'

    const tocarAudio = () => {
        const audio = new Audio('/sounds/GSC.mp3')
        audio.play()
    }

    return (
        <div>
            <button onClick={tocarAudio} className={props.className}>{eastereggemoji}</button>
        </div>
    )
}

export default Gsc;