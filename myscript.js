var input_lat = 0;
var input_long = 0;


function savein(var1, output) {

    if (!document.getElementById(var1).value) {

         /* Printing no zip code entered in front html */

         document.getElementById(output).innerHTML = "You did not enter a Zip Code.";
         let fal2 = false;
         localStorage.setItem("let2", fal2);

    } else {

        /* Assigning Zip Code as userInput */
        /* Printing it to the assigned output element in front html  */
        /* Saving Zip Code as userInput */

        let userInput = document.getElementById(var1).value;
        localStorage.setItem("savedZipCode", userInput);


        let fal2 = true;
        localStorage.setItem("let2", fal2);

        /* Accessing Zip Code as userInput */
        let savedCode = localStorage.getItem("savedZipCode");
        document.getElementById(output).innerHTML = "You entered " + savedCode + " as a Zip Code.";
    }

}

updateCoordinates();

/*
if (localStorage.getItem("let2") === "false") {
    updateCoordinates();
    document.getElementById("zip_entered").innerHTML = "You did not enter a zip code.";
} else {
    updateCoordinates();
}
*/


/*
if (localStorage.getItem("let2") == "true") {
    updateCoordinates();
} else {
    updateCoordinates();
    document.getElementById("zip_entered").innerHTML = "You did not enter a zip code. ";
}
    */


/*
fetching zip code from the url:
""
https://gist.githubusercontent.com/erichurst/7882666/raw/5bdc46db47d9515269ab12ed6fb2850377f
d869e/US%2520Zip%2520Codes%2520from%25202013%2520Government%2520Data
""

and changing the longitude and altitude of the map to that

*/

async function updateCoordinates() {
    const zipcode = localStorage.getItem("savedZipCode"); // Get the saved zip code
    const result = await fetchZipData(zipcode); // Wait for the function to complete

    if (result) { // If valid result is returned
        input_lat = result.latitude;
        input_long = result.longitude;
        document.getElementById("zip_entered").innerHTML = "You entered zip code "
        + zipcode + " with a latitude of " + input_lat + " and longitude " + input_long;
        createMap(input_lat, input_long);
    } else {
        createMap();
        document.getElementById("zip_entered").innerHTML = "Zip code not found.";
    }
}

async function fetchZipData(zipcode) {
    try {
        const response = await fetch('https://gist.githubusercontent.com/erichurst/7882666/raw/5bdc46db47d9515269ab12ed6fb2850377fd869e/US%2520Zip%2520Codes%2520from%25202013%2520Government%2520Data'); // Replace with actual URL
        const data = await response.text(); // Get raw text data

        // Split data into lines
        const lines = data.split("\n");

        for (let line of lines) {
            let [zip, lat, lon] = line.split(","); // Assuming CSV format

            if (zip.trim() === zipcode) { // Match the entered zip code
                console.log(`Zip Code: ${zip}, Latitude: ${lat}, Longitude: ${lon}`);
                return { latitude: lat.trim(), longitude: lon.trim() };
            }
        }

        console.log("Zip code not found.");
        return null;
    } catch (error) {
        console.error("Error fetching zip code data:", error);
    }
}

function createMap(lat = 39.7684, long = -86.1581) {
    // Default coordinates are for Indianapolis, Indiana (39.7684° N, 86.1581° W)

    // Define the map's initial configuration
    let mapHash = {
        center: [lat, long],
        zoom: 11
    };

    // Create the Leaflet map and set the tile layer
    var layer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
    var map = new L.map('map', mapHash);
    map.addLayer(layer);

    // Define the custom green icon
    var greenIcon = L.icon({
        iconUrl: 'images/leaf-green.png',
        shadowUrl: 'images/leaf-shadow.png',

        iconSize: [38, 95], // Size of the icon
        shadowSize: [50, 64], // Size of the shadow
        iconAnchor: [22, 94], // Point of the icon that corresponds to the marker's location
        shadowAnchor: [4, 62], // Shadow anchor
        popupAnchor: [-3, -76] // Popup anchor relative to iconAnchor
    });

    // Add a marker to the map at the provided or default location
    var marker = L.marker([lat, long], { icon: greenIcon });
    marker.addTo(map);

    return map; // Return the created map if needed for further use
}
