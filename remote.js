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
const { json } = require('body-parser');
const { application } = require('express');
const { constants } = require('buffer');
let formidable = require('formidable');
const https = require('https')
const axios = require('axios');
const { report } = require('process');
var sql = require("mssql");
var sql1 = require("mssql");

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

var BASEURL = "http://41.59.225.45:3333/";

//API Connection

// config for your database
var config = {
  user: 'sa',
  password: '@ORS2o2o#$',
  server: '41.59.225.45', 
  database: 'BRELADB',
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

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

var configBL = {
  user: 'sa',
  password: '@ORS2o2o#$',
  server: '41.59.225.45', 
  database: 'BL-DB',
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

var configUser = {
  user: 'sa',
  password: '@ORS2o2o#$',
  server: '41.59.225.45', 
  database: 'USER-MANAGEMENT-DB',
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

var configBill = {
  user: 'sa',
  password: '@ORS2o2o#$',
  server: '41.59.225.45', 
  database: 'ORS-BILLINGDB',
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

app.get('/getMembersipCodeList', function (req, res) {
  sql.connect(configNC, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      // query to the database and execute procedure 
      let query = "exec Get_Membercode_Region_SP";
      // console.log(query)
      request.query(query, function (err, recordset) {
          if (err) {
              console.log(err);
              sql.close();
          }
         var results = recordset.recordset;
         console.log(results)
         var MembershipCode = results[0].MembershipCode;
         var Region = results[0].Region;
         //joining path of directory 
        const directoryPath = path.join(__dirname, 'Documents');
        //passsing directoryPath and callback function
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                console.log(file); 
            });
        });
        sql.close();
        res.send({"MembershipCode": MembershipCode, "Region": Region});
  
      });
    });
});

app.post('/MyApplication', async function(req, res) {
var objs12 = [];
var userId = req.body.userId;
sql.connect(configBL, function (err) {
  if (err) console.log(err);
  var request = new sql.Request();
  request.query('SELECT d.IsBranch as IsBranch, d.BLNumber as BLNumber, a.Id as Id, a.TrackingNo as TrackingNo, a.ServiceCode as ServiceCode, a.SubmittedDate as SubmittedDate, a.CreatedDate as CreatedDate, b.ApplicationStatusId as ApplicationStatusId, b.ApplicationStageId as ApplicationStageId, c.BusinessTypeName as BusinessTypeName, b.PaymentStatus as PaymentStatus, d.isSentToRegistry as IsSentRegistry FROM dbo.BusinessLicApplication as a, dbo.BLicenseApplicationTracker as b, dbo.BusinessTypes as c, dbo.BusinessLicenceDetails as d WHERE d.BusinessLicenceApplicationId = a.Id AND a.Id = b.ApplicationId AND c.BusinessTypeId = a.BusinessTypeId AND b.ApplicationStatusId NOT IN(5) AND d.isSentToRegistry NOT IN(1) AND b.ApplicationStageId NOT IN(6) AND CreatedByUserId = '+userId + ' ORDER BY a.Id DESC', 
  function (err, recordset) {

      if (err) console.log(err)
      var result_from = recordset.recordset;
      sql.close();
res.send(result_from)
  });
});
})

app.post('/MyLic', async function(req, res) {
  var objs12 = [];
  var userId = req.body.userId;
  sql.connect(configBL, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('SELECT d.IsBranch as IsBranch, d.BLNumber as BLNumber, a.Id as Id, a.TrackingNo as TrackingNo, a.ServiceCode as ServiceCode, a.SubmittedDate as SubmittedDate, a.CreatedDate as CreatedDate, b.ApplicationStatusId as ApplicationStatusId, b.ApplicationStageId as ApplicationStageId, c.BusinessTypeName as BusinessTypeName, b.PaymentStatus as PaymentStatus, d.isSentToRegistry as IsSentRegistry FROM dbo.BusinessLicApplication as a, dbo.BLicenseApplicationTracker as b, dbo.BusinessTypes as c, dbo.BusinessLicenceDetails as d WHERE d.BusinessLicenceApplicationId = a.Id AND a.Id = b.ApplicationId AND c.BusinessTypeId = a.BusinessTypeId AND b.ApplicationStatusId = 5 AND d.isSentToRegistry = 1 AND b.ApplicationStageId = 6 AND CreatedByUserId = '+userId + ' ORDER BY a.Id DESC', 
    function (err, recordset) {
  
        if (err) console.log(err)
        var result_from = recordset.recordset;
        sql.close();
  res.send(result_from)
    });
  });
  })

app.post('/PMyApplication', async function(req, res) {
var objs12 = [];
var userId = req.body.userId;
sql.connect(configBL, function (err) {
  if (err) console.log(err);
  var request = new sql.Request();
  request.query('SELECT Id, TrackingNo, CreatedDate FROM dbo.BusinessLicApplication WHERE SubmittedDate IS NULL AND CreatedByUserId = '+userId+' ORDER BY CreatedDate DESC', 
function (err, recordset) {

      if (err) console.log(err)
      var result_from = recordset.recordset;
      sql.close();
res.send(recordset.recordset)
     // res.render(path.join(__dirname+'/public/ors/my_application'), {"myapplication": objs12});
  });
});
})

app.post('/MyLic', async function(req, res) {
  var objs12 = [];
  var userId = req.body.userId;
  sql.connect(configBL, function (err) {
    if (err) console.log(err);
    var request = new sql.Request();
    request.query('SELECT * FROM dbo.BusinessLicenceDetails', 
    function (err, recordset) {

        if (err) console.log(err)
        var result_from = recordset.recordset;
  
    res.send(recordset.recordset)
    });
});
})

app.post('/saveStageOne', function (req, res) {
var trackngNo = req.body.trackngNo;
var userId = req.body.userId;
var servtype = req.body.servtype;
 //console.log(trackngNo + " and " + userId)
// res.send(TrackingNo);
sql.connect(configBL, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    request.input('trackngNo', trackngNo);
    request.input('userId', userId);
    request.input('submitDet', new Date());
    request.query(`INSERT INTO dbo.BusinessLicApplication (TrackingNo, CreatedByUserId, ApplicationStep, BusinessTypeId, BusinessLicOwnerTypeId, ApplicationStatusId, ApplicationTypeId, CreatedDate, ServiceCode) values (@trackngNo, @userId, 2, 0, 0, 1, 1, @submitDet, 4201)`, 
    function (err, recordset) {
        if (err) console.log(err)
        
         sql.close();
        // send records as a response
        console.log(recordset)
        res.send("sucess");

    });
});
});

app.post('/saveBStageOne', function (req, res) {
var trackngNo = req.body.trackngNo;
var trackNo = req.body.trackNo;
var userId = req.body.userId;
var BLNo = req.body.BLNo;
var servtypecode = req.body.servtypecode;
req.session.BLNo = BLNo;
// console.log("========>>>>>>"+trackNo)
sql.connect(configBL, function (err) {

    if (err) console.log(err);
    var request1 = new sql.Request();
    request1.input('BLNo', BLNo);
    request1.query('SELECT Id, BusinessTypeId, BusinessLicOwnerTypeId, ApplicationTin, NumberOfUnits, BusinessClassId FROM dbo.BusinessLicApplication WHERE TrackingNo = @BLNo', 
    function (err, recordset) {
    if (err) console.log(err)
    var result_from = recordset.recordset;
    var businessType = result_from[0].BusinessTypeId;
    var businessLicOwnerTypeId = result_from[0].BusinessLicOwnerTypeId;
    var ApplicationTin = result_from[0].ApplicationTin;
    var NumberOfUnits = result_from[0].NumberOfUnits;
    var BusinessClassId = result_from[0].BusinessClassId;
    var BLId = result_from[0].Id;
    req.session.BlAppId = BLId;
    // create Request object
    var request = new sql.Request();
    request.input('trackngNo', trackNo);
    request.input('userId', userId);
    request.input('servtypecode', servtypecode);
    request.input('businessType', businessType);
    request.input('businessLicOwnerTypeId', businessLicOwnerTypeId);
    request.input('ApplicationTin', ApplicationTin);
    request.input('NumberOfUnits', NumberOfUnits);
    request.input('BusinessClassId', BusinessClassId);
    request.input('submitDet', new Date());
    request.query(`INSERT INTO dbo.BusinessLicApplication (TrackingNo, CreatedByUserId, ApplicationStep, BusinessTypeId, BusinessLicOwnerTypeId, ApplicationStatusId, ApplicationTypeId, CreatedDate, ServiceCode, ApplicationTin, NumberOfUnits, BusinessClassId) values (@trackngNo, @userId, 2, @businessType, @businessLicOwnerTypeId, 1, 1, @submitDet, @servtypecode, @ApplicationTin, @NumberOfUnits, @BusinessClassId)`, 
    function (err, recordset) {
        if (err) console.log(err)
        
         sql.close();
        // send records as a response
       // console.log(recordset)
        res.send("sucess");

    });
  });
});
});

