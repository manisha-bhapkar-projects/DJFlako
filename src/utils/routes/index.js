import constants from "../constants";
import Dashboard from "../../pages/Dashboard/Dashboard";
import User from "../../pages/User/User";
import Events from "../../pages/Events/Events";
import Music from "../../pages/Music/Music";
import RequestDjFlako from "../../pages/RequestDjFlako/RequestDjFlako";
import Biography from "../../pages/Biography/Biography";
import Sponsored from "../../pages/Sponsored/Sponsored";
import Gallery from "../../pages/Gallery/Gallery";
import CategoryList from "../../pages/Categories/CategoryList";
import Inquiry from "../../pages/Inquiry/Inquiry";
import PrivacyPolicy from "../../pages/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../../pages/TermsAndConditions/TermsAndConditions";
import Bookings from "../../pages/Bookings/Bookings";
import SliderImages from "../../pages/SliderImages/SliderImages";
import SocialLinks from "../../pages/SocialLinks/SocialLinks";
import ShareMyApplication from "../../pages/ShareMyApplication/ShareMyApplication";
import Radio from "../../pages/Radio/Radio";
import SongRequest from "../../pages/SongRequest/SongRequest";
import Notification from "../../pages/Notification/Notification";
import LiveStream from "../../pages/LiveStream/LiveStream";




// Application Users
// Songs
// Category
// Events
// Bookings
// Song Requests
// Radio - 1
// Sponsors
// Gallery
// Slider Images
// Biography - 3
// Share My Application - 2 
// Social Links - 4
// Privacy Policy - 1
// Terms and Conditions - 1

export const sideBarRoutes = [
    {
        path: constants.ROUTE.SIDEBAR.DASHBOARD,
        component: Dashboard,
        sidebar: true,

    },
    // {
    //     path: constants.ROUTE.SIDEBAR.USER,
    //     component: User,
    //     sidebar: true,

    // },
    {
        path: constants.ROUTE.SIDEBAR.MUSIC,
        component: Music,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.CATEGORY_LIST,
        component: CategoryList,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.EVENTS,
        component: Events,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.BOOKINGS,
        component: Bookings,
        sidebar: true,

    },
    // {
    //     path: constants.ROUTE.SIDEBAR.REQUEST_DJ_FLAKO,
    //     component: RequestDjFlako,
    //     sidebar: true,

    // },
    {
        path: constants.ROUTE.SIDEBAR.SONG_REQUEST,
        component: SongRequest,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.RADIO,
        component: Radio,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.SPONSORED,
        component: Sponsored,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.LIVESTREAMING,
        component: LiveStream,
        sidebar: true,
    },
    {
        path: constants.ROUTE.SIDEBAR.GALLERY,
        component: Gallery,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.SLIDER_IMAGES,
        component: SliderImages,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.BIOGRAPHY,
        component: Biography,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.SHARE_MY_APPLICATION,
        component: ShareMyApplication,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.SOCIAL_LINKS,
        component: SocialLinks,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.NOTIFICATION,
        component: Notification,
        sidebar: true,

    },
    // {
    //     path: constants.ROUTE.SIDEBAR.NEW_SONG,
    //     component: Album,
    //     sidebar: true,

    // },
    
    {
        path: constants.ROUTE.SIDEBAR.SONG_REQUEST,
        component: SongRequest,
        sidebar: true,

    },
    
    
    {
        path: constants.ROUTE.SIDEBAR.PRIVACY_POLICY,
        component: PrivacyPolicy,
        sidebar: true,

    },
    {
        path: constants.ROUTE.SIDEBAR.TERMS_AND_CONDITIONS,
        component: TermsAndConditions,
        sidebar: true,

    },

]



export const sidebar = [

    {
        title: 'Dashboard',
        path: constants.ROUTE.SIDEBAR.DASHBOARD,
        icon: "fas fa-tachometer-alt",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    // {
    //     title: 'Application Users',
    //     path: constants.ROUTE.SIDEBAR.USER,
    //     icon: "fas fa-user",
    //     cName: 'nav-item',
    //     sidebar: true,
    //     childrens: []
    // },
    {
        title: 'Songs',
        path: constants.ROUTE.SIDEBAR.MUSIC,
        icon: "fas fa-music",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Categories',
        path: constants.ROUTE.SIDEBAR.CATEGORY_LIST,
        icon: "fas fa-headphones-alt",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },,
    {
        title: 'Events',
        path: constants.ROUTE.SIDEBAR.EVENTS,
        icon: "far fa-calendar-alt" ,
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
  
    {
        title: 'Book For DJ',
        path: constants.ROUTE.SIDEBAR.BOOKINGS,
        icon: "fas fa-compact-disc",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    // {
    //     title: 'Song Requests',
    //     path: constants.ROUTE.SIDEBAR.REQUEST_DJ_FLAKO,
    //     icon: "fa fa-play",
    //     cName: 'nav-item',
    //     sidebar: true,
    //     childrens: []
    // },
    {
        title: 'Song Request',
        path: constants.ROUTE.SIDEBAR.SONG_REQUEST,
        icon: "fas fa-clipboard-list",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Radio',
        path: constants.ROUTE.SIDEBAR.RADIO,
        icon: "fas fa-broadcast-tower",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Sponsored',
        path: constants.ROUTE.SIDEBAR.SPONSORED,
        icon: "fas fa-user-tie",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Live Streaming',
        path: constants.ROUTE.SIDEBAR.LIVESTREAMING,
        icon: "fas fa-headset",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
        
    },
    {
        title: 'Gallery',
        path: constants.ROUTE.SIDEBAR.GALLERY,
        icon: "far fa-image",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Slider Images',
        path: constants.ROUTE.SIDEBAR.SLIDER_IMAGES,
        icon: "far fa-images",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Biography',
        path: constants.ROUTE.SIDEBAR.BIOGRAPHY,
        icon: "fas fa-book-open",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Share My Application',
        path: constants.ROUTE.SIDEBAR.SHARE_MY_APPLICATION,
        icon: "fas fa-share-alt-square",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
     {
        title: 'Social Links',
        path: constants.ROUTE.SIDEBAR.SOCIAL_LINKS,
        icon: "fab fa-twitter-square",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
 

    {
        title: 'Notification',
        path: constants.ROUTE.SIDEBAR.NOTIFICATION,
        icon: "fas fa-bell",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    // {
    //     title: 'New Music',
    //     path: constants.ROUTE.SIDEBAR.NEW_SONG,
    //     icon: "fas fa-clipboard-list",
    //     cName: 'nav-item',
    //     sidebar: true,
    //     childrens: []
    // },
    {
        title: 'Privacy Policy',
        path: constants.ROUTE.SIDEBAR.PRIVACY_POLICY,
        icon: "fas fa-plus",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },
    {
        title: 'Terms & Conditions',
        path: constants.ROUTE.SIDEBAR.TERMS_AND_CONDITIONS,
        icon: "fas fa-plus",
        cName: 'nav-item',
        sidebar: true,
        childrens: []
    },

];