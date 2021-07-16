import React,{useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import constants from '../../utils/constants';
import { callDashboardCountAPI} from '../../actions/DashboardAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
const Dashboard = props => {
  const [dashboard, setDashboard] = useState("");

  useEffect(() => {
    getDashboardCount();
  }, []);

  const getDashboardCount = () => {
    props.callDashboardCountAPIAction()
      .then((response) => {
        console.log("Dashboard count",response);
        setDashboard(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // appusers: 17
  // events: 7
  // categories: 16
  // songs: 2
  // songrequests: 1
  return (

    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap grid-margin">
        <div>
          <h4 className="mb-3 mb-md-0">Welcome to Dashboard</h4>
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-xl-12 stretch-card">
          <div className="row flex-grow">
            <Card 
            title='Users'
            pathRoute={constants.ROUTE.SIDEBAR.DASHBOARD} 
            count={dashboard.appusers}/>
            <Card 
            title='Events' 
            pathRoute={constants.ROUTE.SIDEBAR.EVENTS}
            count={dashboard.events}/>
            <Card 
            title='Songs' 
            pathRoute={constants.ROUTE.SIDEBAR.MUSIC}
            count={dashboard.songs}/>
            <Card 
            title='Song Request' 
            pathRoute={constants.ROUTE.SIDEBAR.SONG_REQUEST}
            count={dashboard.songrequests}/>
            <Card 
            title='Categories' 
            pathRoute={constants.ROUTE.SIDEBAR.CATEGORY_LIST}
            count={dashboard.categories}/>
            {/* <Card
            title='Live Stream'
            pathRoute= {constants.ROUTE.SIDEBAR.LIVESTREAMING}
            count= {dashboard.livestreaming} /> */}
         
          </div>
        </div>
      </div>
    </div>

  );
};

Dashboard.propTypes = {

};
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      callDashboardCountAPIAction: callDashboardCountAPI
    },
    dispatch,
  );

export default connect(null, mapDispatchToProps)(Dashboard);