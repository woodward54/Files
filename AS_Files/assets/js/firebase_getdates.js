var user = firebase.auth().currentUser;


    if (user != null){
      var name = user.displayName
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;
          console.log("Dates Loaded: " + childKey);

          var div = document.createElement("div")
          var i = document.createElement("input");
          i.type = "checkbox";
          i.value = childKey;

          div.appendChild(i);
            var cont = document.getElementById('dates')[0].appendChild(div));
          }
        });
      });
    }
