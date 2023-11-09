import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderDetailsModal from './OrderDetailsModal';

const OrdersTable = () => {
    const [ordersData, setOrdersData] = useState({ Orders: [], users: [], OrderItems: [] });
    const [selectedOrder, setSelectedOrder] = useState(null); // To store the selected order details

    useEffect(() => {
        axios.get('https://dream-wedding.onrender.com/user/order')
            .then((response) => {
                setOrdersData(response.data.data);
                console.log(response.data.data)
                console.log(ordersData)
            })
            .catch((error) => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    // Define the fetchUserOrders function
    const fetchUserOrders = (userId, orderId) => {
        // Make an API request to fetch order details based on userId and orderId
        axios.get(`https://dream-wedding.onrender.com/user/order`)
            .then((response) => {
                // Update the selectedOrder state with the fetched order details
                setSelectedOrder(response.data.data.OrderItems);
                console.log(response.data.data.OrderItems)
            })
            .catch((error) => {
                console.error('Error fetching order details:', error);
            });
    };

    return (
        <div className="container-fluid" style={{ height: "53rem", overflowY: "auto" }}>
            <div className="container">
                {ordersData.users.map((user, userIndex) => (
                    <div key={user._id} className="card mt-4 border-0">
                        <div style={{ backgroundColor: "#244459" }} className="card-header text-white">
                            <h2>{user.FullName}'s Orders</h2>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {ordersData.Orders.map((order, orderIndex) => (
                                    <li
                                        style={{ cursor: "pointer" }}
                                        key={order._id}
                                        className="list-group-item"
                                        onClick={() => fetchUserOrders(user._id, order._id)}
                                    >
                                        Order: {order._id}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

              {/* Display selected order details */}
              {selectedOrder && (
                    <OrderDetailsModal
                        isOpen={true} // You can control the modal open/close state here
                        closeModal={() => setSelectedOrder(null)} // Close the modal when needed
                        orders={selectedOrder} // Pass the selectedOrder as a prop
                    />
                )}
            </div>
        </div>
    );
};

export default OrdersTable;