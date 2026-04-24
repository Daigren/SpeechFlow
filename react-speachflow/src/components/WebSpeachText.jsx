export default function WebSpeachText({ sentences, spoken, normalize }) {
    
    return (
        <div className="comparison-container">
            {sentences.map((sentence, index) => {
                const currentSpoken = spoken[index];
                
                const isMatch = normalize(sentence) === normalize(currentSpoken);

                return (
                    <p
                        id="pSpeachText"
                        key={index} 
                        style={{ color: currentSpoken ? (isMatch ? 'white' : 'yellow') : 'gray' }}
                    >
                        {sentence}
                        {currentSpoken && (
                            <span style={{ fontSize: '0.9em', opacity: 0.8 }}>
                                {' '}({currentSpoken})
                            </span>
                        )}
                    </p>
                );
            })}
        </div>
    );
}