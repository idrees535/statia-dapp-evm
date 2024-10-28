import React from 'react';
import './CreateMarketForm.css';

function SuccessDialog({ message, onClose }) {
  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}> {/* Stop propagation to avoid closing on dialog click */}
        <p>{message}</p>
      </div>
    </div>
  );
}
export default SuccessDialog;
