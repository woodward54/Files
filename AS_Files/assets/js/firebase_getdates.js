var user = firebase.auth().currentUser;


    if (user != null){
      var name = user.displayName
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.on('value', snap => console.log(snap.val()));
      dbRefObject.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;
          console.log("Dates Loaded: " + childKey);

        });
      });
    }

console.log(childKey(2));
/*for (childKey(n)
  var s = document.createElement("input");
    s.setAttribute('type',"checkbox");
    s.setAttribute('value',"");

    f.appendChild(s);

    document.getElementsByTagName('body')[0].appendChild(f);*/
