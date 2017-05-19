firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
      var name = user.displayName
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;
          console.log("Dates Loaded: " + childKey);

          //var div = document.createElement("div");

          var i = document.createElement("input");
          i.type = "checkbox";
          i.value = childKey;
          document.getElementById("dates").appendChild(i);

          var div = document.getElementById('dates');
          var text = document.createTextNode(" " + childKey);
          div.appendChild(text);
          var br = document.createElement('br');
          div.appendChild(br);
          //$(".dates").append(div);
        });
      });
  }
});
