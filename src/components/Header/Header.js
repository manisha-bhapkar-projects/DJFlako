import React from "react";
import { useHistory, Link } from "react-router-dom";
import { Icon, InlineIcon } from '@iconify/react';
import logOut from '@iconify/icons-feather/log-out';
import constants from "../../utils/constants";
import { callLogoutApi } from '../../actions/AuthAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    storeAuthToken,
  } from "../../utils/storage/index";

const Header = (props) => {
    const history = useHistory();


    const LogoutApi = () => {
          props
            .callLogoutApiAction()
            .then((response) => {
              if (response.data.status) {
                storeAuthToken();
                // history.push("/");
                history.push(constants.ROUTE.LOGIN.LOGIN);
              } else {
                console.log(response);
              }
            })
            .catch((error) => console.log(error));
        };
      

    return (
        <nav className="navbar">
            <a href="#" className="sidebar-toggler">
                <i data-feather="menu" />
            </a>
            <div className="navbar-content">

                <ul className="navbar-nav">
                    <li className="nav-item dropdown nav-profile">
                     
                        <Link className="nav-link dropdown-toggle"
                        //  to={constants.ROUTE.LOGIN.LOGIN}
                         aria-haspopup="true" 
                         onClick={LogoutApi}
                        >
                       <Icon icon={logOut} />
                       </Link>

                    </li>
                </ul>
            </div>
        </nav>


    );
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            callLogoutApiAction: callLogoutApi,
        },
        dispatch,
    );

export default connect(null, mapDispatchToProps)(Header);

