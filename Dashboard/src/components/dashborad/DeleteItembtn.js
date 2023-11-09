import axios from 'axios';
import React from 'react';

const DeleteItembtn = ({ id, onDelete }) => {
  const deleteServerData = async () => {
    try {
      await axios.delete(`https://dream-wedding.onrender.com/admin/item/delete/${id}`);
      onDelete(id); // Call the onDelete callback to update the state in the ItemTable component
      console.log(id)
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

export default DeleteItembtn;
