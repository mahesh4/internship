const parse = require('csv-parse');
const fs = require('fs'); 
const csvWriter = require('csv-write-stream');


var list_1 = {};
var list_2 = {};
var writer = csvWriter();
writer.pipe(fs.createWriteStream('./files/output.csv',  {'flags': 'a'}));

fs.createReadStream('./files/input.csv')
    .pipe(parse({delimiter: ',',columns: true}))
    .on('data', function(csvrow) {
        console.log(csvrow);
        if (csvrow['list1'] != '')
            list_1[csvrow['list1']] = 1;
        
        if (csvrow['list2'] != '')    
            list_2[csvrow['list2']] = 1;        
    })
    .on('end',function() {
      //generating the outpt.csv
        for (var fruit in list_1) {
            //checking if the same fruit exists in list_2
            if( fruit in list_2) {

                writer.write({"list1": fruit, "list2": fruit});
                delete list_2[fruit];
            } else {
                writer.write({"list1":fruit, "list2": "None"});
                
            }
        }

        for (var fruit in list_2 ) {
            writer.write({"list1": "None", "list2": fruit});
        }
        writer.end();
    });


    