app.post('/recordAddressInfo', function (req, res) {
var trackngNo = req.body.trackngNo;
var userId = req.body.userId;
var road = req.body.road;
var streetName = req.body.streetName;
var postal_city = req.body.postal_city;
var regionlist = req.body.regionlist;
var addressArea = req.body.addressArea;
var plot_no = req.body.plot_no;
var block_no = req.body.block_no;
var house_no = req.body.house_no;
var phone_no = req.body.phone_no;
var email_addr = req.body.email_addr;
var districtlist = req.body.districtlist;
var wardId = req.body.wardId;
var pobox = req.body.pobox;
var unservayedarea = req.body.unservayedarea;
var req_id;



//Past insert API
sql.connect(config, function (err) {

    if (err) console.log(err);

    var request1 = new sql.Request();
    request1.query('SELECT max(Id) as Id FROM dbo.tblAddress', function (err, recordset) {
      if (err) console.log(err)
     // sql.close();
      //console.log(recordset.recordset)
      var result_form = recordset.recordset;
      var Id = result_form[0].Id;
      req_id = parseInt(Id)+1;
      req.session.req_id = req_id;
      
    // create Request object
    //console.log(req.session.req_id)
    var request = new sql.Request();
      
    request.input('trackngNo', trackngNo);
    request.input('userId', userId);
    request.input('road', road);
    request.input('streetName', streetName);
    request.input('postal_city', postal_city);
    request.input('regionlist', regionlist);
    request.input('addressArea', addressArea);
    request.input('plot_no', plot_no);
    request.input('block_no', block_no);
    request.input('house_no', house_no);
    request.input('phone_no', phone_no);
    request.input('email_addr', email_addr);
    request.input('districtlist', districtlist);
    request.input('wardId', wardId);
    request.input('pobox', pobox);
    request.input('unservayedarea', unservayedarea);
    request.input('req_id', req.session.req_id);

    request.query(`INSERT INTO dbo.tblAddress (Id, AddressOwnerId, AddressOwnerTypeId, AreaTypeId, WardId, Street, Road, PlotNo, BlockNo, HouseNo, UnsurveyedArea, PoBox, CreatedByUserId, TrackingNo, City, RegionCode, DistrictCode, isOfficeAddress, CompanyEmail, CompanyPhone) values (@req_id, @userId, 4, @addressArea, @wardId, @streetName, @road, @plot_no, @block_no, @house_no, @unservayedarea, @pobox, @userId, @trackngNo, @postal_city, @regionlist, @districtlist, 0, @email_addr, @phone_no)`, 
      function (err, recordset) {
        if (err) console.log(err)
         sql.close();
        // send records as a response
        res.send({"sucess": "success"});

    });
    
  });



});
});

