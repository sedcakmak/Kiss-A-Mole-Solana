import React from "react";

const Modal = ({ count, onClose }) => {
  return (
    <>
      <div className="modal-overlay"></div>
      <div className="modal">
        <div className="modal-content">
          <div className="modal-body">
            <p>
              You kissed <span>{count}</span> moles! Click Start Game to play
              again!
            </p>
            <button
              className="modal-close-btn"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
