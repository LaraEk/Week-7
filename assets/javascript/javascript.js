//<!-- NOTE: BORROWING FROM TIMESHEET EXERCISE TO BASE ON -->
//<!-- NOTE: BORROWING FROM TIMESHEET EXERCISE TO BASE ON -->
//<!-- NOTE: BORROWING FROM TIMESHEET EXERCISE TO BASE ON -->


// 1. Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCFgOGfsknFGfZrW0jjmkxsjROi9dbnGBg",
    authDomain: "train-assignment-b31cc.firebaseapp.com",
    databaseURL: "https://train-assignment-b31cc.firebaseio.com",
    projectId: "train-assignment-b31cc",
    storageBucket: "",
    messagingSenderId: "222185742866"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding Employees
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainFirst = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
    var empRate = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      first: trainFirst,
      rate: empRate
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.rate);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var empRate = childSnapshot.val().rate;
  
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(empRate);
  
    // Prettify the employee first
    var trainFirstPretty = moment.unix(trainFirst).format("HH:mm");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(trainFirst, "X"), "months");
    console.log(empMonths);
  
    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);
  
    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFirstPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee first date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  