app.post('/saveStageTwo', function (req, res) {
  console.log(req.body)
  var trackngNo = req.body.trackngNo;
  var userId = req.body.userId;
  var BizOwnerType = req.body.BizOwnerType;
  var NoUnit = req.body.NoUnit;
  // var TinDate = req.body.TinDate;
  var BizTin = req.body.BizTin;
  var TaxPayer = req.body.TaxPayer;
  var TypeList = req.body.TypeList;
  var PhoneBuz = req.body.PhoneBuz;
  var businessLicenceClassId = req.body.businessLicenceClassId;
  var inputEmail4comp = req.body.inputEmail4comp;
  var inputEmail4phn = req.body.inputEmail4phn;
  var inputEmail4pobox = req.body.inputEmail4pobox;
  var issuingAuthorityId = req.body.issuingAuthorityId;
  var fname = req.body.fname;
  var mname = req.body.mname;
  var lname = req.body.lname;
  var gender = req.body.gender;
  var dob = req.body.dob;
  var nida_no = req.body.nida_no;
  var bustype = req.body.bustype;
  var addressAreaB = req.body.addressAreaB;
  var regionlistB = req.body.regionlistB;
  var districtlistB = req.body.districtlistB;
  var wardIdB = req.body.wardIdB;
  var street = req.body.street;
  var postcode = req.body.postcode;
  var road = req.body.road;
  var plot_no = req.body.plot_no;
  var block_no = req.body.block_no;
  var house_no = req.body.house_no;
  var unservayedarea = req.body.unservayedarea;
  var busorigintype = req.body.busorigintype;
  
  sql.connect(configBL, function (err) {
  
    if (err) console.log(err);
  
    var request1 = new sql.Request();
    request1.input('trackngNo', trackngNo);
    request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err, recordset) {
      if (err) console.log(err)
      var result_form = recordset.recordset;
      var Id = result_form[0].Id;
      req.session.req_id = Id;
    var request = new sql.Request();
    request.input('userId', userId);
    request.input('BizOwnerType', BizOwnerType);
    request.input('NoUnit', NoUnit);
    // request.input('TinDate', TinDate);
    request.input('BizTin', BizTin);
    request.input('TaxPayer', TaxPayer);
    request.input('trackngNo', trackngNo);
    request.input('TypeList', TypeList);
    request.input('businessLicenceClassId', businessLicenceClassId);
    request.input('ServiceCode', '4201');
    request.input('Subdet', new Date());
    request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, BusinessTypeId = @TypeList, BusinessLicOwnerTypeId = @BizOwnerType, ApplicationTin = @BizTin, NumberOfUnits = @NoUnit, BusinessClassId = @businessLicenceClassId, ServiceCode = @ServiceCode, SubmittedDate = @Subdet WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, function (err, recordset) {
        if (err) console.log(err)
        var request2 = new sql.Request();
              request2.input('BusLicAppId', Id);
              request2.input('inputEmail4comp', inputEmail4comp);
              request2.input('BizTin', BizTin);
              request2.input('inputEmail4phn', PhoneBuz);
              request2.input('inputEmail4pobox', inputEmail4pobox);
              request2.input('issuingAuthorityId', issuingAuthorityId);
              request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, 0, @issuingAuthorityId, 5, 0)`, function (err, recordset) {
                  if (err) console.log(err)
  
  
                  var request3 = new sql.Request();
                        request3.input('ApplicationId', Id);
                        request3.input('ServiceCode', '4201');
                        request3.input('ApplicationStatusId', '1');
                        request3.input('userId', userId);
                        request3.input('CreatedDate', new Date());
                        request3.input('ApplicationStageId', '3');
                        request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                        function (err, recordset) {
                            if (err) console.log(err)               
  
                            var request4 = new sql.Request();
                            request4.input('BusLicAppId', Id);
                            request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                            function (err, recordset) {
                              if (err) console.log(err)
                             // sql.close();
                              //console.log(recordset.recordset)
                              var result_form = recordset.recordset;
                              var Id_bl = result_form[0].Id;
                              req.session.BLdet = Id_bl;
  
                              sql.close();
                              res.send(Id_bl)
                        });
                  });
        
              });
  
    });
  });
  });
  
  
  
});

app.post('/AddressRecord', function(req, res){
var trackngNo = req.body.trackngNo;
var userId = req.body.userId;
var BizOwnerType = req.body.BizOwnerType;
var NoUnit = req.body.NoUnit;
// var TinDate = req.body.TinDate;
var BizTin = req.body.BizTin;
var TaxPayer = req.body.TaxPayer;
var TypeList = req.body.TypeList;
var PhoneBuz = req.body.PhoneBuz;
var businessLicenceClassId = req.body.businessLicenceClassId;
var inputEmail4comp = req.body.inputEmail4comp;
var inputEmail4phn = req.body.inputEmail4phn;
var inputEmail4pobox = req.body.inputEmail4pobox;
var issuingAuthorityId = req.body.issuingAuthorityId;
var fname = req.body.fname;
var mname = req.body.mname;
var lname = req.body.lname;
var gender = req.body.gender;
var dob = req.body.dob;
var nida_no = req.body.nida_no;
var bustype = req.body.bustype;
var addressAreaB = req.body.addressAreaB;
var regionlistB = req.body.regionlistB;
var districtlistB = req.body.districtlistB;
var wardIdB = req.body.wardIdB;
var street = req.body.street;
var postcode = req.body.postcode;
var road = req.body.road;
var plot_no = req.body.plot_no;
var block_no = req.body.block_no;
var house_no = req.body.house_no;
var unservayedarea = req.body.unservayedarea;
var busorigintype = req.body.busorigintype;
var BLdetailsId = req.body.BLdetailsId;

var reg_no_other = req.body.reg_no_other;
var corporate_name = req.body.corporate_name;
var leadername_nat = req.body.leadername_nat;
var leadername_nat_2 = req.body.leadername_nat_2;


if(BizOwnerType == 1){
  sql.connect(config, function(err) {
    if(err) throw err
  
    new sql.Request()
    .input('NationalityId', 1)
    .input('Fname', fname)
    .input('Mname', mname)
    .input('Lname', lname)
    .input('TrackingNo', trackngNo)
    .input('GenderId', gender)
    .input('DOB', new Date())
    .input('NIN', nida_no)
    .input('Phone', PhoneBuz)
    .input('WorkPermitNo', '')
    .input('PassportNo', '')
    .input('PassIssuance', '')
    .input('Email', inputEmail4comp)
    .input('FrontUserId', userId)
    .input('OriginTypeId', busorigintype)
    .input('OwnerId', bustype)
    .execute('Save_Person_SP', function(err, recordsets, returnValue) {
        if(err) throw err;
  
        var result_form = recordsets.recordset;
        var personId = result_form[0].PersonId;
        
        new sql.Request()
        .input('AddressOwnerId', personId)
        .input('AddressOwnerTypeId', 1)
        .input('AreaTypeId', addressAreaB)
        .input('WardId', wardIdB)
        .input('TrackingNo', trackngNo)
        .input('PostCode', postcode)
        .input('Street', street)
        .input('Road', road)
        .input('PlotNo', plot_no)
        .input('BlockNo', block_no)
        .input('HouseNo', house_no)
        .input('UnsurveyedArea', unservayedarea)
        .input('PoBox', inputEmail4pobox)
        .input('FrontUserId', userId)
        .input('CountryId', '255')
        .input('City', '')
        .input('ZipCode', '')
        .input('PhysicalAddress','')
        .input('RegionCode', regionlistB)
        .input('DistrictCode', districtlistB)
        .input('Area', '')
        .input('LandMarkTypeId', '')
        .input('LandMark', '')
        .input('IsOfficeAddress', 0)
        .input('CompanyEmail', inputEmail4comp)
        .input('CompanyPhone', PhoneBuz)
        .input('OwnerId', bustype)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) throw err;
    
            new sql.Request()
            .input('AddressOwnerId', BLdetailsId)
            .input('AddressOwnerTypeId', 4)
            .input('AreaTypeId', addressAreaB)
            .input('WardId', wardIdB)
            .input('TrackingNo', trackngNo)
            .input('PostCode', postcode)
            .input('Street', street)
            .input('Road', road)
            .input('PlotNo', plot_no)
            .input('BlockNo', block_no)
            .input('HouseNo', house_no)
            .input('UnsurveyedArea', unservayedarea)
            .input('PoBox', inputEmail4pobox)
            .input('FrontUserId', userId)
            .input('CountryId', '255')
            .input('City', '')
            .input('ZipCode', '')
            .input('PhysicalAddress','')
            .input('RegionCode', regionlistB)
            .input('DistrictCode', districtlistB)
            .input('Area', '')
            .input('LandMarkTypeId', '')
            .input('LandMark', '')
            .input('IsOfficeAddress', 1)
            .input('CompanyEmail', inputEmail4comp)
            .input('CompanyPhone', PhoneBuz)
            .input('OwnerId', bustype)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) throw err;

     new sql.Request()
     .input('EntityTypeId', 3)
     .input('EntityId', BLdetailsId)
     .input('OwnerSubTypeId', BizOwnerType)
     .input('FrontUserId', userId)
     .input('TrackingNo', trackngNo)
     .input('CorporateName', '')
     .input('IsBankOperator', '')
     .input('CompanyTypeId','')
     .input('OwnerId', personId)
     .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
         if(err) throw err;

                sql.close();
                res.send("success")// your isTrue value
              });
              });
  
          });
  
        });
  });
}if(BizOwnerType == 3){
  sql.connect(config, function(err) {
    if(err) throw err
  
    new sql.Request()
    .input('RegNo', reg_no_other)
    .input('CorporateName', corporate_name)
    .input('LeaderIName', leadername_nat)
    .input('Leader2Name', leadername_nat_2)
    .input('TrackingNo', trackngNo)
    .input('PhoneNo', PhoneBuz)
    .input('Box', inputEmail4pobox)
    .input('Email', inputEmail4comp)
    .input('FrontUserId', userId)
    .input('TypeOfCorporateBody', 1)
    .input('OriginTypeId', busorigintype)
    .input('OtherCorporateTypeId', 3)
    .input('OwnerId', bustype)
    .input('OtherTypeName', '')
    .execute('Save_OtherCorporateBody_SP', function(err, recordsets, returnValue) {
        if(err) throw err;
  
        var result_form = recordsets.recordset;
      //  console.log(result_form)
        var bodyId = result_form[0].BodyID;
        
        new sql.Request()
        .input('AddressOwnerId', bodyId)
        .input('AddressOwnerTypeId', 7)
        .input('AreaTypeId', addressAreaB)
        .input('WardId', wardIdB)
        .input('TrackingNo', trackngNo)
        .input('PostCode', postcode)
        .input('Street', street)
        .input('Road', road)
        .input('PlotNo', plot_no)
        .input('BlockNo', block_no)
        .input('HouseNo', house_no)
        .input('UnsurveyedArea', unservayedarea)
        .input('PoBox', inputEmail4pobox)
        .input('FrontUserId', userId)
        .input('CountryId', '255')
        .input('City', '')
        .input('ZipCode', '')
        .input('PhysicalAddress','')
        .input('RegionCode', regionlistB)
        .input('DistrictCode', districtlistB)
        .input('Area', '')
        .input('LandMarkTypeId', '')
        .input('LandMark', '')
        .input('IsOfficeAddress', 1)
        .input('CompanyEmail', inputEmail4comp)
        .input('CompanyPhone', PhoneBuz)
        .input('OwnerId', bustype)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) throw err;
    
            new sql.Request()
            .input('AddressOwnerId', BLdetailsId)
            .input('AddressOwnerTypeId', 4)
            .input('AreaTypeId', addressAreaB)
            .input('WardId', wardIdB)
            .input('TrackingNo', trackngNo)
            .input('PostCode', postcode)
            .input('Street', street)
            .input('Road', road)
            .input('PlotNo', plot_no)
            .input('BlockNo', block_no)
            .input('HouseNo', house_no)
            .input('UnsurveyedArea', unservayedarea)
            .input('PoBox', inputEmail4pobox)
            .input('FrontUserId', userId)
            .input('CountryId', '255')
            .input('City', '')
            .input('ZipCode', '')
            .input('PhysicalAddress','')
            .input('RegionCode', regionlistB)
            .input('DistrictCode', districtlistB)
            .input('Area', '')
            .input('LandMarkTypeId', '')
            .input('LandMark', '')
            .input('IsOfficeAddress', 1)
            .input('CompanyEmail', inputEmail4comp)
            .input('CompanyPhone', PhoneBuz)
            .input('OwnerId', bustype)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) throw err;

     new sql.Request()
     .input('EntityTypeId', 3)
     .input('EntityId', BLdetailsId)
     .input('OwnerSubTypeId', BizOwnerType)
     .input('FrontUserId', userId)
     .input('TrackingNo', trackngNo)
     .input('CorporateName', '')
     .input('IsBankOperator', '')
     .input('CompanyTypeId','')
     .input('OwnerId', bodyId)
     .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
         if(err) throw err;

                sql.close();
                res.send("success")// your isTrue value
              });
              });
  
          });
  
        });
  });
}
  
});

app.post('/saveBStageTwo', function (req, res) {
  //console.log(req.body)
   var trackngNo = req.body.trackngNo;
   var BLNo = req.body.BLNo;
   var trackNo = req.body.trackNo;
   var userId = req.body.userId;
   var PhoneBuz = req.body.PhoneBuz;
   var inputEmail4comp = req.body.inputEmail4comp;
   var inputEmail4phn = req.body.inputEmail4phn;
   var inputEmail4pobox = req.body.inputEmail4pobox;
   var addressAreaB = req.body.addressAreaB;
   var regionlistB = req.body.regionlistB;
   var districtlistB = req.body.districtlistB;
   var wardIdB = req.body.wardIdB;
   var street = req.body.street;
   var postcode = req.body.postcode;
   var road = req.body.road;
   var plot_no = req.body.plot_no;
   var block_no = req.body.block_no;
   var house_no = req.body.house_no;
   var unservayedarea = req.body.unservayedarea;
   
   sql.connect(configBL, function (err) {
   
     if (err) console.log(err);
   // console.log("======>>> " + BLNo)
     var request1 = new sql.Request();
     request1.input('BLNo', BLNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @BLNo', 
     function (err, recordset) {
     if (err) console.log(err)
     var result_from = recordset.recordset;
     // console.log("====== " + result_from)
     // var businessType = result_from[0].BusinessTypeId;
     //var businessLicOwnerTypeId = result_from[0].BusinessLicOwnerTypeId;
     // var ApplicationTin = result_from[0].ApplicationTin;
     // var IssueingOfficeId = result_from[0].IssueingOfficeId;
     // var BusinessClassId = result_from[0].BusinessClassId;
     
       var Id = result_from[0].Id;
       req.session.req_id = Id;
       req.session.req_id_touse = Id;
       var id_touse = Id;
       
       var request1 = new sql.Request();
       request1.input('trackNo', trackNo);
       request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackNo', 
       function (err, recordset) {
       if (err) console.log(err)
       var result_from1 = recordset.recordset;
       var BranchId = result_from1[0].Id;
      //  console.log("======+++ " + BranchId)
       var request1 = new sql.Request();
       request1.input('Id', Id);
       request1.query('SELECT BusinessTIN, IssueingOfficeId, BLNumber, FeePaid FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @Id', 
       function (err, recordset) {
       if (err) console.log(err)
       var result_from1 = recordset.recordset;
       var ApplicationTin = result_from1[0].BusinessTIN;
       var IssueingOfficeId = result_from1[0].IssueingOfficeId;
       var BLNumber = result_from1[0].BLNumber;
       var FeePaid = result_from1[0].FeePaid;
     var request = new sql.Request();
     request.input('userId', userId);
     request.input('trackngNo', trackNo);
     request.input('Subdet', new Date());
     request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, SubmittedDate = @Subdet WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
     function (err, recordset) {
         if (err) console.log(err)
         var request2 = new sql.Request();
               request2.input('BusLicAppId', BranchId);
               request2.input('inputEmail4comp', inputEmail4comp);
               request2.input('BizTin', ApplicationTin);
               request2.input('inputEmail4phn', PhoneBuz);
               request2.input('inputEmail4pobox', inputEmail4pobox);
               request2.input('issuingAuthorityId', IssueingOfficeId);
               request2.input('BLNumber', BLNumber);
               request2.input('FeePaid', FeePaid);
               request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated, PrincipalLicNo, PrinciplaFeePaid) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, 1, @issuingAuthorityId, 5, 0, @BLNumber, @FeePaid)`, function (err, recordset) {
                   if (err) console.log(err)
   
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BranchId);
                         request3.input('ServiceCode', '4203');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', userId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err, recordset) {
                             if (err) console.log(err)               
   
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BranchId);
                             request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err, recordset) {
                               if (err) console.log(err)
                              // sql.close();
                              //  console.log(recordset.recordset)
                               var result_form = recordset.recordset;
                               var Id_bl = result_form[0].Id;
                               req.session.BLdet = Id_bl;
   
                               sql.close();
                               res.send(Id_bl)
                         });
                   });
         
               });
             });
     });
   });
 });
   });
   
   
   
});

