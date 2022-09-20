// Import and configure the Firebase SDK
// These scripts are made available when the app is served or deployed on Firebase Hosting
// If you do not serve/host your project using Firebase Hosting see https://firebase.google.com/docs/web/setup
importScripts("https://www.gstatic.com/firebasejs/5.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/5.10.1/firebase-messaging.js"
);
// importScripts('https://www.gstatic.com/firebasejs/init.js');

var firebaseConfig = {
  apiKey: "AIzaSyD7CSgaq6ZFbT1rPksj8X8uwruebrbgZUc",
  authDomain: "prnumberbiz.firebaseapp.com",
  databaseURL: "https://prnumberbiz.firebaseio.com",
  projectId: "prnumberbiz",
  storageBucket: "prnumberbiz.appspot.com",
  messagingSenderId: "783471476128",
  vapidKey:
    "BPd5wWt2hjuiwxxi4opg_AEwqEpZ1s4-Xsr_BByyGKQuKWkEVD_2HCyZubR3HxUe2ZxfT3mLJZjHrkiBlhPfmhM",
};

firebase.initializeApp(firebaseConfig);
var messaging = firebase.messaging();

/**
 * Here is is the code snippet to initialize Firebase Messaging in the Service
 * Worker when your app is not hosted on Firebase Hosting.

 // [START initialize_firebase_in_sw]
 // Give the service worker access to Firebase Messaging.
 // Note that you can only use Firebase Messaging here, other Firebase libraries
 // are not available in the service worker.
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
 importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

 // Initialize the Firebase app in the service worker by passing in the
 // messagingSenderId.
 firebase.initializeApp({
   'messagingSenderId': 'YOUR-SENDER-ID'
 });

 // Retrieve an instance of Firebase Messaging so that it can handle background
 // messages.
 const messaging = firebase.messaging();
 // [END initialize_firebase_in_sw]
 **/

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  }

  return "unknown";
}

var platform = getMobileOperatingSystem();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here

  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.contents,
    icon: "/assets/icon/icon-noti-20@2x.png",
    data: payload.data,
    sound: "/assets/sound/order.wav",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);

  self.addEventListener("notificationclick", function (event) {
    event.notification.close();
    // This looks to see if the current is already open and
    document.location.href = "/index.html";
  });
});
// [END background_handler]
