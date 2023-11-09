import React, { useEffect, useState } from 'react'
import UsersTable from './UsersTable'
import { Link } from 'react-router-dom'

const SideNav = () => {



    return (
        <>
            <ul style={{ backgroundColor: "#FDBFC3" }} className="navbar-nav sidebar sidebar-dark accordion" id="accordionSidebar">
                <a className="sidebar-brand d-flex align-items-center justify-content-center" href="/dashboard">
                    <div className="sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-ring"></i>
                    </div>
                    <div className="sidebar-brand-text mx-3">WD Admin</div>
                </a>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Users</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/items">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Items</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/odres">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Orders</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/adduser">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Add Users</span></Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/dashboard/additem">
                        <i className="fas fa-fw fa-tachometer-alt"></i>
                        <span>Add Items</span></Link>
                </li>


            </ul>
        </>
    )
}

export default SideNav