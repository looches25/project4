// // api/air
// const express = require("express");
// const router = express.Router();

// var Airtable = require('airtable');
// var base = new Airtable({apiKey: 'YOUR_API_KEY'}).base('appvipAS3ThYCcIc3');


// //! LISTING

// router.get("/", async (req, res) => {
//     // try {
        
//         base('SKU Listing').select({
//             // Selecting the first 3 records in Grid view:
//             maxRecords: 3,
//             view: "Grid view"
//         }).eachPage(function page(records, fetchNextPage) {
//             // This function (`page`) will get called for each page of records.
        
//             records.forEach(function(record) {
//                 console.log('Retrieved', record.get('Name'));
//             });
        
//             // To fetch the next page of records, call `fetchNextPage`.
//             // If there are more records, `page` will get called again.
//             // If there are no more records, `done` will get called.
//             fetchNextPage();
        
//         }, function done(err) {
//             if (err) { console.error(err); return; }
//         });

//     //     res.send({ status: "success", data: allSKU });
//     //   } catch (error) {
//     //     res.send(error);
//     //   }
//     });


// module.exports = router;