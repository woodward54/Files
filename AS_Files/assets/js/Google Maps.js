
// Variable with the database path

// The pullData definition for the actual website
/*
var user = firebase.auth().currentUser;
if (user != null) {
    name = user.displayName;
    email = user.email;
    console.log("Loading: " + name + "'s Data");
    var pullData = firebase.database().ref(name + "/05_01_2017/");
} else {
    console.log("ERROR: Not logged in");
}*/

var pullData = firebase.database().ref(name + "/" + localStorage.date + "/");

// Class constructor for mapBlip
function mapBlip(inMeth, inCO2, inTemp, inHum, inLat, inLong, inID, inTime, inPlotted) {
    this.Meth = inMeth;
    this.CO2 = inCO2;
    this.Temp = inTemp;
    this.Hum = inHum;
    this.Lat = inLat;
    this.Long = inLong;
    this.ID = inID;
    this.Time = inTime;
    this.Plotted = inPlotted;
}

// Arrays for storing and transferring mapBlip's
var tempBlipList = [];
var oldBlipList = [];
var blipList = [];
// Iteration variable
var count;
// Innitializes the map
var map;
// Amount of times that
var pullCount;

var lastID;


function initMap()
{
        /* The .once() function is from fire base and essentially reads all of the child data in the node selected. The child data is stored inside snapshot.val()
         * running the .forEach() function loops through the children pushing their data onto the blipList array. */
        pullData.once('value', function (snapshot) {
        var limit = blipList.length;
        for (var i = 0; i < limit; i++)
        {
            blipList.pop();
        }
        count = 0;
        snapshot.forEach(function () {

            // Cases have been added in to handle missing bits of data by filling in with a "No Read" tag. The section has been commented out to avoid issues with testing more important features
            /* // CASE: TEMP, HUM, & TIME UNDEFINED (Hum is implicitely checked, as in the current data set if there was a Temp, there was also a corresponding Hum
            if (snapshot.val()["Reading " + count].Temp === null && snapshot.val()["Reading " + count].Time === null)
            {
                    blipList.push(new mapBlip(snapshot.val()["Reading " + count].Meth, "No Read" , "No Read", snapshot.val()["Reading " + count].Lat, snapshot.val()["Reading " + count].Long, snapshot.val()["Reading " + count].ID,"No Read"));
                    console.log(snapshot.val()["Reading " + count].Meth + " " + snapshot.val()["Reading " + count].Lat + " " + snapshot.val()["Reading " + count].Long + " " + snapshot.val()["Reading " + count].ID + " " );
                    count++;
            }
            // CASE: TIME UNDEFINED
            else if (snapshot.val()["Reading " + count].Time === null)
            {
                blipList.push(new mapBlip(snapshot.val()["Reading " + count].Meth, snapshot.val()["Reading " + count].Temp, snapshot.val()["Reading " + count].Hum, snapshot.val()["Reading " + count].Lat, snapshot.val()["Reading " + count].Long, snapshot.val()["Reading " + count].ID, "No Read"));
                console.log(snapshot.val()["Reading " + count].Meth + " " + snapshot.val()["Reading " + count].Lat + " " + snapshot.val()["Reading " + count].Long + " " + snapshot.val()["Reading " + count].ID + " ");
                count++;
            }
            // CASE: METH UNDEFINED
            else if (snapshot.val()["Reading " + count].Meth === null)
            {
                blipList.push(new mapBlip("No Read", snapshot.val()["Reading " + count].Temp, snapshot.val()["Reading " + count].Hum, snapshot.val()["Reading " + count].Lat, snapshot.val()["Reading " + count].Long, snapshot.val()["Reading " + count].ID, snapshot.val()["Reading " + count].Time));
                console.log(snapshot.val()["Reading " + count].Lat + " " + snapshot.val()["Reading " + count].Long + " " + snapshot.val()["Reading " + count].ID + " ");
                count++;
            }
            else
            {*/
                blipList.push(new mapBlip(snapshot.val()["Reading " + count].Meth, snapshot.val()["Reading " +count].CO2, snapshot.val()["Reading " +  count].Temp, snapshot.val()["Reading " +  count].Hum, snapshot.val()["Reading " +  count].Lat, snapshot.val()["Reading " +  count].Long, snapshot.val()["Reading " + count].ID, snapshot.val()["Reading " +  count].Time, false));
                console.log(snapshot.val()["Reading " + count].Meth, snapshot.val()["Reading " + count].CO2 , snapshot.val()["Reading " +  count].Temp, snapshot.val()["Reading " +  count].Hum, snapshot.val()["Reading " +  count].Lat, snapshot.val()["Reading " +  count].Long, snapshot.val()["Reading " + count].ID, snapshot.val()["Reading " +  count].Time);
                lastID = snapshot.val()["Reading " + count].ID
            //console.log(snapshot.val()["Reading " + count].Lat + " " + snapshot.val()["Reading " + count].Long + " " + snapshot.val()["Reading " + count].ID + " ");
                count++;

                    //This if statement was to exclude some bunk data points from 05_18_2017, keeping around so that we know where the problems were(additionally 1-9 were skipped

            /* if (count == 33 || count == 69 || count == 83 || count == 98 || count == 113 || count==128 || count == 143 || count == 363 || count == 377)
                {
                    count++;
                }*/
            //}
        });
        console.log(lastID);
        pullCount++;
        if (pullCount != 1)
        {
           // refreshMarkers(markerList);
        }

       // only for reading from the broken data set
       // count = count-18;



       // Creates the map centered around the spot of the first Lat and Long values
       map = new google.maps.Map(document.getElementById('map'),
        {
            center: { lat: blipList[0].Lat, lng: blipList[0].Long },
            zoom: 16
        });

        // Function that assigns the same info window to each marker node, this allows there to only be one info window on the screen at a time


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
        var markerList = [];

        //This for loop will take a count of our individual data points, and plot their info to them in an info window, PLEASE don't mess with, it's delicate
        function setBlips(blipList)
        {
            for (j = 0; j < blipList.length; j++) {
                if (blipList[j].Plotted === false) {
                    // String of text for the click window
                    contentString = '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">Reading ' + blipList[j].ID + '</h1>' +
                        '<div class="MapDisp">' +
                        '<p>LATITUDE: <strong>' + blipList[j].Lat +
                        '</strong><br>LONGITUDE: <strong>' + blipList[j].Long +
                        '</strong><br>METHANE: <strong>' + blipList[j].Meth +
                        '</strong><br>CO2: <strong>' + blipList[j].CO2 +
                        '</strong><br>TEMPERATURE: <strong>' + blipList[j].Temp +
                        '</strong><br> HUMIDITY: <strong>' + blipList[j].Hum +
                        '</strong><br> TIME: <strong>' + blipList[j].Time +
                        '</strong><br><\p><\div>';

                    if (blipList[j].CO2 > 800) {
                        marker = new google.maps.Marker
                            ({
                                position: { lat: blipList[j].Lat, lng: blipList[j].Long },
                                icon: circleRed,
                                //animation: google.maps.Animation.DROP,
                                map: map,
                                title: 'Reading ' + blipList[j].ID
                            });
                        attachMessage(marker, contentString);
                    }
                    else if (blipList[j].CO2 > 600) {
                        marker = new google.maps.Marker
                            ({
                                position: { lat: blipList[j].Lat, lng: blipList[j].Long },
                                icon: circleOrange,
                                map: map,
                                title: 'Reading ' + blipList[j].ID
                            });
                        attachMessage(marker, contentString);
                    }
                    else if (blipList[j].CO2 > 400) {
                        marker = new google.maps.Marker
                           ({
                               position: { lat: blipList[j].Lat, lng: blipList[j].Long },
                               icon: circleYellow,
                               map: map,
                               title: 'Reading ' + blipList[j].ID
                           });
                        attachMessage(marker, contentString);
                    }
                    else {
                        marker = new google.maps.Marker
                            ({
                                position: { lat: blipList[j].Lat, lng: blipList[j].Long },
                                icon: circleGreen,
                                map: map,
                                title: 'Reading ' + blipList[j].ID
                            });
                        attachMessage(marker, contentString);
                    }
                    markerList.push(marker);
                    blipList[j].Plotted = true;
                    //lastID = blipList[j].ID;
                }
            }
        }
        setBlips(blipList);
        /*
        function refreshMarkers()
        {

            setTimeout(function ()
            {
                for (var i = 0; i < markerList.length; i++)
                {
                    markerList[i].setMap(null);
                }
                console.log("REFRESH")
                setBlips(blipList);
                refreshMarkers();
            }, 2500);

        }
        refreshMarkers(markerList);
        */
        console.log(lastID);
        pullData.orderByChild("ID").startAt(lastID+1).on("child_added", function (snapshot)
        {

                blipList.push(new mapBlip(snapshot.val()/*["Reading " + count]*/.Meth, snapshot.val()/*["Reading " + count]*/.CO2, snapshot.val()/*["Reading " + count]*/.Temp, snapshot.val()/*["Reading " + count]*/.Hum, snapshot.val()/*["Reading " + count]*/.Lat, snapshot.val()/*["Reading " + count]*/.Long, snapshot.val()/*["Reading " + count]*/.ID, snapshot.val()/*["Reading " + count]*/.Time, false));
                console.log(snapshot.val()/*["Reading " + count]*/.Meth, snapshot.val().CO2, snapshot.val()/*["Reading " + count]*/.Temp, snapshot.val()/*["Reading " + count]*/.Hum, snapshot.val()/*["Reading " + count]*/.Lat, snapshot.val()/*["Reading " + count]*/.Long, snapshot.val()/*["Reading " + count]*/.ID, snapshot.val()/*["Reading " + count]*/.Time);
                console.log(snapshot.val());
                setBlips(blipList);
        });

    });



    var infowindow = new google.maps.InfoWindow();
    function attachMessage(marker, contentString) {

        marker.addListener('click', function () {
            infowindow.open(marker.get('map'), marker);
            infowindow.setContent(contentString);
        });
    }


    //  COMMENTED OUT BECAUSE IT'S ONLY NECESSARY FOR DEBUGGING/FORMATING DATA
    // Puts data onto the fire base PATH IS DEFINED IN INDEX SCRIPT OR "Push Map Data.js"
    /* for (var i = 0; i < blipList.length; i++) {
        pushMapBlipData(blipList[i].Meth, blipList[i].CO2, blipList[i].Temp, blipList[i].Hum, blipList[i].Lat, blipList[i].Long, blipList[i].ID, blipList[i].Time);
    }*/


}



//updateMap();
/*
function addMarker() {
    setTimeout(function () {
        for (var i = 0; i < markerList.length; i++) {
            markerList[i].setMap(null);
        }

        markerList = [];
        console.log("REFRESH")
        setBlips(blipList);
       refreshMarkers();
    }, 60500);

}*/
