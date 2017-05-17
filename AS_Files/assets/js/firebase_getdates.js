var user = firebase.auth().currentUser;
var name = user.displayName

    if (user != null){
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.on('value', snap => console.log(snap.val()));
      dbRefObject.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          console.log("Key: " + childKey);
          console.log("Data: " + childData);
        });
      });
    }
