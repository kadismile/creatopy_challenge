import React from 'react'
import {Link } from 'react-router-dom'
function SideBar() {
  return (
      <>
        <div className="vertical-menu">
    
          <div data-simplebar className="h-100">
      
            <div className="navbar-brand-box">
              <br/>
              <h5>
                <a href="/" style={{color: "white"}}>Creatopy Challenge</a>
              </h5>
             
            </div>
      
            
            <div id="sidebar-menu">
            
              <ul className="metismenu list-unstyled" id="side-menu">
                <li className="menu-title">Menu</li>
          
                <li>
                  <Link to="/" className="waves-effect"> <i className='bx bx-home-smile'> </i> <span>Books</span></Link>
                </li>


              </ul>
            </div>
           
          </div>
        </div>
      
      </>
  
  );
}

export {SideBar}