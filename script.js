console.log('Hello!');

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const selectedUni = params.get("uni");

var map;

// Creating Map

function createMap(lat = 39.7684, long = -86.1581, zoom_input = 10) {
    // Default coordinates are for Indianapolis, Indiana (39.7684° N, 86.1581° W)

    // Define the map's coordinates as per user input
    var mapHash = {
        center: [lat, long],
        zoom: zoom_input
    };

    // Create the Leaflet map and set the tile layer
    map = new L.map('map', mapHash);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {maxZoom: 40, attribution: '© OpenStreetMap' }).addTo(map);


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

    // creating icon objects

        // red
        var redIconObject = new LeafIcon({iconUrl: 'images/leaf-red.png'});
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

    return map; // Return the created map if needed for further use
}

// Complete actions depending the entered university / college

function universityEntered(uni_name) {
    let lat;
    let long;
    let zoom = 15;
    let radius;

    if (uni_name) {
        document.getElementById("input").innerHTML = "You selected " + selectedUni;
    } else {
        createMap();
    }

    if (uni_name == "IUI") {
        let university = "Indiana University, Indianapolis";
        document.getElementById("input").innerHTML = `<br>${university}, great choice!</br>`;
        document.getElementById("title").innerHTML = university;
        lat = 39.775991;
        long =  -86.176811;
        zoom = 14;

        // adding icons near iui
        fetchUniData('Restaurants-Data/IndianaUniversityIndianapolis.json');
    }

    else if (uni_name == "IVYTC") {
        let university = "Ivy Tech Community College";
        document.getElementById("input").innerHTML = `<br>${university}- wait a second, we go there!</br>`;
        document.getElementById("title").innerHTML = university;
        lat = 39.804199;
        long = -86.158626;
        zoom = 15;

        fetchUniData('Restaurants-Data/IvyTechCommunityCollege.json');
    }

    else if (uni_name == "PUI") {
        let university = "Purdue University, Indianapolis";
        document.getElementById("input").innerHTML = `<br>${university}, great choice!</br>`;
        document.getElementById("title").innerHTML = university;
        lat = 39.773967;
        long =  -86.172804;
        zoom = 14;


        fetchUniData('Restaurants-Data/PurdueUniversityIndianapolis.json');

    }

    else if (uni_name == "UIndy") {
        let university = "University of Indianapolis";
        document.getElementById("input").innerHTML = `<br>${university}- wait, this is a thing?</br>`;
        document.getElementById("title").innerHTML = university;

        lat = 39.709967
        long = -86.134518;
        zoom = 15;

        fetchUniData('Restaurants-Data/UniversityOfIndianapolis.json');
    }


    else if (uni_name == "MarianU") {
        let university = "Marian University";
        document.getElementById("input").innerHTML = `<br>${university}, great choice!</br>`;
        document.getElementById("title").innerHTML = university;
        lat = 39.812334;
        long = -86.204259;
        zoom = 15;

        fetchUniData('Restaurants-Data/MarianUniversity.json');
    }

    else if (uni_name == "ButlerU") {
        let university = "Butler University";
        document.getElementById("input").innerHTML = `<br>${university}, great choice!</br>`;
        document.getElementById("title").innerHTML = university;
        lat = 39.841010;
        long = -86.174033;
        zoom = 15;

        fetchUniData('Restaurants-Data/ButlerUniversity.json');
    }

    else if (uni_name == "MartU") {
        let university = "Martin University";
        document.getElementById("input").innerHTML = `<br>${university}, great choice!</br>`;
        document.getElementById("title").innerHTML = university;
        lat = 39.798712;
        long = -86.104;
        zoom = 17;

        fetchUniData('Restaurants-Data/MartinUniversity.json');
    } else {
        createMap();
    }

    createMap(lat, long, zoom, radius);
}

function fetchUniData(uni_url) {
    fetch(uni_url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            for (let i = 0; i < data.length; i ++ ) {

                let item = data[i];
                var restauraunt_marker = L.marker([item.latitude, item.longitude], {alt: item.name});

                const popupContent =
                    `<b>Name:</b> ${item.name}<br>` +
                    `<b>Address:</b> ${item.address}<br>` +
                    `<b>Miles From Campus:</b> ${item.milesFromCampus}<br>` +
                    `<b>Date Info Entered:</b> ${item.dateInfoEntered}<br>`
                    // `<a href="" target="_blank">YouTube</a>`;

                restauraunt_marker.addTo(map).bindPopup(popupContent);
            }
        })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
}

universityEntered(selectedUni);


/*
Unused Icons:

    // green
    var greenIconObject = new LeafIcon({iconUrl: 'images/leaf-green.png'});
    let greenIcon = L.marker([lat, long] , { icon : greenIconObject} );


    // orange
    var orangeIconObject = new LeafIcon({iconUrl: 'images/leaf-orange.png'});
    let orangeIcon = L.marker([lat, long] , { icon : orangeIconObject} );

*/


