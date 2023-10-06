import React from 'react';

function PopUp({ onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Pop-Up Window Content</h2>
        {/* Add content for your pop-up window */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default PopUp;