app.post('/saveTransferStageTwo', function (req, res) {
  //console.log(req.body)
   var trackngNo = req.body.trackngNo;
   var BLNo = req.body.BLNo;
   var trackNo = req.body.trackNo;
   var userId = req.body.userId;
   var PhoneBuz = req.body.PhoneBuz;
   var inputEmail4comp = req.body.inputEmail4comp;
   var inputEmail4phn = req.body.inputEmail4phn;
   var inputEmail4pobox = req.body.inputEmail4pobox;
   var addressAreaB = req.body.addressAreaB;
   var regionlistB = req.body.regionlistB;
   var districtlistB = req.body.districtlistB;
   var wardIdB = req.body.wardIdB;
   var street = req.body.street;
   var postcode = req.body.postcode;
   var road = req.body.road;
   var plot_no = req.body.plot_no;
   var block_no = req.body.block_no;
   var house_no = req.body.house_no;
   var unservayedarea = req.body.unservayedarea;
   
   sql.connect(configBL, function (err) {
   
     if (err) console.log(err);
   // console.log("======>>> " + BLNo)
     var request1 = new sql.Request();
     request1.input('BLNo', BLNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @BLNo', 
     function (err, recordset) {
     if (err) console.log(err)
     var result_from = recordset.recordset;
     
       var Id = result_from[0].Id;
       req.session.req_id = Id;
       req.session.req_id_touse = Id;
       var id_touse = Id;
       
       var request1 = new sql.Request();
       request1.input('trackNo', trackNo);
       request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackNo', 
       function (err, recordset) {
       if (err) console.log(err)
       var result_from1 = recordset.recordset;
       var BranchId = result_from1[0].Id;
      //  console.log("======+++ " + BranchId)
       var request1 = new sql.Request();
       request1.input('Id', Id);
       request1.query('SELECT BusinessTIN, IssueingOfficeId, BLNumber, FeePaid, PrincipalLicNo FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @Id', 
       function (err, recordset) {
       if (err) console.log(err)
       var result_from1 = recordset.recordset;
       var ApplicationTin = result_from1[0].BusinessTIN;
       var IssueingOfficeId = result_from1[0].IssueingOfficeId;
       var BLNumber = result_from1[0].BLNumber;
       var FeePaid = result_from1[0].FeePaid;
       var PrincipalLicNo = result_from1[0].PrincipalLicNo;
     var request = new sql.Request();
     request.input('userId', userId);
     request.input('trackngNo', trackNo);
     request.input('Subdet', new Date());
     request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, SubmittedDate = @Subdet WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
     function (err, recordset) {
         if (err) console.log(err)
         var request2 = new sql.Request();
               request2.input('BusLicAppId', BranchId);
               request2.input('inputEmail4comp', inputEmail4comp);
               request2.input('BizTin', ApplicationTin);
               request2.input('inputEmail4phn', PhoneBuz);
               request2.input('inputEmail4pobox', inputEmail4pobox);
               request2.input('issuingAuthorityId', IssueingOfficeId);
               request2.input('BLNumber', BLNumber);
               request2.input('FeePaid', FeePaid);
               request2.input('PrincipalLicNo', PrincipalLicNo);
               request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated, BLNumber, PrinciplaFeePaid, PrincipalLicNo) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, 1, @issuingAuthorityId, 5, 0, @BLNumber, @FeePaid, @PrincipalLicNo)`, function (err, recordset) {
                   if (err) console.log(err)
   
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BranchId);
                         request3.input('ServiceCode', '4202');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', userId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err, recordset) {
                             if (err) console.log(err)               
   
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BranchId);
                             request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err, recordset) {
                               if (err) console.log(err)
                              // sql.close();
                              //  console.log(recordset.recordset)
                               var result_form = recordset.recordset;
                               var Id_bl = result_form[0].Id;
                               req.session.BLdet = Id_bl;
   
                               sql.close();
                               res.send(Id_bl)
                         });
                   });
         
               });
             });
     });
   });
 });
   });
   
   
   
});

app.post('/cancelStageTwo', function (req, res) {
  //console.log(req.body)
   var trackngNo = req.body.trackngNo;
   var BLNo = req.body.BLNo;
   var trackNo = req.body.trackNo;
   var userId = req.body.userId;
   var PhoneBuz = req.body.PhoneBuz;
   var inputEmail4comp = req.body.inputEmail4comp;
   var inputEmail4phn = req.body.inputEmail4phn;
   var inputEmail4pobox = req.body.inputEmail4pobox;
   var addressAreaB = req.body.addressAreaB;
   var regionlistB = req.body.regionlistB;
   var districtlistB = req.body.districtlistB;
   var wardIdB = req.body.wardIdB;
   var street = req.body.street;
   var postcode = req.body.postcode;
   var road = req.body.road;
   var plot_no = req.body.plot_no;
   var block_no = req.body.block_no;
   var house_no = req.body.house_no;
   var unservayedarea = req.body.unservayedarea;
   
   sql.connect(configBL, function (err) {
   
     if (err) console.log(err);
   // console.log("======>>> " + BLNo)
     var request1 = new sql.Request();
     request1.input('BLNo', BLNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @BLNo', 
     function (err, recordset) {
     if (err) console.log(err)
     var result_from = recordset.recordset;
     // console.log("====== " + result_from)
     // var businessType = result_from[0].BusinessTypeId;
     //var businessLicOwnerTypeId = result_from[0].BusinessLicOwnerTypeId;
     // var ApplicationTin = result_from[0].ApplicationTin;
     // var IssueingOfficeId = result_from[0].IssueingOfficeId;
     // var BusinessClassId = result_from[0].BusinessClassId;
     
       var Id = result_from[0].Id;
       req.session.req_id = Id;
       req.session.req_id_touse = Id;
       var id_touse = Id;
       
       var request1 = new sql.Request();
       request1.input('trackNo', trackNo);
       request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackNo', 
       function (err, recordset) {
       if (err) console.log(err)
       var result_from1 = recordset.recordset;
       var BranchId = result_from1[0].Id;
      //  console.log("======+++ " + BranchId)
       var request1 = new sql.Request();
       request1.input('Id', Id);
       request1.query('SELECT BusinessTIN, IssueingOfficeId, BLNumber, FeePaid, Email, PhoneNo, PoBox, IsBranch FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @Id', 
       function (err, recordset) {
       if (err) console.log(err)
       var result_from1 = recordset.recordset;
       var ApplicationTin = result_from1[0].BusinessTIN;
       var IssueingOfficeId = result_from1[0].IssueingOfficeId;
       var BLNumber = result_from1[0].BLNumber;
       var FeePaid = result_from1[0].FeePaid;
       var Email = result_from1[0].Email;
       var PhoneNo = result_from1[0].PhoneNo;
       var PoBox = result_from1[0].PoBox;
       var IsBranch = result_from1[0].IsBranch;
     var request = new sql.Request();
     request.input('userId', userId);
     request.input('trackngNo', trackNo);
     request.input('Subdet', new Date());
     request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, SubmittedDate = @Subdet WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
     function (err, recordset) {
         if (err) console.log(err)
         var request2 = new sql.Request();
               request2.input('BusLicAppId', BranchId);
               request2.input('inputEmail4comp', Email);
               request2.input('BizTin', ApplicationTin);
               request2.input('inputEmail4phn', PhoneNo);
               request2.input('inputEmail4pobox', PoBox);
               request2.input('issuingAuthorityId', IssueingOfficeId);
               request2.input('BLNumber', BLNumber);
               request2.input('FeePaid', FeePaid);
               request2.input('IsBranch', IsBranch);
               request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated, BLNumber) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, @IsBranch, @issuingAuthorityId, 5, 0, @BLNumber)`, function (err, recordset) {
                   if (err) console.log(err)
   
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BranchId);
                         request3.input('ServiceCode', '4204');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', userId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err, recordset) {
                             if (err) console.log(err)               
   
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BranchId);
                             request4.query('SELECT Id, Email, PhoneNo, PoBox FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err, recordset) {
                               if (err) console.log(err)
                              // sql.close();
                              //  console.log(recordset.recordset)
                               var result_form = recordset.recordset;
                               var Id_bl = result_form[0].Id;
                               var Email = result_form[0].Email;
                               var PhoneNo = result_form[0].PhoneNo;
                               var PoBox = result_form[0].PoBox;
                               req.session.BLdet = Id_bl;
   
                               sql.close();
                               res.send({"Id_bl": Id_bl, "Email": Email, "PhoneNo": PhoneNo, "PoBox": PoBox})
                         });
                   });
         
               });
             });
     });
   });
 });
   });
   
   
   
});

app.get('/UpdatePaidAmount', function (req, res) {
  // var reg_id = req.params.id;
  console.log(req.session.req_id_touse);
  // connect to your database
  sql.connect(configBill, function (err) {
  
      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.input('BusLicAppId', req.session.req_id_touse);
      request.query('SELECT * FROM dbo.tblInvoice WHERE PaymentStatus = 1 AND ApplicationID = @BusLicAppId', function (err, recordset) {
  
          if (err) console.log(err)
           sql.close();
          // send records as a response
          var result_from = recordset.recordset;
          // var amountPaid = result_from[0].AmountTotal;
          // req.session.AmountTotal = amountPaid;
          // console.log("======>> " + req.session.AmountTotal)
          console.log(recordset.recordset);
          res.send(recordset.recordset);
  
      });
  });
});

app.post('/UpdatePaymentDetails', function (req, res) {
   sql.connect(configBL, function (err) {
     if (err) console.log(err);
     var request = new sql.Request();
     request.input('userId', userId);
     request.input('BusLicAppId', req.session.req_id_touse);
     request.input('amount', req.session.AmountTotal);
     request.query(`UPDATE dbo.BusinessLicenceDetails SET PrinciplaFeePaid = @amount WHERE BusinessLicenceApplicationId = @BusLicAppId`, 
     function (err, recordset) {
         if (err) console.log(err)
         sql.close();
        // console.log(req.session.req_id_touse + " <<<<======>>>> " + req.session.AmountTotal)
         res.send("success")
             });
   }); 
});

