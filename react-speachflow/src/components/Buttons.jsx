export default function Buttons({ onButtonSpeach }) {



    return (
        <div id="buttons">
            <button id="start" onClick={onButtonSpeach}>Start</button>
            {/* <button id="micro" onClick={onButtonSpeach}>▢</button> */}
        </div>
    )
}