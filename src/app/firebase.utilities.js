// import * as firebase from 'firebase';

// export let  initFirebase = (id,name,profileImg,email)=>{
//     var config = {
//       apiKey: "AIzaSyCE1S4-NPbnKGXUhEm5-CYDtCDK_9kaHIo",
//       authDomain: "personal-growth-3cc97.firebaseapp.com",
//       databaseURL: "https://personal-growth-3cc97.firebaseio.com",
//       projectId: "personal-growth-3cc97",
//       storageBucket: "personal-growth-3cc97.appspot.com",
//       messagingSenderId: "862852263517"
//     };
//     firebase.initializeApp(config);
// }
// export let  writeUserData = (id,name,profileImg,email)=>{
//     firebase.database().ref('users/'+id).set({
//         name,
//         id,
//         profileImg,
//         email
//     });
// }