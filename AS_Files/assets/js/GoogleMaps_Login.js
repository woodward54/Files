// JavaScript source code

firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
      name = user.displayName;
      date1 = localStorage.date;
      console.log("Loading: " + name + "'s Data for Date: " + date1);

    } else{
      console.log("ERROR: Not Logged In")
      name = "ERROR"
      pullData = null;
    }
});

var pullData = firebase.database().ref(name + "/" + date1 + "/");
