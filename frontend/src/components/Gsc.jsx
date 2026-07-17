import '../styles/Gsc.css'

function Gsc(props) {
    const eastereggemoji = '🧛‍♀️'
    const audio = new Audio('/sounds/GSC.mp3')
    const TocarAudio = () => {
        if (audio.paused){
        audio.volume = 0.05
        audio.play()}
        else{
            audio.pause()
            audio.currentTime = 0
        }
    }
    

    return (
        <>
            <button onClick={TocarAudio} className={props.className}>{eastereggemoji}</button>
        </>
    )
}

export default Gsc