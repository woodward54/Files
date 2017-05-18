firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
      var name = user.displayName
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;
          console.log("Dates Loaded: " + childKey);

          var div = document.createElement("div");
          var i = document.createElement("input");
          //var text = document.createTextNode(childKey);
          i.type = "checkbox";
          i.value = childKey;


          div.appendChild(i);
          $(".dates").append(div);
        });
      });
  }
});
