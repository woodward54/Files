firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      var name = user.displayName
      const dbRefObject = firebase.database().ref().child(name);

      dbRefObject.once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;

          console.log("Dates Loaded: " + childKey);
          var i = document.createElement("input");
          i.type = "checkbox";
          i.value = childKey;
          var text = document.createTextNode(" " + childKey);
          var br = document.createElement('br');
          document.getElementById('dates').appendChild(i);
          document.getElementById('dates').appendChild(text);
          document.getElementById('dates').appendChild(br);

      /*    const dbRefObject2 = firebase.database().ref().child(name).child(childKey);
          dbRefObject2.once('value', function(snapshot){
            snapshot.forEach(function(childSnapshot2){
              var flight = childSnapshot2.key;
<<<<<<< HEAD



          console.log("Flight Number: " + flight);
          var p = document.createElement("input");
          p.type = "checkbox";
          p.value = childKey;
          p.Id = box;
          var text = document.createTextNode(" " + flight);
          var br = document.createElement('br');
          document.getElementById('dates').appendChild(p);
          document.getElementById('dates').appendChild(text);
          document.getElementById('dates').appendChild(br);
          //document.getElementById('box').appendChild(style);
=======
*/

	  for(var i =0; i < childKey.length; i++)
	  {
            var flightnum = "Flight " + (i+1);
            snapshot.val()[childKey].flightnum;
          	console.log("Flight Number: " + (i+1));

         	  //var para = document.createElement("P");
          	//var indent = document.createTextNode("  TEST  ");
          	var p = document.createElement("input");
          	p.type = "checkbox";
          	p.value = childKey;
          	var text = document.createTextNode(" " + (i+1));
          	var br = document.createElement('br');
          	//document.getElementById('dates').appendChild(para);
          	//document.getElementById('dates').appendChild(indent);
          	document.getElementById('dates').appendChild(p);
          	document.getElementById('dates').appendChild(text);
            document.getElementById('dates').appendChild(br);
        }

	 //document.getElementById('dates').appendChild(br);

          /*var div = document.createElement("div");
          var i = document.createElement("input");
          i.type = "checkbox";
          i.value = childKey;
          var text = document.createTextNode(" " + childKey);
          div.appendChild(i);
          div.appendChild(text);
          $(".dates").append(div);*/

//            });
  //        });
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
        date = checked_vals;

        //flight = checked_vals;
        localStorage.date = date;
        //localStorage.flight = flight;
        window.location.href = "http://aeriumsolutions.com/map";
        /*window.open("/map","_self");*/
    }

}
