import React from "react";
import Modal from "react-modal";

const OrderDetailsModal = ({ isOpen, closeModal, orders }) => {
    console.log(orders)
    const overlayStyle = {
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Dark background color with some transparency
    };
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Order Details"
            className="modal-dialog modal-dialog-centered"
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark background color with some transparency
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
            overlayStyle={overlayStyle} // Apply the customized overlay style
        >
            <div style={{ margin: "6% auto", width: '40%' }} className="modal-content container">
                <div className="modal-header">
                    <button
                        style={{ marginBottom: "0px", textAlign: "center" }}
                        type="button"
                        className="close"
                        onClick={closeModal}
                    >
                        <span
                            style={{
                                color: 'white',
                                backgroundColor: "red",
                                padding: "0px 6px 3px 6px",
                                border: "2px solid #be282a",
                                borderRadius: "5px",
                            }}
                        >
                            &times;
                        </span>
                    </button>
                </div>
                <div className="modal-body">
                    <ul className="list-group">
                        {orders.map((order) => (
                            <li
                                key={order._id}
                                className="list-group-item"
                                style={{ backgroundColor: "#ffff" }}
                            >
                                <h5 style={{ color: 'black' }}>Brand: {order.Brand}</h5>
                                <h5 style={{ color: 'black' }}>Name: {order.Name}</h5>
                                <div style={{display:'flex', gap:15}}>
                                    <h5 style={{ color: 'black' }}>Color: </h5>
                                    <div style={{ backgroundColor: order.Color, width: '20px', height: '20px' }}></div>
                                </div>
                                <h5 style={{ color: 'black' }}>Price: {order.Price}</h5>
                                <h5 style={{ color: 'black' }}>Size: {order.Size}</h5>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Modal>
    );
};

export default OrderDetailsModal;