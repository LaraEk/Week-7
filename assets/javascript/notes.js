// ----- Here are all the ways that moment.js DID NOT work: ----- //

// var now = moment();
// console.log("this is now" + now);
//var x =  moment.duration(now); 
//var thisisnow = x.hours() + x.minutes();
// var thisisnow = moment().startOf('day').add(now, 'minutes').format('hh:mm A');
//console.log("BEEP BEEP The current time is:" + thisisnow);

// --- more stuff that ain't work --- // 

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
    firsttrainreadable + "</td><td>" + trainFreq + "</td><td>" + mintilnexttrain + "</td><td>" + makenexttrainreadable + "</td></tr>");

    // // when was the first train?
    // console.log("first train is" + trainFirst);
    // var firsttrainreadable = moment(trainFirst).format("HH:mm");
    // console.log("first train is actually" + firsttrainreadable);
    
    // var mintilnexttrain = moment().diff(moment(trainFirst, "X"), "minutes");
    // console.log("there are " + mintilnexttrain + "minutes til the next train");
  
    // // Calculate the frequency
    // var nextTrain = mintilnexttrain * trainFreq;
    // console.log(nextTrain);
  
    // // Calculate the minutes til next train using hardcore math

    // // minutes from midnight, thanks stackoverflow
    // var maketrainFirstreadable = moment.utc().startOf('day').add(trainFirst, 'minutes').format('hh:mm A');
    // console.log("first train: "+ maketrainFirstreadable);
    // var makenexttrainreadable = moment.utc().startOf('day').add(nextTrain, 'minutes').format('hh:mm A');
    // console.log("next train: "+ makenexttrainreadable);

    //    var trainFirst = moment($("#first-train-input").val().trim(), "DD/MM/YY").format("X");
//    var trainFirst = moment($("#first-train-input").val().trim(), "HH:mm a").format("X");
