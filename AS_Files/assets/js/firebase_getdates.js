firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
      var name = user.displayName;
      const dbRefObject = firebase.database().ref().child(name);

      dbRefObject.once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          var childKey = childSnapshot.key;

          console.log("Dates Loaded: " + childKey);
          /*var i = document.createElement("input");
          i.type = "checkbox";
          i.value = childKey;*/


//	  var text = document.createTextNode(" " + childKey);
	  // drop down box for dates
	  var dates_ddbox = document.getElementById("dates-ddbox");
	  dates_ddbox.options[dates_ddbox.options.length] = new Option(childKey, childKey);
	/*  var br = document.createElement('br');
          document.getElementById('dates').appendChild(i);
          document.getElementById('dates').appendChild(text);
          document.getElementById('dates').appendChild(br);*/

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
/*
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
*/
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
  dateSearch();
  UAVSearch();
} ,500);

function UAVSearch() {
    //var checkedvalues = []
      var user = firebase.auth().currentUser;
      var dates_ddbox = document.getElementById("dates-ddbox");
      var UAV_ddbox = document.getElementById("UAV-ddbox");
      var flight_ddbox = document.getElementById("flight-ddbox");
      if(user != null)
      {
          if(dates_ddbox.options.length > 0)
          {
              if(UAV_ddbox.options.length > 0)
              {
                    var name = user.displayName;
          			    var date = dates_ddbox.options[dates_ddbox.selectedIndex].text;
                    var UAVname = UAV_ddbox.options[UAV_ddbox.selectedIndex].text;
                    const Flightref = firebase.database().ref(name + "/" + date + "/" + UAVname + "/");
                    var currentOpt = false;
                    if (UAVname != localStorage.UAVname || date != localStorage.date)
                    {
                          console.log( "TEST TO SEE IF THIS EVER HAPPENS");
                          flight_ddbox.options.length = 0;
                    }

                    Flightref.once('value', function (snapshot){
          				        snapshot.forEach(function(childSnapshot){
          					             var childKey = childSnapshot.key;
          					             console.log("Child key: " + childKey);

                                 for (var i =0; i<flight_ddbox.options.length; i++)
                                 {
                                   if(flight_ddbox.options[i].value == childKey)
                                   {
                                     currentOpt = true;
                                   }
                                 }
                                 if (!currentOpt)
                                 {
                                   flight_ddbox.options[flight_ddbox.options.length] = new Option(childKey, childKey);
                                 }
                           });
                      });
              }
              localStorage.UAVname = UAVname;
          }
       	 	else
       	 	{
       	       		console.log("Still Loading...");
       	 	}
    }
  }

function dateSearch() {
    //var checkedvalues = []
      var user = firebase.auth().currentUser;
      if(user != null)
      {
          var dates_ddbox = document.getElementById("dates-ddbox");
          if(dates_ddbox.options.length > 0)
          {
              console.log("Text : " + dates_ddbox.options[dates_ddbox.selectedIndex].text +" Value : " + dates_ddbox.options[dates_ddbox.selectedIndex].value);


                  var name = user.displayName;
        			    var date = dates_ddbox.options[dates_ddbox.selectedIndex].text;
                  const UAVref = firebase.database().ref(name + "/" + date + "/");
                  var UAV_ddbox = document.getElementById("UAV-ddbox");
                  var currentOpt = false;
                  if (dates_ddbox.options[dates_ddbox.selectedIndex].text != localStorage.date)
                  {
                        console.log( "TEST TO SEE IF THIS EVER HAPPENS");
                        UAV_ddbox.options.length = 0;
                  }

                  UAVref.once('value', function (snapshot){
        				        snapshot.forEach(function(childSnapshot){
        					             var childKey = childSnapshot.key;
        					             console.log("Child key: " + childKey);

                               var UAV_ddbox = document.getElementById("UAV-ddbox");
                               for (var i =0; i<UAV_ddbox.options.length; i++)
                               {
                                 if(UAV_ddbox.options[i].value == childKey)
                                 {
                                   currentOpt = true;
                                 }
                               }
                               if (!currentOpt)
                               {
                                 UAV_ddbox.options[UAV_ddbox.options.length] = new Option(childKey, childKey);
                               }
                         });
                    });
               localStorage.date = date;
          }
       	 	else
       	 	{
       	       		console.log("Still Loading...");
                  return lastDate;
       	 	}
    }

/*    $('#dates input:checkbox:checked').each(function(index) {
        checked_vals.push($(this).val());
    });*/
    //console.log(checked_vals);
   /* if (checked_vals.length === 1){
        date = checked_vals;

        //flight = checked_vals;
        localStorage.date = date;
        //localStorage.flight = flight;
        window.location.href = "http://aeriumsolutions.com/map";*/
        /*window.open("/map","_self");*/
//    }

}

btnSubmit.addEventListener('click', e=> {
  var dates_ddbox = document.getElementById("dates-ddbox");
  var UAV_ddbox = document.getElementById("UAV-ddbox");
  var flight_ddbox = document.getElementById("flight-ddbox");

  localStorage.date = dates_ddbox.options[dates_ddbox.selectedIndex].text;
  localStorage.UAVname = UAV_ddbox.options[UAV_ddbox.selectedIndex].text;
  localStorage.flight = flight_ddbox.options[flight_ddbox.selectedIndex].text;
  console.log("Date: " + localStorage.date + " UAV: " + localStorage.UAVname + " Flight: " + localStorage.flight);
  window.location.href = "http://aeriumsolutions.com/map/";
});
