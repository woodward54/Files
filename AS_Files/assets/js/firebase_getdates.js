var user = firebase.auth().currentUser;
var name = user.displayName;
console.log("getdates started");
    if (user != null){
      console.log("getdates if");
      console.log(name);
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.on('value', snap => console.log(snap.val()));
    }
