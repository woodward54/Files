//Add a realtime auth listener

firebase.auth().onAuthStateChanged(user => {
  if (user){
    console.log(user + " Logged In");
} else {
    console.log("Logged out");
  }
});

firebase.auth().onAuthStateChanged(function(user){
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid,emailVerified;
    //user.updateProfile({
      //displayName: "Boren"
    //});

    if (user != null){
      name = user.displayName;
      email = user.email;
      uid = user.uid;
      console.log("Disp Name: " + name);
      console.log("Email: " + email);
      console.log("Uid: " + uid);
      document.getElementById("usern").innerHTML = name + "'s Data";
    } else {
      document.getElementById("usern").innerHTML = "Not Logged In";
      alert("Please login on the homepage")
    }
});
