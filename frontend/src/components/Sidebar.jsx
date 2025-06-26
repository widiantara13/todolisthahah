import React from 'react'
import { IoHome } from "react-icons/io5";
import { MdAddTask } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div>
        <aside className="menu">
            <p className="menu-label">General</p>
            <ul className="menu-list">
                <li>
                    <NavLink to={"/dashboard"}>
                        {<IoHome/>} Dashboard
                    </NavLink>
                </li>
                
            </ul>
            <p className="menu-label">Task</p>
            <ul className="menu-list">
                <li><NavLink to={"/addtask"}>
                        {<MdAddTask/>} Add Task
                    </NavLink></li>
                
                <li>
                    <NavLink to={"/"}>
                        {<FaTasks/>} Show Task
                    </NavLink>
                </li>
               
            </ul>
            <p className="menu-label">Setting</p>
            <ul className="menu-list">
                <li className='button is-danger'>
                    Log out
                </li>
                
            </ul>
        </aside>
    </div>
  )
}

export default Sidebar