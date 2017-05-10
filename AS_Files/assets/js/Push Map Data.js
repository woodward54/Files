var database = firebase.database();



// Function for writting SD data to firebase
function pushMapBlipData(Meth, Temp, Hum, Lat, Long, Spot) {
    firebase.database().ref('Reading ' + Spot).setWithPriority
        (
            {
                Meth: Meth,
                Temp: Temp,
                Hum: Hum,
                Lat: Lat,
                Long: Long,
                ID: Spot
            },
            Spot
        );
}
