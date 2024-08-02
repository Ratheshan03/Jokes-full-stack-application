// src/components/ConfirmationModal.js
import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./confirmationModel.module.css";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm();
    toast.success("Action confirmed");
  };

  const handleCancel = () => {
    onCancel();
    toast.error("Action cancelled");
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <div className={styles.modalActions}>
          <button onClick={handleConfirm} className={styles.confirmButton}>
            Yes
          </button>
          <button onClick={handleCancel} className={styles.cancelButton}>
            No
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>,
    document.body
  );
};

export default ConfirmationModal;