app.post('/AddressRecordB', function(req, res){
  var trackngNo = req.body.trackngNo;
  var trackNo = req.body.trackNo;
  var BLNo = req.body.BLNo;
  var userId = req.body.userId;
  var BLdetailsId = req.body.BLdetailsId;
  
    sql.connect(config, function(err) {
      if(err) throw err
    
      var request11 = new sql.Request();
      request11.input('BLNo', BLNo);
      var userInfo = 'SELECT * FROM dbo.tblAddress WHERE  TrackingNo = @BLNo';
    request11.query(userInfo, function (err1, recordset1) {

      if (err1) console.log(err1)
     //console.log(recordset1.recordset)
      var result_from1 = recordset1.recordset;
      var AreaTypeId = result_from1[0].AreaTypeId;
      var WardId = result_from1[0].WardId;
      var PostCode = result_from1[0].PostCode;
      var Street = result_from1[0].Street;
      var Road = result_from1[0].Road;
      var PlotNo = result_from1[0].PlotNo;

      var BlockNo = result_from1[0].BlockNo;
      var HouseNo = result_from1[0].HouseNo;
      var UnsurveyedArea = result_from1[0].UnsurveyedArea;
      var PoBox = result_from1[0].PoBox;
      var Road = result_from1[0].Road;
      var PlotNo = result_from1[0].PlotNo;
      var AddressOwnerId = result_from1[0].AddressOwnerId;
      var RegionCode = result_from1[0].RegionCode;
      var DistrictCode = result_from1[0].DistrictCode;
      var CompanyEmail = result_from1[0].CompanyEmail;
      var CompanyPhone = result_from1[0].CompanyPhone;
      
      var request11 = new sql.Request();
      request11.input('BLNo', BLNo);
      var userInfo = 'SELECT OwnerSubTypeId FROM dbo.tblEntityOwner WHERE  TrackingNo = @BLNo';
    request11.query(userInfo, function (err1, recordset1) {

      if (err1) console.log(err1)
     //console.log(recordset1.recordset)
      var result_from1 = recordset1.recordset;
      var OwnerSubTypeId = result_from1[0].OwnerSubTypeId;

      if(OwnerSubTypeId == 1){
          new sql.Request()
          .input('AddressOwnerId', AddressOwnerId)
          .input('AddressOwnerTypeId', 1)
          .input('AreaTypeId', AreaTypeId)
          .input('WardId', WardId)
          .input('TrackingNo', trackNo)
          .input('PostCode', PostCode)
          .input('Street', Street)
          .input('Road', Road)
          .input('PlotNo', PlotNo)
          .input('BlockNo', BlockNo)
          .input('HouseNo', HouseNo)
          .input('UnsurveyedArea', UnsurveyedArea)
          .input('PoBox', PoBox)
          .input('FrontUserId', userId)
          .input('CountryId', '255')
          .input('City', '')
          .input('ZipCode', '')
          .input('PhysicalAddress','')
          .input('RegionCode', RegionCode)
          .input('DistrictCode', DistrictCode)
          .input('Area', '')
          .input('LandMarkTypeId', '')
          .input('LandMark', '')
          .input('IsOfficeAddress', 0)
          .input('CompanyEmail', CompanyEmail)
          .input('CompanyPhone', CompanyPhone)
          // .input('OwnerId', bustype)
          .input('OwnerId', 1)
          .execute('Save_Address_SP', function(err, recordsets, returnValue) {
              if(err) throw err;
      
              new sql.Request()
              .input('AddressOwnerId', BLdetailsId)
              .input('AddressOwnerTypeId', 4)
              .input('AreaTypeId', AreaTypeId)
              .input('WardId', WardId)
              .input('TrackingNo', trackNo)
              .input('PostCode', PostCode)
              .input('Street', Street)
              .input('Road', Road)
              .input('PlotNo', PlotNo)
              .input('BlockNo', BlockNo)
              .input('HouseNo', HouseNo)
              .input('UnsurveyedArea', UnsurveyedArea)
              .input('PoBox', PoBox)
              .input('FrontUserId', userId)
              .input('CountryId', '255')
              .input('City', '')
              .input('ZipCode', '')
              .input('PhysicalAddress','')
              .input('RegionCode', RegionCode)
              .input('DistrictCode', DistrictCode)
              .input('Area', '')
              .input('LandMarkTypeId', '')
              .input('LandMark', '')
              .input('IsOfficeAddress', 1)
              .input('CompanyEmail', CompanyEmail)
              .input('CompanyPhone', CompanyPhone)
              .input('OwnerId', 1)
              .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                  if(err) throw err;
  
       new sql.Request()
       .input('EntityTypeId', 3)
       .input('EntityId', BLdetailsId)
       .input('OwnerSubTypeId', 1)
       .input('FrontUserId', userId)
       .input('TrackingNo', trackNo)
       .input('CorporateName', '')
       .input('IsBankOperator', '')
       .input('CompanyTypeId','')
       .input('OwnerId', AddressOwnerId)
       .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
           if(err) throw err;
  
                  sql.close();
                  res.send("success")// your isTrue value
                });
                });
    
            });
      }if(OwnerSubTypeId == 3){
            new sql.Request()
            .input('AddressOwnerId', AddressOwnerId)
            .input('AddressOwnerTypeId', 7)
            .input('AreaTypeId', AreaTypeId)
            .input('WardId', WardId)
            .input('TrackingNo', trackNo)
            .input('PostCode', PostCode)
            .input('Street', Street)
            .input('Road', Road)
            .input('PlotNo', PlotNo)
            .input('BlockNo', BlockNo)
            .input('HouseNo', HouseNo)
            .input('UnsurveyedArea', UnsurveyedArea)
            .input('PoBox', PoBox)
            .input('FrontUserId', userId)
            .input('CountryId', '255')
            .input('City', '')
            .input('ZipCode', '')
            .input('PhysicalAddress','')
            .input('RegionCode', RegionCode)
            .input('DistrictCode', DistrictCode)
            .input('Area', '')
            .input('LandMarkTypeId', '')
            .input('LandMark', '')
            .input('IsOfficeAddress', 0)
            .input('CompanyEmail', CompanyEmail)
            .input('CompanyPhone', CompanyPhone)
            // .input('OwnerId', bustype)
            .input('OwnerId', 1)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) throw err;
        
                new sql.Request()
                .input('AddressOwnerId', BLdetailsId)
                .input('AddressOwnerTypeId', 4)
                .input('AreaTypeId', AreaTypeId)
                .input('WardId', WardId)
                .input('TrackingNo', trackNo)
                .input('PostCode', PostCode)
                .input('Street', Street)
                .input('Road', Road)
                .input('PlotNo', PlotNo)
                .input('BlockNo', BlockNo)
                .input('HouseNo', HouseNo)
                .input('UnsurveyedArea', UnsurveyedArea)
                .input('PoBox', PoBox)
                .input('FrontUserId', userId)
                .input('CountryId', '255')
                .input('City', '')
                .input('ZipCode', '')
                .input('PhysicalAddress','')
                .input('RegionCode', RegionCode)
                .input('DistrictCode', DistrictCode)
                .input('Area', '')
                .input('LandMarkTypeId', '')
                .input('LandMark', '')
                .input('IsOfficeAddress', 1)
                .input('CompanyEmail', CompanyEmail)
                .input('CompanyPhone', CompanyPhone)
                .input('OwnerId', 1)
                .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                    if(err) throw err;
    
         new sql.Request()
         .input('EntityTypeId', 3)
         .input('EntityId', BLdetailsId)
         .input('OwnerSubTypeId', OwnerSubTypeId)
         .input('FrontUserId', userId)
         .input('TrackingNo', trackNo)
         .input('CorporateName', '')
         .input('IsBankOperator', '')
         .input('CompanyTypeId','')
         .input('OwnerId', AddressOwnerId)
         .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
             if(err) throw err;
    
                    sql.close();
                    res.send("success")// your isTrue value
                  });
                  });
      
              });
      }
        });
        });
    });
    
});

