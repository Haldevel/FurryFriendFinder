
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

        var userObject = req.body;
        var userScores = userObject.scores;

        var finalThreeArray = [];

        var myMap = new Map();


        console.log("userScores: " + userScores);
        for (var i = 0; i < userScores.length; i++) {
            console.log(userScores[i]);
        }

        for (var j = 0; j < smallDogs.length; j++) {
            console.log("dogs scores: " + smallDogs[j].scores);
            var dogDiff = 0;
            for (var i = 0; i < userScores.length; i++) {

                dogDiff = dogDiff + Math.abs(userScores[i] - smallDogs[j].scores[i]);


            }
            // differArr.push({[j]: dogDiff });
            myMap.set(j, dogDiff);

        }

        //console.log("differArr: " + differArr[0].);

        for (var [key, value] of myMap) {
            console.log(key + ' = ' + value);
        }

        const mapSort1 = new Map([...myMap.entries()].sort((a, b) => a[1] - b[1]));
        console.log(mapSort1);

        var count = 0;
        for (var [key, value] of mapSort1) {
            console.log(key + ' = ' + value);
            if (count < 3) {
                finalThreeArray.push(key);
                count++;
            }
            else break;
        }

        console.log(finalThreeArray);
        var threeMatches = [];

        for(var i = 0; i < finalThreeArray.length; i++) {
            console.log(smallDogs[finalThreeArray[i]].breed);
            threeMatches.push({"breed": smallDogs[finalThreeArray[i]].breed, "image": smallDogs[finalThreeArray[i]].photo});
        }

        res.json(threeMatches);
        
    });

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!

    app.post("/api/clear", function (req, res) {
        // Empty out the arrays of data
        tableData = [];
        waitListData = [];

        res.json({ ok: true });

    });
};
