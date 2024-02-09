import React from 'react';
import './Add_shop.css';

const AddItemForm = ({ onClose }) => {
  return (
    <div className="add-item-form">
      <h3>Add Item</h3>
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Shop Name" />
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddItemForm;
