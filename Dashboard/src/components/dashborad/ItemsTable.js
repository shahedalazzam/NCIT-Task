import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../formStyle.css';
import DeleteItembtn from './DeleteItembtn';

const ItemsTable = (props) => {
    const role = localStorage.getItem('role');
    const token = sessionStorage.getItem('token');

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get('https://ncittasks.onrender.com/admin/item');

                if (response && response.data) {
                    setItems(response.data.data.Items);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchItemData();
    }, []);

    const handleItemDelete = async (deletedItemId) => {
        try {
            await axios.delete(`https://ncittasks.onrender.com/admin/item/${deletedItemId}`);
            setItems((prevItems) => prevItems.filter((item) => item._id !== deletedItemId));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    let navigate = useNavigate();

    const handleItemNameEdit = async (itemId, newName) => {
        try {
            await axios.patch(`https://ncittasks.onrender.com/admin/item/update/${itemId}`, {
                Name: newName,
            });
        } catch (error) {
            console.error('Error updating item name:', error);
        }
    };

    const handleItemPassMarkEdit = async (itemId, newPassMark) => {
        try {
            await axios.patch(`https://ncittasks.onrender.com/admin/item/update/${itemId}`, {
                PassMark: newPassMark,
            });
        } catch (error) {
            console.error('Error updating item pass mark:', error);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <>
            <div id="wrapper" style={{ width: '100%' }}>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <div className="container-fluid">
                            <h1 style={{ margin: '2rem 0 2rem 0' }} className="h3 text-white">
                                Tables
                            </h1>
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Pass Mark</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item._id}</td>
                                                        <td contentEditable={true} onBlur={(e) => handleItemNameEdit(item._id, e.target.innerText)}>
                                                            {item.Name}
                                                        </td>
                                                        <td contentEditable={true} onBlur={(e) => handleItemPassMarkEdit(item._id, e.target.innerText)}>
                                                            {item.PassMark}
                                                        </td>
                                                        <td>
                                                            <DeleteItembtn id={item._id} onDelete={() => handleItemDelete(item._id)} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ItemsTable;
