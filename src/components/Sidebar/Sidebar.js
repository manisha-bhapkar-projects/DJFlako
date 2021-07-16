import React, { useState } from "react";
import { sidebar } from "../../utils/routes/index";
import { useHistory } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';

const Sidebar = ({ onSidebarClick }) => {
  const [isSidebar, setIsSidebar] = useState(false);

  const history = useHistory();

  const handleCollapse = (e) => {
    setIsSidebar(!isSidebar);
  };


  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <a href="#" className="sidebar-brand">
          DJ <span>Flako</span>
        </a>
        <div
        //  onClick={() => { handleCollapse(); onSidebarClick(isSidebar) }}
        //   className={`sidebar-toggler ${isSidebar ? "active" : "not-active"}`}
        // className="sidebar-toggler not-active"
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className="sidebar-body">
        <ul onClick={() => { handleCollapse() }}
          className={`nav ${isSidebar ? "active" : ""}`}
        // className="nav"
        >
          {sidebar.map((item, index) => {
            return item.sidebar ? (
              <NavLink to={item.path} 
              className={item.cName} key={index}>
                <Link to={item.path}
                  className="nav-link"  
                  style={{position:"relative"}} >
                  <i className={item.icon} 
                  style={{position:"absolute"}}/>
                  <span
                    className="link-title" >
                    {item.title}
                  </span>
                </Link>
              </NavLink>
            ) : null
          })}




          {/* <li className="nav-item active">
            <a href=" index.html" className="nav-link">
              <i className="fas fa-tachometer-alt" />
              <span className="link-title">Dashboard</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="user.html">
              <i className="fas fa-user" />
              <span className="link-title">User</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="event-list.html">
              <i className="far fa-calendar-alt" />
              <span className="link-title">Events</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="music-list.html">
              <i className="fas fa-music" />
              <span className="link-title">Music</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="request-dj-flako.html">
              <i className="fa fa-play" aria-hidden="true" />
              <span className="link-title">Request DJ Flako</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="biography-list.html">
              <i className="fas fa-book-open" />
              <span className="link-title">Biography</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="sponsored-list.html">
              <i className="fas fa-user-tie" />
              <span className="link-title">Sponsored</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="gallery-list.html">
              <i className="far fa-image" />
              <span className="link-title">Gallery</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="generic-list.html">
              <i className="fas fa-headphones-alt" />
              <span className="link-title">Generic List</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="inquery-list.html">
              <i className="fas fa-clipboard-list" />
              <span className="link-title">Inquiry</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="privercy-policy.html">
              <i className="fas fa-plus" />
              <span className="link-title">Privacy Policy</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="terms-conditions.html">
              <i className="fas fa-plus" />
              <span className="link-title">Terms &amp; Conditions</span>
            </a>
          </li> */}
        </ul>
      </div>
    </nav>


  );
};


export default withRouter(Sidebar);

