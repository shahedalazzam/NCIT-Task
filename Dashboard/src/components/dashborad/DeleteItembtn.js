import axios from 'axios';
import React, { useState } from 'react';
import './deletebtn.css'; // Import your custom CSS for styling

const DeleteItembtn = ({ id, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const openConfirmation = () => {
    setShowConfirmation(true);
  };

  const closeConfirmation = () => {
    setShowConfirmation(false);
  };

  const deleteServerData = async () => {
    try {
      await axios.delete(`https://ncittasks.onrender.com/admin/item/delete/${id}`);
      onDelete(id);
      console.log(id);
      closeConfirmation();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        id="submit"
        className="btn text-dark"
        onClick={openConfirmation}
        type="button"
        value="Delete"
        style={{ marginLeft: '0.5rem' }}
      >
        Delete
      </button>

      {showConfirmation && (
        <div className="delete-confirmation">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this item?</p>
            <button onClick={deleteServerData}>Yes</button>
            <button onClick={closeConfirmation}>No</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteItembtn;