app.post('/AddressRecordTransfer', function(req, res){
  var trackngNo = req.body.trackngNo;
  var trackNo = req.body.trackNo;
  var BLNo = req.body.BLNo;
  var userId = req.body.userId;
  var BizOwnerType = req.body.BizOwnerType;
  var NoUnit = req.body.NoUnit;
  var TinDate = req.body.TinDate;
  var BizTin = req.body.BizTin;
  var TaxPayer = req.body.TaxPayer;
  var TypeList = req.body.TypeList;
  var PhoneBuz = req.body.PhoneBuz;
  var businessLicenceClassId = req.body.businessLicenceClassId;
  var inputEmail4comp = req.body.inputEmail4comp;
  var inputEmail4phn = req.body.inputEmail4phn;
  var inputEmail4pobox = req.body.inputEmail4pobox;
  // var issuingAuthorityId = req.body.issuingAuthorityId;
  var fname = req.body.fname;
  var mname = req.body.mname;
  var lname = req.body.lname;
  var gender = req.body.gender;
  var dob = req.body.dob;
  var nida_no = req.body.nida_no;
  var bustype = req.body.bustype;
  var addressAreaB = req.body.addressAreaB;
  var regionlistB = req.body.regionlistB;
  var districtlistB = req.body.districtlistB;
  var wardIdB = req.body.wardIdB;
  var street = req.body.street;
  var postcode = req.body.postcode;
  var road = req.body.road;
  var plot_no = req.body.plot_no;
  var block_no = req.body.block_no;
  var house_no = req.body.house_no;
  var unservayedarea = req.body.unservayedarea;
  var busorigintype = req.body.busorigintype;
  var BLdetailsId = req.body.BLdetailsId;
  
    sql.connect(config, function(err) {
      if(err) throw err
    
      var request11 = new sql.Request();
      request11.input('BLNo', BLNo);
      var userInfo = 'SELECT * FROM dbo.tblAddress WHERE  TrackingNo = @BLNo';
    request11.query(userInfo, function (err1, recordset1) {

      if (err1) console.log(err1)
     console.log(recordset1.recordset)
      var result_from1 = recordset1.recordset;
      var AreaTypeId = result_from1[0].AreaTypeId;
      var WardId = result_from1[0].WardId;
      var PostCode = result_from1[0].PostCode;
      var Street = result_from1[0].Street;
      var Road = result_from1[0].Road;
      var PlotNo = result_from1[0].PlotNo;

      var BlockNo = result_from1[0].BlockNo;
      var HouseNo = result_from1[0].HouseNo;
      var UnsurveyedArea = result_from1[0].UnsurveyedArea;
      var PoBox = result_from1[0].PoBox;
      var Road = result_from1[0].Road;
      var PlotNo = result_from1[0].PlotNo;
      var AddressOwnerId = result_from1[0].AddressOwnerId;
      var RegionCode = result_from1[0].RegionCode;
      var DistrictCode = result_from1[0].DistrictCode;
      var CompanyEmail = result_from1[0].CompanyEmail;
      var CompanyPhone = result_from1[0].CompanyPhone;
          
          new sql.Request()
          .input('AddressOwnerId', AddressOwnerId)
          .input('AddressOwnerTypeId', 1)
          .input('AreaTypeId', addressAreaB)
          .input('WardId', wardIdB)
          .input('TrackingNo', trackNo)
          .input('PostCode', postcode)
          .input('Street', street)
          .input('Road', road)
          .input('PlotNo', plot_no)
          .input('BlockNo', block_no)
          .input('HouseNo', house_no)
          .input('UnsurveyedArea', unservayedarea)
          .input('PoBox', inputEmail4pobox)
          .input('FrontUserId', userId)
          .input('CountryId', '255')
          .input('City', '')
          .input('ZipCode', '')
          .input('PhysicalAddress','')
          .input('RegionCode', regionlistB)
          .input('DistrictCode', districtlistB)
          .input('Area', '')
          .input('LandMarkTypeId', '')
          .input('LandMark', '')
          .input('IsOfficeAddress', 0)
          .input('CompanyEmail', inputEmail4comp)
          .input('CompanyPhone', inputEmail4phn)
          // .input('OwnerId', bustype)
          .input('OwnerId', 1)
          .execute('Save_Address_SP', function(err, recordsets, returnValue) {
              if(err) throw err;
      
              new sql.Request()
              .input('AddressOwnerId', BLdetailsId)
              .input('AddressOwnerTypeId', 4)
              .input('AreaTypeId', addressAreaB)
              .input('WardId', wardIdB)
              .input('TrackingNo', trackNo)
              .input('PostCode', postcode)
              .input('Street', street)
              .input('Road', road)
              .input('PlotNo', plot_no)
              .input('BlockNo', block_no)
              .input('HouseNo', house_no)
              .input('UnsurveyedArea', unservayedarea)
              .input('PoBox', inputEmail4pobox)
              .input('FrontUserId', userId)
              .input('CountryId', '255')
              .input('City', '')
              .input('ZipCode', '')
              .input('PhysicalAddress','')
              .input('RegionCode', regionlistB)
              .input('DistrictCode', districtlistB)
              .input('Area', '')
              .input('LandMarkTypeId', '')
              .input('LandMark', '')
              .input('IsOfficeAddress', 1)
              .input('CompanyEmail', inputEmail4comp)
              .input('CompanyPhone', inputEmail4phn)
              .input('OwnerId', 1)
              .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                  if(err) throw err;
  
       new sql.Request()
       .input('EntityTypeId', 3)
       .input('EntityId', BLdetailsId)
       .input('OwnerSubTypeId', 1)
       .input('FrontUserId', userId)
       .input('TrackingNo', trackNo)
       .input('CorporateName', '')
       .input('IsBankOperator', '')
       .input('CompanyTypeId','')
       .input('OwnerId', AddressOwnerId)
       .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
           if(err) throw err;
  
                  sql.close();
                  res.send("success")// your isTrue value
                });
                });
    
            });
          });
    });
    
});

app.post('/AddressRecordCancel', function(req, res){
  var trackngNo = req.body.trackngNo;
  var trackNo = req.body.trackNo;
  var BLNo = req.body.BLNo;
  var userId = req.body.userId;
  var BizOwnerType = req.body.BizOwnerType;
  var NoUnit = req.body.NoUnit;
  var TinDate = req.body.TinDate;
  var BizTin = req.body.BizTin;
  var TaxPayer = req.body.TaxPayer;
  var TypeList = req.body.TypeList;
  var PhoneBuz = req.body.PhoneBuz;
  var businessLicenceClassId = req.body.businessLicenceClassId;
  var inputEmail4comp = req.body.inputEmail4comp;
  var inputEmail4phn = req.body.inputEmail4phn;
  var inputEmail4pobox = req.body.inputEmail4pobox;
  // var issuingAuthorityId = req.body.issuingAuthorityId;
  var fname = req.body.fname;
  var mname = req.body.mname;
  var lname = req.body.lname;
  var gender = req.body.gender;
  var dob = req.body.dob;
  var nida_no = req.body.nida_no;
  var bustype = req.body.bustype;
  var addressAreaB = req.body.addressAreaB;
  var regionlistB = req.body.regionlistB;
  var districtlistB = req.body.districtlistB;
  var wardIdB = req.body.wardIdB;
  var street = req.body.street;
  var postcode = req.body.postcode;
  var road = req.body.road;
  var plot_no = req.body.plot_no;
  var block_no = req.body.block_no;
  var house_no = req.body.house_no;
  var unservayedarea = req.body.unservayedarea;
  var busorigintype = req.body.busorigintype;
  var BLdetailsId = req.body.BLdetailsId;
  
    sql.connect(config, function(err) {
      if(err) throw err
    
      var request11 = new sql.Request();
      request11.input('BLNo', BLNo);
      var userInfo = 'SELECT * FROM dbo.tblAddress WHERE  TrackingNo = @BLNo';
    request11.query(userInfo, function (err1, recordset1) {

      if (err1) console.log(err1)
     console.log(recordset1.recordset)
      var result_from1 = recordset1.recordset;
      var AreaTypeId = result_from1[0].AreaTypeId;
      var WardId = result_from1[0].WardId;
      var PostCode = result_from1[0].PostCode;
      var Street = result_from1[0].Street;
      var Road = result_from1[0].Road;
      var PlotNo = result_from1[0].PlotNo;

      var BlockNo = result_from1[0].BlockNo;
      var HouseNo = result_from1[0].HouseNo;
      var UnsurveyedArea = result_from1[0].UnsurveyedArea;
      var PoBox = result_from1[0].PoBox;
      var Road = result_from1[0].Road;
      var PlotNo = result_from1[0].PlotNo;
      var AddressOwnerId = result_from1[0].AddressOwnerId;
    //  date_birth = dateFormat(dob, "dd, mmm yyyy");

          
          new sql.Request()
          .input('AddressOwnerId', AddressOwnerId)
          .input('AddressOwnerTypeId', 1)
          .input('AreaTypeId', AreaTypeId)
          .input('WardId', WardId)
          .input('TrackingNo', trackNo)
          .input('PostCode', PostCode)
          .input('Street', Street)
          .input('Road', Road)
          .input('PlotNo', PlotNo)
          .input('BlockNo', BlockNo)
          .input('HouseNo', HouseNo)
          .input('UnsurveyedArea', UnsurveyedArea)
          .input('PoBox', inputEmail4pobox)
          .input('FrontUserId', userId)
          .input('CountryId', '255')
          .input('City', '')
          .input('ZipCode', '')
          .input('PhysicalAddress','')
          .input('RegionCode', '')
          .input('DistrictCode', '')
          .input('Area', '')
          .input('LandMarkTypeId', '')
          .input('LandMark', '')
          .input('IsOfficeAddress', 0)
          .input('CompanyEmail', inputEmail4comp)
          .input('CompanyPhone', PhoneBuz)
          // .input('OwnerId', bustype)
          .input('OwnerId', 1)
          .execute('Save_Address_SP', function(err, recordsets, returnValue) {
              if(err) throw err;
      
              new sql.Request()
              .input('AddressOwnerId', BLdetailsId)
              .input('AddressOwnerTypeId', 4)
              .input('AreaTypeId', AreaTypeId)
              .input('WardId', WardId)
              .input('TrackingNo', trackNo)
              .input('PostCode', PostCode)
              .input('Street', Street)
              .input('Road', Road)
              .input('PlotNo', PlotNo)
              .input('BlockNo', BlockNo)
              .input('HouseNo', HouseNo)
              .input('UnsurveyedArea', UnsurveyedArea)
              .input('PoBox', inputEmail4pobox)
              .input('FrontUserId', userId)
              .input('CountryId', '255')
              .input('City', '')
              .input('ZipCode', '')
              .input('PhysicalAddress','')
              .input('RegionCode', '')
              .input('DistrictCode', '')
              .input('Area', '')
              .input('LandMarkTypeId', '')
              .input('LandMark', '')
              .input('IsOfficeAddress', 1)
              .input('CompanyEmail', inputEmail4comp)
              .input('CompanyPhone', PhoneBuz)
              .input('OwnerId', 1)
              .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                  if(err) throw err;
  
       new sql.Request()
       .input('EntityTypeId', 3)
       .input('EntityId', BLdetailsId)
       .input('OwnerSubTypeId', 1)
       .input('FrontUserId', userId)
       .input('TrackingNo', trackNo)
       .input('CorporateName', '')
       .input('IsBankOperator', '')
       .input('CompanyTypeId','')
       .input('OwnerId', AddressOwnerId)
       .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
           if(err) throw err;
  
                  sql.close();
                  res.send("success")// your isTrue value
                });
                });
    
            });
    
          });
    });
    
});

app.post('/uploaadFile', function (req, res) {
 console.log(req.body)
  var trackngNo = req.body.trackngNo;
  var token = req.body.token;
  var attachmentId = req.body.attachmentId;
  var atachment = req.body.atachment;
  var trackNo = req.body.trackNo;
  
  sql.connect(configBL, function (err) {
  
    if (err) console.log(err);
  
    var request1 = new sql.Request();
    request1.input('trackngNo', trackngNo);
    request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err, recordset) {
      if (err) console.log(err)
      var result_form = recordset.recordset;
      console.log(result_form)
      var Id = result_form[0].Id;
      req.session.req_id = Id;
      
      request({
        url: BASEURL+"api/addBLAttachment",
        // url: BASEURL+"api/addNewBLAttachment",
        method: 'POST',
        json: {TrackingNo: trackngNo, BusinessAppId: Id, AttachmentTypeId: attachmentId, file: atachment, IsPermit: 0, token: token},
      }, function(error, response, body){
        if(error) throw error
          res.send({"sucess": "sucess"})
        // });
      });

  });
  });
  
  
  
});

