var nownow = moment().format("HH:mm a");
console.log("this is nownow" + nownow);
$("#currenttimebox").html("The current time is:<br>" + nownow);


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
//    var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm a").format("X");
    var trainFreq = $("#freq-input").val().trim();
  
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      trainname: trainName,
      destination: trainDest,
      first: trainFirst,
      frequency: trainFreq
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.trainname);
    console.log(newTrain.destination);
    console.log(newTrain.first);
    console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#freq-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().trainname;
    var trainDest = childSnapshot.val().destination;
    var trainFirst = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().frequency;
  
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainFirst);
    console.log(trainFreq);
    
    // what's the current time?
    console.log(nownow);
    console.log("current time is " + nownow);
  
    // when was the first train?
    console.log("first train is" + trainFirst);
    var firsttrainreadable = moment(trainFirst).format("HH:mm a");
    console.log("first train is actually" + firsttrainreadable);
    
    var mintilnexttrain = moment().diff(moment(trainFirst, "X"), "minutes");
    console.log("there are " + mintilnexttrain + "minutes til the next train");
  
    // Calculate the frequency
    var nextTrain = mintilnexttrain * trainFreq;
    console.log(nextTrain);
  
    // Calculate the minutes til next train using hardcore math

    // minutes from midnight, thanks stackoverflow
    // var makecurrenttimereadable = moment.utc().startOf('day').add(nownow, 'minutes').format('hh:mm A');
    // console.log("current time: "+ makecurrenttimereadable);
    var maketrainFirstreadable = moment.utc().startOf('day').add(trainFirst, 'minutes').format('hh:mm A');
    console.log("first train: "+ maketrainFirstreadable);
    // var makemintilnexttrainreadable = moment.utc().startOf('day').add(mintilnexttrain, 'minutes').format('hh:mm A');
    // console.log("min til next train: "+ makemintilnexttrainreadable);
    var makenexttrainreadable = moment.utc().startOf('day').add(nextTrain, 'minutes').format('hh:mm A');
    console.log("next train: "+ makenexttrainreadable);


    // var nownow = moment().format("HH:mm a");
    // console.log("this is nownow" + nownow);
    // $("#currenttimebox").html("The current time is:<br>" + nownow);
    

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    maketrainFirstreadable + "</td><td>" + trainFreq + "</td><td>" + mintilnexttrain + "</td><td>" + makenexttrainreadable + "</td></tr>");

  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee first date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case
  