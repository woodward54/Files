// JavaScript source code

firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
      name = user.displayName;
      console.log("Loading: " + name + "'s Data for Date: " + localStorage.date + "for flight " + localStorage.flight);
    } else{
      console.log("ERROR: Not Logged In")
      name = "ERROR"
      pullData = null;
    }
});
