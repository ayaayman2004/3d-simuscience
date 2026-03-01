import React from "react";
import { Link } from "react-router-dom";
 import logo from "./logo.png"
  
export default function NavBar() {
  return (
    
    <nav className="navbar navbar-expand-lg custom-navbar">
       
 
      <div className="container-fluid">
        
       
        
       

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link nav-link-item" to="/">Home</Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link nav-link-item" to="/lab">About us</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-item" to="/elements">Contact us</Link>
            </li> */}

            <li className="nav-item">
              <Link className="nav-link nav-link-item" to="/Register">Register</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-item" to="/Login">Login</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link nav-link-item" to="/UserProfile">User Profile</Link>
            </li>
              <li className="nav-item">
              <Link className="nav-link nav-link-item" to="/Review">Review</Link>
            </li>
             <li className="nav-item">
              <Link className="nav-link nav-link-item" to="/ChemicalTools">ChemicalTools</Link>
            </li>
               
          </ul>
           
 

        </div>
         
      </div>
      <div className="navbar-logo">
          <img src={logo} alt="Logo" className="lo1" />
        </div>
    </nav>
  );
}
