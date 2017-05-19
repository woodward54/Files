firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
      var name = user.displayName
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.on('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;
          console.log("Dates Loaded: " + childKey);


          /*var div = document.createElement("div");
          var i = document.createElement("input");
          i.type = "checkbox";
          i.value = childKey;
          var text = document.createTextNode(" " + childKey);
          div.appendChild(i);
          div.appendChild(text);
          $(".dates").append(div);*/

          var i = document.createElement("input");
          i.type = "checkbox";
          i.value = childKey;
          var text = document.createTextNode(" " + childKey);
          var br = document.createElement('br');
          document.getElementById('dates').appendChild(i);
          document.getElementById('dates').appendChild(text);
          document.getElementById('dates').appendChild(br);
        });
      });
  }
});

window.setInterval(function(){
  fsearch();
},500);

function fsearch() {
    var checked_vals = [];
    $('#dates input:checkbox:checked').each(function(index) {
        checked_vals.push($(this).val());
    });
    console.log(checked_vals);
}

date = "05_01_2017";
