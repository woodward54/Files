// JavaScript source code


    function SDlog(inMeth, inTemp, inHum, inLat, inLong, inID) {
        this.Meth = inMeth;
        this.Temp = inTemp;
        this.Hum = inHum;
        this.Lat = inLat;
        this.Long = inLong;
        this.ID = inID;
    }

var SDlist = [];

var count = 0;

var pullData = firebase.database().ref('Aerium/');

/*pullData.once('value', function (snapshot) {
    snapshot.forEach(function () {
        SDlist.push(new SDlog(snapshot.val()["Reading " + count].Meth, snapshot.val()["Reading " + count].Temp, snapshot.val()["Reading " + count].Hum, snapshot.val()["Reading " + count].Lat, snapshot.val()["Reading " + count].Long, snapshot.val()["Reading " + count].ID));
        console.log(snapshot.val()["Reading " + count].Meth + " " + snapshot.val()["Reading " + count].Temp + " " + snapshot.val()["Reading " + count].Hum + " " + snapshot.val()["Reading " + count].Lat + " " + snapshot.val()["Reading " + count].Long + " " + snapshot.val()["Reading " + count].ID);
        count++;
    });*/
//console.log(snapshot.val())
//console.log(snapshot.val().Meth + " " + snapshot.val().Temp + " " + snapshot.val().Hum + " " + snapshot.val().Lat + " " + snapshot.val().Long + " " + snapshot.val().ID);

//console.log(SDlist.length);

//console.log(SDlist);
//new SDlog(Meth[count], Temp[count], Hum[count], Lat[count], Long[count], count)
/*    snapshot.forEach(function () {
SDlist.push();
})*/


var map;
//Innitializes the map


function initMap() {

    pullData.once('value', function (snapshot) {
        snapshot.forEach(function () {
            SDlist.push(new SDlog(snapshot.val()["Reading " + count].Meth, snapshot.val()["Reading " + count].Temp, snapshot.val()["Reading " + count].Hum, snapshot.val()["Reading " + count].Lat, snapshot.val()["Reading " + count].Long, snapshot.val()["Reading " + count].ID));
            console.log(snapshot.val()["Reading " + count].Meth + " " + snapshot.val()["Reading " + count].Temp + " " + snapshot.val()["Reading " + count].Hum + " " + snapshot.val()["Reading " + count].Lat + " " + snapshot.val()["Reading " + count].Long + " " + snapshot.val()["Reading " + count].ID);
            count++;
        });
        console.log(snapshot.val())



        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: SDlist[0].Lat, lng: SDlist[0].Long },
            zoom: 17,
        });


        //Creates the red and green marker icons
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



        //This for loop will take a count of our individual data points, and plot their info to them in an info window, PLEASE don't mess with, it's delicate
        var numLocations = count;   //Num locations is ALSO the size of all of the data arrays!
        //var count;

        for (count = 0; count < numLocations - 1; count++) {


            var contentString = '<div id="content">' +
                '<div id="siteNotice">' +
                '</div>' +
                '<h1 id="firstHeading" class="firstHeading">Info</h1>' +
                '<div class="MapDisp">' +
                  '<p>LATITUDE: <strong>' + SDlist[count].Lat + '</strong><br>LONGITUDE: <strong>' + SDlist[count].Long + '</strong><br>METHANE: <strong>' + SDlist[count].Meth + '</strong><br>TEMPERATURE: <strong>' + SDlist[count].Temp + '</strong><br> HUMIDITY: <strong>' + SDlist[count].Hum + '</strong><br><\p><\div>';

            if (SDlist[count].Meth > 400) {
                var marker = new google.maps.Marker
                    ({
                        position: { lat: SDlist[count].Lat, lng: SDlist[count].Long },
                        icon: circleRed,
                        map: map,
                        title: 'GeoPoint' + (count + 1)
                    });
                attachMessage(marker, contentString);
            }
            else if (SDlist[count].Meth > 300) {
                var marker = new google.maps.Marker
                    ({
                        position: { lat: SDlist[count].Lat, lng: SDlist[count].Long },
                        icon: circleOrange,
                        map: map,
                        title: 'GeoPoint' + (count + 1)
                    });
                attachMessage(marker, contentString);
            }
            else if (SDlist[count].Meth > 150) {
                var marker = new google.maps.Marker
                   ({
                       position: { lat: SDlist[count].Lat, lng: SDlist[count].Long },
                       icon: circleYellow,
                       map: map,
                       title: 'GeoPoint' + (count + 1)
                   });
                attachMessage(marker, contentString);
            }
            else {
                var marker = new google.maps.Marker
                    ({
                        position: { lat: SDlist[count].Lat, lng: SDlist[count].Long },
                        icon: circleGreen,
                        map: map,
                        title: 'GeoPoint' + (count + 1)
                    });
                attachMessage(marker, contentString);
            }
        }



        // HEY! Leave this alone, It's delicate
        function attachMessage(marker, contentString) {
            var infowindow = new google.maps.InfoWindow({ content: contentString });

            marker.addListener('click', function ()
            { infowindow.open(marker.get('map'), marker); });
        }

        for (var i = 0; i < (count) ; i++) {
            pushMapBlipData(SDlist[i].Meth, SDlist[i].Temp, SDlist[i].Hum, SDlist[i].Lat, SDlist[i].Long, SDlist[i].ID);
        }

    });
}
