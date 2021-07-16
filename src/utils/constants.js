const API_URL = process.env.REACT_APP_API_URL;

export default {
  API: {
    BASEURL: {
      URL: API_URL,
    },
     LOGIN: {
      LOGIN: '/login',
      LOGOUT: '/logout',

    },
    DASHBOARD: {
      GET: '/dashboard-widgets'
    },
    USER: {
      GET: '/app-users',
      UPDATE_STATUS: '/change-user-status'
    },
    PRIVACY_POLICY: {
      GET: '/privacy-policy',
      UPDATE: '/update-privacy-policy'
    },
    TERMS_AND_CONDITIONS: {
      GET: '/terms-and-conditions',
      UPDATE: '/update-terms-conditions'
    },
    FILE_UPLOAD: {
      POST: '/image-upload'
    },
    BIOGRAPHY: {
      GET: '/biography',
      POST: '/update-biography'
    },
    EVENTS: {
      GET: '/events',
      POST: '/add-event',
      DELETE: '/delete-event',
      UPDATE: '/update-event',
      DETAILS: '/event-details'
    },
    MUSIC: {
      POST: '/add-song',
      GET: '/get-songs',
      DELETE: '/delete-song',
      UPDATE: '/update-song',
      DETAILS: '/detail-song'
    },
    CATEGORY_LIST: {
      POST: '/add-category',
      GET: '/categories',
      DELETE: '/delete-category',
      UPDATE: '/update-category',
      DETAILS: '/category-details'
    },
    SPONSORED: {
      POST: '/add-sponsor',
      GET: '/sponsors',
      DELETE: '/delete-sponsor',
      DETAILS: '/sponsor-details',
      UPDATE: '/update-sponsor'
    },
    SONG_UPLOAD: {
      POST: '/song-upload'
    },
    GALLERY: {
      POST: '/add-gallery',
      GET: '/gallery-list',
      DELETE: '/delete-gallery'
    },
    BOOKING: {
      GET: '/booking-list',
      DELETE: '/delete-booking'
    },
    RADIO: {
      GET: '/radio',
      UPDATE: '/update-radio'
    },
    SHARE_MY_APP: {
      GET: '/share-myapp',
      UPDATE: '/update-share-myapp'
    },
    SOCIAL_LINKS: {
      GET: '/social-links',
      UPDATE: '/update-social-links'
    },
    SONG_REQUEST: {
      GET: '/songrequest-list',
      DELETE: '/delete-songrequest'
    },
    SLIDER_IMAGES: {
      GET: '/slider-images',
      POST: '/add-slider-image',
      DELETE: '/delete-slider-image'
    },
    NOTIFICATION: {
      GET: '/notification',
      POST: '/notification-add',
      DELETE: '/notification-delete/'
    },
    UPLOADS_BASE_URL:{
        SONG:"https://djflakoapp.com/dj-flako/storage/uploads/songs/",
        IMAGES:"https://djflakoapp.com/dj-flako/storage/uploads/"
    },
    // https://djflakoapp.com/dj-flako/api/admin/
    LIVESTREAMING:{
      GET: "videostreaming/get",
      POST: "videostreaming/store"
    }

  },

  STORAGE: {
    AUTH: {
      TOKEN: "auth-token",
      REF_TOKEN: "refresh-token",
      ADMIN_DATA: "admin-data",
    },
  },
  ROUTE: {
    LOGIN: {
      LOGIN: "/",
      FORGOT_PASSWORD: "/forgotPassword",
      CHANGE_PASSWORD: "/changePassword",

    },


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
    SIDEBAR: {
      DASHBOARD: "/dashboard",
      USER: "/user",
      MUSIC: "/music",
      CATEGORY_LIST: '/category-list',
      EVENTS: "/events",
      BOOKINGS:"/bookings",
      REQUEST_DJ_FLAKO: "/request-dj-flako",
      RADIO:"/radio",
      SPONSORED: "/sponsored",
      LIVESTREAMING: "/livestreaming",
      GALLERY: "/gallery",
      SLIDER_IMAGES:"/slider-images",
      BIOGRAPHY: "/biography",
      SHARE_MY_APPLICATION:"/share-my-application",
      SOCIAL_LINKS:"/social-links",
      SONG_REQUEST: "/song-request",
      NOTIFICATION: "/notification",
      NEW_SONG: "/new-song",
      PRIVACY_POLICY: "/privacy-policy",
      TERMS_AND_CONDITIONS: "/terms-and-conditions",

    },
    EVENTS: {
      ADD_EVENTS: "/events/add-events",
      EDIT_EVENTS:"/events/edit-events/",
      EDIT_EVENTS_BY_ID:"/events/edit-events/:id"
    },

    CATEGORY_LIST: {
      ADD_CATEGORY_MUSIC: "/category-list/add-category-music",
      DETAILS:"/category-list/category-details/",
      EDIT_CATEGORY:'/category-list/edit-category-music/',
      EDIT_CATEGORY_BY_ID:'/category-list/edit-category-music/:id'


    },
    MUSIC: {
      ADD_MUSIC: "/music/add-music",
      EDIT_MUSIC:"/music/edit-music/",
      EDIT_MUSIC_BY_ID:"/music/edit-music/:id"

    },
    BIOGRAPHY: {
      ADD_BIOGRAPHY: "/biography/add-biography",
      EDIT_BIOGRAPHY:"/biography/edit-biography",
      EDIT_BIOGRAPHY_BY_ID:"/biography/edit-biography/:id"
    },
    SPONSORED: {
      ADD_SPONSORED: "/sponsored/add-sponsored",
      EDIT_SPONSORED: "/sponsored/edit-sponsored/",
      EDIT_SPONSORED_BY_ID: "/sponsored/edit-sponsored/:id",

    },
    GALLERY: {
      ADD_GALLERY: "/gallery/add-gallery",
    },
    SLIDER_IMAGES:{
      ADD_SILDER_IMAGES:'/slider-images/add-images'
    },
    NOTIFICATION:{
      ADD_NOTIFICATION:'/notification/add-notification'
    },
    LIVESTREAMING:{
      LIVESTREAMING: '/live-streaming/live-streaming-details'
    }
    



  },
};




