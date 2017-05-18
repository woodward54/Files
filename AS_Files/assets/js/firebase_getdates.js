var user = firebase.auth().currentUser;


    if (user != null){
      var name = user.displayName
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;
          console.log("Dates Loaded: " + childKey);

          var i = document.createElement('input');
          i.setAttribute('type','checkbox');
          i.setAttribute('name',childKey);

          var cont = document.getElementById('dates');
          cont.appendChild(i);
        });
      });
    }
