

// pullData is used with the name of the current user (name var defined in GoogleMaps_login), and the selected date that the user has selected to view on the previous page.
//var pullData = firebase.database().ref(name + "/" + localStorage.date + "/" + "Flight " + localStorage.flight);
var pullData = firebase.database().ref(name + "/" + localStorage.date + "/" + localStorage.UAVname + "/" + localStorage.flight + "/");
/*
    Description:            Class constructor for mapBlip
    Parameters:             "inMeth": integer var for Methane, measured in ppm
                            "inCO2": integer var for CO2, measured in ppm
                            "inTemp": integer var for temperature, measured in Celsius
                            "inHum": integer var for humidity , measured in ?????
                            "inLat": floating point var for latitude
                            "inLong": floating point var for longitude
                            "inID": integer var that represents the blip ID  that is intended to be assigned sequentially based closely on index
                            "inTime": string var that represemts time in the format "hh:mm:ss"
                            "inPlotted": boolean var that holds whether the blip data has been turned into a corresponding marker. true:plotted false:not plotted
    Note:                   (the ID is 1 more than the index to avoid having a 0 ID). It is very important for the current build
                            that the ID's are asssigned in such a way that the next data point (for "Reading 81" the next data point would be "Reading 82")
                            always has a higher ID value, as this is what the live updates works off of.
*/
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


// Innitializes the map
var map;



function initMap()
{

    // Array for storing mapBlip's
    var blipList = [];
    var count;
    // Used to keep track of the last ID originally loaded from firebase
    var lastID;

    /* The .once() method is from fire base and essentially reads all of the child data in the path selected. The child data is stored inside snapshot.val()
     * running the .forEach() function loops through the children pushing their data onto the blipList array. */
    pullData.once('value', function (snapshot) {
    count = 0;
    snapshot.forEach(function () {
            blipList.push(new mapBlip(snapshot.val()["Reading " + count].Meth, snapshot.val()["Reading " +count].CO2, snapshot.val()["Reading " +  count].Temp, snapshot.val()["Reading " +  count].Hum, snapshot.val()["Reading " +  count].Lat, snapshot.val()["Reading " +  count].Long, snapshot.val()["Reading " + count].ID, snapshot.val()["Reading " +  count].Time, false));
            console.log(snapshot.val()["Reading " + count].Meth, snapshot.val()["Reading " + count].CO2 , snapshot.val()["Reading " +  count].Temp, snapshot.val()["Reading " +  count].Hum, snapshot.val()["Reading " +  count].Lat, snapshot.val()["Reading " +  count].Long, snapshot.val()["Reading " + count].ID, snapshot.val()["Reading " +  count].Time);
            lastID = snapshot.val()["Reading " + count].ID
            count++;
        });


       // only for reading from the broken data set
       // count = count-18;

       if(typeof(blipList[0]) ==  "undefined")
       {
         console.log("THE BLIPLIST IS UNDEFINED AND THE WINDOW SHOULD RELOAD");
         window.location.reload(true);
       }

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



        /*
            Description:
            Parameters:             "marker"  Marker object (from google maps API)
                                    "contentString" string var for info window
            Note:                   The infowindow decleration and definition is outside of the function, so that every marker is assigned the same info window. This limits the system
                                    to only have one info window at a time, which is more aesthetically pleasing.
            Touched:                ??/??/???? -JD
        */
        function setBlips(blipList)
        {
            // This for loop will take a count of our individual data points, and plot their info to them in an info window
            for (j = 0; j < blipList.length; j++) {
                if (blipList[j].Plotted === false) {

                    // String of text for the click wiindow
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
        console.log(lastID);
        pullData.orderByChild("ID").startAt(lastID+1).on("child_added", function (snapshot)
        {

                blipList.push(new mapBlip(snapshot.val().Meth, snapshot.val().CO2, snapshot.val().Temp, snapshot.val().Hum, snapshot.val().Lat, snapshot.val().Long, snapshot.val().ID, snapshot.val().Time, false));
                console.log(snapshot.val().Meth, snapshot.val().CO2, snapshot.val().Temp, snapshot.val().Hum, snapshot.val().Lat, snapshot.val().Long, snapshot.val().ID, snapshot.val().Time);
                console.log(snapshot.val());
                setBlips(blipList);
        });

    });


    /*
        Description:            Takes in a marker and adds a listner that responds to clicks with the opening of an info window
        Parameters:             "marker"  Marker object (from google maps API)
                                "contentString" string var for info window
        Note:                   The infowindow decleration and definition is outside of the function, so that every marker is assigned the same info window. This limits the system
                                to only have one info window at a time, which is more aesthetically pleasing.
        Touched:                ??/??/???? -JD
    */
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
