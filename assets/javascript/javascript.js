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
//    var trainFirst = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
//    var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm a").format("X");
    var trainFirst = $("#first-train-input").val().trim();
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
  
    var timeArray = trainFirst.split(":");
    var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
    console.log("timeArray is " + timeArray);
    console.log("trainTime is " + trainTime);

    var differenceInTimes = moment().diff(trainTime, "minutes");
    console.log("the difference in time is " + differenceInTimes);
    var tRemainder = differenceInTimes % trainFreq;
    tMinutes = trainFreq - tRemainder;
    // To calculate the arrival time, add the tMinutes to the current time
    tArrival = moment().add(tMinutes, "m").format("hh:mm A");
    console.log(tArrival);

    // Add each train's data into the table
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainFirst + "</td><td>" + trainFreq + "</td><td>" + tArrival + "</td><td>" + "<input type='submit' value='Remove' class='remove-train btn'>" + "</td></tr>");

        // When the "remove" button is clicked, it will delete/remove that particular row
        $(".remove-train").click(function(){
          $(this).parents('tr').first().remove();
        });
    
  });


