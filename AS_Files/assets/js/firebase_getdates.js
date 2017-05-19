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



function makedate(){
  var d;
  var m;
  var getd = getDate();
  var getm = getMonth();
    if (getd <= 9){d = "0" + getDate();}
      else {d = getDate();}
    if (getMonth() <= 9){m = "0" + getMonth();}
      else {m = getMonth();}
  var y = getFullYear();
  var dt = d + "_" + m + "_" + y;
  console.log("The Date is: " + dt);
}
makedate();

window.setInterval(function(){
  fsearch();
},500);

function fsearch() {
    var checked_vals = [];
    var date;
    $('#dates input:checkbox:checked').each(function(index) {
        checked_vals.push($(this).val());
    });
    console.log(checked_vals);
    if (checked_vals.length === 1){
      if (checked_vals === "Realtime"){date = dt;}
      else {date = checked_vals;}
    }
    else {
      console.log("Feature not implmented yet")
    }



}
