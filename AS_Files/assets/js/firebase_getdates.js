// Listner function that is activated upon login
firebase.auth().onAuthStateChanged(user => {
    if (user != null)
    {
      var name = user.displayName;
      const dateref = firebase.database().ref().child(name);

      dateref.once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
            var childKey = childSnapshot.key;

            // Assigning all of the dates in the companies directory to the first drop down box for dates
        	  var dates_ddbox = document.getElementById("dates-ddbox");
        	  dates_ddbox.options[dates_ddbox.options.length] = new Option(childKey, childKey);
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

// Functions that make sure the UAV and Flight drop down boxes have the propper elements
window.setInterval(function(){
  dateSearch();
  UAVSearch();
} ,500);

// Searchs to see if what UAV is selected, and adds the flights appropriately
function UAVSearch()
{
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
                    // Sets up the ref to where flights are in the current directory
                    const Flightref = firebase.database().ref(name + "/" + date + "/" + UAVname + "/");
                    var currentOpt = false;
                    if (UAVname != localStorage.UAVname || date != localStorage.date)
                    {
                          flight_ddbox.options.length = 0;
                    }

                    Flightref.once('value', function (snapshot){
          				        snapshot.forEach(function(childSnapshot){
          					             var childKey = childSnapshot.key;

                                 // Loop that checks if the current key is in the drop down box, if not it
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

function dateSearch()
{
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
