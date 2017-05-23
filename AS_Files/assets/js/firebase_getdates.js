firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
      var name = user.displayName
      const dbRefObject = firebase.database().ref().child(name);
      dbRefObject.once('value', function(snapshot){
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
  var getd = new Date();
  getdd = getd.getDate();
  var getm = new Date();
  getmm = getm.getMonth();
  var gety = new Date();
  y = gety.getFullYear();

    if (getdd <= 9){d = "0" + getdd;}
      else {d = getdd;}
    if (getmm <= 9){m = "0" + getmm;}
      else {m = getmm;}
m+1;
  var dt = m + "_" + d + "_" + y;
  console.log("The Date is: " + dt);
}


window.setInterval(function(){
  fsearch();
},500);

function fsearch() {
    var checked_vals = [];
    var date;
    $('#dates input:checkbox:checked').each(function(index) {
        checked_vals.push($(this).val());
    });
    //console.log(checked_vals);
    if (checked_vals.length === 1){
      if (checked_vals === "Realtime"){
        makedate();
        date = dt;
        localStorage.date = date;
        window.open("/map","_self");
      }
      else {
        date = checked_vals;
        localStorage.date = date;
        window.open("/map","_self");
      }
    }

}
