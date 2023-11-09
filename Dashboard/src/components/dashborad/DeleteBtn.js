import axios from 'axios';
import React from 'react';

const DeleteBtn = ({ id, onDelete }) => {
  const deleteServerData = async () => {
    try {
      await axios.delete(`https://ncittasks.onrender.com/admin/delete/${id}`);
      onDelete(id); // Call the onDelete callback to update the state in the UsersTable component
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      id="submit"
      className="btn text-dark"
      onClick={deleteServerData}
      type="button"
      value="Delete"
      style={{ marginLeft: '0.5rem' }}
    >
      Delete
    </button>
  );
};

export default DeleteBtn;
