$(document).ready(function () {

  // firebase link code and API Key
  var config = {
    apiKey: 'AIzaSyAsL6rDw82BhQ0o3iK4fTFTPwj8p0Elxdw',
    authDomain: 'project1-drunknscrew.firebaseapp.com',
    databaseURL: 'https://project1-drunknscrew.firebaseio.com',
    projectId: 'project1-drunknscrew',
    storageBucket: 'project1-drunknscrew.appspot.com',
    messagingSenderId: '560380639013'
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  // console.log(database);

  $('#create-event').on('click', function (event) {
    event.preventDefault();

    // Grabs user input
    var creatorName = $('#creator-name-input')
      .val()
      .trim();
    var eventAddress = $('#event-address-input')
      .val()
      .trim();
    var eventTime = $('#event-time-input')
      .val()
      .trim();
    var eventNumber = $('#event-number-input')
      .val()
      .trim();

    var attendessCounter = $('#event-number-input')
      .val()
      .trim();

    var eventdescription = $('#event-description-input')
      .val()
      .trim();
    var eventCost = $('#event-cost-input')
      .val()
      .trim();
    var eventDate = moment(
      $('#event-date-input')
        .val()
        .trim(),
      'MM/DD/YYYY'
    ).format('X');

    var newEvent = {
      name: creatorName,
      address: eventAddress,
      time: eventTime,

      number: eventNumber,

      description: eventdescription,
      cost: eventCost,
      date: eventDate,
      attendees: attendessCounter,
      attendees_name: '',
      attendees_email: ''
    };

    // Uploads event data to the database

    var newPostRef = database.ref().push(newEvent);
    var ID = newPostRef.key;

    // Logs everything to console
    // console.log("name:" + newEvent.name);
    // console.log("address:" + newEvent.address);
    // console.log("time:" + newEvent.time);
    // console.log("cost:" + newEvent.cost);
    // console.log("date:" + newEvent.date);
    // console.log("number:" + newEvent.number);
    // console.log("ID:" + ID)
    // console.log("description:" + newEvent.description);


    console.log('event successfully added');

    // Clears all of the text-boxes

    $('#creator-name-input').val('');
    $('#event-address-input').val('');
    $('#event-date-input').val('');
    $('#event-time-input').val('');
    $('#event-cost-input').val('');
    $('#event-description-input').val('');
  });

  database.ref().on('child_added', function (childSnapshot) {
    // console.log(childSnapshot.val());

    // Store everything into a variable.
    var creatorNameOutput = childSnapshot.val().name;
    var attendeeNumberOutput = childSnapshot.val().number;
    var eventAddressOutput = childSnapshot.val().address;
    var eventTimeOutput = childSnapshot.val().time;
    var eventdescriptionOutput = childSnapshot.val().description;


    // eventdescriptionOutput.attr('class', 'hide-column');
    var eventCostOutput = childSnapshot.val().cost;
    var eventDateOutput = childSnapshot.val().date;

    var eventDatePrettyOutput = moment.unix(eventDateOutput).format('MM/DD/YYYY');
    var joinButton = $('<button>');
    joinButton.attr('type', 'button');
    joinButton.attr('class', 'btn btn-info');
    joinButton.attr('data-toggle', 'modal');
    joinButton.attr('data-target', '#event-join');
    joinButton.text('JOIN');

    // event Info
    // console.log(creatorNameOutput);
    // console.log(eventAddressOutput);
    // console.log(eventTimeOutput);
    // console.log(eventdescriptionOutput);
    // console.log(eventDatePrettyOutput);
    // console.log(eventCostOutput);


    // Create the new row
    var newRow = $('<tr>').append(
      $('<td class="px-2">').text(creatorNameOutput),
      $('<td class="px-2">').text(attendeeNumberOutput),
      $('<td class="px-2">').text(eventDatePrettyOutput),
      $('<td class="px-2">').text(eventTimeOutput),
      $('<td class="px-2">').text(eventCostOutput),
      $('<td class="px-2">').text(eventAddressOutput),
      $('<td class="px-2">').text(eventdescriptionOutput),
      $('<td class="join-mobile-button">').html(joinButton)
    );

    // Append the new row to the table
    $('#new-event-listings > tbody').prepend(newRow);

    allAddresses.push(eventAddressOutput);

    window.allAddresses;

  })

  // moving 
  //   $('#googleMap').prepend(eventAddressOutput);
  // });

  // listener for adding attendees
  $('#join-event').on('click', function (event) {
    event.preventDefault();

    // Grabs user input
    var attendeesName = $('#attendee-name-input')
      .val()
      .trim();
    var attendeesEmail = $('#attendee-email-input')
      .val()
      .trim();

    var joinEvent = {
      attendees_name: attendeesName,
      attendees_email: attendeesEmail
    };

    // Uploads event data to the database
    database.ref().push(joinEvent);

    // // Logs everything to console
    // console.log(joinEvent.attendees_name);
    // console.log(joinEvent.attendees_email);
    // // console.log(postId);
    // console.log('attendee successfully added');


    // Clears all of the text-boxes

    $('#attendee-name-input').val('');
    $('#attendee-email-input').val('');


  });

});


// creating an array outside of the functions to pass informstion between the functions
var allAddresses = [];
var myJSON = JSON.stringify(allAddresses);


// google map time


function initMap() {
  // var geocoder = new google.maps.Geocoder();
  var infoWindow;
  // var results;


  map = new google.maps.Map(document.getElementById('googleMap'), {
    zoom: 9,
    center: new google.maps.LatLng(34.123, -118.1234),
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // This example uses a local copy of the GeoJSON stored at
  script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
  // script.src = 'https://project1-drunknscrew.firebaseio.com/address.json';
  document.getElementsByTagName('head')[0].appendChild(script);

  console.log(script)
  // geocoder.geocode({ 'address': results }, function (results, status) {
  //   if (status == google.maps.GeocoderStatus.OK) {
  //     var latitude = results[0].geometry.location.lat();
  //     var longitude = results[0].geometry.location.lng();
  //     // alert(latitude + ", " + longitude);

  //   }

  // console.log(results)
  // Loop through the results array and place a marker for each
  // set of coordinates.
  window.eqfeed_callback = function (results) {


    for (var i = 0; i < results.features.length; i++) {
      var coords = results.features[i].geometry.coordinates;
      var latLng = new google.maps.LatLng(coords[1], coords[0]);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map

      });
    }
  }

  infoWindow = new google.maps.InfoWindow();

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      },

      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  // }
  function handleLocationError(
    browserHasGeolocation,
    infoWindow,
    pos
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }
}
//   )
// };







