const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();



app.use(express.static( path.join( __dirname, 'view' ) ) );
app.use(express.static( path.join( __dirname, 'script' ) ) );
app.use(express.static( path.join( __dirname, 'css' ) ) );
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//resolving get request to send the index.html
app.get('/', function (req, res) {

    console.log('http-get request received');
    res.sendFile('index.html');
  });

//resolving post request to send classification of the items
app.post('/', function (req, res) {

    var requestData = JSON.parse(req.body.formData);
    var results = [];
    console.log('http-post request received');

    for (let i = 0; i < requestData.length; i++) {
        
        if(requestData['question1'] == 'yes') {
            
            if(requestData['question2'] == 'no') {
                results.push( { 
                    'name': requestData[i]['name'],
                     'type': 'flower'} );
            } else {
                results.push( { 
                    'name': requestData[i]['name'],
                     'type': 'fruit'} );                

            }

        } else {
            results.push( { 
                'name': requestData[i]['name'],
                 'type': 'animal'} );
        }
    }
    console.log('the response is ' + JSON.stringify(results));
    res.send(JSON.stringify(results));    
});


app.listen(8000, function (){
    console.log('server started on port 8000');
});