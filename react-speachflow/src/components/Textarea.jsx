// import { useState } from "react";

export default function Textarea({TextSpeach, setTextSpeach}) {
    

    return (
        <div id='mainDiv'>
            <textarea id='textareaSpeach' 
            value={TextSpeach} 
            onChange={(e) => setTextSpeach(e.target.value)} />
        </div>
    )
}
