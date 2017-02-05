// Set up our firebase database
var firebaseConfig = (function() {
    var config = {
        apiKey: "AIzaSyCf6xpJKAMHM-L49qrW2DKByHg0IWoNMtk",
        authDomain: "jstory-f6cae.firebaseapp.com",
        databaseURL: "https://jstory-f6cae.firebaseio.com",
        storageBucket: "jstory-f6cae.appspot.com",
        messagingSenderId: "679502739424"
    };
    firebase.initializeApp(config);
})(); // IIFE for closure