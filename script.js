console.log('Hello!');

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const selectedUni = params.getAll("uni");


// Leaflet Map
var map;

//  Hash Map of Universities-  latitudem, longitude, preferred zoom on OpenStreetMap, fullname, and .json file
const universities = new Map([
    ["IUI", {
      latitude: 39.775991,
      longitude: -86.176811,
      zoom: 14,
      fullName: "Indiana University, Indianapolis",
      dataFile: "Restaurants-Data/IndianaUniversityIndianapolis.json"
    }],
    ["IVYTC", {
      latitude: 39.804199,
      longitude: -86.158626,
      zoom: 15,
      fullName: "Ivy Tech Community College",
      dataFile: "Restaurants-Data/IvyTechCommunityCollege.json"
    }],
    ["PUI", {
      latitude: 39.773967,
      longitude: -86.172804,
      zoom: 14,
      fullName: "Purdue University, Indianapolis",
      dataFile: "Restaurants-Data/PurdueUniversityIndianapolis.json"
    }],
    ["UIndy", {
      latitude: 39.709967,
      longitude: -86.134518,
      zoom: 15,
      fullName: "University of Indianapolis",
      dataFile: "Restaurants-Data/UniversityOfIndianapolis.json"
    }],
    ["MarianU", {
      latitude: 39.812334,
      longitude: -86.204259,
      zoom: 15,
      fullName: "Marian University",
      dataFile: "Restaurants-Data/MarianUniversity.json"
    }],
    ["ButlerU", {
      latitude: 39.841010,
      longitude: -86.174033,
      zoom: 15,
      fullName: "Butler University",
      dataFile: "Restaurants-Data/ButlerUniversity.json"
    }],
    ["MartU", {
      latitude: 39.798712,
      longitude: -86.104,
      zoom: 17,
      fullName: "Martin University",
      dataFile: "Restaurants-Data/MartinUniversity.json"
    }]
  ]);


// Creating Icon Class
var LeafIcon = L.Icon.extend({
    options: {
        shadowUrl: 'images/leaf-shadow.png',
        iconSize:     [38, 95],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor:  [-3, -76]
    }
});

// red icon
var redIconObject = new LeafIcon({iconUrl: 'images/leaf-red.png'});
// green icon
var greenIconObject = new LeafIcon({iconUrl: 'images/leaf-green.png'});

// Creating Map
function createMap(lat = 39.7684, long = -86.1581, zoom_input = 11) {
    console.log(arguments.length);
    // Default coordinates are for Indianapolis, Indiana (39.7684° N, -86.1581° W)

        var singleUniversity;
        console.log(selectedUni.length + " apples");
        var size = selectedUni.length;

        if (size === 1) {
            singleUniversity = universities.get(selectedUni[0]);
            lat = singleUniversity.latitude;
            long = singleUniversity.longitude,
            zoom_input = singleUniversity.zoom
        }

        // Define the map's coordinates as per user inpu
        var mapHash = {
            center: [lat, long],
            zoom: zoom_input
        };


        // Create the Leaflet map and set the tile layer
        map = new L.map('map', mapHash);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {maxZoom: 40, attribution: '© OpenStreetMap' }).addTo(map);

            addIcons(selectedUni);
            if (selectedUni.length === 1) {
                addCircle(selectedUni);
            }
            addMarkers(selectedUni);

    // Return the created map if needed for further use
    return map;
}

createMap();

// function to add icons
function addIcons(array_universities) {
    for (var i of array_universities) {

        let lat = universities.get(i).latitude;
        let long = universities.get(i).longitude;

        // creating red icon
        let greenIcon = L.marker([lat, long] , { icon : greenIconObject} );
        // adding icon to map
        greenIcon.addTo(map);
    }
}

function addCircle(array_universities) {
    for (var i of array_universities) {

        let lat = universities.get(i).latitude;
        let long = universities.get(i).longitude;

        var circle = L.circle([lat, long], {
            color: '#2471a3',
            fillColor: '#2471a3',
            fillOpacity: 0.5,
            radius: 4000
        });

        circle.addTo(map);
    }
}

function addMarkers(array_universities) {
    for (var i of array_universities) {
        let uniFile = universities.get(i);

        let url = uniFile.dataFile;
        fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // loops through file containing data
            for (let i = 0; i < data.length; i ++ ) {

                let item = data[i];

                var restauraunt_marker = L.marker([item.latitude, item.longitude], {alt: item.name});

                // creating text for each marker
                const popupContent =
                    `<b>Name:</b> ${item.name}<br>` +
                    `<b>Address:</b> ${item.address}<br>` +
                    `<b>Price:</b> ${item.price}<br>` +
                    `<b>Miles From Campus:</b> ${item.milesFromCampus}<br>` +
                    `<b>Date Info Entered:</b> ${item.dateInfoEntered}<br>`
                    // `<a href="" target="_blank"></a>`;

                restauraunt_marker.addTo(map).bindPopup(popupContent);
            }
        })
        .catch(function(error) {
            console.log('Error loading JSON:', error);
        });
    }
}

for (let i of selectedUni) {
    let uniData = universities.get(i);
    console.log(uniData.fullName);
}
console.log("bye world");

/*
Unused Icons:

    // orange
    var orangeIconObject = new LeafIcon({iconUrl: 'images/leaf-orange.png'});
    let orangeIcon = L.marker([lat, long] , { icon : orangeIconObject} );

*/
