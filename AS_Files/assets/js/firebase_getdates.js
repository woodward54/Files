var user = firebase.auth().currentUser;
var name = user.displayName

    if (user != null){
      const dbRefObject = firebase.database().ref().child(name);
      const dbRefList = firebase.database().ref().child(name);
      console.log("object");
      dbRefObject.on('value', snap => console.log(snap.val()));
      console.log("list");
      dbRefList.on('value', snap => console.log(snap.val()));
    }
