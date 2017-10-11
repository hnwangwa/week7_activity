  // Initialize Firebase
var config = {
    apiKey: "AIzaSyBI3QdFpkVs5QKMCxmCrbXno6JkP6bwJIU",
    authDomain: "hogwarts-express-f4cbf.firebaseapp.com",
    databaseURL: "https://hogwarts-express-f4cbf.firebaseio.com",
    projectId: "hogwarts-express-f4cbf",
    storageBucket: "hogwarts-express-f4cbf.appspot.com",
    messagingSenderId: "696318776422"
  };
  firebase.initializeApp(config);
   // Create a variable to reference the database
    var database = firebase.database();

  // Live Time of The Day 

  var updateTime = function(){
  	var currentTime = moment();
  	$('#currentTime').html(currentTime.format('LT'));

    //Working through the calculation for how long it has been since the train's been running
    var currentTime = moment();
    var difference = moment(currentTime).diff(firstTrain, "minutes");
    console.log("Minutes since first train: " + difference);

    var frequency = 15;
  //time since last train
    var minsSinceLastTrain = difference % frequency;
    console.log("Minutes since last train: " +minsSinceLastTrain);
  //time till next train
    var timeTillNextTrain = frequency - minsSinceLastTrain;
    console.log("Minutes until next train: " + timeTillNextTrain);
  //time OF next train
  var nextTrain = moment().add(timeTillNextTrain, "minutes");
  var nextTrainConverted = moment(nextTrain).format("hh:mm a");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
  	
  }

  $(document).ready(function(){
    updateTime();
    setInterval(updateTime, 1000);



});

  /*******************************************/

$('#submit').on('click', function(){

	// Retrieve user inputs from form
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	// Create an object for new train to be added
	var newTrain = {
		trainName: trainName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	}

	
	database.ref().push(newTrain);

	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');



	return false;

});


database.ref().on('child_added', function(childSnapshot, prevChildKey) {

	var trainName = childSnapshot.val().trainName;
	var destination = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var frequency = childSnapshot.val().frequency;

	

  
  

	$('.table > tbody').append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
		+ frequency + "</td><td>" + "Working on it" + "</td><td>" + "Working on it" + "</td></tr>");

});


