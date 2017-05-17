var user = firebase.auth().currentUser;
var name = user.displayName

    if (user != null){
      const dbRefObject = firebase.database().ref().child(name);
      const dbRefList = dbRefObject.child()
      dbRefObject.on('value', snap => console.log(snap.val()));
      dbRefList.on('value', snap => console.log(snap.val()));
    }