app.post('/uploaadFilem', function (req, res) {
  console.log(req.body)
   var trackngNo = req.body.trackngNo;
   var token = req.body.token;
   var attachmentId = req.body.attachmentId;
   var atachment = req.body.atachment;
   var trackNo = req.body.trackNo;
   
   sql.connect(configBL, function (err) {
   
     if (err) console.log(err);
   
     var request1 = new sql.Request();
     request1.input('trackngNo', trackngNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err, recordset) {
       if (err) console.log(err)
       var result_form = recordset.recordset;
       console.log(result_form)
       var Id = result_form[0].Id;
       req.session.req_id = Id;
       
       request({
         url: BASEURL+"api/addBLAttachment",
         // url: BASEURL+"api/addNewBLAttachment",
         method: 'POST',
         json: {TrackingNo: trackngNo, BusinessAppId: Id, AttachmentTypeId: attachmentId, file: atachment, IsPermit: 1, token: token},
       }, function(error, response, body){
         if(error) throw error
           res.send({"sucess": "sucess"})
         // });
       });
 
   });
   });
   
   
   
 });

app.post('/uploaadFiley', function (req, res) {
  console.log(req.body)
   var trackngNo = req.body.trackngNo;
   var token = req.body.token;
   var attachmentId = req.body.attachmentId;
   var atachment = req.body.atachment;
   var trackNo = req.body.trackNo;
   
   sql.connect(configBL, function (err) {
   
     if (err) console.log(err);
   
     var request1 = new sql.Request();
     request1.input('trackngNo', trackNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err, recordset) {
       if (err) console.log(err)
       var result_form = recordset.recordset;
       console.log(result_form)
       var Id = result_form[0].Id;
       req.session.req_id = Id;
       
       request({
         url: BASEURL+"api/addBLAttachment",
         // url: BASEURL+"api/addNewBLAttachment",
         method: 'POST',
         json: {TrackingNo: trackNo, BusinessAppId: Id, AttachmentTypeId: attachmentId, file: atachment, IsPermit: 0, token: token},
       }, function(error, response, body){
         if(error) throw error
           res.send({"sucess": "sucess"})
         // });
       });
 
   });
   });
   
   
   
 });

app.get('/bizType1', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(configBL, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM dbo.BusinessTypes', function (err, recordset) {

        if (err) console.log(err)
         sql.close();
        // send records as a response
        res.send(recordset.recordset);

    });
});
});

app.get('/bizType/:id', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(configBL, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM dbo.BusinessTypes WHERE BusinessCategoryId = ' + reg_id, function (err, recordset) {

        if (err) console.log(err)
         sql.close();
        // send records as a response
        res.send(recordset.recordset);

    });
});
});

app.get('/bizTypeAll', function (req, res) {
  // var reg_id = req.params.id;
  // connect to your database
  sql.connect(configBL, function (err) {
  
      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('SELECT * FROM dbo.BusinessTypes', function (err, recordset) {
  
          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
  
      });
  });
});

app.get('/test', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblOwnerSubType', function (err, recordset) {
          
          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset);
          
      });
  });
});

app.get('/regions', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblRegion', function (err, recordset) {
          
          if (err) console.log(err)
     sql.close();
          // send records as a response
          res.send(recordset.recordset);
          
      });
  });
});

app.get('/AddressArea', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblAreaType', function (err, recordset) {

          
          if (err) console.log(err)
     sql.close();
          // send records as a response
          res.send(recordset.recordset);
          
      });
  });
});

app.get('/regions/:id', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM dbo.tblDistrict WHERE RegionCode = ' + reg_id, function (err, recordset) {

        if (err) console.log(err)
         sql.close();
        // send records as a response
        res.send(recordset.recordset);

    });
});
});

app.get('/GetSavedDistrict/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('SELECT DistrictName FROM dbo.tblDistrict WHERE DistrictCode = ' + reg_id, function (err, recordset) {
  
          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
  
      });
  });
});

app.get('/GetSavedWard/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('SELECT WardName FROM dbo.tblWard WHERE WardCode = ' + reg_id, function (err, recordset) {
  
          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
  
      });
  });
});

app.post('/atachFile', function (req, res) {
  var newpath = req.body.newpath;
  var categoryID = req.body.categoryID;
  var trackNo = req.body.trackNo;
  var uploadType = req.body.uploadType;
  if(uploadType == 1){
      uploadType = '0';
  }else if(uploadType == 2){
      uploadType = '1';
  }
  // connect to your database
  sql.connect(configBL, function (err) {
      if (err) console.log(err);

      var request1 = new sql.Request();
      request1.input('trackngNo', trackNo);
      request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err, recordset) {
        if (err) console.log(err)
       // sql.close();
        //console.log(recordset.recordset)
        var result_form = recordset.recordset;
        var Id = result_form[0].Id;
      // create Request object
      var request = new sql.Request();
      request.input('attachmentPath', newpath);
      request.input('categoryID', categoryID);
      request.input('req_id', Id);
      request.input('trackNo', trackNo);
      request.input('uploadType', uploadType);
      request.query(`INSERT INTO dbo.BusinessLicenceAttachments (Path, AttachmentTypeId, BusinessLicenceApplicationid, TrackingNo, Name, IsPermit) values (@attachmentPath, @categoryID, @req_id, @trackNo, @trackNo, @uploadType)`, 
      function (err, recordset) {
          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send("sucess");

      });
  });
  });
});

app.get('/BusSector', function (req, res) {

// connect to your database
sql.connect(configBL, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT Id, SectorName FROM dbo.BusinessSector WHERE isDeleted = 0;', function (err, recordset) {

        if (err) console.log(err)
         sql.close();
        // send records as a response
        res.send(recordset.recordset);

    });
});
});

app.get('/BLAttachmnt', function (req, res) {

  // connect to your database
  sql.connect(configBL, function (err) {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query('SELECT AttachmentTypeId, AttachmentName, Description FROM dbo.BLAttachmentTypes', function (err, recordset) {

          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset.recordset);

      });
  });
});

app.get('/BLAttachmntBra', function (req, res) {

  // connect to your database
  sql.connect(configBL, function (err) {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query('SELECT AttachmentTypeId, AttachmentName, Description FROM dbo.BLAttachmentTypes', function (err, recordset) {

          if (err) console.log(err)
           sql.close();
          // send records as a response
          console.log(recordset.recordset)
          res.send(recordset.recordset);

      });
  });
});

app.get('/BLPermit/:id', function (req, res) {
var bizNo = req.params.id;
  // connect to your database
  sql.connect(configBL, function (err) {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query('SELECT * FROM dbo.BusinessTypePermits, dbo.Permits WHERE dbo.BusinessTypePermits.PermitId = dbo.Permits.Id AND dbo.BusinessTypePermits.BusinessTypeId = '+bizNo, function (err, recordset) {

          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset.recordset);

      });
  });
});

app.get('/category/:id', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(configBL, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM dbo.BusinessCategory WHERE IsDeleted = 0 and BusinessSectorId = ' + reg_id, function (err, recordset) {

        if (err) console.log(err)
         sql.close();
        // send records as a response
        res.send(recordset.recordset);

    });
});
});

app.get('/district/:id', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(config, function (err) {

    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM dbo.tblWard WHERE DistrictCode = ' + reg_id, function (err, recordset) {

        if (err) console.log(err)
         sql.close();
        // send records as a response
        res.send(recordset.recordset);

    });
});
});

app.get('/postcode/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblWard WHERE WardCode = ' + reg_id, function (err, recordset) {
  
          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
  
      });
  });
});

app.get('/getbiz_check/:id', function (req, res) {
    var reg_id = req.params.id;
    // connect to your database
    sql.connect(configBL, function (err) {
  
        if (err) console.log(err);
  
        var request1 = new sql.Request();
  
        // query to the database and get the records
        request1.query('SELECT count(Id) as kaunti FROM dbo.BusinessLicApplication WHERE ApplicationStatusId NOT IN(2) AND businessTypeId = '+reg_id, 
        function (err, recordset) {
  
            if (err) console.log(err)
            var result_form = recordset.recordset;
            var kaunti = result_form[0].kaunti;
       
              res.send(result_form);

        });
    });
});

app.get('/getbiz/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(configBL, function (err) {

      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query('SELECT b.Id, a.IsPerUnitFeeApplicable, a.IssuingAuthorityId, b.BusinessLicenceClassCode FROM dbo.BusinessTypes as a, dbo.BusinessLicenceClass as b WHERE a.BusinessLicenceClassCode = b.BusinessLicenceClassCode AND a.IssuingAuthorityId = b.IssuingAuthorityId AND a.businessTypeId = '+reg_id, 
      function (err, recordset) {

          if (err) console.log(err)
          var result_form = recordset.recordset;
          // var businessLicenceClassCode = result_form[0].BusinessLicenceClassCode;
          // var issuingAuthorityId = result_form[0].IssuingAuthorityId;
  
               sql.close();
              // send records as a response
              console.log(result_form)
              res.send(result_form);

      });
  });
});

app.get('/dltPendApp/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(configBL, function (err) {

      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
     
      request.input('TrackingNo', reg_id);
      // query to the database and get the records
      request.query('DELETE FROM dbo.BusinessLicApplication WHERE TrackingNo = @TrackingNo', 
      function (err, recordset) {

          if (err) console.log(err)
  
               sql.close();
              // send records as a response
              // console.log(result_form)
              res.send({"status": "success"});

      });
  });
});

