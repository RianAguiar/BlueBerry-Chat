import '../styles/Gsc.css'

function Gsc(props) {
    const eastereggemoji = '🧛‍♀️'

    function Som(){

    }
    
    return(
        <div>
            <button onClick={Som}
            className={props.className}>
                {eastereggemoji}
            </button>
        </div>
    ) 
}

export default Gsc