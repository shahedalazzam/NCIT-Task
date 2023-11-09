import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../formStyle.css';
import DeleteItembtn from './DeleteItembtn';

const ItemsTable = (props) => {
    const role = localStorage.getItem('role');
    const token = sessionStorage.getItem('token');

    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItemData = async () => {
            try {
                const response = await axios.get(
                    'https://dream-wedding.onrender.com/admin/item'
                ).catch((err) => {
                    if (err && err.response) {
                        console.log("first")
                        console.log('Error: ', err.response.data.error);
                    }
                });

                if (response && response.data) {
                    setItems(response.data.data.Items);
                }
            } catch (error) {
                console.error('Error fetching item data:', error);
            }
        };
        fetchItemData();
    }, []);

    const handleItemDelete = (deletedItemId) => {
        // filter the old items in the array and returns new array of items there id does not 
        setItems((prevItems) => prevItems.filter((item) => item._id !== deletedItemId));
    };

    let navigate = useNavigate();

    const handleItemNameEdit = async (itemId, newName) => {
        try {
            await axios.patch(`https://dream-wedding.onrender.com/admin/item/update/${itemId}`, {
                Name: newName,

            });
        } catch (error) {
            console.error('Error updating itemname:', error);
        }
    };

    const handleItemPriceEdit = async (itemId, newPrice) => {
        try {
            await axios.patch(`https://dream-wedding.onrender.com/admin/item/update/${itemId}`, {
                Price: newPrice,
            });
        } catch (error) {
            console.error('Error updating itemname:', error);
        }
    };
    const handleItemColorEdit = async (itemId, newColor) => {
        try {
            await axios.patch(`https://dream-wedding.onrender.com/admin/item/update/${itemId}`, {
                Color: newColor,
            });
        } catch (error) {
            console.error('Error updating itemname:', error);
        }
    };
    const handleItemBrandEdit = async (itemId, newBrand) => {
        try {
            await axios.patch(`https://dream-wedding.onrender.com/admin/item/update/${itemId}`, {
                Brand: newBrand,
            });
        } catch (error) {
            console.error('Error updating itemname:', error);
        }
    };
    const handleItemSizeEdit = async (itemId, newSize) => {
        try {
            await axios.patch(`https://dream-wedding.onrender.com/admin/item/update/${itemId}`, {
                Size: newSize,
            });
        } catch (error) {
            console.error('Error updating itemname:', error);
        }
    };

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
                                                    <th>Price</th>
                                                    <th>Color</th>
                                                    <th>Brand</th>
                                                    <th>Size</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {items.map((item, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{item._id}</td>
                                                            <td contentEditable={true} onBlur={(e) => handleItemNameEdit(item._id, e.target.innerText)} >{item.Name}</td>
                                                            <td contentEditable={true} onBlur={(e) => handleItemPriceEdit(item._id, e.target.innerText)} >{item.Price}</td>
                                                            <td style={{justifyContent:'center',display:'flex'}} contentEditable={true} onBlur={(e) => handleItemColorEdit(item._id, e.target.innerText)} ><div style={{ backgroundColor: item.Color, width: '90px', height: '40px' }}></div></td>
                                                            <td contentEditable={true} onBlur={(e) => handleItemBrandEdit(item._id, e.target.innerText)} >{item.Brand}</td>
                                                            <td contentEditable={true} onBlur={(e) => handleItemSizeEdit(item._id, e.target.innerText)} >{item.Size}</td>
                                                            <td>
                                                                <DeleteItembtn id={item._id} onDelete={handleItemDelete} />
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
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
