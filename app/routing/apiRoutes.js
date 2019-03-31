// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var smallDogs = require("../data/dogs");
//var waitListData = require("../data/waitinglistData");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

     app.get("/api/furryfriends", function(req, res) {
      res.json(smallDogs);
    });
  
    /*
    app.get("/api/waitlist", function(req, res) {
      res.json(waitListData);
    }); */

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

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
