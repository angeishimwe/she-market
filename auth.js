// Firebase config (replace with your own Firebase project info)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Signup
function signup(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let role = document.getElementById("role").value;

  auth.createUserWithEmailAndPassword(email,password)
    .then(user=>{
      db.collection("users").doc(user.user.uid).set({role:role});
      alert("Account created!");
      if(role=="seller") window.location="seller-dashboard.html";
      else window.location="buyer-dashboard.html";
    })
    .catch(err=>alert(err.message));
}

// Login
function login(){
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email,password)
    .then(user=>{
      db.collection("users").doc(user.user.uid).get().then(doc=>{
        let role = doc.data().role;
        if(role=="seller") window.location="seller-dashboard.html";
        else window.location="buyer-dashboard.html";
      });
    })
    .catch(err=>alert(err.message));
}
