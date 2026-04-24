export default function Buttons({ onButtonSpeach, handleOpen }) {



    return (
        <div id="buttons">
            <button id="start" onClick={onButtonSpeach}>Start</button>

            <button id="timerButton" className="btn-set-timer" onClick={handleOpen}>Set the timer</button>
        </div>
        
    )
}