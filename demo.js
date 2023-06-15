var session = require('express-session');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var util = require('util');
const dateFormat = require('dateformat');
const request = require('request');
const { error, exception } = require('console');
const { connect } = require('http2');
// const { json } = require('body-parser');
const { application } = require('express');
const { constants } = require('buffer');
let formidable = require('formidable');
const https = require('https')
const axios = require('axios');
const { report } = require('process');
var sql = require("mssql");
var sql1 = require("mssql");
const dircompare = require('dir-compare');
// var csv = require('csv-parser');
// const csv = require('fast-csv')

var app = express();  
var bodyParser = require('body-parser');  
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// set the view engine to ejs
app.set('view engine', 'ejs');

// parse application/json
app.use(bodyParser.json())

var configNC = {
  user: 'jacob',
  password: 'NIDC@2021#$',
  server: '41.59.225.207', 
  database: 'NCARD-DB',
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

app.get('/getMembersipCodeList', function (req, res) {
  console.log("jhgff")
  sql.connect(configNC, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      // query to the database and execute procedure 
      let query = "SELECT TOP 10000 [MembershipCode], [Region] FROM [NCARD-DB].[dbo].[tblCardMember] WHERE IsPrinted = 0 ORDER BY id DESC";
      // console.log(query)
      request.query(query, function (err, recordset) {
          if (err) {
              console.log(err);
              sql.close();
          }
         var results = recordset.recordset;
         console.log(results)
         for(var i = 0; i < results.length; i++){
         var MembershipCode = results[i].MembershipCode;
         var Region = results[i].Region;
        const directoryPath = '/home/passports/'+Region
        console.log(directoryPath)
        console.log(MembershipCode);
        
        var filePath = directoryPath+'/'+MembershipCode+'.jpg'
        var copy = '/home/new_passports/'+Region+'/'+MembershipCode+'.jpg'
        var folder = '/home/new_passports/'+Region;
        console.log(filePath);
        if (!fs.existsSync(folder)){
            fs.mkdirSync(folder);
          
            console.log('Folder Created Successfully.');
            fs.rename(filePath, copy, (error) => {
              if (error) {
                console.log(error)
              } else {
                console.log('File has been moved to another folder.')
              }
            })
        // }
        }else if (fs.existsSync(folder)){
          fs.copyFile(filePath, copy, (error) => {
            if (error) {
              console.log(error)
            } else {
              console.log('File has been moved to another folder.')
            }
          })
        }
      }
      });
    });
});

app.get('/compareFiles', function (req, res) {
  console.log("fjdgv")
  // const options = { compareSize: true };
  const path1 = "/home/new_passports/DAR\ ES\ SALAAM";
  const path2 = "/home/QRCodes/DAR\ ES\ SALAAM";
  const path3 = "/home/new_QRCodes/DAR\ ES\ SALAAM";
  
  // const response = dircompare.compareSync(path1, path2, options)
  // console.log(response);
//   const fullPath = path1
// const files = fs.readdirSync(fullPath)
// const files2 = fs.readdirSync(path2)


// try { files2.forEach( file => console.log(file) ) }
// catch (error) { console.log(error) }

//joining path of directory 
const directoryPath = path1;
const directoryPath2 = path2;
//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        // console.log("File 1 " + file); 
        var split_file = file.split('.')
        // console.log("File 1 " + split_file[0]); 
          if (fs.existsSync(path2+'/'+split_file[0]+'.png')) {
            console.log("File 1 " + file); 
            console.log('file exists');
            fs.copyFile(path2+'/'+split_file[0]+'.png', path3+'/'+split_file[0]+'.png', (error) => {
              if (error) {
                console.log(error)
              } else {
                console.log('File has been moved to another folder.')
              }
            })
          } else {
            console.log("File 2 " + file); 
            console.log('file not found!');
          }
          //listing all files using forEach
          // files1.forEach(function (file1) {
          //     // Do whatever you want to do with the file
          //     // console.log("File 2 " + file1); 
          //     if(file == file1){
          //       var filePath = directoryPath2
          //       var copy = '/home/new_signature/GEITA/'+file1
          //       var folder = '/home/new_signature/GEITA';
          //       // console.log(filePath);
          //       console.log("File 2 " + file1)
          //       if (!fs.existsSync(folder)){
          //           fs.mkdirSync(folder);
                  
          //           console.log('Folder Created Successfully.');
          //           fs.copyFile(filePath, copy, (error) => {
          //             if (error) {
          //               console.log(error)
          //             } else {
          //               console.log('File has been moved to another folder.')
          //             }
          //           })
          //       // }
          //       }else if (fs.existsSync(folder)){
          //         console.log("File 2 " + file1)
          //         fs.copyFile(filePath, copy, (error) => {
          //           if (error) {
          //             console.log(error)
          //           } else {
          //             console.log('File has been moved to another folder.')
          //           }
          //         })
          //       }
          //     }
          // });

    });
});
});

// app.get('/readCSV', function (req, res) {

  // const options = { compareSize: true };
  const path1 = "chama_27_feb.csv";
  const path2 = "/home/QRCodes/DAR\ ES\ SALAAM";
  const path3 = "/home/new_QRCodes/DAR\ ES\ SALAAM";
  

const directoryPath = path1;
const directoryPath2 = path2;



// let csvToJson = require('convert-csv-to-json');

// let fileInputName = 'chama_27_feb.csv'; 
// let fileOutputName = 'myOutputFile.json';

// csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);
//passsing directoryPath and callback function
// fs.readFile(directoryPath, 'utf8', function (err, data) {
//       if(err){
//         console.log(err)
//       }else{
//         // var resp = data['MembershipCode']
//         var resp = data
//         // for(var i = 0; i < resp[1].length; i++){
//           // console.log(resp)
//           const records = parse(input, {
//             columns: true,
//             skip_empty_lines: true
//           });
//           //map the output from csv-parse to the column
//           const column_two = records.map(rec => rec["col2"]);
//         // }
//         // var lines = data.split("\n");

//       }
//   });
// });

// const results = [];

// fs.createReadStream(directoryPath)
//   .pipe(csv())
//   .on('data', (data) => {
//     /* data would be something like :
//         { '2': 'Why we use bottels?', '1 ': 'How do I change my password? ' }
//     */
//     Object.entries(data)
//       .forEach(([key, value]) => {
//         // key would be the column number (1 or 2)
//         // value would be the data of the row
//         // we "abuse" the fact that the column happens to be a number between 1 and 2 and we use that as the array index
//         let index = parseInt(key) - 1;
//         results[index] = results[index] || []
//         results[index].push(value)
//       })
//   })
//   .on('end', () => {
//     console.log(results);
//   });

var server = app.listen(3000);
console.log('Hello ORS');