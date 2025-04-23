console.log('Hello!');

// Get URL parameters
const params = new URLSearchParams(window.location.search);

const apples = [];

for (let i = 0; i < 7; i++) {
    const selectedUni = params.get("uni");
    apples.push(selectedUni);
}


// Leaflet Map
var map;

//  Hash Map of Universities-  latitudem, longitude, preferred zoom on map, name, and .json file
const universities = new Map([
    ["IUI", [39.775991, -86.176811, 14, "Indiana University, Indianapolis", 'Restaurants-Data/IndianaUniversityIndianapolis.json']],
    ["IVYTC", [39.804199, -86.158626, 15, "Ivy Tech Community College", 'Restaurants-Data/IvyTechCommunityCollege.json']],
    ["PUI", [39.773967, -86.172804, 14, "Purdue University, Indianapolis", 'Restaurants-Data/PurdueUniversityIndianapolis.json']],
    ["UIndy", [39.709967, -86.134518,15, "University of Indianapolis", 'Restaurants-Data/UniversityOfIndianapolis.json']],
    ["MarianU", [39.812334,  -86.204259, 15, "Marian University", 'Restaurants-Data/MarianUniversity.json']],
    ["ButlerU", [39.841010, -86.174033, 15, "Butler University", 'Restaurants-Data/ButlerUniversity.json' ]],
    ["MartU", [39.798712, -86.104, 17, "Martin University", 'Restaurants-Data/MartinUniversity.json']],
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
    // Default coordinates are for Indianapolis, Indiana (39.7684° N, 86.1581° W)

    if (arguments.length < 3) {
        lat = 39.821302;
        long = -86.157146;
        zoom = 20;
    }

    // Define the map's coordinates as per user input
    var mapHash = {
        center: [lat, long],
        zoom: zoom_input
    };

    // Create the Leaflet map and set the tile layer
    map = new L.map('map', mapHash);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {maxZoom: 40, attribution: '© OpenStreetMap' }).addTo(map);


    // if they selected a university, then we'll set a circle to a 2.5mile radius of respective institution
    if (arguments.length > 2) {
        // creating red icon
        let redIcon = L.marker([lat, long] , { icon : redIconObject} );

        // adding icon to map
        redIcon.addTo(map);

        // adding circle to map
        var circle = L.circle([lat, long], {
            color: '#2471a3',
            fillColor: '#2471a3',
            fillOpacity: 0.5,
            radius: 4000
        });

        circle.addTo(map);
    }

    // Return the created map if needed for further use
    return map;
}


// function to add icons to map if they select blank
function addIcons() {
    for (let [key,value] of universities) {
        let lat = value[0];
        let long = value[1];

        // creating red icon
        let greenIcon = L.marker([lat, long] , { icon : greenIconObject} );
        // adding icon to map
        greenIcon.addTo(map);

    }
}


// Main function of program- creates map and sets markers
function universityEntered(uni_name) {
    let lat;
    let long;
    let zoom;

    var university;
    var uni_file;

    if (uni_name) {
        lat = (universities.get(uni_name)[0]);
        long = (universities.get(uni_name)[1]);
        zoom = (universities.get(uni_name)[2]);
        university = (universities.get(uni_name)[3]);
        uni_file = (universities.get(uni_name)[4]);
    } else {
        university = "No Option";
        createMap();
        addIcons();
    }

    document.getElementById("title").innerHTML = university;
    document.getElementById("demo").innerHTML = `<br>${university}, great choice! Team Green hopes you have a wonderful day 😁</br>`;

    fetchUniData(uni_file);
    createMap(lat, long, zoom);
}

// fetches data from university/college's data file for restaurants/reads
// turns every restaurant entered into marker
function fetchUniData(url) {
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

for (let x of apples) {
    universityEntered(x);
    console.log(x);
}

/*
Unused Icons:

    // orange
    var orangeIconObject = new LeafIcon({iconUrl: 'images/leaf-orange.png'});
    let orangeIcon = L.marker([lat, long] , { icon : orangeIconObject} );

*/
