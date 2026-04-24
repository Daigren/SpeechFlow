import React, { useState, useEffect } from 'react';

export default function Timer({ timeLeft, formatTime, currentDuration, onSetDuration, isOpen, setIsOpen }) {
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  const handleOpen = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setMins(Math.floor(currentDuration / 60));
      setSecs(currentDuration % 60);
      setIsOpen(true);
    }
  };

  const handleSave = () => {
    const totalSeconds = (parseInt(mins) || 0) * 60 + (parseInt(secs) || 0);
    onSetDuration(totalSeconds);
    setIsOpen(false);
  };

  return (
    <div className="timer-container">
      <div id='timerDisplay' className="timer-display" style={{ color: timeLeft < 10 ? '#e74c3c' : '#2ecc71' }}>
        {formatTime(timeLeft)}
      </div>
      
      {/* <button className="btn-set-timer" onClick={handleOpen}>
        Настроить таймер
      </button> */}

      {isOpen && (
        <div id='timer' className="timer-modal-overlay">
          <div className="timer-modal">
            <h3>Setting the time</h3>
            
            <div className="timer-inputs">
              <div className="input-group">
                <input 
                  type="number" 
                  min="0" 
                  value={mins} 
                  onChange={(e) => setMins(e.target.value)} 
                />
                <label>Min</label>
              </div>
              <span className="colon">:</span>
              <div className="input-group">
                <input 
                  type="number" 
                  min="0" 
                  max="59" 
                  value={secs} 
                  onChange={(e) => setSecs(e.target.value)} 
                />
                <label>Sec</label>
              </div>
            </div>

            <div className="quick-buttons">
              {/* <button onClick={() => { onSetDuration(60); setIsOpen(false); }}>1 Min</button> */}
              {/* <button onClick={() => { onSetDuration(300); setIsOpen(false); }}>5 Min</button> */}
            </div>

            <div className="modal-actions">
              {/* <button className="btn-cancel" onClick={() => setIsOpen(false)}>Отмена</button> */}
              <button className="btn-save" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}