var user = firebase.auth().currentUser;
var name = user.displayName;

    if (user != null){
      const dbRefObject = firebase.database().ref().child(name)
      dbRefObject.on('value', snap => consle.log(snap.val()));


    }
});
