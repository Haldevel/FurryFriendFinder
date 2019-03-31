
//Linking our routes to a data source (the array of objects)
var smallDogs = require("../data/dogs");

//routing
module.exports = function (app) {
    // API GET Request to get an array of small dogs objects
     app.get("/api/furryfriends", function(req, res) {
      res.json(smallDogs);
    });
  

    // API POST Request
    // Below code handles when a user submits the survey form which triggers calculations of the top three matches for the user
    app.post("/api/furryfriends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body parsing middleware
        console.log("Req body: " + req.body);

        //we received an object with the data filled out by a user it is an object which has 'scores' array with the answer keys
        var userObject = req.body;
        var userScores = userObject.scores;

        //this array will contain the data of the top three matches
        var finalThreeArray = [];

        //the map will hold the keys which correspond the number (index) of the dog in the smalDogs array,
        // and the values will be the numbers reflecting the difference between scores for a user and a dog
        var myMap = new Map();

        //this array will hold an array of top three dog best matching object 
        var threeMatches = [];

        /* console.log("userScores: " + userScores);
        for (var i = 0; i < userScores.length; i++) {
            console.log(userScores[i]);
        } */

        //iterate through the dogs array to get scores for each dog
        for (var j = 0; j < smallDogs.length; j++) {
            console.log("dogs scores: " + smallDogs[j].scores);
            var dogDiff = 0;
            for (var i = 0; i < userScores.length; i++) {
                //calculate the difference between a user and a dog scores
                dogDiff = dogDiff + Math.abs(userScores[i] - smallDogs[j].scores[i]);

            }
            //set the map key-value pairs - the keys are the order/index 
            //of a dog in the smallDogs array, the value is the difference in scores
            myMap.set(j, dogDiff);

        }

        //sort the map by its values from the smallest to the biggest difference
        const mapSort1 = new Map([...myMap.entries()].sort((a, b) => a[1] - b[1]));

        //loop through the sorted by value map, and take top three elements and push them into finalThreeArray
        var count = 0;
        for (var [key, value] of mapSort1) {
            console.log(key + ' = ' + value);
            if (count < 3) {
                finalThreeArray.push(key);
                count++;
            }
            else break;
        }

        //console.log(finalThreeArray);
  
        //populate threeMatches array with the dog objects containg the properties 'breed' and 'image' 
        //the array will be sent in the response object
        for(var i = 0; i < finalThreeArray.length; i++) {
            console.log(smallDogs[finalThreeArray[i]].breed);
            threeMatches.push({"breed": smallDogs[finalThreeArray[i]].breed, "image": smallDogs[finalThreeArray[i]].photo});
        }

        res.json(threeMatches);
        
    });
 
};
