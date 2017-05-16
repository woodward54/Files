
//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');

btnLogin.addEventListener('click', e => {
// Get email and password
const email = txtEmail.value;
const pass = txtPassword.value;
const auth = firebase.auth();
//Sign in
const promise = auth.signInWithEmailAndPassword(email,pass);
promise.catch(e => console.log(e.message));
firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser){window.open("/firebaseUser","_self");
    } else {alert("Wrong username or password!");}
});
});
//Add a realtime auth listener

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser){
    console.log(firebaseUser + " Logged In");
} else {
    console.log("Logged out");
  }
});

firebase.auth().onAuthStateChanged(function(user){
    if (user){
      var userid = user.displayName;
      document.getElementById("user").innerHTML = userid;
    } else{  
    }
});
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  window.open("http://aeriumsolution.com/","_self");
});
