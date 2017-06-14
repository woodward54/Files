
//Get elements
const txtEmail = document.getElementById('txtEmail');
const txtPassword = document.getElementById('txtPassword');
const btnLogin = document.getElementById('btnLogin');
const btnLogout = document.getElementById('btnLogout');
const bntBack = document.getElementById('btnBack');

btnLogin.addEventListener('click', e => {
// Get email and password
const email = txtEmail.value;
const pass = txtPassword.value;
const auth = firebase.auth();
//Sign in
const promise = auth.signInWithEmailAndPassword(email,pass);
promise.catch(e => {
  console.log(e.message);
  window.alert("The login information you have entered is not correct,\n" +
  "if you would like to set up an account with us, or recover information\n"+
  "from your account please contact us");
});
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser){
        window.location.href = "http://aeriumsolutions.com/dates";
        /*window.open("/dates","_self");*/
    } else {
     // alert("Wrong username or password!");
    }
  });
});

btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
  window.location.href = "http://aeriumsolutions.com/";
  /*window.open("http://aeriumsolution.com/","_self");*/
});

btnBack.addEventListener('click', e => {
   window.location.href = "http://aeriumsolutions.com/dates/";
});
