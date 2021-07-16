import React, { useState } from 'react';
import "./assets/scss/style.css";
import "./assets/vendors/core/core.css";
import "./assets/vendors/bootstrap-datepicker/bootstrap-datepicker.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/iconfont.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import ForgotPassword from "./pages/Login/ForgotPassword"
import Layout from "./components/Layout/Layout";
import { sideBarRoutes } from "./utils/routes/index";
import AddEvents from './pages/Events/AddEvents';
import AddMusic from './pages/Music/AddMusic';
import AddBiography from './pages/Biography/AddBiography';
import AddSponsored from './pages/Sponsored/AddSponsored';
import AddGallery from './pages/Gallery/AddGallery';
import PublicRoute from "./utils/routes/PublicRoute/PublicRoute";
import PrivateRoute from "./utils/routes/PrivateRoute/PrivateRoute";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from "react-notifications";
import AddCategoryMusic from './pages/Categories/AddCategory';
import EditMusic from './pages/Music/EditMusic';
import AddSliderImages from './pages/SliderImages/AddSliderImages';
import EditCategory from './pages/Categories/EditCategory';
import EditEvent from './pages/Events/EditEvent';
import EditSponsore from './pages/Sponsored/EditSponsore';
import AddNotification from './pages/Notification/AddNotification';
import constants from './utils/constants';
function App() {
  const [isSidebar, setIsSidebar] = useState(false);

  const handleCollapse = (status) => {
    setIsSidebar(!status)
  }
  return (
    <div className={`main-wrapper  `}
    // ${isSidebar ? 'sidebar-folded' : ''}
    // class="main-wrapper"
    // open-sidebar-folded
    >
       <NotificationContainer />
       <Router basename="/admin">
        <Switch>
          <PublicRoute 
          exact path={constants.ROUTE.LOGIN.LOGIN} 
          component={Login}/>

          <PublicRoute 
          exact 
          path={constants.ROUTE.LOGIN.FORGOT_PASSWORD}
          component={ForgotPassword}/>
          <Switch>
            <Layout parentCallback={handleCollapse}>
              <Switch>
                       
              {sideBarRoutes.map((item, index) => {
                  return (
                    <PrivateRoute
                      path={item.path}
                      exact
                      component={item.component}
                      key={index}
                    />
                  )
                })}
               <PrivateRoute 
               exact 
               path={constants.ROUTE.CATEGORY_LIST.ADD_CATEGORY_MUSIC}
               component={AddCategoryMusic}/>

               <PrivateRoute 
               exact 
               path={constants.ROUTE.CATEGORY_LIST.EDIT_CATEGORY_BY_ID}
               component={EditCategory}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.EVENTS.ADD_EVENTS}
                component={AddEvents}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.EVENTS.EDIT_EVENTS_BY_ID}
                component={EditEvent}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.MUSIC.ADD_MUSIC}
                component={AddMusic}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.BIOGRAPHY.ADD_BIOGRAPHY}
                component={AddBiography}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.SPONSORED.ADD_SPONSORED}
                component={AddSponsored}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.GALLERY.ADD_GALLERY}
                component={AddGallery}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.MUSIC.EDIT_MUSIC_BY_ID}
                component={EditMusic}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.SLIDER_IMAGES.ADD_SILDER_IMAGES}
                component={AddSliderImages}/>

                <PrivateRoute
                exact 
                path={constants.ROUTE.SPONSORED.EDIT_SPONSORED_BY_ID}
                component={EditSponsore}/>

                <PrivateRoute 
                exact 
                path={constants.ROUTE.NOTIFICATION.ADD_NOTIFICATION} 
                component={AddNotification}/>
               
                <Redirect to={constants.ROUTE.LOGIN.LOGIN} />

              </Switch>
            </Layout>
            <Redirect to={constants.ROUTE.LOGIN.LOGIN} />

          </Switch>
        </Switch>
      </Router>
      </div>
  );
}

export default App;