app.get('/getParticular/:id',function(req,res){
var obj12 = [];
      var fname, mname, lname, date_birth, gender;
      var citizen = '';
      var user_id = req.params.id;
      sql.connect(configUser, function (err2) {
        if (err2) console.log(err2);
        // create Request object
        var request11 = new sql.Request();
        var userInfo = 'SELECT * FROM dbo.users WHERE  id = ' + user_id;
      request11.query(userInfo, function (err1, recordset1) {

        if (err1) console.log(err1)
       // console.log(recordset1.recordset)
        var result_from1 = recordset1.recordset;
        var nationalityId = result_from1[0].NationalityId;
        var date_birth = result_from1[0].DOB;
        fname = result_from1[0].Fname;
        mname = result_from1[0].Mname;
        lname = result_from1[0].Lname;
        gender = result_from1[0].GenderId;
      //  date_birth = dateFormat(dob, "dd, mmm yyyy");
      console.log(gender)

      if(gender == '1'){
        gender = 'Male';
      }if(gender == '2'){
        gender = 'Female';
      }
        
        if(nationalityId == 1){
          citizen = 'Local';
        }else{
          citizen = 'Foreign';
        }
        obj12.push({"fname": fname, "mname": mname, "lname": lname, "date_birth": date_birth, "citizen": citizen, "gender": gender})
      // 
      sql.close();
      res.send(obj12)
    });
  });
});

app.post('/mwox', function (req, res) {

  console.log(req.body)
  res.send(req.body)
});

app.post('/submitBusInfoApp', function (req, res) { 
  
  var user_id = req.body.userID;
 // Prepare output in JSON format 
 sql.connect(configUser, function (err) {
  
  if (err) console.log(err);

  // create Request object
  var request = new sql.Request();
     
  // query to the database and get the records
  request.query('SELECT Fname, Mname, Lname, Email, DOB FROM users WHERE id = '+user_id+'', function (err, recordset) {
      
      if (err) console.log(err)
       sql.close();
      // send records as a response
      res.send(recordset.recordset);
      
  });
});   
})  

app.post('/submitApplicantInfoApp', function (req, res) {  
  // Prepare output in JSON format    
  console.log(req.body);  
  res.end(JSON.stringify(req.body));  
}) 

app.get('/genBLTrackingNo', function (req, res) {
  
  sql.connect(configBL, function (err) {
      if (err) console.log(err);
      // create Request object
      var request = new sql.Request();
      // query to the database and execute procedure 
      let query = "exec Get_BLTrackingNo_SP";
      // console.log(query)
      request.query(query, function (err, recordset) {
          if (err) {
              console.log(err);
              sql.close();
          }
         // var trackNo = recordset.recordset;
         sql.close();
          res.send(recordset.recordset);
  
      });
    });
});

app.get('/busOnwerType/:id', function (req, res) {
var owner_type_id = req.params.id
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * from dbo.tblOwnerSubType where status = 1 AND OwnerTypeId = ' + owner_type_id, function (err, recordset1) {
          
          if (err) console.log(err)
    sql.close();
          // send records as a response
          res.send(recordset1.recordset);
          
      });
  });
});

app.get('/GetbusOnwerType/:id', function (req, res) {
  var TrackingNo = req.params.id
    // connect to your database
    sql.connect(configBL, function (err) {
    
        if (err) console.log(err);
  
        // create Request object
        var request = new sql.Request();
        request.input('TrackingNo', TrackingNo);
        // query to the database and get the records
        request.query('SELECT BusinessLicOwnerTypeId from dbo.BusinessLicApplication where TrackingNo = @TrackingNo', function (err, recordset1) {
            
            if (err) console.log(err)
      sql.close();
            // send records as a response
            res.send(recordset1.recordset);
            
        });
    });
});

app.get('/getSavedTin/:id', function (req, res) {
    var TrackingNo = req.params.id
      // connect to your database
      sql.connect(configBL, function (err) {
      
          if (err) console.log(err);
    
          // create Request object
          var request = new sql.Request();
          request.input('TrackingNo', TrackingNo);
          // query to the database and get the records
          request.query('SELECT ApplicationTIN, Id, ServiceCode from dbo.BusinessLicApplication where TrackingNo = @TrackingNo', function (err, recordset1) {
              
              if (err) console.log(err)
        sql.close();
              // send records as a response
              res.send(recordset1.recordset);
              
          });
      });
});

app.get('/getPaymentDetails/:id/:code', function (req, res) {
  var reg_id = req.params.id;
  var servicecode = req.params.code;
  console.log(reg_id)
  // connect to your database
  sql.connect(configBill, function (err) {
  
      if (err) console.log(err);
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblInvoice WHERE ApplicationID = ' + reg_id + ' AND TypeCode = ' + servicecode, function (err, recordset) {
  
          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
  
      });
  });
});

app.get('/getSavedBizType/:id', function (req, res) {
  var TrackingNo = req.params.id
    // connect to your database
    sql.connect(configBL, function (err) {
    
        if (err) console.log(err);
  
        // create Request object
        var request = new sql.Request();
        request.input('TrackingNo', TrackingNo);
        // query to the database and get the records
        request.query('SELECT a.BusinessTypeName as BusinessTypeName FROM dbo.BusinessTypes as a, dbo.BusinessLicApplication as b WHERE a.BusinessTypeId = b.BusinessTypeId AND b.TrackingNo = @TrackingNo', function (err, recordset1) {
            
            if (err) console.log(err)
      sql.close();
            // send records as a response
            res.send(recordset1.recordset);
            
        });
    });
});

app.get('/getSavedAreaType/:id', function (req, res) {
  var TrackingNo = req.params.id
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
  
        // create Request object
        var request = new sql.Request();
        request.input('TrackingNo', TrackingNo);
        // query to the database and get the records
        request.query('SELECT * from dbo.tblAddress as a, dbo.tblAreaType as b where a.AreaTypeId = b.AreaTypeId AND a.TrackingNo = @TrackingNo', function (err, recordset1) {
            
            if (err) console.log(err)
      sql.close();
            // send records as a response
            res.send(recordset1.recordset);
            
        });
    });
});

app.get('/GetbusOnwerTypeName/:id', function (req, res) {
    var BizOwnerTypeId = req.params.id
      // connect to your database
      sql.connect(config, function (err) {
      
          if (err) console.log(err);
    
          // create Request object
          var request = new sql.Request();
          request.input('BizOwnerTypeId', BizOwnerTypeId);
          // query to the database and get the records
          request.query('SELECT OwnerSubTypeName from dbo.tblOwnerSubType where OwnerSubTypeId = @BizOwnerTypeId', function (err, recordset1) {
              
              if (err) console.log(err)
        sql.close();
              // send records as a response
              res.send(recordset1.recordset);
              
          });
      });
});

app.get('/originType', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * from dbo.tblOriginType', function (err, recordset1) {
          
          if (err) console.log(err)
    sql.close();
          // send records as a response
          res.send(recordset1.recordset);
          
      });
  });
});

app.get('/originTypeView/:id', function (req, res) {
var TrackingNo = req.params.id;
console.log(TrackingNo)
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
      request.input('TrackingNo', TrackingNo);
      // query to the database and get the records
      request.query('SELECT a.OriginTypeName as OrigTypeName from dbo.tblOriginType as a, dbo.tblPerson as b WHERE b.OriginTypeId = a.OriginTypeId AND b.TrackingNo = @TrackingNo', function (err, recordset1) {
          
          if (err) console.log(err)

    sql.close();
          // send records as a response
        console.log(recordset1.recordset)
          res.send(recordset1.recordset);
          
      });
  });
});

app.get('/GetApplicationStatus/:id', function (req, res) {
  var ApplicationStatusId = req.params.id;
  console.log(ApplicationStatusId)
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
  
        // create Request object
        var request = new sql.Request();
        request.input('ApplicationStatusId', ApplicationStatusId);
        // query to the database and get the records
        request.query('SELECT ApplicationStatusName from dbo.ApplicationStatus WHERE Id = @ApplicationStatusId', function (err, recordset1) {
            
            if (err) console.log(err)
  
      sql.close();
            // send records as a response
          console.log(recordset1.recordset)
            res.send(recordset1.recordset);
            
        });
    });
});

app.get('/ownerType', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * from dbo.tblOwnerType', function (err, recordset1) {
          
          if (err) console.log(err)
    sql.close();
          // send records as a response
          res.send(recordset1.recordset);
          
      });
  });
});

app.get('/getSavedRegion/:id', function (req, res) {
  var regionCode = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
      request.input('regionCode', regionCode);
      // query to the database and get the records
      request.query('SELECT RegionName FROM dbo.tblRegion WHERE RegionCode = @regionCode', function (err, recordset) {
          
          if (err) console.log(err)
     sql.close();
          // send records as a response
          res.send(recordset.recordset);
          
      });
  });
});

app.get('/ownerTypeView/:id', function (req, res) {
  var TrackingNo = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      request.input('TrackingNo', TrackingNo);
      // query to the database and get the records
      request.query('SELECT a.OwnerTypeName as OwnerTypeName from dbo.tblOwnerType as a, dbo.tblPerson as b WHERE a.OwnerTypeId = b.', function (err, recordset1) {
          
          if (err) console.log(err)
    sql.close();
          // send records as a response
          res.send(recordset1.recordset);
          
      });
  });
});

app.post('/userDetails', function (req, res) {
  var user_id = req.body.user_id;
  // connect to your database
  sql.connect(configUser, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT Fname, Mname, Lname, Email, DOB FROM users WHERE id = '+user_id+'', function (err, recordset) {
          
          if (err) console.log(err)
    sql.close();
          // send records as a response
          res.send(recordset.recordset);
          
      });
  });
});

app.get('/sectors', function (req, res) {

  // connect to your database
  sql.connect(configBL, function (err) {
  
      if (err) console.log(err);

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * from BusinessSector', function (err, recordset) {
          
          if (err) console.log(err)
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
          
      });
  });
});

var server = app.listen(3000);
console.log('Hello ORS');