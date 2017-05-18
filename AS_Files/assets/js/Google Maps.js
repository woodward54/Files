// JavaScript source code


// Class constructor for mapBlip
function mapBlip(inMeth, inTemp, inHum, inLat, inLong, inID, inTime) {
    this.Meth = inMeth;
    this.Temp = inTemp;
    this.Hum = inHum;
    this.Lat = inLat;
    this.Long = inLong;
    this.ID = inID;
    this.Time = inTime;
}

// Array for storing mapBlip's
var blipList = [];
// Iteration variable
var count = 0;
// Innitializes the map
var map;

firebase.auth().onAuthStateChanged(user => {
  if (user != null) {
      name = user.displayName;
      email = user.email;
      console.log("Loading: " + name + "'s Data");
      var pullData = firebase.database().ref(name + "/05_01_2017/");
    }
});



function initMap() {

      pullData.on('value', function (snapshot) {
          snapshot.forEach(function () {
              blipList.push(new mapBlip(snapshot.val()["Reading " + count].Meth, snapshot.val()["Reading " + count].Temp, snapshot.val()["Reading " + count].Hum, snapshot.val()["Reading " + count].Lat, snapshot.val()["Reading " + count].Long, snapshot.val()["Reading " + count].ID,/* snapshot.val()["Reading " + count].time*/"00:00:00"));
              console.log(snapshot.val()["Reading " + count].Meth + " " + snapshot.val()["Reading " + count].Temp + " " + snapshot.val()["Reading " + count].Hum + " " + snapshot.val()["Reading " + count].Lat + " " + snapshot.val()["Reading " + count].Long + " " + snapshot.val()["Reading " + count].ID + " " );
              count++;
          });
         console.log(snapshot.val())

          // Creates the map centered around the spot of the first Lat and Long values
          map = new google.maps.Map(document.getElementById('map'), {
              center: { lat: blipList[0].Lat, lng: blipList[0].Long },
              zoom: 17,
          });

          // Function that assigns the same info window to each marker node, this allows there to only be one info window on the screen at a time
          var infowindow = new google.maps.InfoWindow();
          function attachMessage(marker, contentString) {

              marker.addListener('click', function () {
                  infowindow.open(marker.get('map'), marker);
                  infowindow.setContent(contentString);
              });
          }


          //Creates the colored marker icons
          var circleRed = {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: 'red',
              fillOpacity: .5,
              scale: 4.5,
              strokeColor: 'black',
              strokeWeight: 1
          };
          var circleOrange = {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: 'orange',
              fillOpacity: .5,
              scale: 4.5,
              strokeColor: 'black',
              strokeWeight: 1
          };
          var circleYellow = {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: 'yellow',
              fillOpacity: .5,
              scale: 4.5,
              strokeColor: 'black',
              strokeWeight: 1
          };
          var circleGreen = {
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: 'green',
              fillOpacity: .5,
              scale: 4.5,
              strokeColor: 'black',
              strokeWeight: 1
          };


          var marker;
          var contentString;

          //This for loop will take a count of our individual data points, and plot their info to them in an info window, PLEASE don't mess with, it's delicate
          var numLocations = count;   //Num locations is ALSO the size of all of the data arrays!
          //var count;

          for (count = 0; count < numLocations - 1; count++) {

              // String of text for the click window
              contentString = '<div id="content">' +
                  '<div id="siteNotice">' +
                  '</div>' +
                  '<h1 id="firstHeading" class="firstHeading">Reading ' + (count+1) + '</h1>' +
                  '<div class="MapDisp">' +
                  '<p>LATITUDE: <strong>' + blipList[count].Lat + '</strong><br>LONGITUDE: <strong>' + blipList[count].Long + '</strong><br>METHANE: <strong>' + blipList[count].Meth + '</strong><br>TEMPERATURE: <strong>' + blipList[count].Temp + '</strong><br> HUMIDITY: <strong>' + blipList[count].Hum + '</strong><br> TIME: <strong>' + blipList[count].Time + '</strong><br><\p><\div>';

              if (blipList[count].Meth > 400) {
                  marker = new google.maps.Marker
                      ({
                          position: { lat: blipList[count].Lat, lng: blipList[count].Long },
                          icon: circleRed,
                          map: map,
                          title: 'Reading ' + (count + 1)
                      });
                  attachMessage(marker, contentString);
              }
              else if (blipList[count].Meth > 300) {
                  marker = new google.maps.Marker
                      ({
                          position: { lat: blipList[count].Lat, lng: blipList[count].Long },
                          icon: circleOrange,
                          map: map,
                          title: 'Reading ' + (count + 1)
                      });
                  attachMessage(marker, contentString);
              }
              else if (blipList[count].Meth > 150) {
                  marker = new google.maps.Marker
                     ({
                         position: { lat: blipList[count].Lat, lng: blipList[count].Long },
                         icon: circleYellow,
                         map: map,
                         title: 'Reading ' + (count + 1)
                     });
                  attachMessage(marker, contentString);
              }
              else {
                  marker = new google.maps.Marker
                      ({
                          position: { lat: blipList[count].Lat, lng: blipList[count].Long },
                          icon: circleGreen,
                          map: map,
                          title: 'Reading ' + (count + 1)
                      });
                  attachMessage(marker, contentString);
              }
          }


          //  COMMENTED OUT BECAUSE IT'S ONLY NECESSARY FOR DEBUGGING/FORMATING DATA
          // Puts data onto the fire base PATH IS DEFINED IN INDEX SCRIPT OR "Push Map Data.js"
          /*for (var i = 0; i < (count+1); i++) {
              pushMapBlipData(blipList[i].Meth, blipList[i].Temp, blipList[i].Hum, blipList[i].Lat, blipList[i].Long, blipList[i].ID, blipList[i].Time);
          }*/

      });






    /* The .once() function is from fire base and essentially reads all of the child data in the node selected. The child data is stored inside snapshot.val()
     * running the .forEach() function loops through the children pushing their data onto the blipList array. */
}
