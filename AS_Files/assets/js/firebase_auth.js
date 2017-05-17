//Add a realtime auth listener

firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser){
    console.log(firebaseUser + " Logged In");
} else {
    console.log("Logged out");
  }
});

firebase.auth().onAuthStateChanged(function(user){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid,emailVerified;

    if (user != null){
      name = user.displayName;
      email = user.email;
      console.log(name);
      console.log(email);
      document.getElementById("usern").innerHTML = name;
    }
});
