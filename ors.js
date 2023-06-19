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
var http = require('http');
const e = require('express');
require('dotenv').config()


var app = express(); 
// Create application/x-www-form-urlencoded parser  
var urlencodedParser = bodyParser.urlencoded({ extended: false })  

var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
  // Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true,
//   cookie: {
 
//     // Session expires after 1 min of inactivity.
//     // expires: 900000
//     maxAge: 600 * 1000
// }
}));

var optionsAlex = {
  host: 'http://41.59.225.60/api/bl-task',
  path: '/'
}


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 
// set the view engine to ejs
app.set('view engine', 'ejs');

// parse application/json
app.use(bodyParser.json())
var VERURL = "http://41.59.225.60:9010/";
// var VERURL = "http://41.59.228.17:9010/";
var BASEURL = "http://41.59.225.45:3333/"
// var BASEURL = "http://41.59.228.19:8281/";
var loginAPI = BASEURL+"api/login";
var tinAPI = BASEURL+"api/VerifyTIN";

var bnAPI = VERURL+"brela/v1/wbs/businessName/";
var companyAPI = VERURL+"brela/v1/wbs/company/";
var ninAPI = BASEURL+"api/VerifyNIN";
var APIURL = "http://127.0.0.1:8088/";
// var APIURL = "http://41.59.225.60:3000/";

var TrackNoGen = APIURL+'genBLTrackingNo';
var GetRegions = APIURL+'regions';
var GetLga = APIURL+'lga';
var DeletePendAppLink = APIURL+'dltPendApp';
var RenewLicLink = APIURL+'renewLic';
var ApplyBizTypeLink = APIURL+'applyBizTypeLic';
var submitApplicationLink = APIURL+'submitApplication';
var submitFinalLink = APIURL+'submitFinal';
var CancelLicLink = APIURL+'canceLic';
var CancelAttachmentLicLink = APIURL+'cancelAttachmentLic';
var RenewAttachmentLicLink = APIURL+'renewAttachmentLic';
var GetDistricts = APIURL+'district';
var GetPostCode = APIURL+'postcode';
var GetParticulars = APIURL+'getParticular';
var GetStageTwo = APIURL+'originTypeView';
var GetBusOnwerType = APIURL+'busOnwerType';
var GetSubWards = APIURL+'subwards'
var GetOriginType = APIURL+'originType';
var GetOwnerType = APIURL+'ownerType';
var GetBusSectorLink = APIURL+'BusSector';
var GetBusCategoryLink = APIURL+'category';
var GetsaveStageOne = APIURL+'saveStageOne';
var GetBsaveStageOne = APIURL+'saveBStageOne';
var GetsaveStageTwo = APIURL+'saveStageTwo';
var GetupdateStageTwo = APIURL+'updateStageTwo';
var GetsaveOStageTwo = APIURL+'saveOStageTwo';
var GetBsaveStageTwo = APIURL+'saveBStageTwo';
var saveTransferStageTwo = APIURL+'saveTransferStageTwo';
var GetCancelStageTwoLink = APIURL+'cancelStageTwo';
var GetBusTypeLink = APIURL+'bizType';
var GetBusTypeLinkAll = APIURL+'bizTypeAll';
var GetMyApplicationLink = APIURL+'MyApplication';
var GetMyLicLink = APIURL+'MyLic';
var GetMyLicLinkCan = APIURL+'MyLicCan';
var GetMyLicLinkEx = APIURL+'ExLic';
var GetMyApplicationLinkP = APIURL+'PMyApplication';
var GetAddressArea = APIURL+'AddressArea';
var RecordAddressInfo = APIURL+'recordAddressInfo';
var GetBLAttachmntLink = APIURL+'BLAttachmnt';
var GetBLAttachmntLinkBra = APIURL+'BLAttachmntBra';
var GetBLLPermitLink = APIURL+'BLPermit';
var GetSubmitSuppliment = APIURL+'SubmitSuppliment';
var MyApplicationStage = APIURL+'MyApplicationStage'

var GetBiz = APIURL+'getbiz';
var GetBizCheck = APIURL+'getbiz_check';
var AttachFiles = APIURL+'atachFile';
var GetsaveStageAddress = APIURL+'AddressRecord';
var GetupdateStageAddress = APIURL+'updateAddressRecord';
var GetBsaveStageAddress = APIURL+'AddressRecordB';
var GetTransfersaveStageAddress = APIURL+'AddressRecordTransfer';
var GetCancelStageAddress = APIURL+'AddressRecordCancel';
var GetRenewStageAddress = APIURL+'AddressRecordRenew';
var GetsaveBusOwnerType = APIURL+'GetbusOnwerType';
var GetsaveBusOwnerTypeName = APIURL+'GetbusOnwerTypeName';
var UploadFxLink = APIURL+'uploaadFile';
var UploadFxPLink = APIURL+'uploaadPFile';
var UploadFxSupLink = APIURL+'uploaadFileSup';
var UploadFmLink = APIURL+'uploaadFilem';
var UploadFyLink = APIURL+'uploaadFiley';
var GetsavedTIN = APIURL+'getSavedTin';
var GetsavedBizType = APIURL+'getSavedBizType';
var GetsavedAreaType = APIURL+'getSavedAreaType';
var GetsavedRegion = APIURL+'getSavedRegion';
var GetsavedDistrict = APIURL+'GetSavedDistrict';
var GetsavedWard = APIURL+'GetSavedWard';
var GetMyApplicationStatus = APIURL+'GetApplicationStatus';
var GetPaymentDetails = APIURL+'getPaymentDetails';
var GetInvoiceDetails = APIURL+'getInvoiceDataDetails';
var UpdatePaidAmount = APIURL+'UpdatePaidAmount';
var UpdateAmount = APIURL+'UpdatePaymentDetails';

app.get('/',function(req,res){
  res.render(path.join(__dirname+'/public/ors/login'));
});

// app.get('/Dashboard',function(req,res){
//   var loginTrial = req.session.userID;
//   if(typeof req.session.userID !== "undefined" || req.session.userID === true){
//     var current_date = new Date();
//     var today = dateFormat(current_date, "dd, mmm yyyy");
//     res.render(path.join(__dirname+'/public/ors/dashboard'), { today: today, userID: req.session.userID });
//   }else{
//     //console.log(loginTrial)
//     res.redirect('/');
//   }

// });

app.get('/ApplyBL1',function(req,res){
  res.render(path.join(__dirname+'/public/ors/new_buslic'));
});

app.get('/GenTrackNo',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: TrackNoGen,
    method: 'GET',
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + ": Fail to generate Tracking Number")
    }
    console.log('response.body')
    console.log(response.body)
    if(response.body == 'failed'){
      res.send({status: "failed"})
    }else{
      var jsonData = JSON.parse(response.body);
      if(jsonData.status == 'fail'){
        res.send("No tracking Number generated")
      }else{
        console.log(new Date() + ": Successful generate Tracking Number")
      
        res.send(jsonData[0].trackingNo)
        res.end()
      }
    }

  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.post('/ApplyBizType',function(req,res){
  console.log(req.body)
  var BLNumber = req.body.BLNumber;
  var sectorlist = req.body.sectorlist;
  var categorylist = req.body.categorylist;
  var typelist = req.body.typelist;
  var nounits = req.body.nounits;
  var businessLicenceClassId = req.body.businessLicenceClassId;
  var issuingAuthorityId = req.body.issuingAuthorityId;
  request({
    url: TrackNoGen,
    method: 'GET',
  }, function(error, response, body){
    if(error) {          
      console.log("fail to generate tracking No " + error);
          //sql.close();
          res.send({status: "failed"});
        }
    var jsonData = JSON.parse(response.body);
    var newtrackingNo = jsonData[0].trackingNo
  request({
    url: ApplyBizTypeLink,
    method: 'POST',
    json: {BLNumber: BLNumber, newtrackingNo: newtrackingNo, 
      sectorlist: sectorlist, categorylist: categorylist, 
      typelist: typelist, nounits: nounits, 
      businessLicenceClassId: businessLicenceClassId, 
      issuingAuthorityId: issuingAuthorityId},
  }, function(error1, response1, body1){
    if(error1) {          
      console.log("fail to Apply Business Type " + error1);
          //sql.close();
          //res.send({status: "failed"});
        }
  console.log('response1.body')
  console.log(response1.body)
  // var jsonData = JSON.parse(response.body);
  var jsonData1 = response1.body;
    var BLdetailsId = jsonData1.Id_bl;
    var BLdetailsEmail = jsonData1.Email;
    var BLdetailsPhoneNo = jsonData1.PhoneNo;
    var BLdetailsPoBox = jsonData1.PoBox;
    var OldTrackingNo = jsonData1.OldTrackingNo;
    var newBLAppId = jsonData1.newBLAppId;
    var BusinessLicenceApplicationId = jsonData1.BusinessLicenceApplicationId;
    request({
      url: RenewAttachmentLicLink,
      method: 'POST',
      json: {OldTrackingNo: OldTrackingNo, BusinessLicenceApplicationId: BusinessLicenceApplicationId,
         newtrackingNo: newtrackingNo, newBLAppId: newBLAppId},
    }, function(error2, response2, body2){
      if(error2) {          
        console.log("fail to Renew Attachment " + error2);
        //  sql.close();
          //res.send({status: "failed"});
        }
    request({
      url: GetRenewStageAddress,
      method: 'POST',
      json: {OldTrackingNo: OldTrackingNo, newtrackingNo: newtrackingNo, BLdetailsPoBox: BLdetailsPoBox, BLdetailsId: BLdetailsId, BLdetailsPhoneNo: BLdetailsPhoneNo, BLdetailsEmail: BLdetailsEmail},
    }, function(error3, response3, body3){
      if(error3) {          
        console.log("fail to Get renew Stage Address " + error3);
         // sql.close();
         // res.send({status: "failed"});
        }
      //console.log(response.body)
      res.send(response3.body)
    });
  });
  });
});
});

app.post('/applyBizTypeLic', function (req, res) {
  console.log(req.body)
  var BLNumber = req.body.BLNumber;
  var newtrackingNo = req.body.newtrackingNo;
  var sectorlist = req.body.sectorlist;
  var categorylist = req.body.categorylist;
  var typelist = req.body.typelist;
  var nounits = req.body.nounits;
  var businessLicenceClassId = req.body.businessLicenceClassId;
  var issuingAuthorityId = req.body.issuingAuthorityId;
   
   sql.connect(configBL, function (err) {
   
     if (err) {          
      console.log("fail to applyBizTypeLic " + err);
          //sql.close();
          // res.send({status: "failed"});
        };
  //  console.log("======>>> " + BLNumber)
     var request11 = new sql.Request();
     request11.input('BLNumber', BLNumber);
     request11.query('SELECT * FROM dbo.BusinessLicenceDetails WHERE BLNumber = @BLNumber', 
     function (err1, recordset1) {
     if (err1) {          
      console.log("fail to BusinessLicenceDetails " + err1);
         //sql.close();
          //res.send({status: "failed"});
        }
     var result_from21 = recordset1.recordset;
     
     var BusinessLicenceApplicationId = result_from21[0].BusinessLicenceApplicationId;
    //  console.log("====== 1" + BusinessLicenceApplicationId)
     var BusinessTIN = result_from21[0].BusinessTIN;
     var Email = result_from21[0].Email;
     var Phone = result_from21[0].PhoneNo;
     var PoBox = result_from21[0].PoBox;
    //  var IssueingOfficeId = result_from21[0].IssueingOfficeId;
     var BusinessStateStatusId = result_from21[0].BusinessStateStatusId;
     var IsBranch = result_from21[0].IsBranch;
     var PrincipalLicNo = result_from21[0].PrincipalLicNo;
     var PrinciplaFeePaid = result_from21[0].PrinciplaFeePaid;
     
       var Id = result_from21[0].Id;
       req.session.req_id = Id;
       req.session.req_id_touse = Id;
       var id_touse = Id;

       var request1 = new sql.Request();
       request1.input('BusinessLicenceApplicationId', BusinessLicenceApplicationId);
       request1.query('SELECT * FROM dbo.BusinessLicApplication WHERE Id = @BusinessLicenceApplicationId', 
       function (err21, recordset) {
       if (err21) {          
        console.log("fail to BusinessLicApplication " + err21);
          // sql.close();
          // res.send({status: "failed"});
        }
       var result_from31 = recordset.recordset;

       var TrackingNo = result_from31[0].TrackingNo;
       var CreatedByUserId = result_from31[0].CreatedByUserId;
       var BusinessTypeId = result_from31[0].BusinessTypeId;
       var ApplicationStatusId = result_from31[0].ApplicationStatusId;
       var BusinessLicOwnerTypeId = result_from31[0].BusinessLicOwnerTypeId;
       var ApplicationStep = result_from31[0].ApplicationStep;
       var NoOfPartners = result_from31[0].NoOfPartners;
      //  var ApplicationTypeId = result_from31[0].ApplicationTypeId;
       var BusinessClassId = result_from31[0].BusinessClassId;
       var ServiceCode = result_from31[0].ServiceCode;
       var NumberOfUnits = result_from31[0].NumberOfUnits;
       var EntityName = result_from31[0].EntityName;
       var RegNo = result_from31[0].RegNo;
      //  console.log("====== 2" + RegNo)

      var request1 = new sql.Request();
      // request1.input('RegNo', RegNo);
      // request22.input('ApplicationStatusId', ApplicationStatusId);
      // request1.query('SELECT COUNT(*) AS kaunti FROM dbo.BusinessLicApplication ' + 
      // ' WHERE RegNo = @RegNo AND ApplicationStatusId = @ApplicationStatusId', 
      // function (err21, recordset) {
      // if (err21) {          
      //  console.log("fail to BusinessLicApplication " + err21);
      //    // sql.close();
      //    // res.send({status: "failed"});
      //  }
      // var result_from311 = recordset.recordset;

      // var kaunti = result_from311[0].kaunti;
      // if(kaunti >= 0){

       var request22 = new sql.Request();
       request22.input('newtrackingNo', newtrackingNo);
       request22.input('CreatedByUserId', CreatedByUserId);
       request22.input('CreatedDate', new Date());
       request22.input('ApplicationStep', ApplicationStep);
       request22.input('BusinessTypeId', typelist);
       request22.input('BusinessLicOwnerTypeId', BusinessLicOwnerTypeId);
       request22.input('ApplicationStatusId', ApplicationStatusId);
       request22.input('NoOfPartners', NoOfPartners);
      //  request22.input('issuingAuthorityId', issuingAuthorityId);
       request22.input('BusinessClassId', businessLicenceClassId);
       request22.input('NumberOfUnits', nounits);
       request22.input('EntityName', EntityName);
       request22.input('RegNo', RegNo);
       request22.query(`INSERT INTO dbo.BusinessLicApplication (TrackingNo, CreatedByUserId, 
        ApplicationStep, BusinessTypeId, BusinessLicOwnerTypeId, ApplicationStatusId, 
        ApplicationTypeId, CreatedDate, ServiceCode, NoOfPartners, BusinessClassId, 
        NumberOfUnits, EntityName, RegNo, SubmittedDate) values (@newtrackingNo, @CreatedByUserId, 
          @ApplicationStep, @BusinessTypeId, @BusinessLicOwnerTypeId, @ApplicationStatusId, 1, 
          @CreatedDate, 4201, @NoOfPartners, @BusinessClassId, @NumberOfUnits, @EntityName, @RegNo, @CreatedDate)`, 
       function (err2, recordset) {
           if (err2) {          
            console.log("fail to Save_EntityOwner_SP " + err2);
          // sql.close();
          // res.send({status: "failed"});
        }
          //  console.log("====== 4" + "result_from")
           var request1 = new sql.Request();
           request1.input('newtrackingNo', newtrackingNo);
           request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @newtrackingNo', 
           function (err3, recordset3) {
           if (err3) {          
            console.log("fail to Save_EntityOwner_SP " + err3);
          // sql.close();
          // res.send({status: "failed"});
        }
           var result_from11 = recordset3.recordset;
          //  console.log("====== 5" + result_from11)
           var BLAppId = result_from11[0].Id;

         var request2 = new sql.Request();
               request2.input('BusLicAppId', BLAppId);
               request2.input('inputEmail4comp', Email);
               request2.input('BizTin', BusinessTIN);
               request2.input('inputEmail4phn', Phone);
               request2.input('inputEmail4pobox', PoBox);
               request2.input('issuingAuthorityId', issuingAuthorityId);
               request2.input('BLNumber', BLNumber);
               request2.input('IsBranch', IsBranch);
               request2.input('BusinessStateStatusId', BusinessStateStatusId);
               request2.input('PrincipalLicNo', PrincipalLicNo);
               request2.input('PrinciplaFeePaid', PrinciplaFeePaid);
               request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated, BusinessStateStatusId, PrincipalLicNo, PrinciplaFeePaid) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, @IsBranch, @issuingAuthorityId, 5, 0, @BusinessStateStatusId, @PrincipalLicNo, @PrinciplaFeePaid)`, 
               function (err4, recordset) {
                   if (err4) {          
                    console.log("fail to failed to save businses licene " + err4);
          // sql.close();
          // res.send({status: "failed"});
        }
                  //  console.log("====== 6" + "result_from")
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BLAppId);
                         request3.input('ServiceCode', '4201');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', CreatedByUserId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err5, recordset) {
                             if (err5) {          
                              console.log("fail to BLicenseApplicationTracker " + err5);
          // sql.close();
          // res.send({status: "failed"});
                              }               
                            //  console.log("====== 7" + "result_from")
                            // var request41 = new sql.Request();
                            // request41.input('BusinessLicenceApplicationId', BusinessLicenceApplicationId);
                            // request41.query('SELECT Name, Path, AttachmentTypeId, IsPermit FROM dbo.BusinessLicenceAttachments WHERE BusinessLicenceApplicationId = @BusinessLicenceApplicationId', 
                            // function (err, recordset) {
                            //   if (err) {     
                            //  // sql.close();
                            //  //  console.log(recordset.recordset)
                            //   var result_form411 = recordset.recordset;
                            //  //  console.log("====== 8" + result_form41)
                            //   var Name = result_form411[0].Name;
                            //   var Path = result_form411[0].Path;
                            //   var AttachmentTypeId = result_form411[0].AttachmentTypeId;
                            //   var IsPermit = result_form411[0].IsPermit;

                              // var request31 = new sql.Request();
                              // request31.input('Name', Name);
                              // request31.input('Path', Path);
                              // request31.input('AttachmentTypeId', AttachmentTypeId);
                              // request31.input('IsPermit', IsPermit);
                              // request31.input('TrackingNo', newtrackingNo);
                              // request31.input('BusinessLicenceApplicationId', BLAppId);
                              // request31.query(`INSERT INTO dbo.BusinessLicenceAttachments (Name, Path, AttachmentTypeId, TrackingNo, BusinessLicenceApplicationId, IsPermit) values (@Name, @Path, @AttachmentTypeId, @TrackingNo, @BusinessLicenceApplicationId, @IsPermit)`, 
                              // function (err, recordset) {
                              //     if (err) {    
                              
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BLAppId);
                             request4.query('SELECT Id, Email, PhoneNo, PoBox FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err6, recordset6) {
                               if (err6) {          
                                console.log("fail to Save_EntityOwner_SP " + err6);
          // sql.close();
          // res.send({status: "failed"});
                               }
                              // sql.close();
                              //  console.log(recordset.recordset)
                               var result_form41 = recordset6.recordset;
                              //  console.log("====== 8" + result_form41)
                               var Id_bl = result_form41[0].Id;
                               var Email = result_form41[0].Email;
                               var PhoneNo = result_form41[0].PhoneNo;
                               var PoBox = result_form41[0].PoBox;
                               req.session.BLdet = Id_bl;
   
                               sql.close();
                               res.send({"status": "success", "newBLAppId": BLAppId, "Id_bl": Id_bl, "Email": Email, "PhoneNo": PhoneNo, "PoBox": PoBox, 
                               "OldTrackingNo": TrackingNo, "BusinessLicenceApplicationId": BusinessLicenceApplicationId})
                        });
                      // });
                      // });
                      });
                   });
                  });
               });
              // }else{
              //   res.send({"status": "fail"})
              // }
              // });
               //end point
             });
   });
 });
});

app.get('/GetRegions',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  var objs12 = [];
  request({
    url: GetRegions,
    method: 'GET',
  }, function(error, response, body){
    if(error){
      console.log(new Date() + ": Fail to get Region Lists")
      res.send({"status": "failed"})
    }else{
      if(body != undefined){
      var jsonData = JSON.parse(response.body);
      for(var i = 0; i < jsonData.length; i++){
      // console.log("Id =" + jsonData[i].RegionName);
      var regionId = jsonData[i].RegionCode;
      var regionName = jsonData[i].RegionName;
        objs12.push({"regionId": regionId, "regionName": regionName})
      }
      // console.log(objs12)
      console.log(new Date() + ": List of Regions")
      res.send(objs12)
    }else{
      res.send("failed")
    }
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/DeletePendApp/:id',function(req,res){
  var tracker = req.params.id
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  var objs12 = [];
  request({
    url: DeletePendAppLink+'/'+tracker,
    method: 'GET',
  }, function(error, response, body){
    if(error){
      console.log(new Date() + ": Fail to get Region Lists")
      res.send({"status": "failed"})
    }else{
      if(body != undefined){
      var jsonData = JSON.parse(response.body);
      for(var i = 0; i < jsonData.length; i++){
      // console.log("Id =" + jsonData[i].RegionName);
      var regionId = jsonData[i].RegionCode;
      var regionName = jsonData[i].RegionName;
        objs12.push({"regionId": regionId, "regionName": regionName})
      }
      // console.log(objs12)
      console.log(new Date() + ": List of Regions")
      res.send(objs12)
    }else{
      res.send("failed")
    }
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetAddressArea',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  var objs12 = [];
  request({
    url: GetAddressArea,
    method: 'GET',
  }, function(error, response, body){
    if(error){
      res.send({status: "failed"})
    } 
    console.log("Id =");
    console.log(body);
    if (body !== undefined) {
      var jsonData = JSON.parse(body);
      for(var i = 0; i < jsonData.length; i++){
      // console.log("Id =" + body);
      var AreaTypeId = jsonData[i].AreaTypeId;
      var AreaTypeName = jsonData[i].AreaTypeName;
        objs12.push({"AreaTypeId": AreaTypeId, "AreaTypeName": AreaTypeName})
      }
      // console.log(objs12)
      res.send(objs12)
    }else{
      res.send("failed")
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetDistrict/:id',function(req,res){
  var reg_id = req.params.id;

  console.log("Id =" + reg_id);
  // var districts = GetDistrict+"/"+reg_id;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  var objs12 = [];
  request({
    url: GetRegions+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error)
    {
      res.send("failed")
    } else{
      if(body !== undefined){
        var jsonData = JSON.parse(response.body);
        for(var i = 0; i < jsonData.length; i++){
        console.log("Id =" + jsonData[i].DistrictName);
        var districtId = jsonData[i].DistrictCode;
        var districtName = jsonData[i].DistrictName;
          objs12.push({"districtId": districtId, "districtName": districtName})
        }
        console.log(objs12)
        res.send(objs12)
      }else{
        res.send("failed")
      }
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetLga/:id',function(req,res){
  var reg_id = req.params.id;
  // var districts = GetDistrict+"/"+reg_id;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  var objs12 = [];
  request({
    url: GetLga+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error)
    {
      res.send("failed")
    } else{
      if(body !== undefined){
        var jsonData = JSON.parse(response.body);
        for(var i = 0; i < jsonData.length; i++){
        console.log("Id =" + jsonData[i].LgaName);
        var districtId = jsonData[i].LgaCode;
        var districtName = jsonData[i].LgaName;
          objs12.push({"districtId": districtId, "districtName": districtName})
        }
        res.send(objs12)
      }else{
        res.send("failed")
      }
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.post('/Renew',function(req,res){
  var BLNumber = req.body.BLNumber;
  request({
    url: TrackNoGen,
    method: 'GET',
  }, function(error, response, body){
    if(error) {          
      console.log("fail to Save_EntityOwner_SP " + error);
          sql.close();
          res.send({status: "failed"});}
    var jsonData = JSON.parse(response.body);
    var newtrackingNo = jsonData[0].trackingNo
  request({
    url: RenewLicLink,
    method: 'POST',
    json: {BLNumber: BLNumber, newtrackingNo: newtrackingNo},
  }, function(error1, response1, body1){
    if(error1) {          
      console.log("fail to renew licence " + error1);
          sql.close();
          res.send({status: "failed"});
        }
  console.log(response1.body)
  // var jsonData = JSON.parse(response.body);
  var jsonData = response1.body;
    var BLdetailsId = jsonData.Id_bl;
    var BLdetailsEmail = jsonData.Email;
    var BLdetailsPhoneNo = jsonData.PhoneNo;
    var BLdetailsPoBox = jsonData.PoBox;
    var OldTrackingNo = jsonData.OldTrackingNo;
    var newBLAppId = jsonData.newBLAppId;
    var BusinessLicenceApplicationId = jsonData.BusinessLicenceApplicationId;
    request({
      url: RenewAttachmentLicLink,
      method: 'POST',
      json: {OldTrackingNo: OldTrackingNo, BusinessLicenceApplicationId: BusinessLicenceApplicationId, newtrackingNo: newtrackingNo, newBLAppId: newBLAppId},
    }, function(error, response, body){
      if(error) {          console.log("fail to Save_EntityOwner_SP " + error);
          sql.close();
          res.send({status: "failed"});}
    request({
      url: GetRenewStageAddress,
      method: 'POST',
      json: {OldTrackingNo: OldTrackingNo, newtrackingNo: newtrackingNo, BLdetailsPoBox: BLdetailsPoBox, BLdetailsId: BLdetailsId, BLdetailsPhoneNo: BLdetailsPhoneNo, BLdetailsEmail: BLdetailsEmail},
    }, function(error, response, body){
      if(error) {          console.log("fail to Save_EntityOwner_SP " + error);
          sql.close();
          res.send({status: "failed"});}
      //console.log(response.body)
      res.send(response.body)
    });
  });
  });
});
});

app.post('/GetSubWard',function(req, res){
  var obj = []
  var subwardId = req.body.subwardId;
  console.log(subwardId)
  request({
    url: GetSubWards,
    method: 'POST',
    json: {subwardId: subwardId},
  }, function(error1, response1, body1){
    if(error1) {          
      console.log("fail to get sub wards " + error1);
          sql.close();
          res.send({status: "failed"});
        }
    // console.log(response1.body)
    var results = response1.body
    for(var i = 0; i < results.length; i++){
      var SUBWARD_ID = results[i].SUBWARD_ID;
      var SUBWARD_NAME = results[i].SUBWARD_NAME;
      obj.push({"SUBWARD_ID": SUBWARD_ID, "SUBWARD_NAME": SUBWARD_NAME})
    }
    console.log('reuslts')
    console.log(obj)
    res.send(obj)
  });
});

app.post('/Cancelation',function(req,res){
  var BLNumber = req.body.BLNumber;
  request({
    url: TrackNoGen,
    method: 'GET',
  }, function(error, response, body){
    if(error) {          
      console.log("fail to Save_EntityOwner_SP " + error);
          sql.close();
          res.send({status: "failed"});
        }
    var jsonData = JSON.parse(response.body);
    var newtrackingNo = jsonData[0].trackingNo
   // res.send(jsonData[0].trackingNo)
  console.log("====== " + newtrackingNo)
  request({
    url: CancelLicLink,
    method: 'POST',
    json: {BLNumber: BLNumber, newtrackingNo: newtrackingNo},
  }, function(error, response, body){
    if(error) {          
      console.log("fail to Save_EntityOwner_SP " + error);
          sql.close();
          res.send({status: "failed"});}
  console.log(response.body)
  // var jsonData = JSON.parse(response.body);
  var jsonData = response.body;
    var BLdetailsId = jsonData.Id_bl;
    var BLdetailsEmail = jsonData.Email;
    var BLdetailsPhoneNo = jsonData.PhoneNo;
    var BLdetailsPoBox = jsonData.PoBox;
    var OldTrackingNo = jsonData.OldTrackingNo;
    var newBLAppId = jsonData.newBLAppId;
    var BusinessLicenceApplicationId = jsonData.BusinessLicenceApplicationId;
    request({
      url: CancelAttachmentLicLink,
      method: 'POST',
      json: {BusinessLicenceApplicationId: BusinessLicenceApplicationId, newtrackingNo: newtrackingNo, newBLAppId: newBLAppId},
    }, function(error, response, body){
      if(error) {          
        console.log("fail to Save_EntityOwner_SP " + error);
          sql.close();
          res.send({status: "failed"});
        }
    request({
      url: GetCancelStageAddress,
      method: 'POST',
      json: {OldTrackingNo: OldTrackingNo, newtrackingNo: newtrackingNo, BLdetailsPoBox: BLdetailsPoBox, 
        BLdetailsId: BLdetailsId, BLdetailsPhoneNo: BLdetailsPhoneNo, BLdetailsEmail: BLdetailsEmail},
    }, function(error, response, body){
      if(error) {          
          console.log("fail to Save_EntityOwner_SP " + error);
          sql.close();
          res.send({status: "failed"});
        }
      console.log(response.body)
      if(response.body == undefined){
        res.send("failed")
      }else{
        res.send(response.body)
      }

    });
  });
  });
});
});

app.post('/canceLic', function (req, res) {

  var BLNumber = req.body.BLNumber;
  var newtrackingNo = req.body.newtrackingNo;
   
   sql.connect(configBL, function (err) {
   
     if (err) {          
      console.log("fail to connect to the server " + err);
          sql.close();
          res.send({status: "failed"});};
  //  console.log("======>>> " + BLNumber)
     var request11 = new sql.Request();
     request11.input('BLNumber', BLNumber);
     request11.query('SELECT * FROM dbo.BusinessLicenceDetails WHERE BLNumber = @BLNumber', 
     function (err1, recordset1) {
     if (err1) {          
      console.log("fail to get business licence details " + err1);
          sql.close();
          res.send({status: "failed"});}
     var result_from21 = recordset1.recordset;
     
     var BusinessLicenceApplicationId = result_from21[0].BusinessLicenceApplicationId;
    //  console.log("====== 1" + BusinessLicenceApplicationId)
     var BusinessTIN = result_from21[0].BusinessTIN;
     var Email = result_from21[0].Email;
     var Phone = result_from21[0].PhoneNo;
     var PoBox = result_from21[0].PoBox;
     var IssueingOfficeId = result_from21[0].IssueingOfficeId;
     var BusinessStateStatusId = result_from21[0].BusinessStateStatusId;
     var IsBranch = result_from21[0].IsBranch;
     var PrincipalLicNo = result_from21[0].PrincipalLicNo;
     var PrinciplaFeePaid = result_from21[0].PrinciplaFeePaid;
     
       var Id = result_from21[0].Id;
       req.session.req_id = Id;
       req.session.req_id_touse = Id;
       var id_touse = Id;

       var request1 = new sql.Request();
       request1.input('BusinessLicenceApplicationId', BusinessLicenceApplicationId);
       request1.query('SELECT * FROM dbo.BusinessLicApplication WHERE Id = @BusinessLicenceApplicationId', 
       function (err2, recordset) {
       if (err2) {          
        console.log(new Date() + ": " + err2);
          sql.close();
          res.send({status: "failed"});}
       var result_from31 = recordset.recordset;

       var TrackingNo = result_from31[0].TrackingNo;
       var CreatedByUserId = result_from31[0].CreatedByUserId;
       var BusinessTypeId = result_from31[0].BusinessTypeId;
       var ApplicationStatusId = result_from31[0].ApplicationStatusId;
       var BusinessLicOwnerTypeId = result_from31[0].BusinessLicOwnerTypeId;
       var ApplicationStep = result_from31[0].ApplicationStep;
       var NoOfPartners = result_from31[0].NoOfPartners;
      //  var ApplicationTypeId = result_from31[0].ApplicationTypeId;
       var BusinessClassId = result_from31[0].BusinessClassId;
       var ServiceCode = result_from31[0].ServiceCode;
       var NumberOfUnits = result_from31[0].NumberOfUnits;
       var EntityName = result_from31[0].EntityName;
       var RegNo = result_from31[0].RegNo;
      //  console.log("====== 2" + RegNo)


       var request22 = new sql.Request();
       request22.input('newtrackingNo', newtrackingNo);
       request22.input('CreatedByUserId', CreatedByUserId);
       request22.input('CreatedDate', new Date());
       request22.input('ApplicationStep', ApplicationStep);
       request22.input('BusinessTypeId', BusinessTypeId);
       request22.input('BusinessLicOwnerTypeId', BusinessLicOwnerTypeId);
       request22.input('ApplicationStatusId', ApplicationStatusId);
       request22.input('NoOfPartners', NoOfPartners);
      //  request22.input('ApplicationTypeId', ApplicationTypeId);
       request22.input('BusinessClassId', BusinessClassId);
       request22.input('NumberOfUnits', NumberOfUnits);
       request22.input('EntityName', EntityName);
       request22.input('RegNo', RegNo);
       request22.query(`INSERT INTO dbo.BusinessLicApplication (TrackingNo, CreatedByUserId, ApplicationStep, BusinessTypeId, BusinessLicOwnerTypeId, ApplicationStatusId, ApplicationTypeId, CreatedDate, ServiceCode, NoOfPartners, BusinessClassId, NumberOfUnits, EntityName, RegNo, SubmittedDate) values (@newtrackingNo, @CreatedByUserId, @ApplicationStep, @BusinessTypeId, @BusinessLicOwnerTypeId, @ApplicationStatusId, 1, @CreatedDate, 4204, @NoOfPartners, @BusinessClassId, @NumberOfUnits, @EntityName, @RegNo, @CreatedDate)`, 
       function (err3, recordset) {
           if (err3) {          
            console.log(new Date() + ": " + err3);
          sql.close();
          res.send({status: "failed"});}
          //  console.log("====== 4" + "result_from")
           var request1 = new sql.Request();
           request1.input('newtrackingNo', newtrackingNo);
           request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @newtrackingNo', 
           function (err4, recordset) {
           if (err4) {          
            console.log(new Date() + ": " + err4);
          sql.close();
          res.send({status: "failed"});}
           var result_from11 = recordset.recordset;
          //  console.log("====== 5" + result_from11)
           var BLAppId = result_from11[0].Id;

         var request2 = new sql.Request();
               request2.input('BusLicAppId', BLAppId);
               request2.input('inputEmail4comp', Email);
               request2.input('BizTin', BusinessTIN);
               request2.input('inputEmail4phn', Phone);
               request2.input('inputEmail4pobox', PoBox);
               request2.input('issuingAuthorityId', IssueingOfficeId);
               request2.input('BLNumber', BLNumber);
               request2.input('IsBranch', IsBranch);
               request2.input('BusinessStateStatusId', BusinessStateStatusId);
               request2.input('PrincipalLicNo', PrincipalLicNo);
               request2.input('PrinciplaFeePaid', PrinciplaFeePaid);
               request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated, PreviousBLNumber, BusinessStateStatusId, PrincipalLicNo, PrinciplaFeePaid) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, @IsBranch, @issuingAuthorityId, 5, 0, @BLNumber, @BusinessStateStatusId, @PrincipalLicNo, @PrinciplaFeePaid)`, 
               function (err5, recordset) {
                   if (err5) {          
                    console.log(new Date() + ": " + err5);
          sql.close();
          res.send({status: "failed"});}
                  //  console.log("====== 6" + "result_from")
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BLAppId);
                         request3.input('ServiceCode', '4204');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', CreatedByUserId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err6, recordset) {
                             if (err6) {          
                              console.log(new Date() + ": " + err6);
          sql.close();
          res.send({status: "failed"});}               
                              
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BLAppId);
                             request4.query('SELECT Id, Email, PhoneNo, PoBox FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err7, recordset) {
                               if (err7) {          
                                console.log(new Date() + ": " + err7);
          sql.close();
          res.send({status: "failed"});}
                              // sql.close();
                              //  console.log(recordset.recordset)
                               var result_form41 = recordset.recordset;
                              //  console.log("====== 8" + result_form41)
                               var Id_bl = result_form41[0].Id;
                               var Email = result_form41[0].Email;
                               var PhoneNo = result_form41[0].PhoneNo;
                               var PoBox = result_form41[0].PoBox;
                               req.session.BLdet = Id_bl;
   
                               sql.close();
                               res.send({"newBLAppId": BLAppId, "Id_bl": Id_bl, "Email": Email, "PhoneNo": PhoneNo, "PoBox": PoBox, "OldTrackingNo": TrackingNo, "BusinessLicenceApplicationId": BusinessLicenceApplicationId})
                        });
                      });
                   });
                  });
               });
             });
   });
 });
});

app.post('/renewLic', function (req, res) {

  var BLNumber = req.body.BLNumber;
  var newtrackingNo = req.body.newtrackingNo;
   
   sql.connect(configBL, function (err) {
   
     if (err) {          
      console.log("fail to connect " + err);
          sql.close();
          res.send({status: "failed"});};
  //  console.log("======>>> " + BLNumber)
     var request11 = new sql.Request();
     request11.input('BLNumber', BLNumber);
     request11.query('SELECT * FROM dbo.BusinessLicenceDetails WHERE BLNumber = @BLNumber', 
     function (err, recordset) {
     if (err) {          
      console.log("fail to renewLic " + err);
          sql.close();
          res.send({status: "failed"});}
     var result_from21 = recordset.recordset;
     
     var BusinessLicenceApplicationId = result_from21[0].BusinessLicenceApplicationId;
    //  console.log("====== 1" + BusinessLicenceApplicationId)
     var BusinessTIN = result_from21[0].BusinessTIN;
     var Email = result_from21[0].Email;
     var Phone = result_from21[0].PhoneNo;
     var PoBox = result_from21[0].PoBox;
     var IssueingOfficeId = result_from21[0].IssueingOfficeId;
     var BusinessStateStatusId = result_from21[0].BusinessStateStatusId;
     var IsBranch = result_from21[0].IsBranch;
     var PrincipalLicNo = result_from21[0].PrincipalLicNo;
     var PrinciplaFeePaid = result_from21[0].PrinciplaFeePaid;
     
       var Id = result_from21[0].Id;
       req.session.req_id = Id;
       req.session.req_id_touse = Id;
       var id_touse = Id;

       var request1 = new sql.Request();
       request1.input('BusinessLicenceApplicationId', BusinessLicenceApplicationId);
       request1.query('SELECT * FROM dbo.BusinessLicApplication WHERE Id = @BusinessLicenceApplicationId', 
       function (err, recordset) {
       if (err) {          
        console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});}
       var result_from31 = recordset.recordset;

       var TrackingNo = result_from31[0].TrackingNo;
       var CreatedByUserId = result_from31[0].CreatedByUserId;
       var BusinessTypeId = result_from31[0].BusinessTypeId;
       var ApplicationStatusId = result_from31[0].ApplicationStatusId;
       var BusinessLicOwnerTypeId = result_from31[0].BusinessLicOwnerTypeId;
       var ApplicationStep = result_from31[0].ApplicationStep;
       var NoOfPartners = result_from31[0].NoOfPartners;
      //  var ApplicationTypeId = result_from31[0].ApplicationTypeId;
       var BusinessClassId = result_from31[0].BusinessClassId;
       var ServiceCode = result_from31[0].ServiceCode;
       var NumberOfUnits = result_from31[0].NumberOfUnits;
       var EntityName = result_from31[0].EntityName;
       var RegNo = result_from31[0].RegNo;
      //  console.log("====== 2" + RegNo)


       var request22 = new sql.Request();
       request22.input('newtrackingNo', newtrackingNo);
       request22.input('CreatedByUserId', CreatedByUserId);
       request22.input('CreatedDate', new Date());
       request22.input('ApplicationStep', ApplicationStep);
       request22.input('BusinessTypeId', BusinessTypeId);
       request22.input('BusinessLicOwnerTypeId', BusinessLicOwnerTypeId);
       request22.input('ApplicationStatusId', ApplicationStatusId);
       request22.input('NoOfPartners', NoOfPartners);
      //  request22.input('ApplicationTypeId', ApplicationTypeId);
       request22.input('BusinessClassId', BusinessClassId);
       request22.input('NumberOfUnits', NumberOfUnits);
       request22.input('EntityName', EntityName);
       request22.input('RegNo', RegNo);
       request22.query(`INSERT INTO dbo.BusinessLicApplication (TrackingNo, CreatedByUserId, 
        ApplicationStep, BusinessTypeId, BusinessLicOwnerTypeId, ApplicationStatusId, 
        ApplicationTypeId, CreatedDate, ServiceCode, NoOfPartners, BusinessClassId, NumberOfUnits, 
        EntityName, RegNo, SubmittedDate) values (@newtrackingNo, @CreatedByUserId, @ApplicationStep, 
          @BusinessTypeId, @BusinessLicOwnerTypeId, @ApplicationStatusId, 2, @CreatedDate, 4201, 
          @NoOfPartners, @BusinessClassId, @NumberOfUnits, @EntityName, @RegNo, @CreatedDate)`, 
       function (err, recordset) {
           if (err) {          
            console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});
        }
          //  console.log("====== 4" + "result_from")
           var request1 = new sql.Request();
           request1.input('newtrackingNo', newtrackingNo);
           request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @newtrackingNo', 
           function (err, recordset) {
           if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});}
           var result_from11 = recordset.recordset;
          //  console.log("====== 5" + result_from11)
           var BLAppId = result_from11[0].Id;

         var request2 = new sql.Request();
               request2.input('BusLicAppId', BLAppId);
               request2.input('inputEmail4comp', Email);
               request2.input('BizTin', BusinessTIN);
               request2.input('inputEmail4phn', Phone);
               request2.input('inputEmail4pobox', PoBox);
               request2.input('issuingAuthorityId', IssueingOfficeId);
               request2.input('BLNumber', BLNumber);
               request2.input('IsBranch', IsBranch);
               request2.input('BusinessStateStatusId', BusinessStateStatusId);
               request2.input('PrincipalLicNo', PrincipalLicNo);
               request2.input('PrinciplaFeePaid', PrinciplaFeePaid);
               request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, 
                BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, 
                Activated, PreviousBLNumber, BusinessStateStatusId, PrincipalLicNo, PrinciplaFeePaid) 
                VALUES (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, 
                  @IsBranch, @issuingAuthorityId, 5, 0, @BLNumber, @BusinessStateStatusId, 
                  @PrincipalLicNo, @PrinciplaFeePaid)`, function (err, recordset) {
                   if (err) {          
                    console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});}
                  //  console.log("====== 6" + "result_from")
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BLAppId);
                         request3.input('ServiceCode', '4201');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', CreatedByUserId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err, recordset) {
                             if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});}               
                            //  console.log("====== 7" + "result_from")
                            // var request41 = new sql.Request();
                            // request41.input('BusinessLicenceApplicationId', BusinessLicenceApplicationId);
                            // request41.query('SELECT Name, Path, AttachmentTypeId, IsPermit FROM dbo.BusinessLicenceAttachments WHERE BusinessLicenceApplicationId = @BusinessLicenceApplicationId', 
                            // function (err, recordset) {
                            //   if (err) {         
                            //  // sql.close();
                            //  //  console.log(recordset.recordset)
                            //   var result_form411 = recordset.recordset;
                            //  //  console.log("====== 8" + result_form41)
                            //   var Name = result_form411[0].Name;
                            //   var Path = result_form411[0].Path;
                            //   var AttachmentTypeId = result_form411[0].AttachmentTypeId;
                            //   var IsPermit = result_form411[0].IsPermit;

                              // var request31 = new sql.Request();
                              // request31.input('Name', Name);
                              // request31.input('Path', Path);
                              // request31.input('AttachmentTypeId', AttachmentTypeId);
                              // request31.input('IsPermit', IsPermit);
                              // request31.input('TrackingNo', newtrackingNo);
                              // request31.input('BusinessLicenceApplicationId', BLAppId);
                              // request31.query(`INSERT INTO dbo.BusinessLicenceAttachments (Name, Path, AttachmentTypeId, TrackingNo, BusinessLicenceApplicationId, IsPermit) values (@Name, @Path, @AttachmentTypeId, @TrackingNo, @BusinessLicenceApplicationId, @IsPermit)`, 
                              // function (err, recordset) {
                              //     if (err) {  
                              
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BLAppId);
                             request4.query('SELECT Id, Email, PhoneNo, PoBox FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err, recordset) {
                               if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});}
                              // sql.close();
                              //  console.log(recordset.recordset)
                               var result_form41 = recordset.recordset;
                              //  console.log("====== 8" + result_form41)
                               var Id_bl = result_form41[0].Id;
                               var Email = result_form41[0].Email;
                               var PhoneNo = result_form41[0].PhoneNo;
                               var PoBox = result_form41[0].PoBox;
                               req.session.BLdet = Id_bl;
   
                               sql.close();
                               res.send({"newBLAppId": BLAppId, "Id_bl": Id_bl, "Email": Email, "PhoneNo": PhoneNo, "PoBox": PoBox, "OldTrackingNo": TrackingNo, "BusinessLicenceApplicationId": BusinessLicenceApplicationId})
                        });
                      // });
                      // });
                      });
                   });
                  });
               });
             });
   });
 });
});

app.post('/renewAttachmentLic', function (req, res) {
  console.log(req.body)
  var newtrackingNo = req.body.newtrackingNo;
  var OldTrackingNo = req.body.OldTrackingNo;
  var BusinessLicenceApplicationId = req.body.BusinessLicenceApplicationId;
  var newBLAppId = req.body.newBLAppId;
   
   sql.connect(configBL, function (err) {
   
     if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});};

                            var request41 = new sql.Request();
                            request41.input('OldTrackingNo', OldTrackingNo);
                            request41.query('SELECT Name, Path, AttachmentTypeId, IsPermit FROM dbo.BusinessLicenceAttachments WHERE TrackingNo = @OldTrackingNo', 
                            function (err, recordset) {
                              if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});}
                             // sql.close();
                              console.log(recordset.recordset)
                              var result_form411 = recordset.recordset;
                            //  for(var i = 0; i < result_form411.length; i++){
                              var Name = result_form411[0].Name;
                              var Path = result_form411[0].Path;
                              var AttachmentTypeId = result_form411[0].AttachmentTypeId;
                              var IsPermit = result_form411[0].IsPermit;
                              var request31 = new sql.Request();
                              request31.input('Name', Name);
                              request31.input('Path', Path);
                              request31.input('AttachmentTypeId', AttachmentTypeId);
                              request31.input('IsPermit', IsPermit);
                              request31.input('TrackingNo', newtrackingNo);
                              request31.input('BusinessLicenceApplicationId', newBLAppId);
                              request31.query(`INSERT INTO dbo.BusinessLicenceAttachments (Name, Path, AttachmentTypeId, TrackingNo, BusinessLicenceApplicationId, IsPermit) values (@Name, @Path, @AttachmentTypeId, @TrackingNo, @BusinessLicenceApplicationId, @IsPermit)`, 
                              function (err, recordset) {
                                  if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});}  
                                  sql.close();
                                  res.send("success")
                                });
                            //  }

                        });
                      });
});

app.post('/cancelAttachmentLic', function (req, res) {
  var newtrackingNo = req.body.newtrackingNo;
  var BusinessLicenceApplicationId = req.body.BusinessLicenceApplicationId;
  var newBLAppId = req.body.newBLAppId;
  console.log(req.body)
   
   sql.connect(configBL, function (err) {
   
     if (err) {          
      console.log("fail to connect to server " + err);
         // sql.close();
          res.send({status: "failed"});
        };

                            var request41 = new sql.Request();
                            request41.input('BusinessLicenceApplicationId', BusinessLicenceApplicationId);
                            request41.query('SELECT Name, Path, AttachmentTypeId, IsPermit FROM dbo.BusinessLicenceAttachments WHERE BusinessLicenceApplicationId = @BusinessLicenceApplicationId', 
                            function (err2, recordset2) {
                              if (err) {         
                                 console.log("fail to read Attachments " + err2);
          //sql.close();
          res.send({status: "failed"});}
                             // sql.close();
                              console.log(recordset2.recordset)
                              var result_form411 = recordset2.recordset;
                            //  for(var i = 0; i < result_form411.length; i++){
                              var Name = result_form411[0].Name;
                              var Path = result_form411[0].Path;
                              var AttachmentTypeId = result_form411[0].AttachmentTypeId;
                              var IsPermit = result_form411[0].IsPermit;
                              if(IsPermit){
                                IsPermit = 1
                              }else{
                                IsPermit = 0
                              }
                              console.log("kf3wee;....;;..... " + IsPermit)
                              console.log("kfi900;....;;..... " + Name)
                              console.log("kfr233;....;;..... " + Path)
                              console.log("kfrer;....;;..... " + AttachmentTypeId)
                              console.log("kf;....;;..... " + newtrackingNo)
                              console.log("kffff;....;;..... " + newBLAppId)
                              var request311 = new sql.Request();
                              request311.input('Name', Name);
                              request311.input('Path', Path);
                              request311.input('AttachmentTypeId', AttachmentTypeId);
                              request311.input('IsPermit', IsPermit);
                              request311.input('TrackingNo', newtrackingNo);
                              request311.input('BusinessLicenceApplicationId', newBLAppId);
                              request311.query(`INSERT INTO dbo.BusinessLicenceAttachments (Name, Path, AttachmentTypeId, TrackingNo, BusinessLicenceApplicationId, IsPermit) values (@TrackingNo, @Path, @AttachmentTypeId, @TrackingNo, @BusinessLicenceApplicationId, @IsPermit)`, 
                              function (err1, recordset1) {
                                  if (err1) {          
                                    console.log("fail to save attachment " + err1);
                                    //sql.close();
                                    res.send({status: "failed"});
                                  }  
                                  sql.close();
                                  res.send("success")
                                });
                            //  }

                        });
                      });
});

app.get('/GetBizDet/:id',function(req,res){
  var reg_id = req.params.id;
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  // request({
  //   url: GetBizCheck+"/"+reg_id,
  //   method: 'GET',
  // }, function(error, response, body){
  //   if(error) {       
  //   var jsonData = JSON.parse(response.body);
  //   var kaunti = jsonData[0].kaunti;
  //   console.log("====== " + kaunti)
  //   if(kaunti <= 0){
 request({
    url: GetBiz+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    var jsonData = JSON.parse(response.body);
    
    for(var i = 0; i < jsonData.length; i++){
   // console.log("Id =" + jsonData[i].Id);

    var Id = jsonData[i].Id;
    var IssuingAuthorityId = jsonData[i].IssuingAuthorityId;
    var IsPerUnitFeeApplicable = jsonData[i].IsPerUnitFeeApplicable;
    var BusinessLicenceClassCode = jsonData[i].BusinessLicenceClassCode;
      objs12.push({"Id": Id, "BusinessLicenceClassCode": BusinessLicenceClassCode, 
      "IssuingAuthorityId": IssuingAuthorityId, "IsPerUnitFeeApplicable": IsPerUnitFeeApplicable})
    }
   //console.log(objs12)
    res.send({"status": "success", "data": objs12})
  });
    // }if(kaunti > 0){
    //   res.send({"status": "failed"})
    // }
  // });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetWard/:id',function(req,res){
  var reg_id = req.params.id;
  // var districts = GetDistrict+"/"+reg_id;
  var objs12 = [];
  // if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetDistricts+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")

    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
    //console.log("Id =" + jsonData[i].WardName);
    var WardId = jsonData[i].WardCode;
    var wardName = jsonData[i].WardName;
      objs12.push({"WardId": WardId, "wardName": wardName})
    }
    console.log(objs12)
    res.send(objs12)
  });
// }else{
//   //console.log(loginTrial)
//   res.redirect('/');
// }
});

app.get('/GetWardP/:id',function(req,res){
  var reg_id = req.params.id;
  // var districts = GetDistrict+"/"+reg_id;
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetPostCode+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
    console.log("Id =" + jsonData[i].PostCode);
    var PostCode = jsonData[i].PostCode;
      objs12.push({"PostCode": PostCode})
    }
    console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/district/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  // if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  sql.connect(config, function (err) {

      if (err) res.send({status: "failed"});

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblWard WHERE DistrictCode = ' + reg_id, function (err, recordset) {

          if (err) res.send("failed")
           sql.close();
          // send records as a response
          res.send(recordset.recordset);

      });
  });
// }else{
//   //console.log(loginTrial)
//   res.redirect('/');
// }
});

app.get('/ApplyBL',function(req,res){
if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  // res.render(path.join(__dirname+'/public/ors/new_buslic'));
  res.render(path.join(__dirname+'/public/ors/apply_new_form'), {controller: 1});
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/ApplyBLBranch/:id',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  res.render(path.join(__dirname+'/public/ors/new_brach'), {BLNumber: req.params.id});
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/Transfer/:id',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  res.render(path.join(__dirname+'/public/ors/transfer_licence'), {BLNumber: req.params.id});
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/CancelApplication/:id',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  res.render(path.join(__dirname+'/public/ors/cancell_application'), {BLNumber: req.params.id});
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/ViewBL/:id',function(req,res){
  var req_id = req.params.id;
  req.session.req_id_view = req_id;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  res.render(path.join(__dirname+'/public/ors/view_buslic'), 
  {"username": req.session.username, "trackingNo": req.session.req_id_view});
}else{
  res.redirect('/');
}
});

app.get('/ViewSupliment/:id',function(req,res){
  var req_id = req.params.id;
  req.session.req_id_view = req_id;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  res.render(path.join(__dirname+'/public/ors/view_supliment'), {"trackingNo": req_id});
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/ViewSuppliment/:id',function(req,res){
  var req_id = req.params.id;
  req.session.req_id_view = req_id;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  res.render(path.join(__dirname+'/public/ors/view_suppliment'), {"trackingNo": req_id});
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.post('/ApplicationDetails', function(req, res){
   var trackingNo = req.body.trackingNo;
   var objs13 = [];
   sql.connect(configBL, function (err) {
   
    if (err) {          
      console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});
        }else{
  console.log("======>>> " + trackingNo)
    var request1 = new sql.Request();
    request1.input('trackingNo', trackingNo);
    request1.query('SELECT Comment FROM dbo.BusinessLicApplication as a, dbo.BLicenseApplicationTracker as b, dbo.BLApplicationComments as c where a.TrackingNo = @trackingNo and a.Id = b.ApplicationId and c.TrackerId =b.TrackerId', 
    function (err, recordset) {
    if (err) {          
      console.log("fail to Save_EntityOwner_SP " + err);
          sql.close();
          res.send({status: "failed"});
        }
        else{
    console.log(recordset.recordset)
    var result_from = recordset.recordset;
    for(var i = 0; i < result_from.length; i++){
      var Comment = result_from[i].Comment;
      objs13.push({status: "success", "Comment": Comment})
    }
    // console.log(objs13)
    sql.close()
      res.send(objs13)
  }
    })
  }
      })
})

app.post('/subwards', function(req, res){
  var subwardId = req.body.subwardId;
  var objs13 = [];
  sql.connect(config, function (err) {
  
   if (err) {          
     console.log("fail to subwards " + err);
         sql.close();
         res.send({status: "failed"});
       }else{
        // console.log('subward')
   var request1 = new sql.Request();
   request1.input('subwardId', subwardId);
   request1.query('SELECT * FROM SUBWARD WHERE POSTCODE = @subwardId', 
   function (err, recordset) {
   if (err) {          
     console.log("fail to SUBWARD " + err);
         sql.close();
         res.send({status: "failed"});
       }
       else{
        // console.log('recordset.recordset')
        // console.log(recordset.recordset)
  //  var result_from = recordset.recordset;
  //  for(var i = 0; i < result_from.length; i++){
  //    var Comment = result_from[i].Comment;
  //    objs13.push({status: "success", "Comment": Comment})
  //  }
  //  // console.log(objs13)
   sql.close()
     res.send(recordset.recordset)
 }
   })
 }
     })
})

app.post('/SubmitSupplimenti',function(req,res){
   var trackngNo = req.body.trackingNo;

   if(typeof req.session.userID !== "undefined" || req.session.userID === true){
   request({
     url: GetSubmitSuppliment,
     method: 'POST',
     json: {trackNo: trackngNo},
   }, function(error, response, body){
     if(error) {          
      console.log("fail to SubmitSupplimenti " + error);
          sql.close();
          res.send({status: "failed"});}
       console.log(response.body)
       res.send("sucess")
   });
 }else{
   res.redirect('/');
 }
});

app.post('/SubmitSuppliment', function(req, res){
  var trackingNo = req.body.trackNo;
  //console.log(trackingNo)
  sql.connect(configBL, function (err) {
  
   if (err) {          
    console.log("fail to SubmitSuppliment " + err);
          sql.close();
          res.send({status: "failed"});};
   var request1 = new sql.Request();
   request1.input('trackingNo', trackingNo);
   request1.query('SELECT Id FROM dbo.BusinessLicApplication where TrackingNo = @trackingNo', 
   function (err, recordset) {
   if (err) {          console.log("fail to BusinessLicApplicationi " + err);
          sql.close();
          res.send({status: "failed"});}
   var result_from = recordset.recordset;
   //console.log("======="+result_from)
    var BL_Id = result_from[0].Id;
   var request = new sql.Request();
   request.input('trackngNo', trackingNo);
   request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, 
   ApplicationStatusId = 1 WHERE TrackingNo = @trackngNo`, 
   function (err, recordset) {
       if (err) {          
        console.log("fail to BusinessLicApplication " + err);
          sql.close();
          res.send({status: "failed"});}
       var request2 = new sql.Request();
       request2.input('BL_Id', BL_Id);
       request2.query(`UPDATE dbo.BLicenseApplicationTracker SET 
       ApplicationStatusId = 4, ApplicationStageId = 3 WHERE ApplicationId = @BL_Id`, 
       function (err, recordset) {
           if (err) {          
            console.log("fail to BLicenseApplicationTracker " + err);
          sql.close();
          res.send({status: "failed"});
        }else{
          sql.close();
          res.send({status: "sucess"});
        }
    //  res.send("sucess")
       })
   })
     })
    })
})

app.get('/download', function(req, res){
  const file = `http://41.59.225.60/api/printout/BL220617-1536/4201/bl`;
  res.download(file); // Set disposition and send it.
});

app.get('/EditBL/:id',function(req,res){
  var req_id = req.params.id;
  req.session.req_id_view = req_id;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  // res.render(path.join(__dirname+'/public/ors/edit_buslic'), {OldTrackNo: req_id});
  res.render(path.join(__dirname+'/public/ors/edit_buslic_new'), {OldTrackNo: req_id});
}else{
  res.redirect('/');
}
});

app.get('/firstStageView', async function(req, res) {
  var reg_id = req.session.userID;
  var objs12 = [];
  var objs13 = [];
  var objs14 = [];
  var OwnerSubTypeName;
  var OrigTypeName;
  var AplicationTIN;
  var AplicationID;
  var BusinessClassId;
  var BusinessTypeId;
  var RegNo;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetParticulars+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error){
      res.send("failed")
    }else{
     // console.log(body)
      if(body !== undefined){
        var jsonData = JSON.parse(body);
        for(var i = 0; i < jsonData.length; i++){
        var fname = jsonData[i].fname;
        var mname = jsonData[i].mname;
        var lname = jsonData[i].lname;
        var date_birth = jsonData[i].date_birth;
        date_birth = dateFormat(date_birth, "dd-mmm-yyyy");
        var citizen = jsonData[i].citizen;
        var gender = jsonData[i].gender;
        objs12.push({"fname": fname, "mname": mname, "lname": lname, "date_birth": date_birth, "citizen": citizen, "gender": gender})
        }
              OrigTypeName = '';
              request({
                url: GetsaveBusOwnerType+"/"+req.session.req_id_view,
                method: 'GET',
              }, function(error, response, body){
                if(error){
                  res.send("failed")
                }else{
                  console.log('business details')
                  console.log(body)
                  if(body !== undefined){
                    var jsonData = JSON.parse(body);
                    // for(var i = 0; i < jsonData.length; i++){
                    var BusinessLicOwnerTypeId = jsonData[0].BusinessLicOwnerTypeId;
                    var EntityName = jsonData[0].EntityName;
                    var RegNo = jsonData[0].RegNo;
                    

                    if(BusinessLicOwnerTypeId == 0){
           
                            res.send()
            
                    }else{
                    request({
                      url: GetsaveBusOwnerTypeName+"/"+BusinessLicOwnerTypeId,
                      method: 'GET',
                    }, function(error, response, body){
                      if(error){
                        res.send("failed")
                      }else{
                        
                        if(body !== undefined || body !== null){
                          var jsonData = JSON.parse(body);
                          console.log('owner sub types')
                          console.log(body)
                          // for(const i = 0; i < jsonData.length; i++){
                          OwnerSubTypeName = jsonData[0].OwnerSubTypeName;
                          OwnerSubTypeId = jsonData[0].OwnerSubTypeId;
                          // }
                          
                          if(OwnerSubTypeName == undefined){
                            OwnerSubTypeName = ''
                          }
                          request({
                            url: GetsavedTIN+"/"+req.session.req_id_view,
                            method: 'GET',
                          }, function(error, response, body){
                            if(error){
                              res.send("failed")
                            }else{
                              
                              if(body !== undefined){
                                console.log(body)
                                var jsonData = JSON.parse(body);
                                AplicationTIN = jsonData[0].ApplicationTIN;
                                AplicationID = jsonData[0].Id;
                                ServiceCode = jsonData[0].ServiceCode;
                                BusinessClassId = jsonData[0].BusinessClassId;
                                // RegNo = jsonData[0].RegNo;
                                console.log("jfhsbf==== " + BusinessClassId)
                                request({
                                  url: GetsavedBizType+"/"+req.session.req_id_view,
                                  method: 'GET',
                                }, function(error, response, body){
                                  if(error){
                                    res.send("failed")
                                  }else{
                                    console.log(body)
                                    if(body !== undefined){
                                      var jsonData = JSON.parse(body);
                                      BusinessTypeId = jsonData[0].BusinessTypeId;
                                      BusinessTypeName = jsonData[0].BusinessTypeName;
                                      request({
                                        url: GetsavedAreaType+"/"+req.session.req_id_view,
                                        method: 'GET',
                                      }, function(error, response, body){
                                        if(error){
                                          res.send("failed")
                                        }else{
                                         console.log(body)
                                          if(body !== undefined){
                                            var jsonData = JSON.parse(body);
                                            AreaTypeId = jsonData[0].AreaTypeId;
                                            AreaTypeName = jsonData[0].AreaTypeName;
                                            Road = jsonData[0].Road;
                                            PostCode = jsonData[0].PostCode;
                                            Street = jsonData[0].Street;
                                            PoBox = jsonData[0].PoBox;
                                            CompanyPhone = jsonData[0].CompanyPhone;
                                            CompanyEmail = jsonData[0].CompanyEmail;
                                            UnsurveyedArea = jsonData[0].UnsurveyedArea;
                                            PlotNo = jsonData[0].PlotNo;
                                            BlockNo = jsonData[0].BlockNo;
                                            HouseNo = jsonData[0].HouseNo;
                                            RegionCode = jsonData[0].RegionCode;
                                            DistrictCode = jsonData[0].DistrictCode;
                                            WardId = jsonData[0].WardId;
                                            request({
                                              url: GetsavedRegion+"/"+RegionCode,
                                              method: 'GET',
                                            }, function(error, response, body){
                                              if(error){
                                                res.send("failed")
                                              }else{
                                               // console.log(body)
                                                if(body !== undefined){
                                                  var jsonData = JSON.parse(body);
                                                  RegionName = jsonData[0].RegionName;
                                                  request({
                                                    url: GetsavedDistrict+"/"+DistrictCode,
                                                    method: 'GET',
                                                  }, function(error, response, body){
                                                    if(error){
                                                      res.send("failed")
                                                    }else{
                                                     // console.log(body)
                                                      if(body !== undefined){
                                                        var jsonData = JSON.parse(body);
                                                        DistrictName = jsonData[0].DistrictName;
                                                        request({
                                                          url: GetsavedDistrict+"/"+DistrictCode,
                                                          method: 'GET',
                                                        }, function(error, response, body){
                                                          if(error){
                                                            res.send("failed")
                                                          }else{
                                                           // console.log(body)
                                                            if(body !== undefined){
                                                              var jsonData = JSON.parse(body);
                                                              DistrictName = jsonData[0].DistrictName;
                                                              request({
                                                                url: GetsavedWard+"/"+WardId,
                                                                method: 'GET',
                                                              }, function(error, response, body){
                                                                if(error){
                                                                  res.send("failed")
                                                                }else{
                                                                 // console.log(body)
                                                                  if(body !== undefined){
                                                                    var jsonData = JSON.parse(body);
                                                                    WardName = jsonData[0].WardName;
                                                                    request({
                                                                      url: GetPaymentDetails+"/"+AplicationID+"/"+ServiceCode,
                                                                      method: 'GET',
                                                                    }, function(error, response, body){
                                                                      if(error){
                                                                        res.send("failed")
                                                                      }else{
                                                                       console.log('body')
                                                                       
                                                                        if(body !== undefined){
                                                                          var jsonData = JSON.parse(body);
                                                                          console.log(jsonData)
                                                                          // var jsonData = body;
                                                                          // for(var i = 0; i < jsonData.length; i++){
                                                                          var AmountTotal = jsonData[0].AmountTotal;
                                                                          var ServiceName = jsonData[0].ServiceName;
                                                                          var ExpireDate = jsonData[0].ExpireDate;
                                                                          var CurrencyUsed = jsonData[0].CurrencyUsed;
                                                                          var ControlNo = jsonData[0].ControlNo;
                                                                          var InvoiceID = jsonData[0].InvoiceID;
                                                                          if(ControlNo == null){
                                                                            ControlNo = 'Waiting for Control Number'
                                                                            ExpireDate = '-'
                                                                          }else{
                                                                            ExpireDate = dateFormat(ExpireDate, "dd-mm-yyyy, h:MM:ss TT");
                                                                          }
                                                                          objs13.push({"AmountTotal": AmountTotal, "ServiceName": ServiceName, "ExpireDate": ExpireDate, 
                                                                          "CurrencyUsed": CurrencyUsed, "ControlNo": ControlNo})
                                                                          // }
                                                                          request({
                                                                            url: GetInvoiceDetails+"/"+InvoiceID,
                                                                            method: 'GET',
                                                                          }, function(error, response, body){
                                                                            if(error){
                                                                              res.send("failed")
                                                                            }else{
                                                                              for(var i = 0; i < jsonData.length; i++){
                                                                              var InvoiceNo = jsonData[i].InvoiceNo;
                                                                              var ItemName = jsonData[i].ItemName;
                                                                              var Amount = jsonData[i].Amount;
                                                                              var CurrencyUsedItem = jsonData[i].CurrencyUsed;
                                                                              var CreatedDate = jsonData[i].CreatedDate;
                                                                              objs14.push({"InvoiceNo": InvoiceNo, "ItemName": ItemName, "Amount": Amount,
                                                                               "CurrencyUsedItem": CurrencyUsedItem, "CreatedDate": CreatedDate})
                                                                              }
                                                                              request({
                                                                                url: MyApplicationStage+"/"+req.session.req_id_view,
                                                                                method: 'GET',
                                                                              }, function(error, response, body){
                                                                                if(error){
                                                                                  res.send("failed")
                                                                                }else{
                                                                                  console.log('tracker body')
                                                                                 
                                                                                  if(body !== undefined){
                                                                                    var jsonData = JSON.parse(body);
                                                                                    ApplicationStageId = jsonData[0].ApplicationStageId;
                                                                          res.send({"payment": objs13, "WardName": WardName, "AplicationID": AplicationID, "ServiceCode": ServiceCode,
                                                                          "DistrictName": DistrictName, "RegionName": RegionName, "HouseNo": HouseNo, 
                                                                          "BlockNo": BlockNo, "PlotNo": PlotNo, "UnsurveyedArea": UnsurveyedArea, 
                                                                          "CompanyEmail": CompanyEmail, "CompanyPhone": CompanyPhone, "PoBox": PoBox, 
                                                                          "trackNo": req.session.req_id_view, "person": objs12, "RegNo": RegNo, 
                                                                          "OrigTypeName": OrigTypeName, "OwnerSubTypeName": OwnerSubTypeName, "EntityName": EntityName, 
                                                                          "AplicationTIN": AplicationTIN, "BusinessTypeName": BusinessTypeName, "OwnerSubTypeId": OwnerSubTypeId,
                                                                          "AreaTypeName": AreaTypeName, "Road": Road, "PostCode": PostCode, "WardId": WardId,
                                                                          "Street": Street, "BusinessClassId": BusinessClassId, "RegionCode": RegionCode, "DistrictCode": DistrictCode,
                                                                          "BusinessLicOwnerTypeId": BusinessLicOwnerTypeId, "ApplicationStageId": ApplicationStageId,
                                                                          "BusinessTypeId": BusinessTypeId, "AreaTypeId": AreaTypeId, "invoiceData": objs14})
                                                                                  }
                                                                                }
                                                                                })
                                                                            }
                                                                        });
                                                                        }
                                                                     
                                                                      }
                                                                    });
                                                                   // res.send({"WardName": WardName, "DistrictName": DistrictName, "RegionName": RegionName, "HouseNo": HouseNo, "BlockNo": BlockNo, "PlotNo": PlotNo, "UnsurveyedArea": UnsurveyedArea, "CompanyEmail": CompanyEmail, "CompanyPhone": CompanyPhone, "PoBox": PoBox, "trackNo": req.session.req_id_view, "person": objs12, "OrigTypeName": OrigTypeName, "OwnerSubTypeName": OwnerSubTypeName, "AplicationTIN": AplicationTIN, "BusinessTypeName": BusinessTypeName, "AreaTypeName": AreaTypeName, "Road": Road, "PostCode": PostCode, "Street": Street})
                                                                  }
                                                                }
                                                              });
                                                            }
                                                          }
                                                        });
                                                      }
                                                    }
                                                  });
                                                }
                                              }
                                            });
                                          }
                                        }
                                      });
                                    }
                                  }
                                });
                              }
                            }
                          });
                        }
                      }
                    });
                  }
                  }
                }
              });
            // }
          // }
        // });
      }

    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

// app.get('/firstStageView', async function(req, res) {
//   var reg_id = req.session.userID;
//   var objs12 = [];
//   var objs13 = [];
//   var OwnerSubTypeName;
//   var OrigTypeName;
//   var AplicationTIN;
//   var AplicationID;
//   if(typeof req.session.userID !== "undefined" || req.session.userID === true){
//   request({
//     url: GetParticulars+"/"+reg_id,
//     method: 'GET',
//   }, function(error, response, body){
//     if(error){
//       res.send("failed")
//     }else{
//      // console.log(body)
//       if(body !== undefined){
//         var jsonData = JSON.parse(body);
//         for(var i = 0; i < jsonData.length; i++){
//         var fname = jsonData[i].fname;
//         var mname = jsonData[i].mname;
//         var lname = jsonData[i].lname;
//         var date_birth = jsonData[i].date_birth;
//         date_birth = dateFormat(date_birth, "dd-mmm-yyyy");
//         var citizen = jsonData[i].citizen;
//         var gender = jsonData[i].gender;
//         objs12.push({"fname": fname, "mname": mname, "lname": lname, "date_birth": date_birth, "citizen": citizen, "gender": gender})
//         }
//               OrigTypeName = '';
//               request({
//                 url: GetsaveBusOwnerType+"/"+req.session.req_id_view,
//                 method: 'GET',
//               }, function(error, response, body){
//                 if(error){
//                   res.send("failed")
//                 }else{
//                   // console.log(body)
//                   if(body !== undefined){
//                     var jsonData = JSON.parse(body);
//                     // for(var i = 0; i < jsonData.length; i++){
//                     var BusinessLicOwnerTypeId = jsonData[0].BusinessLicOwnerTypeId;
                    

//                     if(BusinessLicOwnerTypeId == 0){
           
//                             res.send()
            
//                     }else{
//                     request({
//                       url: GetsaveBusOwnerTypeName+"/"+BusinessLicOwnerTypeId,
//                       method: 'GET',
//                     }, function(error, response, body){
//                       if(error){
//                         res.send("failed")
//                       }else{
                        
//                         if(body !== undefined || body !== null){
//                           var jsonData = JSON.parse(body);
//                           console.log(body)
//                           // for(const i = 0; i < jsonData.length; i++){
//                           OwnerSubTypeName = jsonData[0].OwnerSubTypeName;
//                           // }
//                           if(OwnerSubTypeName == undefined){
//                             OwnerSubTypeName = ''
//                           }
//                           request({
//                             url: GetsavedTIN+"/"+req.session.req_id_view,
//                             method: 'GET',
//                           }, function(error, response, body){
//                             if(error){
//                               res.send("failed")
//                             }else{
                              
//                               if(body !== undefined){
//                                 var jsonData = JSON.parse(body);
//                                 AplicationTIN = jsonData[0].ApplicationTIN;
//                                 AplicationID = jsonData[0].Id;
//                                 ServiceCode = jsonData[0].ServiceCode;
//                                 console.log(AplicationID + " and " + ServiceCode)
//                                 request({
//                                   url: GetPaymentDetails+"/"+AplicationID+"/"+ServiceCode,
//                                   method: 'GET',
//                                 }, function(error, response, body){
//                                   if(error){
//                                     res.send("failed")
//                                   }else{
//                                    console.log(body)
//                                     if(body !== undefined){
//                                       var jsonData = JSON.parse(body);
//                                       for(var i = 0; i < jsonData.length; i++){
//                                       var AmountTotal = jsonData[i].AmountTotal;
//                                       var ServiceName = jsonData[i].ServiceName;
//                                       var ExpireDate = jsonData[i].ExpireDate;
//                                       var CurrencyUsed = jsonData[i].CurrencyUsed;
//                                       var ControlNo = jsonData[i].ControlNo;
//                                       if(ControlNo == null){
//                                         ControlNo = 'Waiting for Control Number'
//                                         ExpireDate = '-'
//                                       }else{
//                                         ExpireDate = dateFormat(ExpireDate, "dd-mm-yyyy, h:MM:ss TT");
//                                       }
//                                       objs13.push({"AmountTotal": AmountTotal, "ServiceName": ServiceName, "ExpireDate": ExpireDate, "CurrencyUsed": CurrencyUsed, "ControlNo": ControlNo})
//                                       }
//                                       res.send({"payment": objs13})
                                     
//                                     }
//                                   }
//                                 });

//                               }
//                             }
//                           });
//                         }
//                       }
//                     });
//                   }
//                   }
//                 }
//               });
//             // }
//           // }
//         // });
//       }

//     }
//   });
// }else{
//   //console.log(loginTrial)
//   res.redirect('/');
// }
// })

app.get('/viewBusLic', async function(req, res) {
  var objs12 = [];
  var userId = req.session.req_id;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyApplicationLink,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) res.send("failed")
    //var jsonData = JSON.parse(response.body);
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    // console.log("Id =" + jsonData[i].Id);
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var submittedDate = jsonData[i].SubmittedDate;
    var createdDate = jsonData[i].CreatedDate;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    createdDate = dateFormat(createdDate, "dd, mm yyyy");
    objs12.push({"request_id": request_id, "trackingNo": trackingNo, "submittedDate": submittedDate, "createdDate": createdDate, "status": status, "businessTypeName": businessTypeName})
    }
    // console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/viewBusLic', async function(req, res) {
  var objs12 = [];
  var userId = req.session.req_id;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyApplicationLink,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) res.send("failed")
    //var jsonData = JSON.parse(response.body);
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    console.log("Id =" + jsonData[i].Id);
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var submittedDate = jsonData[i].SubmittedDate;
    var createdDate = jsonData[i].CreatedDate;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    createdDate = dateFormat(createdDate, "dd, mm yyyy");
    objs12.push({"request_id": request_id, "trackingNo": trackingNo, "submittedDate": submittedDate, "createdDate": createdDate, "status": status, "businessTypeName": businessTypeName})
    }
    console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/GetParticular',function(req,res){
  console.log("get particulars")
  var reg_id = req.session.userID;
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetParticulars+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error){
      res.send("failed")
    }else{
      console.log("body")
      console.log(body)
      if(body !== undefined){
        var jsonData = JSON.parse(body);
        if(jsonData.status == 'failed'){
          res.send({"status": "failed"})
        }else{
        // for(var i = 0; i < jsonData.length; i++){
        var fname = jsonData[0].fname;
        var mname = jsonData[0].mname;
        var lname = jsonData[0].lname;
        var date_birth = jsonData[0].date_birth;
        date_birth = dateFormat(date_birth, "dd-mmm-yyyy");
        var citizen = jsonData[0].citizen;
        var gender = jsonData[0].gender;
        // objs12.push({
        //     "status": "success", "fname": fname, "mname": mname, "lname": lname, 
        //     "date_birth": date_birth, "citizen": citizen, "gender": gender
        //   })
        // }
       
        res.send({
          "status": "success", "fname": fname, "mname": mname, "lname": lname, 
          "date_birth": date_birth, "citizen": citizen, "gender": gender
        })
      }
      }else{
        res.send({"status": "failed"})
      }
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBusOwnerType',function(req,res){
  console.log("get business owner types")
  var bizOwnerId = req.params.id;
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBusOnwerType,
    method: 'GET',
  }, function(error, response, body){
    if(error) {
      res.send({status: "failed"})
    }else{
    
    var jsonData = JSON.parse(response.body);
    // var jsonData = response.body
    
    for(var i = 0; i < jsonData.length; i++){
      
  //  console.log("Id =" + response.body);
    var OwnerSubTypeId = jsonData[i].OwnerSubTypeId;
    var OwnerTypeId = jsonData[i].OwnerTypeId;
    var OwnerSubTypeName = jsonData[i].OwnerSubTypeName;
    var OwnerSubTypeCode = jsonData[i].OwnerSubTypeCode;
      objs12.push({"status": "success", "OwnerSubTypeId": OwnerSubTypeId, 
      "OwnerTypeId": OwnerTypeId, "OwnerSubTypeName": OwnerSubTypeName, "OwnerSubTypeCode": OwnerSubTypeCode})
    }
    res.send(objs12)
  }
  });
}else{
  res.redirect('/');
}
});

app.get('/GetBusOwnerTypeUpdate/:id',function(req,res){
  var OldtrackNo = req.params.id;
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBusOnwerType+'/'+OldtrackNo,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    console.log("Id =" + response.body);
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
  //  console.log("Id =" + response.body);
    var OwnerSubTypeId = jsonData[i].OwnerSubTypeId;
    var OwnerTypeId = jsonData[i].OwnerTypeId;
    var OwnerSubTypeName = jsonData[i].OwnerSubTypeName;
    var OwnerSubTypeCode = jsonData[i].OwnerSubTypeCode;
      objs12.push({"OwnerSubTypeId": OwnerSubTypeId, "OwnerTypeId": OwnerTypeId, "OwnerSubTypeName": OwnerSubTypeName, "OwnerSubTypeCode": OwnerSubTypeCode})
    }
   // console.log(objs12)
    res.send(objs12)
  });
}else{
  res.redirect('/');
}
});

app.get('/GetOriginType',function(req,res){
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetOriginType,
    method: 'GET',
  }, function(error, response, body){
    if(error) {
      res.send({status: "failed"})
    }else{
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
  //  console.log("Id =" + response.body);
    var OriginTypeId = jsonData[i].OriginTypeId;
    var OriginTypeName = jsonData[i].OriginTypeName;
      objs12.push({"OriginTypeId": OriginTypeId, "OriginTypeName": OriginTypeName})
    }
   // console.log(objs12)
    res.send(objs12)
  }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetOwnerType',function(req,res){
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetOwnerType,
    method: 'GET',
  }, function(error, response, body){
    if(error) {
      res.send({status: "failed"})
    }else{
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
  //  console.log("Id =" + response.body);
    var OwnerTypeId = jsonData[i].OwnerTypeId;
    var OwnerTypeName = jsonData[i].OwnerTypeName;
      objs12.push({"OwnerTypeId": OwnerTypeId, "OwnerTypeName": OwnerTypeName})
    }
   // console.log(objs12)
    res.send(objs12)
  }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBusSector',function(req,res){
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBusSectorLink,
    method: 'GET',
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + ": " + error)
      res.send({"status": "failed"})
    }else{
      if(response.body != undefined){
        console.log("fgdfgdf ======" + response.body);
        var jsonData = JSON.parse(response.body);
        for(var i = 0; i < jsonData.length; i++){
      //  console.log("Id =" + response.body);
        var SectorId = jsonData[i].Id;
        // var OwnerTypeId = jsonData[i].OwnerTypeId;
        var SectorName = jsonData[i].SectorName;
          objs12.push({"sectorId": SectorId, "sectorName": SectorName})
        }
        res.send(objs12)
      }
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBLAttachment',function(req,res){
  console.log("yes")
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBLAttachmntLink,
    method: 'GET',
  }, function(error, response, body){
    if(error) {          
      console.log("fail to GetBLAttachment " + error);
         // sql.close();
          res.send({"status": "failed"});
        }
    console.log("Id =" + response.body);
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
   
    var AttachmentTypeId = jsonData[i].AttachmentTypeId;
    var AttachmentName = jsonData[i].AttachmentName;
    var Description = jsonData[i].Description;
      objs12.push({"AttachmentTypeId": AttachmentTypeId, "AttachmentName": AttachmentName, "Description": Description})
    }
   // console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBLAttachmentB',function(req,res){
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBLAttachmntLinkBra,
    method: 'GET',
  }, function(error, response, body){
    if(error) {          
      console.log("fail to GetBLAttachmentB " + error);
          //sql.close();
          res.send({status: "failed"});}
    console.log("Id =" + response.body);
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
   
    var AttachmentTypeId = jsonData[i].AttachmentTypeId;
    var AttachmentName = jsonData[i].AttachmentName;
    var Description = jsonData[i].Description;
      objs12.push({"AttachmentTypeId": AttachmentTypeId, "AttachmentName": AttachmentName, "Description": Description})
    }
   // console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBusTypePermits/:id',function(req,res){
  var bizNo = req.params.id;
  var objs12 = [];
  console.log(bizNo)
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBLLPermitLink+"/"+bizNo,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
  //  console.log("Id =" + response.body);
    var PermitId = jsonData[i].PermitId;
    var PermitName = jsonData[i].PermitName;
    var IssuingAgency = jsonData[i].IssuingAgency;
      objs12.push({"PermitId": PermitId, "PermitName": PermitName, "IssuingAgency": IssuingAgency})
    }
   // console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBusTypePermitsCount/:id',function(req,res){
  var bizNo = req.params.id;
  var objs12 = [];
  console.log(bizNo)
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBLLPermitLink+"/"+bizNo,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    var jsonData = JSON.parse(response.body);
    if(jsonData.length > 0){
      res.send("success")
    }else{
      res.send("fail")
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetCategory/:id',function(req,res){
  var reg_id = req.params.id;
  // var districts = GetDistrict+"/"+reg_id;
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBusCategoryLink+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
    // console.log("Id =" + jsonData[i].BusinessCategoryName);
    var categoryId = jsonData[i].Id;
    var businessCategoryName = jsonData[i].BusinessCategoryName;
      objs12.push({"categoryId": categoryId, "businessCategoryName": businessCategoryName})
    }
    // console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBizType/:id',function(req,res){
  var reg_id = req.params.id;
  // var districts = GetDistrict+"/"+reg_id;
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBusTypeLink+"/"+reg_id,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
    //console.log("Id =" + jsonData[i].BusinessCategoryName);
    var businessTypeId = jsonData[i].BusinessTypeId;
    var businessTypeName = jsonData[i].BusinessTypeName;
      objs12.push({"businessTypeId": businessTypeId, "businessTypeName": businessTypeName})
    }
    //console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBizTypeAll',function(req,res){
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBusTypeLinkAll,
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    //console.log("Id =" + jsonData[i].BusinessCategoryName);
    var businessTypeId = jsonData[i].BusinessTypeId;
    var businessTypeName = jsonData[i].BusinessTypeName;
      objs12.push({"businessTypeId": businessTypeId, "businessTypeName": businessTypeName})
    }
    //console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/GetBizType1',function(req,res){
  var objs12 = [];
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBusTypeLink+"1",
    method: 'GET',
  }, function(error, response, body){
    if(error) res.send("failed")
    var jsonData = JSON.parse(response.body);
    for(var i = 0; i < jsonData.length; i++){
   // console.log("Id =" + jsonData[i].BusinessCategoryName);
    var businessTypeId = jsonData[i].BusinessTypeId;
    var businessTypeName = jsonData[i].BusinessTypeName;
      objs12.push({"businessTypeId": businessTypeId, "businessTypeName": businessTypeName})
    }
  //  console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.post('/saveStageFirst',function(req,res){
 // console.log(req.body)
  var trackngNo = req.body.TrackingNo;
  var servtype = req.body.servtype;
  var userId = req.session.userID;
  req.session.TrackingNo = trackngNo;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetsaveStageOne,
    method: 'POST',
    json: {trackngNo: trackngNo, userId: userId, servtype: servtype},
  }, function(error, response, body){
    if(error) {          
      console.log("fail to Save_EntityOwner_SP " + error);
         // sql.close();
          res.send({status: "failed"});}
      console.log(response.body)
      res.send({"sucess": "sucess"})
    // });
  });
}else{
  res.redirect('/');
}
});

app.post('/saveBranchStageFirst',function(req,res){
     //console.log(req.body);
   var BLNo = req.body.BLNo;
   var trackingNo = req.body.TrackingNo;
   var servtype = req.body.servtype;
   var servtypecode = req.body.servtypecode;
   var trackNo = req.body.trackNo;
   var userId = req.session.userID;
   req.session.BLNo = BLNo;
   if(typeof req.session.userID !== "undefined" || req.session.userID === true){
   request({
     url: GetBsaveStageOne,
     method: 'POST',
     json: {BLNo: BLNo, userId: userId, servtype: servtype, servtypecode: servtypecode, trackingNo: trackingNo, trackNo: trackNo},
   }, function(error, response, body){
     if(error) {          
      console.log("fail to saveBranchStageFirst " + error);
          //sql.close();
          res.send({status: "failed"});}
      // console.log(response.body)
       res.send({"sucess": "sucess"})
   });
  }else{
    //console.log(loginTrial)
    res.redirect('/');
  }
});

app.post('/UploadFx',function(req,res){
//  console.log(req.body)
   var trackngNo = req.session.TrackingNo;
   var attachmentId = req.body.attachmentId;
   var trackNo = req.body.trackNo;
   var userId = req.session.userID;
   var token = req.session.token;
   atachment = req.body.atachment;
   atachment = atachment.replace("data:application/pdf;base64,", "");
   console.log(atachment);
   if(typeof req.session.userID !== "undefined" || req.session.userID === true){
   request({
     url: UploadFxLink,
     method: 'POST',
     json: {trackNo: trackNo, trackngNo: trackngNo, userId: userId, attachmentId: attachmentId, atachment: atachment, token: token},
   }, function(error, response, body){
     if(error) {          
      console.log("fail to UploadFx " + error);
          // sql.close();
          res.send({status: "failed"});}
       res.send({"sucess": "sucess"})
   });
  }else{
    //console.log(loginTrial)
    res.redirect('/');
  }
});

app.post('/UploadFxP',function(req,res){
  //  console.log(req.body)
     var trackngNo = req.session.TrackingNo;
     var attachmentId = req.body.attachmentId;
     var trackNo = req.body.trackNo;
     var userId = req.session.userID;
     var token = req.session.token;
     atachment = req.body.atachment;
     atachment = atachment.replace("data:application/pdf;base64,", "");
     console.log(atachment);
     if(typeof req.session.userID !== "undefined" || req.session.userID === true){
     request({
       url: UploadFxPLink,
       method: 'POST',
       json: {trackNo: trackNo, trackngNo: trackngNo, userId: userId, attachmentId: attachmentId, atachment: atachment, token: token},
     }, function(error, response, body){
       if(error) {          
        console.log("fail to UploadFxP " + error);
            // sql.close();
            res.send({"failed": "failed"});
          }
         res.send({"sucess": "sucess"})
     });
    }else{
      //console.log(loginTrial)
      res.redirect('/');
    }
  });

app.post('/UploadFxSup',function(req,res){
  //  console.log(req.body)
     var trackngNo = req.session.TrackingNo;
     var attachmentId = req.body.attachmentId;
     var trackNo = req.body.trackingNo;
     var userId = req.session.userID;
     var token = req.session.token;
     atachment = req.body.atachment;
     atachment = atachment.replace("data:application/pdf;base64,", "");
     console.log(atachment);
     if(typeof req.session.userID !== "undefined" || req.session.userID === true){
     request({
       url: UploadFxSupLink,
       method: 'POST',
       json: {trackNo: trackNo, userId: userId, attachmentId: attachmentId, atachment: atachment, token: token},
     }, function(error, response, body){
       if(error) {          
        console.log("fail to UploadFxSup " + error);
            //sql.close();
            res.send({"failed": "failed"});
          }
         res.send({"sucess": "sucess"})
     });
    }else{
      //console.log(loginTrial)
      res.redirect('/');
    }
  });

app.post('/UploadFn',function(req,res){
  // console.log(req.body)
    var trackngNo = req.body.trackngNo;
    var attachmentId = req.body.attachmentId;
    var trackNo = req.body.trackNo;
    var userId = req.session.userID;
    var token = req.session.token;
    atachment = req.body.atachment;
    if(typeof req.session.userID !== "undefined" || req.session.userID === true){
    request({
      url: UploadFxLink,
      method: 'POST',
      json: {trackNo: trackNo, trackngNo: trackngNo, userId: userId, attachmentId: attachmentId, atachment: atachment, token: token},
    }, function(error, response, body){
      if(error) {          
        console.log("fail to UploadFn " + error);
          // sql.close();
          res.send({"failed": "failed"});
        }
        res.send({"sucess": "sucess"})
    });
   }else{
     //console.log(loginTrial)
     res.redirect('/');
   }
 });

app.post('/UploadFm',function(req,res){
  //console.log(req.body)
   var trackngNo = req.session.TrackingNo;
   var attachmentId = req.body.attachmentId;
   var trackNo = req.body.trackNo;
   var userId = req.session.userID;
   var token = req.session.token;
   atachment = req.body.atachment;
   if(typeof req.session.userID !== "undefined" || req.session.userID === true){
   request({
     url: UploadFmLink,
     method: 'POST',
     json: {trackNo: trackNo, trackngNo: trackngNo, userId: userId, attachmentId: attachmentId, atachment: atachment, token: token},
   }, function(error, response, body){
     if(error) {          
      console.log("fail to UploadFm " + error);
          //sql.close();
          res.send({"failed": "failed"});
        }
       res.send({"sucess": "sucess"})
   });
  }else{
    //console.log(loginTrial)
    res.redirect('/');
  }
});

app.post('/UploadFY',function(req,res){
 // console.log(req.body)
   var trackngNo = req.session.TrackingNo;
   var attachmentId = req.body.attachmentId;
   var trackNo = req.body.trackNo;
   var userId = req.session.userID;
   var token = req.session.token;
   atachment = req.body.atachment;
   if(typeof req.session.userID !== "undefined" || req.session.userID === true){
   request({
     url: UploadFyLink,
     method: 'POST',
     json: {trackNo: trackNo, trackngNo: trackngNo, userId: userId, attachmentId: attachmentId, atachment: atachment, token: token},
   }, function(error, response, body){
     if(error) {          
      console.log("fail to UploadFY " + error);
         // sql.close();
          res.send({"failed": "failed"});
        }
       res.send({"sucess": "sucess"})
   });
  }else{
    //console.log(loginTrial)
    res.redirect('/');
  }
});

app.post('/TINVerification',function(req,res){
   var tinNo = req.body.tin_no;
   var busowntype = req.body.busowntype;
   if(typeof req.session.userID !== "undefined" || req.session.userID === true){
   request({
    //  url: BASEURL+"/"+tinAPI+"?TIN="+tinNo+"&DateOfRegistrationOfTIN="+tinDate,
    url: tinAPI+"?TIN="+tinNo,
     method: 'GET',
   }, function(error, response, body){
     if(error) {          
      console.log("fail to TINVerification " + error);
         // sql.close();
          res.send({status: "failed"});
        }
     console.log(response.body)
      var jsonData = JSON.parse(response.body);
      // var jsonData = response.body;
       var resultcode = jsonData.resultcode;
      //  console.log(resultcode)
       if(resultcode == 0){
         var resultset = jsonData.result;
         console.log("isperson"+resultset.IsPerson)
         if(resultset.IsPerson && busowntype == 1){
          var FirstName = resultset.FirstName;
          var MiddleName = resultset.MiddleName;
          var LastName = resultset.LastName;
          var taxPayName = FirstName + " " + MiddleName + " " + LastName;
          // console.log("isperson"+taxPayName)
          res.send(taxPayName)
         } else if(!resultset.IsPerson && busowntype == 1){
          var taxPayName = resultset.TaxpayerName;
          // console.log("isnotperson"+taxPayName)
          res.send("require natural person TIN")
         }
       
         else if(resultset.IsPerson && busowntype != 1){

            res.send("require Organization TIN")
           }
         else if(!resultset.IsPerson && busowntype != 1){
          var taxPayName = resultset.TaxpayerName;
          // console.log("isnotperson"+taxPayName)
          res.send(taxPayName)
         }
        // console.log(taxPayName)
       
       }else if(resultcode != 0){
        res.send("failed")
       }
   });
  }else{
    //console.log(loginTrial)
    res.redirect('/');
  }
});

app.post('/CompanyVerification',function(req,res){
  var inco_no = req.body.inco_no;
  console.log(inco_no)
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
   //  url: BASEURL+"/"+tinAPI+"?TIN="+tinNo+"&DateOfRegistrationOfTIN="+tinDate,
   url: companyAPI+""+inco_no,
    method: 'GET',
  }, function(error, response, body){
    if(error) {          
      console.log("fail to CompanyVerification " + error);
          // sql.close();
          res.send({status: "failed"});
        }
    console.log(response.body)
     var jsonData = JSON.parse(response.body);
     // var jsonData = response.body;
      var resultcode = jsonData.resultcode;
     //  console.log(resultcode)
      if(resultcode == 0){
      var resultset = jsonData.result;
      var comapnyDetails = resultset.company.info;
      var comapnyName = comapnyDetails.CompanyName;
      var comapnyType = comapnyDetails.CompanyTypeName;
      var comapnyDate = comapnyDetails.DateofIncorporation;
      var companyTIN = comapnyDetails.CompanyTIN;

      var companyAddress = resultset.OfficeAddress.info;
      var AreaType = companyAddress.AreaType;
      var AreaTypeId = companyAddress.AreaType;
      var Region = companyAddress.Region;
      var RegionCode = companyAddress.RegionCode;
      var district = companyAddress.District;
      var districtCode = companyAddress.DistrictCode;
      var ward = companyAddress.Ward;
      var wardId = companyAddress.WardId;
      var postCode = companyAddress.PostCode;
      var street = companyAddress.Street;
      var road = companyAddress.Road;
      var pobox = companyAddress.Pobox;
      var email = companyAddress.Email;
      var phone = companyAddress.Phone;
      console.log(companyAddress)
      res.send({ "phone": phone, "email": email, "pobox": pobox, "road": road, "street": street, "postCode": postCode, "wardId": wardId, "ward": ward, "districtCode": districtCode, "district": district, "district": district, "regionCode": RegionCode, "region": Region, "areaTypeId": AreaTypeId, "areaType": AreaType, "status": "success", "comapnyName": comapnyName, "comapnyType": comapnyType, "comapnyDate": comapnyDate, "companyTIN": companyTIN })
      }else if(resultcode != 0){
       res.send({"success": "failed"})
      }
  });
 }else{
   res.redirect('/');
 }
});

app.post('/BNVerification',function(req,res){
  var inco_no = req.body.bn_no;
  console.log(inco_no)
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
   //  url: BASEURL+"/"+tinAPI+"?TIN="+tinNo+"&DateOfRegistrationOfTIN="+tinDate,
   url: bnAPI+""+inco_no,
  method: 'GET',
  }, function(error, response, body){
    if(error) {          
      console.log("fail to BNVerification " + error);
          // sql.close();
          res.send({status: "failed"});
        }
    // console.log(response.body)
     var jsonData = JSON.parse(response.body);
     // var jsonData = response.body;
      var resultcode = jsonData.resultcode;
     //  console.log(resultcode)
      if(resultcode == 0){
      var resultset = jsonData.result;
      var businessDetails = resultset.business.info;
      var businessName = businessDetails.businessName;
      var BusinessType = businessDetails.BusinessType;
      var registryDate = resultset.registryDate;
      // var companyTIN = businessDetails.CompanyTIN;

      // var companyAddress = resultset.OfficeAddress.info;
      // var AreaType = companyAddress.AreaType;
      // var AreaTypeId = companyAddress.AreaType;
      // var Region = companyAddress.Region;
      // var RegionCode = companyAddress.RegionCode;
      // var district = companyAddress.District;
      // var districtCode = companyAddress.DistrictCode;
      // var ward = companyAddress.Ward;
      // var wardId = companyAddress.WardId;
      // var postCode = companyAddress.PostCode;
      // var street = companyAddress.Street;
      // var road = companyAddress.Road;
      // var pobox = companyAddress.Pobox;
      // var email = companyAddress.Email;
      // var phone = companyAddress.Phone;
      // console.log(companyAddress)
      res.send({ "status": "success", "businessName": businessName, "BusinessType": BusinessType, "registryDate": registryDate })
      }else if(resultcode != 0){
       res.send({"success": "failed"})
      }
  });
 }else{
   res.redirect('/');
 }
});

app.post('/NINVerification',function(req,res){
  var ninNo = req.body.nin_no;
  var year = ninNo.slice(0, 4);
  var month = ninNo.slice(4, 6);
  var day = ninNo.slice(6, 8);
  var ninDate = year+'-'+month+'-'+day;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
   //  url: BASEURL+"/"+tinAPI+"?TIN="+tinNo+"&DateOfRegistrationOfTIN="+tinDate,
   url: ninAPI+"?NIN="+ninNo+"&DateOfBirth="+ninDate,
    method: 'GET',
  }, function(error, response, body){
    if(error) {          
      console.log("fail to NINVerification " + error);
          // sql.close();
          res.send({"status": "failed"});
        }
    console.log(response.body)
     var jsonData = JSON.parse(response.body);
      var resultcode = jsonData.resultcode;
      if(resultcode == 0){
        var FIRSTNAME = jsonData.FIRSTNAME;
        var MIDDLENAME = jsonData.MIDDLENAME;
        var SURNAME = jsonData.SURNAME;
        var SEX = jsonData.SEX;
        var DATEOFBIRTH = jsonData.DATEOFBIRTH;
       res.send({"status": "success", "fname": FIRSTNAME, "mname": MIDDLENAME, "lname": SURNAME, "gender": SEX, "dob": DATEOFBIRTH})
      }else{
       res.send({"status": "failed"})
      }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});
  
app.post('/saveStageSecond',function(req,res){
  // console.log("mwox testing")
  var trackngNo = req.session.TrackingNo;
  var BizOwnerType = req.body.BizOwnerType;
  var NoUnit = req.body.NoUnit;
  var company_name = req.body.company_name;
  var BizTin = req.body.BizTin;
  var TaxPayer = req.body.TaxPayer;
  var TypeList = req.body.TypeList;
  var PhoneBuz = req.body.inputEmail4phn;
  var businessLicenceClassId = req.body.businessLicenceClassId;
  var inputEmail4comp = req.body.inputEmail4comp;
  var issuingAuthorityId = req.body.issuingAuthorityId;
  var fname = req.body.fname;
  var mname = req.body.mname;
  var lname = req.body.lname;
  var gender = req.body.gender;
  var busorigintype = req.body.busorigintype;
  var dob = req.body.dob;
  var nida_no = req.body.nida_no;
  var bustype = req.body.bustype;
  var addressAreaB = req.body.addressAreaB;
  var wardIdB = req.body.wardIdB;
  var subwardIdB = req.body.subwardIdB;
  var street = req.body.street;
  var postcode = req.body.postcode;
  var road = req.body.road;
  var plot_no = req.body.plot_no;
  var block_no = req.body.block_no;
  var house_no = req.body.house_no;

  var reg_no_other = req.body.reg_no_other;
  var corporate_name = req.body.corporate_name;
  var leadername_nat = req.body.leadername_nat;
  var leadername_nat_2 = req.body.leadername_nat_2;

  var unservayedarea = req.body.unservayedarea;
  var regionlistB = req.body.regionlistB;
  var districtlistB = req.body.districtlistB;
  var inputEmail4pobox = req.body.inputEmail4pobox;
  var inco_no = req.body.inco_no;
  var bn_name = req.body.bn_name;
  var bn_no = req.body.bn_no;
  var fullname = fname + " " + mname + " " + lname
  var userId = req.session.userID;
  if(gender == 'MALE'){
    gender = 1;
  }else if(gender == 'FEMALE'){
    gender = 2
  }
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
    request({
      url: GetsaveStageTwo,
      method: 'POST',
      json: {fullname: fullname, bn_no: bn_no, bn_name: bn_name, company_name: company_name, inco_no: inco_no, reg_no_other: reg_no_other, corporate_name: corporate_name, leadername_nat: leadername_nat, leadername_nat_2: leadername_nat_2, districtlistB: districtlistB, regionlistB: regionlistB, inputEmail4pobox: inputEmail4pobox, unservayedarea: unservayedarea, house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB, bustype: bustype, nida_no: nida_no, dob: dob, busorigintype: busorigintype, fname: fname, mname: mname, lname: lname, gender: gender, PhoneBuz: PhoneBuz, issuingAuthorityId: issuingAuthorityId, inputEmail4comp: inputEmail4comp, businessLicenceClassId: businessLicenceClassId, trackngNo: trackngNo, userId: userId, BizOwnerType: BizOwnerType, NoUnit: NoUnit, BizTin: BizTin, TaxPayer: TaxPayer, TypeList: TypeList},
    }, function(error, response, body){
      if(error) {          
        console.log("fail to saveStageSecond " + error);
          // sql.close();
          res.send({status: "failed"});}
      var BLdetailsId = response.body;
      request({
        url: GetsaveStageAddress,
        method: 'POST',
        json: {fullname: fullname, bn_no: bn_no, bn_name: bn_name, 
          inco_no: inco_no, reg_no_other: reg_no_other, corporate_name: corporate_name, 
          leadername_nat: leadername_nat, leadername_nat_2: leadername_nat_2, 
          BLdetailsId: BLdetailsId, districtlistB: districtlistB, regionlistB: regionlistB, 
          inputEmail4pobox: inputEmail4pobox, unservayedarea: unservayedarea, house_no: house_no, 
          block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, 
          wardIdB: wardIdB, addressAreaB: addressAreaB, bustype: bustype, nida_no: nida_no, 
          dob: dob, busorigintype: busorigintype, fname: fname, mname: mname, lname: lname, 
          gender: gender, PhoneBuz: PhoneBuz, issuingAuthorityId: issuingAuthorityId, 
          inputEmail4comp: inputEmail4comp, businessLicenceClassId: businessLicenceClassId, 
          trackngNo: trackngNo, userId: userId, BizOwnerType: BizOwnerType, NoUnit: NoUnit, 
          BizTin: BizTin, TaxPayer: TaxPayer, TypeList: TypeList, subwardIdB: subwardIdB},
      }, function(error1, response, body){
        if(error) {          
          console.log("fail to saveStageSecond " + error1);
          // sql.close();
          res.send({status: "failed"});
        }
        res.send(response.body)
      });
    });
  }else{
    //console.log(loginTrial)
    res.redirect('/');
  }
});

app.post('/updateStageSecond',function(req,res){
  console.log("[[[[[[[[miki]]]]] ")
  console.log(req.body)
  var trackngNo = req.body.trackNo;
  var addressAreaB = req.body.addressAreaB;
  var wardIdB = req.body.wardIdB;
  var street = req.body.street;
  var postcode = req.body.postcode;
  var road = req.body.road;
  var plot_no = req.body.plot_no;
  var pobox = req.body.pobox;
  var block_no = req.body.block_no;
  var house_no = req.body.house_no;

  var unservayedarea = req.body.unservayedarea;
  var regionlistB = req.body.regionlistB;
  var districtlistB = req.body.districtlistB;
  var phone_no = req.body.phone_no;
  var email = req.body.email;
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
    // request({
    //   url: GetupdateStageTwo,
    //   method: 'POST',
    //   json: {bn_no: bn_no, bn_name: bn_name, company_name: company_name, inco_no: inco_no, districtlistB: districtlistB, regionlistB: regionlistB, inputEmail4pobox: inputEmail4pobox, unservayedarea: unservayedarea, house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB, bustype: bustype, nida_no: nida_no, dob: dob, busorigintype: busorigintype, fname: fname, mname: mname, lname: lname, gender: gender, PhoneBuz: PhoneBuz, inputEmail4comp: inputEmail4comp, businessLicenceClassId: businessLicenceClassId, trackngNo: trackngNo, userId: userId, BizOwnerType: BizOwnerType, NoUnit: NoUnit, BizTin: BizTin, TaxPayer: TaxPayer, TypeList: TypeList},
    // }, function(error, response, body){
    //   if(error) {  }      
    //   var BLdetailsId = response.body;
      // console.log("BLID: " + BLdetailsId)
      request({
        url: GetupdateStageTwo,
        method: 'POST',
        json: {districtlistB: districtlistB, regionlistB: regionlistB, 
          street: street, unservayedarea: unservayedarea, 
          house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, 
          postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB,
          trackngNo: trackngNo, userId: userId, pobox: pobox, phone_no: phone_no, email: email},
      }, function(error, response, body){
        if(error) { 

        }     
        console.log(body)
        // var jsonData = JSON.parse(body)
        res.send(body)
      });
    // });
  }else{
    //console.log(loginTrial)
    res.redirect('/');
  }
});

app.post('/saveBStageSecond',function(req,res){
  var trackngNo = req.session.TrackingNo;
  var PhoneBuz = req.body.inputEmail4phn;
  var BLNo = req.body.BLNo;
  var inputEmail4comp = req.body.inputEmail4comp;
  var addressAreaB = req.body.addressAreaB;
  var wardIdB = req.body.wardIdB;
  var street = req.body.street;
  var postcode = req.body.postcode;
  var road = req.body.road;
  var trackNo = req.body.trackNo;
  var plot_no = req.body.plot_no;
  var block_no = req.body.block_no;
  var house_no = req.body.house_no;
  var unservayedarea = req.body.unservayedarea;
  var regionlistB = req.body.regionlistB;
  var districtlistB = req.body.districtlistB;
  var inputEmail4pobox = req.body.inputEmail4pobox;
  var subwardIdB = req.body.subwardIdB;
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetBsaveStageTwo,
    method: 'POST',
    json: {BLNo: BLNo, trackNo: trackNo, districtlistB: districtlistB, regionlistB: regionlistB, inputEmail4pobox: inputEmail4pobox, unservayedarea: unservayedarea, house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB, PhoneBuz: PhoneBuz, inputEmail4comp: inputEmail4comp, trackngNo: trackngNo, userId: userId},
  }, function(error, response, body){
    if(error) {          
      console.log("fail to saveBStageSecond " + error);
         // sql.close();
          res.send({status: "failed"});
        }
  // console.log(response.body)
    var BLdetailsId = response.body;
    // console.log("1=== " + BLdetailsId)
    request({
      url: GetBsaveStageAddress,
      method: 'POST',
      json: {BLNo: BLNo, trackNo: trackNo, BLdetailsId: BLdetailsId, subwardIdB: subwardIdB, districtlistB: districtlistB, regionlistB: regionlistB, inputEmail4pobox: inputEmail4pobox, unservayedarea: unservayedarea, house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB, PhoneBuz: PhoneBuz, inputEmail4comp: inputEmail4comp, trackngNo: trackngNo, userId: userId},
    }, function(error, response, body){
      if(error) {          
        console.log("fail to saveBStageSecond " + error);
          //sql.close();
          res.send({status: "failed"});
        }
      console.log(response.body)
      res.send(response.body)
    });



  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.post('/saveTransferStageSecond',function(req,res){
  var trackngNo = req.session.TrackingNo;
  var PhoneBuz = req.body.inputEmail4phn;
  var BLNo = req.body.BLNo;
  var inputEmail4comp = req.body.inputEmail4comp;
  var addressAreaB = req.body.addressAreaB;
  var wardIdB = req.body.wardIdB;
  var street = req.body.street;
  var postcode = req.body.postcode;
  var road = req.body.road;
  var trackNo = req.body.trackNo;
  var plot_no = req.body.plot_no;
  var block_no = req.body.block_no;
  var house_no = req.body.house_no;
  var unservayedarea = req.body.unservayedarea;
  var regionlistB = req.body.regionlistB;
  var districtlistB = req.body.districtlistB;
  var inputEmail4pobox = req.body.inputEmail4pobox;
  var subwardIdB = req.body.subwardIdB;
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: saveTransferStageTwo,
    method: 'POST',
    json: {BLNo: BLNo, trackNo: trackNo, districtlistB: districtlistB, regionlistB: regionlistB, inputEmail4pobox: inputEmail4pobox, unservayedarea: unservayedarea, house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB, PhoneBuz: PhoneBuz, inputEmail4comp: inputEmail4comp, trackngNo: trackngNo, userId: userId},
  }, function(error, response, body){
    if(error) {          
      console.log("fail to saveTransferStageSecond " + error);
          // sql.close();
          res.send({status: "failed"});}
  // console.log(response.body)
    var BLdetailsId = response.body;
    // console.log("1=== " + BLdetailsId)
    request({
      url: GetTransfersaveStageAddress,
      method: 'POST',
      json: {BLNo: BLNo, trackNo: trackNo, BLdetailsId: BLdetailsId, districtlistB: districtlistB, regionlistB: regionlistB, inputEmail4pobox: inputEmail4pobox, unservayedarea: unservayedarea, house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB, PhoneBuz: PhoneBuz, inputEmail4comp: inputEmail4comp, trackngNo: trackngNo, userId: userId},
    }, function(error1, response, body){
      if(error) {          
        console.log("fail to saveTransferStageSecond " + error1);
          // sql.close();
          res.send({status: "failed"});
        }
      //console.log(response.body)
      res.send(response.body)
    });



  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.post('/GetCancelStageTwo',function(req,res){
  var trackngNo = req.session.TrackingNo;
  var PhoneBuz = req.body.inputEmail4phn;
  var BLNo = req.body.BLNo;
  var inputEmail4comp = req.body.inputEmail4comp;
  var addressAreaB = req.body.addressAreaB;
  var wardIdB = req.body.wardIdB;
  var street = req.body.street;
  var postcode = req.body.postcode;
  var road = req.body.road;
  var trackNo = req.body.trackNo;
  var plot_no = req.body.plot_no;
  var block_no = req.body.block_no;
  var house_no = req.body.house_no;
  var unservayedarea = req.body.unservayedarea;
  var regionlistB = req.body.regionlistB;
  var districtlistB = req.body.districtlistB;
  var inputEmail4pobox = req.body.inputEmail4pobox;
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetCancelStageTwoLink,
    method: 'POST',
    json: {BLNo: BLNo, trackNo: trackNo, districtlistB: districtlistB, regionlistB: regionlistB, inputEmail4pobox: inputEmail4pobox, unservayedarea: unservayedarea, house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB, PhoneBuz: PhoneBuz, inputEmail4comp: inputEmail4comp, trackngNo: trackngNo, userId: userId},
  }, function(error, response, body){
    if(error) {          
      console.log("fail to GetCancelStageTwo " + error);
          // sql.close();
          res.send({status: "failed"});
        }
  //console.log(response.body)
  // var jsonData = JSON.parse(response.body);
  var jsonData = response.body;
    var BLdetailsId = jsonData.Id_bl;
    var BLdetailsEmail = jsonData.Email;
    var BLdetailsPhoneNo = jsonData.PhoneNo;
    var BLdetailsPoBox = jsonData.PoBox;
    //console.log("1=== " + BLdetailsId)
    request({
      url: GetCancelStageAddress,
      method: 'POST',
      json: {BLNo: BLNo, trackNo: trackNo, BLdetailsId: BLdetailsId, districtlistB: districtlistB, regionlistB: regionlistB, inputEmail4pobox: BLdetailsPoBox, unservayedarea: unservayedarea, house_no: house_no, block_no: block_no, plot_no: plot_no, road: road, street: street, postcode: postcode, wardIdB: wardIdB, addressAreaB: addressAreaB, PhoneBuz: BLdetailsPhoneNo, inputEmail4comp: BLdetailsEmail, trackngNo: trackngNo, userId: userId},
    }, function(error, response, body){
      if(error) {          
        console.log("fail to GetCancelStageTwo " + error);
          ///sql.close();
          res.send({status: "failed"});}
      //console.log(response.body)
      res.send(response.body)
    });
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/MyApplication1', async function(req, res) {
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  // res.render(path.join(__dirname+'/public/ors/my_application'));
  res.render(path.join(__dirname+'/public/ors/my_application_new'));
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/PMyApplication', async function(req, res) {
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  res.render(path.join(__dirname+'/public/ors/p_my_application'));
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/Dashboard', async function(req, res) {
  var objs12 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyApplicationLink,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error){
      console.log(new Date() + " dashboard fail to load " + error)
      res.send("failed")
    }
    //console.log(response.body)
    // var jsonData = JSON.parse(response.body);
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    //console.log("Id =" + jsonData[i].Id);
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var submittedDate = jsonData[i].SubmittedDate;
    var createdDate = jsonData[i].CreatedDate;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    var PaymentStatus = jsonData[i].PaymentStatus;
    var ApplicationStatusId = jsonData[i].ApplicationStatusId;
    var ApplicationStep = jsonData[i].ApplicationStageId;
    var BLNumber = jsonData[i].BLNumber;
    var IsBranch = jsonData[i].IsBranch;
    var ServiceCode = jsonData[i].ServiceCode;
    var IsSentRegistry = jsonData[i].IsSentRegistry;
    var BusinessClassId = jsonData[i].BusinessClassId;
    
    if(IsSentRegistry){
      IsSentRegistry == 1;
    }if(!IsSentRegistry){
      IsSentRegistry == 0;
    }

    if(BLNumber == null){
      BLNumber = ' - '
    }
    if(IsBranch == 0){
      IsBranch = 'Principal'
    }
    if(IsBranch == 1){
      IsBranch = 'Branch'
    }
    createdDate = dateFormat(createdDate, "dd-mm-yyyy, h:MM:ss TT");
    submittedDate = dateFormat(submittedDate, "dd-mm-yyyy, h:MM:ss TT");

      if(ApplicationStatusId == 1){
        ApplicationStatusId = 'Processing'
      }if(ApplicationStatusId == 2){
        ApplicationStatusId = 'Final decision'
      }if(ApplicationStatusId == 3){
        ApplicationStatusId = 'Supplement for data and attachment'
      }if(ApplicationStatusId == 4){
        ApplicationStatusId = 'Returned to BRELA for Processing'
      }if(ApplicationStatusId == 5){
        ApplicationStatusId = 'Completed'
      }if(ApplicationStatusId == 6){
        ApplicationStatusId = 'Rejected'
      }if(ApplicationStatusId == 7){
        ApplicationStatusId = 'Pending'
      }if(ApplicationStatusId == 8){
        ApplicationStatusId = 'Payment'
      }if(ApplicationStatusId == 9){
        ApplicationStatusId = 'Licence Issuing'
      }if(ApplicationStatusId == 10){
        ApplicationStatusId = 'Suplement for attachment only'
      }if(ApplicationStatusId == 11){
        ApplicationStatusId = 'Returned for Processing from Desion'
      }if(ApplicationStatusId == 12){
        ApplicationStatusId = 'Waiting for Application to be paid'
      }

      if(ServiceCode == 4201){
        ServiceCode = 'New Application for Business Licence'
      }if(ServiceCode == 4202){
        ServiceCode = 'Transfer Business Licence'
      }if(ServiceCode == 4203){
        ServiceCode = 'Application for Branch Business Licence'
      }if(ServiceCode == 4204){
        ServiceCode = 'Cancel Business Licence'
      }


      if(ApplicationStep == 1){
        ApplicationStep = 'Processing'
      }if(ApplicationStep == 2){
        ApplicationStep = 'Decision'
      }if(ApplicationStep == 3){
        ApplicationStep = 'Licence approving'
      }if(ApplicationStep == 4){
        ApplicationStep = 'Licence Payment'
      }if(ApplicationStep == 5){
        ApplicationStep = 'Licence issuing'
      }if(ApplicationStep == 6){
        ApplicationStep = 'Completed'
      }if(ApplicationStep == 7){
        ApplicationStep = 'Supplement'
      }
      objs12.push({"BusinessClassId": BusinessClassId, "IsSentRegistry": IsSentRegistry, "ServiceCode": ServiceCode, "IsBranch": IsBranch, "BLNumber": BLNumber, "request_id": request_id, "trackingNo": trackingNo, "submittedDate": submittedDate, "createdDate": createdDate, "status": status, "businessTypeName": businessTypeName, "paymentStatus": PaymentStatus, "ApplicationStatusId": ApplicationStatusId, "ApplicationStep": ApplicationStep})
    //  }

  //  });
    }
    //console.log(objs12)
    // res.render(path.join(__dirname+'/public/ors/licence_list'), { data: objs12 });
    res.render(path.join(__dirname+'/public/ors/dashboard1'), { data: objs12 });
    // res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/OnGoingApp', async function(req, res) {
  var objs12 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyApplicationLink,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + " ongoing app fail to load " + error)
      res.send("failed")

    }
    //console.log(response.body)
    // var jsonData = JSON.parse(response.body);
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    //console.log("Id =" + jsonData[i].Id);
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var submittedDate = jsonData[i].SubmittedDate;
    var createdDate = jsonData[i].CreatedDate;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    var PaymentStatus = jsonData[i].PaymentStatus;
    var ApplicationStatusId = jsonData[i].ApplicationStatusId;
    var ApplicationStep = jsonData[i].ApplicationStageId;
    var BLNumber = jsonData[i].BLNumber;
    var IsBranch = jsonData[i].IsBranch;
    var ServiceCode = jsonData[i].ServiceCode;
    var IsSentRegistry = jsonData[i].IsSentRegistry;
    var BusinessClassId = jsonData[i].BusinessClassId;
    
    if(IsSentRegistry){
      IsSentRegistry == 1;
    }if(!IsSentRegistry){
      IsSentRegistry == 0;
    }

    if(BLNumber == null){
      BLNumber = ' - '
    }
    if(IsBranch == 0){
      IsBranch = 'Principal'
    }
    if(IsBranch == 1){
      IsBranch = 'Branch'
    }
    createdDate = dateFormat(createdDate, "dd-mm-yyyy, h:MM:ss TT");
    submittedDate = dateFormat(submittedDate, "dd-mm-yyyy, h:MM:ss TT");

      if(ApplicationStatusId == 1){
        ApplicationStatusId = 'Processing'
      }if(ApplicationStatusId == 2){
        ApplicationStatusId = 'Final decision'
      }if(ApplicationStatusId == 3){
        ApplicationStatusId = 'Supplement for data and attachment'
      }if(ApplicationStatusId == 4){
        ApplicationStatusId = 'Returned to BRELA for Processing'
      }if(ApplicationStatusId == 5){
        ApplicationStatusId = 'Completed'
      }if(ApplicationStatusId == 6){
        ApplicationStatusId = 'Rejected'
      }if(ApplicationStatusId == 7){
        ApplicationStatusId = 'Pending'
      }if(ApplicationStatusId == 8){
        ApplicationStatusId = 'Payment'
      }if(ApplicationStatusId == 9){
        ApplicationStatusId = 'Licence Issuing'
      }if(ApplicationStatusId == 10){
        ApplicationStatusId = 'Suplement for attachment only'
      }if(ApplicationStatusId == 11){
        ApplicationStatusId = 'Returned for Processing from Desion'
      }if(ApplicationStatusId == 12){
        ApplicationStatusId = 'Waiting for Application to be paid'
      }

      if(ServiceCode == 4201){
        ServiceCode = 'New Application for Business Licence'
      }if(ServiceCode == 4202){
        ServiceCode = 'Transfer Business Licence'
      }if(ServiceCode == 4203){
        ServiceCode = 'Application for Branch Business Licence'
      }if(ServiceCode == 4204){
        ServiceCode = 'Cancel Business Licence'
      }


      if(ApplicationStep == 1){
        ApplicationStep = 'Processing'
      }if(ApplicationStep == 2){
        ApplicationStep = 'Decision'
      }if(ApplicationStep == 3){
        ApplicationStep = 'Licence approving'
      }if(ApplicationStep == 4){
        ApplicationStep = 'Licence Payment'
      }if(ApplicationStep == 5){
        ApplicationStep = 'Licence issuing'
      }if(ApplicationStep == 6){
        ApplicationStep = 'Completed'
      }if(ApplicationStep == 7){
        ApplicationStep = 'Supplement'
      }
      objs12.push({"BusinessClassId": BusinessClassId, "IsSentRegistry": IsSentRegistry, "ServiceCode": ServiceCode, "IsBranch": IsBranch, "BLNumber": BLNumber, "request_id": request_id, "trackingNo": trackingNo, "submittedDate": submittedDate, "createdDate": createdDate, "status": status, "businessTypeName": businessTypeName, "paymentStatus": PaymentStatus, "ApplicationStatusId": ApplicationStatusId, "ApplicationStep": ApplicationStep})
    //  }

  //  });
    }
    //console.log(objs12)
    // res.render(path.join(__dirname+'/public/ors/licence_list'), { data: objs12 });
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/MyApplication', async function(req, res) {
  var objs12 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyApplicationLink,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + " MyApplication fail to load " + error)
      res.send("failed")
    }
    //console.log(response.body)
    // var jsonData = JSON.parse(response.body);
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    //console.log("Id =" + jsonData[i].Id);
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var submittedDate = jsonData[i].SubmittedDate;
    var createdDate = jsonData[i].CreatedDate;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    var PaymentStatus = jsonData[i].PaymentStatus;
    var ApplicationStatusId = jsonData[i].ApplicationStatusId;
    var ApplicationStep = jsonData[i].ApplicationStageId;
    var BLNumber = jsonData[i].BLNumber;
    var IsBranch = jsonData[i].IsBranch;
    var ServiceCode = jsonData[i].ServiceCode;
    var IsSentRegistry = jsonData[i].IsSentRegistry;
    var BusinessClassId = jsonData[i].BusinessClassId;
    
    if(IsSentRegistry){
      IsSentRegistry == 1;
    }if(!IsSentRegistry){
      IsSentRegistry == 0;
    }

    if(BLNumber == null){
      BLNumber = ' - '
    }
    if(IsBranch == 0){
      IsBranch = 'Principal'
    }
    if(IsBranch == 1){
      IsBranch = 'Branch'
    }
    createdDate = dateFormat(createdDate, "dd-mm-yyyy, h:MM:ss TT");
    submittedDate = dateFormat(submittedDate, "dd-mm-yyyy, h:MM:ss TT");

      if(ApplicationStatusId == 1){
        ApplicationStatusId = 'Processing'
      }if(ApplicationStatusId == 2){
        ApplicationStatusId = 'Final decision'
      }if(ApplicationStatusId == 3){
        ApplicationStatusId = 'Supplement for data and attachment'
      }if(ApplicationStatusId == 4){
        ApplicationStatusId = 'Returned to BRELA for Processing'
      }if(ApplicationStatusId == 5){
        ApplicationStatusId = 'Completed'
      }if(ApplicationStatusId == 6){
        ApplicationStatusId = 'Rejected'
      }if(ApplicationStatusId == 7){
        ApplicationStatusId = 'Pending'
      }if(ApplicationStatusId == 8){
        ApplicationStatusId = 'Payment'
      }if(ApplicationStatusId == 9){
        ApplicationStatusId = 'Licence Issuing'
      }if(ApplicationStatusId == 10){
        ApplicationStatusId = 'Suplement for attachment only'
      }if(ApplicationStatusId == 11){
        ApplicationStatusId = 'Returned for Processing from Desion'
      }if(ApplicationStatusId == 12){
        ApplicationStatusId = 'Waiting for Application to be paid'
      }

      if(ServiceCode == 4201){
        ServiceCode = 'New Application for Business Licence'
      }if(ServiceCode == 4202){
        ServiceCode = 'Transfer Business Licence'
      }if(ServiceCode == 4203){
        ServiceCode = 'Application for Branch Business Licence'
      }if(ServiceCode == 4204){
        ServiceCode = 'Cancel Business Licence'
      }


      if(ApplicationStep == 1){
        ApplicationStep = 'Processing'
      }if(ApplicationStep == 2){
        ApplicationStep = 'Decision'
      }if(ApplicationStep == 3){
        ApplicationStep = 'Licence approving'
      }if(ApplicationStep == 4){
        ApplicationStep = 'Licence Payment'
      }if(ApplicationStep == 5){
        ApplicationStep = 'Licence issuing'
      }if(ApplicationStep == 6){
        ApplicationStep = 'Completed'
      }if(ApplicationStep == 7){
        ApplicationStep = 'Supplement'
      }
      objs12.push({"BusinessClassId": BusinessClassId, "IsSentRegistry": IsSentRegistry, "ServiceCode": ServiceCode, "IsBranch": IsBranch, "BLNumber": BLNumber, "request_id": request_id, "trackingNo": trackingNo, "submittedDate": submittedDate, "createdDate": createdDate, "status": status, "businessTypeName": businessTypeName, "paymentStatus": PaymentStatus, "ApplicationStatusId": ApplicationStatusId, "ApplicationStep": ApplicationStep})
    //  }

  //  });
    }
    //console.log(objs12)
    res.render(path.join(__dirname+'/public/ors/my_application'), { data: objs12 });
    // res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/SubApplication', async function(req, res) {
  var objs12 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyApplicationLink,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + " MyApplication fail to load " + error)
      res.send("failed")
    }
    //console.log(response.body)
    // var jsonData = JSON.parse(response.body);
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    //console.log("Id =" + jsonData[i].Id);
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var submittedDate = jsonData[i].SubmittedDate;
    var createdDate = jsonData[i].CreatedDate;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    var PaymentStatus = jsonData[i].PaymentStatus;
    var ApplicationStatusId = jsonData[i].ApplicationStatusId;
    var ApplicationStep = jsonData[i].ApplicationStageId;
    var BLNumber = jsonData[i].BLNumber;
    var IsBranch = jsonData[i].IsBranch;
    var ServiceCode = jsonData[i].ServiceCode;
    var IsSentRegistry = jsonData[i].IsSentRegistry;
    var BusinessClassId = jsonData[i].BusinessClassId;
    
    if(IsSentRegistry){
      IsSentRegistry == 1;
    }if(!IsSentRegistry){
      IsSentRegistry == 0;
    }

    if(BLNumber == null){
      BLNumber = ' - '
    }
    if(IsBranch == 0){
      IsBranch = 'Principal'
    }
    if(IsBranch == 1){
      IsBranch = 'Branch'
    }
    createdDate = dateFormat(createdDate, "dd-mm-yyyy, h:MM:ss TT");
    submittedDate = dateFormat(submittedDate, "dd-mm-yyyy, h:MM:ss TT");

      if(ApplicationStatusId == 1){
        ApplicationStatusId = 'Processing'
      }if(ApplicationStatusId == 2){
        ApplicationStatusId = 'Final decision'
      }if(ApplicationStatusId == 3){
        ApplicationStatusId = 'Supplement for data and attachment'
      }if(ApplicationStatusId == 4){
        ApplicationStatusId = 'Returned to BRELA for Processing'
      }if(ApplicationStatusId == 5){
        ApplicationStatusId = 'Completed'
      }if(ApplicationStatusId == 6){
        ApplicationStatusId = 'Rejected'
      }if(ApplicationStatusId == 7){
        ApplicationStatusId = 'Pending'
      }if(ApplicationStatusId == 8){
        ApplicationStatusId = 'Payment'
      }if(ApplicationStatusId == 9){
        ApplicationStatusId = 'Licence Issuing'
      }if(ApplicationStatusId == 10){
        ApplicationStatusId = 'Suplement for attachment only'
      }if(ApplicationStatusId == 11){
        ApplicationStatusId = 'Returned for Processing from Desion'
      }if(ApplicationStatusId == 12){
        ApplicationStatusId = 'Waiting for Application to be paid'
      }

      if(ServiceCode == 4201){
        ServiceCode = 'New Application for Business Licence'
      }if(ServiceCode == 4202){
        ServiceCode = 'Transfer Business Licence'
      }if(ServiceCode == 4203){
        ServiceCode = 'Application for Branch Business Licence'
      }if(ServiceCode == 4204){
        ServiceCode = 'Cancel Business Licence'
      }


      if(ApplicationStep == 1){
        ApplicationStep = 'Processing'
      }if(ApplicationStep == 2){
        ApplicationStep = 'Decision'
      }if(ApplicationStep == 3){
        ApplicationStep = 'Licence approving'
      }if(ApplicationStep == 4){
        ApplicationStep = 'Licence Payment'
      }if(ApplicationStep == 5){
        ApplicationStep = 'Licence issuing'
      }if(ApplicationStep == 6){
        ApplicationStep = 'Completed'
      }if(ApplicationStep == 7){
        ApplicationStep = 'Supplement'
      }
      objs12.push({"BusinessClassId": BusinessClassId, "IsSentRegistry": IsSentRegistry, "ServiceCode": ServiceCode, "IsBranch": IsBranch, "BLNumber": BLNumber, "request_id": request_id, "trackingNo": trackingNo, "submittedDate": submittedDate, "createdDate": createdDate, "status": status, "businessTypeName": businessTypeName, "paymentStatus": PaymentStatus, "ApplicationStatusId": ApplicationStatusId, "ApplicationStep": ApplicationStep})
    //  }

  //  });
    }
    //console.log(objs12)
    res.render(path.join(__dirname+'/public/ors/sub_application'), { data: objs12 });
    // res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/ComplLic', async function(req, res) {
  var objs12 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyLicLink,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + " ComplLic fail to load " + error)
      res.send("failed")
    }
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var ExpireDate = jsonData[i].ExpireDate;
    var DateIssued = jsonData[i].DateIssued;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    var PaymentStatus = jsonData[i].PaymentStatus;
    var ApplicationStatusId = jsonData[i].ApplicationStatusId;
    var ApplicationStep = jsonData[i].ApplicationStageId;
    var BLNumber = jsonData[i].BLNumber;
    var IsBranch = jsonData[i].IsBranch;
    var BusinessClassId = jsonData[i].BusinessClassId;
    var FeePaid = jsonData[i].FeePaid;
    var ServiceCode = jsonData[i].ServiceCode;
    var IsSentRegistry = jsonData[i].IsSentRegistry;
    var LicenceStatusId = jsonData[i].LicenceStatusId;
    var EntityName = jsonData[i].EntityName;

    if(BusinessClassId == 1){
      BusinessClassId = 'Class A'
    }if(BusinessClassId == 2){
      BusinessClassId = 'Class B'
    }

    if(LicenceStatusId == 1){
      LicenceStatusId = 'Active'
    }if(LicenceStatusId == 6){
      LicenceStatusId = 'Cancelled'
    }if(LicenceStatusId == 2){
      LicenceStatusId = 'Expired'
    }if(LicenceStatusId == 7){
      LicenceStatusId = 'Expired '
    }
    if(IsSentRegistry){
      IsSentRegistry == 1;
    }if(!IsSentRegistry){
      IsSentRegistry == 0;
    }

    if(BLNumber == null){
      BLNumber = ' - '
    }
    if(IsBranch == 0){
      IsBranch = 'Principal'
    }
    if(IsBranch == 1){
      IsBranch = 'Branch'
    }
    DateIssued = dateFormat(DateIssued, "dd-mm-yyyy, h:MM:ss TT");
    ExpireDate = dateFormat(ExpireDate, "dd-mm-yyyy, h:MM:ss TT");

      if(ApplicationStatusId == 1){
        ApplicationStatusId = 'Processing'
      }if(ApplicationStatusId == 2){
        ApplicationStatusId = 'Final decision'
      }if(ApplicationStatusId == 3){
        ApplicationStatusId = 'Supplement for data and attachment'
      }if(ApplicationStatusId == 4){
        ApplicationStatusId = 'Returned to BRELA for Processing'
      }if(ApplicationStatusId == 5){
        ApplicationStatusId = 'Completed'
      }if(ApplicationStatusId == 6){
        ApplicationStatusId = 'Rejected'
      }if(ApplicationStatusId == 7){
        ApplicationStatusId = 'Pending'
      }if(ApplicationStatusId == 8){
        ApplicationStatusId = 'Payment'
      }if(ApplicationStatusId == 9){
        ApplicationStatusId = 'Licence Issuing'
      }if(ApplicationStatusId == 10){
        ApplicationStatusId = 'Suplement for attachment only'
      }if(ApplicationStatusId == 11){
        ApplicationStatusId = 'Returned for Processing from Desion'
      }if(ApplicationStatusId == 12){
        ApplicationStatusId = 'Waiting for Application to be paid'
      }

      if(ServiceCode == 4201){
        ServiceCode = 'New Application for Business Licence'
      }if(ServiceCode == 4202){
        ServiceCode = 'Transfer Business Licence'
      }if(ServiceCode == 4203){
        ServiceCode = 'Application for Branch Business Licence'
      }if(ServiceCode == 4204){
        ServiceCode = 'Cancel Business Licence'
      }


      if(ApplicationStep == 1){
        ApplicationStep = 'Processing'
      }if(ApplicationStep == 2){
        ApplicationStep = 'Decision'
      }if(ApplicationStep == 3){
        ApplicationStep = 'Licence approving'
      }if(ApplicationStep == 4){
        ApplicationStep = 'Licence Payment'
      }if(ApplicationStep == 5){
        ApplicationStep = 'Licence issuing'
      }if(ApplicationStep == 6){
        ApplicationStep = 'Completed'
      }if(ApplicationStep == 7){
        ApplicationStep = 'Supplement'
      }
      objs12.push({"EntityName": EntityName, "LicenceStatusId": LicenceStatusId, "IsSentRegistry": IsSentRegistry, "ServiceCode": ServiceCode, 
      "IsBranch": IsBranch, "BLNumber": BLNumber, "request_id": request_id, "trackingNo": trackingNo, "expireDate": ExpireDate, 
      "dateIssued": DateIssued, "status": status, "businessTypeName": businessTypeName, "paymentStatus": PaymentStatus,
       "ApplicationStatusId": ApplicationStatusId, "ApplicationStep": ApplicationStep, "BusinessClassId": BusinessClassId, "FeePaid": FeePaid.toLocaleString('en-US')})
    //  }

  //  });
    }
    //console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/ComplLicCan', async function(req, res) {
  var objs12 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyLicLinkCan,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + " ComplLicCan fail to load " + error)
      res.send("failed")
    }
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var ExpireDate = jsonData[i].ExpireDate;
    var DateIssued = jsonData[i].DateIssued;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    var PaymentStatus = jsonData[i].PaymentStatus;
    var ApplicationStatusId = jsonData[i].ApplicationStatusId;
    var ApplicationStep = jsonData[i].ApplicationStageId;
    var BLNumber = jsonData[i].BLNumber;
    var IsBranch = jsonData[i].IsBranch;
    var BusinessClassId = jsonData[i].BusinessClassId;
    var FeePaid = jsonData[i].FeePaid;
    var ServiceCode = jsonData[i].ServiceCode;
    var IsSentRegistry = jsonData[i].IsSentRegistry;
    var LicenceStatusId = jsonData[i].LicenceStatusId;
    var EntityName = jsonData[i].EntityName;

    if(BusinessClassId == 1){
      BusinessClassId = 'Class A'
    }if(BusinessClassId == 2){
      BusinessClassId = 'Class B'
    }

    if(LicenceStatusId == 1){
      LicenceStatusId = 'Active'
    }if(LicenceStatusId == 6){
      LicenceStatusId = 'Cancelled'
    }if(LicenceStatusId == 2){
      LicenceStatusId = 'Expired'
    }if(LicenceStatusId == 7){
      LicenceStatusId = 'Expired '
    }
    if(IsSentRegistry){
      IsSentRegistry == 1;
    }if(!IsSentRegistry){
      IsSentRegistry == 0;
    }

    if(BLNumber == null){
      BLNumber = ' - '
    }
    if(IsBranch == 0){
      IsBranch = 'Principal'
    }
    if(IsBranch == 1){
      IsBranch = 'Branch'
    }
    DateIssued = dateFormat(DateIssued, "dd-mm-yyyy, h:MM:ss TT");
    ExpireDate = dateFormat(ExpireDate, "dd-mm-yyyy, h:MM:ss TT");

      if(ApplicationStatusId == 1){
        ApplicationStatusId = 'Processing'
      }if(ApplicationStatusId == 2){
        ApplicationStatusId = 'Final decision'
      }if(ApplicationStatusId == 3){
        ApplicationStatusId = 'Supplement for data and attachment'
      }if(ApplicationStatusId == 4){
        ApplicationStatusId = 'Returned to BRELA for Processing'
      }if(ApplicationStatusId == 5){
        ApplicationStatusId = 'Completed'
      }if(ApplicationStatusId == 6){
        ApplicationStatusId = 'Rejected'
      }if(ApplicationStatusId == 7){
        ApplicationStatusId = 'Pending'
      }if(ApplicationStatusId == 8){
        ApplicationStatusId = 'Payment'
      }if(ApplicationStatusId == 9){
        ApplicationStatusId = 'Licence Issuing'
      }if(ApplicationStatusId == 10){
        ApplicationStatusId = 'Suplement for attachment only'
      }if(ApplicationStatusId == 11){
        ApplicationStatusId = 'Returned for Processing from Desion'
      }if(ApplicationStatusId == 12){
        ApplicationStatusId = 'Waiting for Application to be paid'
      }

      if(ServiceCode == 4201){
        ServiceCode = 'New Application for Business Licence'
      }if(ServiceCode == 4202){
        ServiceCode = 'Transfer Business Licence'
      }if(ServiceCode == 4203){
        ServiceCode = 'Application for Branch Business Licence'
      }if(ServiceCode == 4204){
        ServiceCode = 'Cancel Business Licence'
      }


      if(ApplicationStep == 1){
        ApplicationStep = 'Processing'
      }if(ApplicationStep == 2){
        ApplicationStep = 'Decision'
      }if(ApplicationStep == 3){
        ApplicationStep = 'Licence approving'
      }if(ApplicationStep == 4){
        ApplicationStep = 'Licence Payment'
      }if(ApplicationStep == 5){
        ApplicationStep = 'Licence issuing'
      }if(ApplicationStep == 6){
        ApplicationStep = 'Completed'
      }if(ApplicationStep == 7){
        ApplicationStep = 'Supplement'
      }
      objs12.push({"EntityName": EntityName, "LicenceStatusId": LicenceStatusId, "IsSentRegistry": IsSentRegistry, "ServiceCode": ServiceCode, 
      "IsBranch": IsBranch, "BLNumber": BLNumber, "request_id": request_id, "trackingNo": trackingNo, "expireDate": ExpireDate, 
      "dateIssued": DateIssued, "status": status, "businessTypeName": businessTypeName, "paymentStatus": PaymentStatus,
       "ApplicationStatusId": ApplicationStatusId, "ApplicationStep": ApplicationStep, "BusinessClassId": BusinessClassId, "FeePaid": FeePaid.toLocaleString('en-US')})
    //  }

  //  });
    }
    //console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/ComplLicEx', async function(req, res) {
  var objs12 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyLicLinkEx,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + " ComplLicEx fail to load " + error)
      res.send("failed")
    }
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var ExpireDate = jsonData[i].ExpireDate;
    var DateIssued = jsonData[i].DateIssued;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    var PaymentStatus = jsonData[i].PaymentStatus;
    var ApplicationStatusId = jsonData[i].ApplicationStatusId;
    var ApplicationStep = jsonData[i].ApplicationStageId;
    var BLNumber = jsonData[i].BLNumber;
    var IsBranch = jsonData[i].IsBranch;
    var BusinessClassId = jsonData[i].BusinessClassId;
    var FeePaid = jsonData[i].FeePaid;
    var ServiceCode = jsonData[i].ServiceCode;
    var IsSentRegistry = jsonData[i].IsSentRegistry;
    var LicenceStatusId = jsonData[i].LicenceStatusId;
    var EntityName = jsonData[i].EntityName;

    if(BusinessClassId == 1){
      BusinessClassId = 'Class A'
    }if(BusinessClassId == 2){
      BusinessClassId = 'Class B'
    }

    if(LicenceStatusId == 1){
      LicenceStatusId = 'Active'
    }if(LicenceStatusId == 6){
      LicenceStatusId = 'Cancelled'
    }if(LicenceStatusId == 2){
      LicenceStatusId = 'Expired'
    }if(LicenceStatusId == 7){
      LicenceStatusId = 'Expired '
    }
    if(IsSentRegistry){
      IsSentRegistry == 1;
    }if(!IsSentRegistry){
      IsSentRegistry == 0;
    }

    if(BLNumber == null){
      BLNumber = ' - '
    }
    if(IsBranch == 0){
      IsBranch = 'Principal'
    }
    if(IsBranch == 1){
      IsBranch = 'Branch'
    }
    DateIssued = dateFormat(DateIssued, "dd-mm-yyyy, h:MM:ss TT");
    ExpireDate = dateFormat(ExpireDate, "dd-mm-yyyy, h:MM:ss TT");

      if(ApplicationStatusId == 1){
        ApplicationStatusId = 'Processing'
      }if(ApplicationStatusId == 2){
        ApplicationStatusId = 'Final decision'
      }if(ApplicationStatusId == 3){
        ApplicationStatusId = 'Supplement for data and attachment'
      }if(ApplicationStatusId == 4){
        ApplicationStatusId = 'Returned to BRELA for Processing'
      }if(ApplicationStatusId == 5){
        ApplicationStatusId = 'Completed'
      }if(ApplicationStatusId == 6){
        ApplicationStatusId = 'Rejected'
      }if(ApplicationStatusId == 7){
        ApplicationStatusId = 'Pending'
      }if(ApplicationStatusId == 8){
        ApplicationStatusId = 'Payment'
      }if(ApplicationStatusId == 9){
        ApplicationStatusId = 'Licence Issuing'
      }if(ApplicationStatusId == 10){
        ApplicationStatusId = 'Suplement for attachment only'
      }if(ApplicationStatusId == 11){
        ApplicationStatusId = 'Returned for Processing from Desion'
      }if(ApplicationStatusId == 12){
        ApplicationStatusId = 'Waiting for Application to be paid'
      }

      if(ServiceCode == 4201){
        ServiceCode = 'New Application for Business Licence'
      }if(ServiceCode == 4202){
        ServiceCode = 'Transfer Business Licence'
      }if(ServiceCode == 4203){
        ServiceCode = 'Application for Branch Business Licence'
      }if(ServiceCode == 4204){
        ServiceCode = 'Cancel Business Licence'
      }


      if(ApplicationStep == 1){
        ApplicationStep = 'Processing'
      }if(ApplicationStep == 2){
        ApplicationStep = 'Decision'
      }if(ApplicationStep == 3){
        ApplicationStep = 'Licence approving'
      }if(ApplicationStep == 4){
        ApplicationStep = 'Licence Payment'
      }if(ApplicationStep == 5){
        ApplicationStep = 'Licence issuing'
      }if(ApplicationStep == 6){
        ApplicationStep = 'Completed'
      }if(ApplicationStep == 7){
        ApplicationStep = 'Supplement'
      }
      objs12.push({"EntityName": EntityName, "LicenceStatusId": LicenceStatusId, "IsSentRegistry": IsSentRegistry, "ServiceCode": ServiceCode, 
      "IsBranch": IsBranch, "BLNumber": BLNumber, "request_id": request_id, "trackingNo": trackingNo, "expireDate": ExpireDate, 
      "dateIssued": DateIssued, "status": status, "businessTypeName": businessTypeName, "paymentStatus": PaymentStatus,
       "ApplicationStatusId": ApplicationStatusId, "ApplicationStep": ApplicationStep, "BusinessClassId": BusinessClassId, "FeePaid": FeePaid.toLocaleString('en-US')})
    //  }

  //  });
    }
    //console.log(objs12)
    res.send(objs12)
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
})

app.get('/POnGoingApp', async function(req, res) {
  var objs121 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyApplicationLinkP,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) {
      console.log(new Date() + " POnGoingApp fail to load " + error)
      res.send("failed")
    }
    //var jsonData = JSON.parse(response.body);
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
  //  console.log("Id =" + jsonData[i].Id);
    var request_id = jsonData[i].Id;
    var trackingNo = jsonData[i].TrackingNo;
    var submittedDate = jsonData[i].SubmittedDate;
    var createdDate = jsonData[i].CreatedDate;
    var status = jsonData[i].Name;
    var businessTypeName = jsonData[i].BusinessTypeName;
    createdDate = dateFormat(createdDate, "dd-mm-yyyy, h:MM:ss TT");
    objs121.push({"request_id": request_id, "trackingNo": trackingNo, "submittedDate": submittedDate, "createdDate": createdDate, "status": status, "businessTypeName": businessTypeName})
    }
    res.send(objs121)
  });
}else{
  res.redirect('/');
}
})

app.get('/MyLicence',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
    console.log(req.session.username)
    res.render(path.join(__dirname+'/public/ors/my_licences'), {"username": req.session.username});
  }else{
    res.redirect('/');
  }
});

app.get('/ExpiredLicence',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
    res.render(path.join(__dirname+'/public/ors/ex_licences'));
  }else{
    res.redirect('/');
  }
});

app.get('/CancelledLicence',function(req,res){
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
    res.render(path.join(__dirname+'/public/ors/canceld_licences'));
  }else{
    res.redirect('/');
  }
});

app.get('/MyLic', async function(req, res) {
  var objs12 = [];
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: GetMyLicLink,
    method: 'POST',
    json: {userId: userId},
  }, function(error, response, body){
    if(error) res.send("failed")
    //var jsonData = JSON.parse(response.body);
    var jsonData = response.body;
    for(var i = 0; i < jsonData.length; i++){
    console.log("Id =" + jsonData[i].BLNumber);
    var bLNumber = jsonData[i].BLNumber;
    var IsBranch = jsonData[i].IsBranch;
    var BusinessName = jsonData[i].BusinessName;
    var BusinessLicenceApplicationId = jsonData[i].BusinessLicenceApplicationId;
    var PoBox = jsonData[i].PoBox;
    var LicenceStatusId = jsonData[i].LicenceStatusId;

    var ExpireDate = jsonData[i].ExpireDate;
    var FeePaid = jsonData[i].FeePaid;
    var isSentToRegistry = jsonData[i].isSentToRegistry;
    var Activated = jsonData[i].Activated;
    var isApproved = jsonData[i].isApproved;
    var DateIssued = jsonData[i].DateIssued;
    DateIssued = dateFormat(DateIssued, "dd, mm yyyy");
    objs12.push({"DateIssued": DateIssued, "isApproved": isApproved, "bLNumber": bLNumber, "IsBranch": IsBranch, "BusinessName": BusinessName, "BusinessLicenceApplicationId": BusinessLicenceApplicationId, "PoBox": PoBox, "LicenceStatusId": LicenceStatusId, "ExpireDate": ExpireDate, "FeePaid": FeePaid, "isSentToRegistry": isSentToRegistry, "Activated": Activated})
    }
    console.log(new Date() + ": List of Licence retrieve")
    res.send(objs12)
  });
}else{
  // //console.log(loginTrial)
   res.redirect('/');
 }
})

app.get('/logout',function(req,res){
  console.log(new Date() + ": Successful logout")
  res.redirect('/');
});

app.post('/auth',function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  // if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
      url: loginAPI,
      method: 'POST',
      json: {Email: username, password: password}
    }, function(error, response, body){
      if(error) {
        console.log(new Date() + ": fail to login " + error)
        res.send("failed")
      }
      if (body !== undefined) {
        //console.log(body)
        var message = body.message;
        var userID = body.id;
        var token = body.token;
        var resultcode = body.resultcode;
        var refreshToken = body.refreshToken;
        if(resultcode == "0"){
          req.session.loggedin = true;
          req.session.userID = userID;
          req.session.token = token;
          req.session.username = username;
          console.log(new Date() + ": Successful login")
          res.redirect('/Dashboard');
  
        }else{
          res.redirect('/');
        }
      }else{
        // //console.log(loginTrial)
         res.redirect('/');
       }
    });
  // }else{
  //    res.redirect('/');
  //  }
});

app.post('/upload',function(req,res){
    //Create an instance of the form object
    let form = new formidable.IncomingForm();
    if(typeof req.session.userID !== "undefined" || req.session.userID === true){
    //Process the file upload in Node
    form.parse(req, function (error, fields, file) {
      let filepath = file.fileupload.filepath;
      let categoryID = fields.categoryID;
      let trackNo = fields.trackNo;
      let uploadType = fields.uploadType;
      let newpath = __dirname + '/storage/';
      // let newpath = '41.59.225.60/var/mwox/BrelaAPI/storage/';
      newpath += file.fileupload.originalFilename;

      //Copy the uploaded file to a custom folder
      fs.rename(filepath, newpath, function () {
        //Send a NodeJS file upload confirmation message
        request({
          url: AttachFiles,
          method: 'POST',
          json: {newpath: newpath, categoryID: categoryID, trackNo: trackNo, uploadType: uploadType}
        }, function(error, response, body){
          if(error) {
            res.send("failed")
          }
          if (body !== undefined) {
  
          }else{
            res.send("failed")
          }
        });

        res.write('NodeJS File Upload Success!');
        res.end();
      });
    });
  }else{
    // //console.log(loginTrial)
     res.redirect('/');
   }
});

app.get('/Settings', async function(req, res) {
  res.render(path.join(__dirname+'/public/ors/my_settings'));
})



//API Connection

// config for your database
// var config = {
//   user: 'frontendApiUser',
//   password: '@#ORS2o2o',
//   server: '10.22.33.7', 
//   database: 'BRELADB',
//   options: {
//       encrypt: false,
//       trustServerCertificate: true,
//   } 
// };

// var configBL = {
//   user: 'frontendApiUser',
//   password: '@#ORS2o2o',
//   server: '10.22.33.7', 
//   database: 'BL-DB',
//   options: {
//       encrypt: false,
//       trustServerCertificate: true,
//   } 
// };

// var configUser = {
//   user: 'frontendApiUser',
//   password: '@#ORS2o2o',
//   server: '10.22.33.7', 
//   database: 'USER-MANAGEMENT-DB',
//   options: {
//       encrypt: false,
//       trustServerCertificate: true,
//   } 
// };

// var configBill = {
//   user: 'frontendApiUser',
//   password: '@#ORS2o2o',
//   server: '10.22.33.7', 
//   database: 'ORS-BILLINGDB',
//   options: {
//       encrypt: false,
//       trustServerCertificate: true,
//   } 
// };


var config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // server: '41.59.225.45', 
  server: process.env.IP_SERVER,
  database: process.env.DB_BRELADB,
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

var configBL = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // server: '41.59.225.45', 
  server: process.env.IP_SERVER, 
  database: process.env.DB_BL,
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

var configUser = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // server: '41.59.225.45', 
  server: process.env.IP_SERVER,
  database: process.env.DB_USER_MANAGER,
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

var configBill = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // server: '41.59.225.45', 
  server: process.env.IP_SERVER,
  database: process.env.DB_BILLING,
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

var configSearch = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // server: '41.59.225.45', 
  server: process.env.IP_SERVER,
  database: process.env.BD_SEARCH,
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

var configMaster = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // server: '41.59.225.45', 
  server: process.env.IP_SERVER,
  database: process.env.DB_MASTER,
  options: {
      encrypt: false,
      trustServerCertificate: true,
  } 
};

app.post('/MyApplication', async function(req, res) {
var objs12 = [];
var userId = req.body.userId;
sql.connect(configBL, function (err) {
  if (err) {
    console.log("fail to connect to server " + err);
   // sql.close();
    res.send({status: "failed"});
  }else{
    var request = new sql.Request();
    request.query('SELECT d.IsBranch as IsBranch, d.BLNumber as BLNumber, a.Id as Id, ' + 
    ' a.BusinessClassId as BusinessClassId, a.TrackingNo as TrackingNo, ' + 
    ' a.ServiceCode as ServiceCode, a.SubmittedDate as SubmittedDate, ' + 
    ' a.CreatedDate as CreatedDate, b.ApplicationStatusId as ApplicationStatusId, ' + 
    ' b.ApplicationStageId as ApplicationStageId, c.BusinessTypeName as BusinessTypeName, ' + 
    ' b.PaymentStatus as PaymentStatus, d.isSentToRegistry as IsSentRegistry ' + 
    ' FROM dbo.BusinessLicApplication as a, dbo.BLicenseApplicationTracker as b, ' + 
    ' dbo.BusinessTypes as c, dbo.BusinessLicenceDetails as d ' + 
    ' WHERE d.BusinessLicenceApplicationId = a.Id AND a.Id = b.ApplicationId ' + 
    ' AND c.BusinessTypeId = a.BusinessTypeId AND b.ApplicationStatusId NOT IN(5) ' + 
    ' AND d.isSentToRegistry NOT IN(1) AND b.ApplicationStageId NOT IN(6) ' + 
    ' AND CreatedByUserId = '+userId + ' ORDER BY a.Id DESC', 
    function (err, recordset) {
        if (err) {
          console.log(new Date() + " MyApplication fail to load " + err)
          res.send({status: "failed"})
        }else{
          var result_from = recordset.recordset;
          sql.close();
          res.send(result_from)
        }
    });
  }
});
})

app.get('/MyApplicationStage/:id', async function(req, res) {
  var objs12 = [];
  var trackingNo = req.params.id;
  console.log('trackingNo')
  console.log(trackingNo)
  sql.connect(configBL, function (err) {
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{
      var request = new sql.Request();
      request.input('trackngNo', trackingNo);
      request.query('SELECT d.IsBranch as IsBranch, d.BLNumber as BLNumber, a.Id as Id, ' + 
      ' a.BusinessClassId as BusinessClassId, a.TrackingNo as TrackingNo, ' + 
      ' a.ServiceCode as ServiceCode, a.SubmittedDate as SubmittedDate, ' + 
      ' a.CreatedDate as CreatedDate, b.ApplicationStatusId as ApplicationStatusId, ' + 
      ' b.ApplicationStageId as ApplicationStageId, c.BusinessTypeName as BusinessTypeName, ' + 
      ' b.PaymentStatus as PaymentStatus, d.isSentToRegistry as IsSentRegistry ' + 
      ' FROM dbo.BusinessLicApplication as a, dbo.BLicenseApplicationTracker as b, ' + 
      ' dbo.BusinessTypes as c, dbo.BusinessLicenceDetails as d ' + 
      ' WHERE d.BusinessLicenceApplicationId = a.Id AND a.TrackingNo = @trackngNo AND a.Id = b.ApplicationId ' + 
      ' AND c.BusinessTypeId = a.BusinessTypeId AND b.ApplicationStatusId NOT IN(5) ' + 
      ' AND d.isSentToRegistry NOT IN(1) AND b.ApplicationStageId NOT IN(6)', 
      function (err, recordset) {
          if (err) {
            console.log(new Date() + " MyApplication fail to load " + err)
            res.send({status: "failed"})
          }else{
            var result_from = recordset.recordset;
            sql.close();
            console.log('result_from')
            console.log(result_from)
            res.send(result_from)
          }
      });
    }
  });
  })

app.post('/MyLic', async function(req, res) {
  var objs12 = [];
  var userId = req.body.userId;
  sql.connect(configBL, function (err) {
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }
    var request = new sql.Request();
    request.query('SELECT d.FeePaid as FeePaid, a.BusinessClassId as BusinessClassId, ' + 
    ' a.EntityName as EntityName, d.LicenceStatusId as LicenceStatusId, ' + 
    ' d.IsBranch as IsBranch, d.BLNumber as BLNumber, a.Id as Id, ' + 
    ' a.TrackingNo as TrackingNo, a.ServiceCode as ServiceCode, ' + 
    ' d.ExpireDate as ExpireDate, d.DateIssued as DateIssued, ' + 
    ' b.ApplicationStatusId as ApplicationStatusId, b.ApplicationStageId as ApplicationStageId, ' + 
    ' c.BusinessTypeName as BusinessTypeName, b.PaymentStatus as PaymentStatus, ' + 
    ' d.isSentToRegistry as IsSentRegistry FROM dbo.BusinessLicApplication as a, ' + 
    ' dbo.BLicenseApplicationTracker as b, dbo.BusinessTypes as c, dbo.BusinessLicenceDetails as d ' + 
    ' WHERE d.BusinessLicenceApplicationId = a.Id AND a.Id = b.ApplicationId ' + 
    ' AND c.BusinessTypeId = a.BusinessTypeId AND b.ApplicationStatusId = 5 ' + 
    ' AND d.LicenceStatusId IN (1) AND d.isSentToRegistry = 1 AND b.ApplicationStageId = 6 ' + 
    ' AND a.CreatedByUserId = ' + userId + ' ORDER BY a.Id DESC', 
    function (err, recordset) {
  
      if (err) {
        console.log(new Date() + " MyLic fail to load " + err)
        res.send({status: "failed"})
      }else{
        var result_from = recordset.recordset;
        sql.close();
        res.send(result_from)
      }
    });
  });
})

app.post('/MyLicCan', async function(req, res) {
  var objs12 = [];
  var userId = req.body.userId;
  sql.connect(configBL, function (err) {
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }
    var request = new sql.Request();
    request.query('SELECT d.FeePaid as FeePaid, a.BusinessClassId as BusinessClassId, a.EntityName as EntityName, d.LicenceStatusId as LicenceStatusId, d.IsBranch as IsBranch, d.BLNumber as BLNumber, a.Id as Id, a.TrackingNo as TrackingNo, a.ServiceCode as ServiceCode, d.ExpireDate as ExpireDate, d.DateIssued as DateIssued, b.ApplicationStatusId as ApplicationStatusId, b.ApplicationStageId as ApplicationStageId, c.BusinessTypeName as BusinessTypeName, b.PaymentStatus as PaymentStatus, d.isSentToRegistry as IsSentRegistry FROM dbo.BusinessLicApplication as a, dbo.BLicenseApplicationTracker as b, dbo.BusinessTypes as c, dbo.BusinessLicenceDetails as d WHERE d.BusinessLicenceApplicationId = a.Id AND a.Id = b.ApplicationId AND c.BusinessTypeId = a.BusinessTypeId AND b.ApplicationStatusId = 5 AND d.LicenceStatusId NOT IN (1,2,3) AND d.isSentToRegistry = 1 AND b.ApplicationStageId = 6 AND a.CreatedByUserId = '+userId + ' ORDER BY a.Id DESC', 
    function (err, recordset) {
  
      if (err) {          console.log("fail to MyLicCan " + err);
          //sql.close();
          res.send({status: "failed"});}
      var result_from = recordset.recordset;
      sql.close();
      res.send(result_from)
    });
  });
})

app.post('/ExLic', async function(req, res) {
  var objs12 = [];
  var userId = req.body.userId;
  sql.connect(configBL, function (err) {
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }
    var request = new sql.Request();
    request.query('SELECT d.FeePaid as FeePaid, a.BusinessClassId as BusinessClassId, a.EntityName as EntityName, d.LicenceStatusId as LicenceStatusId, d.IsBranch as IsBranch, d.BLNumber as BLNumber, a.Id as Id, a.TrackingNo as TrackingNo, a.ServiceCode as ServiceCode, d.ExpireDate as ExpireDate, d.DateIssued as DateIssued, b.ApplicationStatusId as ApplicationStatusId, b.ApplicationStageId as ApplicationStageId, c.BusinessTypeName as BusinessTypeName, b.PaymentStatus as PaymentStatus, d.isSentToRegistry as IsSentRegistry FROM dbo.BusinessLicApplication as a, dbo.BLicenseApplicationTracker as b, dbo.BusinessTypes as c, dbo.BusinessLicenceDetails as d WHERE d.BusinessLicenceApplicationId = a.Id AND a.Id = b.ApplicationId AND c.BusinessTypeId = a.BusinessTypeId AND b.ApplicationStatusId = 5 AND d.LicenceStatusId IN (2) AND d.isSentToRegistry = 1 AND b.ApplicationStageId = 6 AND a.CreatedByUserId = '+userId + ' ORDER BY a.Id DESC', 
    function (err, recordset) {
  
      if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
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
  if (err) {
    console.log("fail to connect to server " + err);
    // sql.close();
    res.send({status: "failed"});
  }
  var request = new sql.Request();
  request.query('SELECT Id, TrackingNo, CreatedDate ' + 
  ' FROM dbo.BusinessLicApplication ' + 
  ' WHERE SubmittedDate IS NULL AND CreatedByUserId = '+userId+
  ' ORDER BY CreatedDate DESC', 
function (err, recordset) {

      if (err) {          
        console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
          var result_from = recordset.recordset;
          sql.close();
          res.send(recordset.recordset)
        }
        // res.render(path.join(__dirname+'/public/ors/my_application'), {"myapplication": objs12});
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

  if (err) {
    console.log("fail to connect to server " + err);
    //sql.close();
    res.send({status: "failed"});
  }else{

    // create Request object
    var request = new sql.Request();
    request.input('trackngNo', trackngNo);
    request.input('userId', userId);
    request.input('submitDet', new Date());
    request.query(`INSERT INTO dbo.BusinessLicApplication (TrackingNo, CreatedByUserId, ApplicationStep, BusinessTypeId, BusinessLicOwnerTypeId, ApplicationStatusId, ApplicationTypeId, CreatedDate, ServiceCode) values (@trackngNo, @userId, 2, 0, 0, 1, 1, @submitDet, 4201)`, 
    function (err, recordset) {
        if (err) {          
          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
        
         sql.close();
        // send records as a response
        console.log(recordset)
        res.send("sucess");
        }

    });
  }
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

  if (err) {
    console.log("fail to connect to server " + err);
    //sql.close();
    res.send({status: "failed"});
  }
    var request1 = new sql.Request();
    request1.input('BLNo', BLNo);
    request1.query('SELECT Id, BusinessTypeId, BusinessLicOwnerTypeId, ApplicationTin, NumberOfUnits, BusinessClassId FROM dbo.BusinessLicApplication WHERE TrackingNo = @BLNo', 
    function (err, recordset) {
    if (err) {          
      console.log("fail to Save_EntityOwner_SP " + err);
         sql.close();
          res.send({status: "failed"});
        }else{
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
        if (err) {          
          console.log("fail to Save_EntityOwner_SP " + err);
         sql.close();
          res.send({status: "failed"});
        }else{
        
         sql.close();
        // send records as a response
       // console.log(recordset)
        res.send("sucess");
        }
    });
  }
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

  if (err) {
    console.log("fail to connect to server " + err);
    //sql.close();
    res.send({status: "failed"});
  }

    var request1 = new sql.Request();
    request1.query('SELECT max(Id) as Id FROM dbo.tblAddress', function (err, recordset) {
      if (err) {          console.log("fail to recordAddressInfo " + err);
         // sql.close();
          res.send({status: "failed"});}
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
        if (err) {          console.log("fail to recordAddressInfo " + err);
         // sql.close();
          res.send({status: "failed"});}
         sql.close();
        // send records as a response
        res.send({"sucess": "success"});

    });
    
  });



});
});

app.post('/saveStageTwo', function (req, res) {
  // console.log(req.body)
  var trackngNo = req.body.trackngNo;
  var userId = req.body.userId;
  var BizOwnerType = req.body.BizOwnerType;
  var NoUnit = req.body.NoUnit;
  var inco_no = req.body.inco_no;
  var company_name = req.body.company_name;
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
  var bn_no = req.body.bn_no;
  var bn_name = req.body.bn_name;
  var fullname = req.body.fullname;
  var reg_no_other = req.body.reg_no_other;
  var corporate_name = req.body.corporate_name;
  
  sql.connect(configBL, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }
  

    var request1 = new sql.Request();
    request1.input('trackngNo', trackngNo);
    request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err1, recordset) {
      if (err1) {          
        console.log("fail to BusinessLicApplication " + err1);
         // sql.close();
          res.send({status: "failed"});
        }
      var result_form = recordset.recordset;
      var Id = result_form[0].Id;
      req.session.req_id = Id;
      if(BizOwnerType == 1){
        var request = new sql.Request();
        request.input('userId', userId);
        request.input('BizOwnerType', BizOwnerType);
        request.input('NoUnit', NoUnit);
        request.input('fullname', fullname);
        request.input('BizTin', BizTin);
        request.input('TaxPayer', TaxPayer);
        request.input('trackngNo', trackngNo);
        request.input('TypeList', TypeList);
        request.input('nida_no', nida_no);
        request.input('businessLicenceClassId', businessLicenceClassId);
        request.input('ServiceCode', '4201');
        request.input('Subdet', new Date());
        request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, EntityName = @fullname, RegNo = @nida_no, BusinessTypeId = @TypeList, BusinessLicOwnerTypeId = @BizOwnerType, ApplicationTin = @BizTin, NumberOfUnits = @NoUnit, BusinessClassId = @businessLicenceClassId, ServiceCode = @ServiceCode WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
        function (err, recordset) {
            if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
            var request2 = new sql.Request();
                  request2.input('BusLicAppId', Id);
                  request2.input('inputEmail4comp', inputEmail4comp);
                  request2.input('BizTin', BizTin);
                  request2.input('inputEmail4phn', PhoneBuz);
                  request2.input('inputEmail4pobox', inputEmail4pobox);
                  request2.input('issuingAuthorityId', issuingAuthorityId);
                  request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, 
                    BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated) 
                    VALUES (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, 
                      @inputEmail4pobox, 0, @issuingAuthorityId, 5, 0)`, function (err, recordset) {
                      if (err) {          
                        console.log("fail to get BusinessLicApplication " + err);
                        //sql.close();
                        res.send({status: "failed"});
                      }
      
      
                      var request3 = new sql.Request();
                            request3.input('ApplicationId', Id);
                            request3.input('ServiceCode', '4201');
                            request3.input('ApplicationStatusId', '1');
                            request3.input('userId', userId);
                            request3.input('CreatedDate', new Date());
                            request3.input('ApplicationStageId', '3');
                            request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                            function (err, recordset) {
                                if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});}               
      
                                var request4 = new sql.Request();
                                request4.input('BusLicAppId', Id);
                                request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                                function (err, recordset) {
                                  if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          ////sql.close();
          res.send({status: "failed"});}
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
      }
      if(BizOwnerType == 3){
        var request = new sql.Request();
        request.input('userId', userId);
        request.input('BizOwnerType', BizOwnerType);
        request.input('NoUnit', NoUnit);
        request.input('reg_no_other', reg_no_other);
        request.input('corporate_name', corporate_name);
        request.input('BizTin', BizTin);
        request.input('TaxPayer', TaxPayer);
        request.input('trackngNo', trackngNo);
        request.input('TypeList', TypeList);
        request.input('businessLicenceClassId', businessLicenceClassId);
        request.input('ServiceCode', '4201');
        request.input('Subdet', new Date());
        request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, EntityName = @corporate_name, RegNo = @reg_no_other, BusinessTypeId = @TypeList, BusinessLicOwnerTypeId = @BizOwnerType, ApplicationTin = @BizTin, NumberOfUnits = @NoUnit, BusinessClassId = @businessLicenceClassId, ServiceCode = @ServiceCode, SubmittedDate = @Subdet WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
        function (err, recordset) {
            if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
        //  sql.close();
          res.send({status: "failed"});}
            var request2 = new sql.Request();
                  request2.input('BusLicAppId', Id);
                  request2.input('inputEmail4comp', inputEmail4comp);
                  request2.input('BizTin', BizTin);
                  request2.input('inputEmail4phn', PhoneBuz);
                  request2.input('inputEmail4pobox', inputEmail4pobox);
                  request2.input('issuingAuthorityId', issuingAuthorityId);
                  request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, 0, @issuingAuthorityId, 5, 0)`, function (err, recordset) {
                      if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
      
      
                      var request3 = new sql.Request();
                            request3.input('ApplicationId', Id);
                            request3.input('ServiceCode', '4201');
                            request3.input('ApplicationStatusId', '1');
                            request3.input('userId', userId);
                            request3.input('CreatedDate', new Date());
                            request3.input('ApplicationStageId', '3');
                            request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                            function (err, recordset) {
                                if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});}               
      
                                var request4 = new sql.Request();
                                request4.input('BusLicAppId', Id);
                                request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                                function (err, recordset) {
                                  if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
        //  sql.close();
          res.send({status: "failed"});}
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
      }
      if(BizOwnerType == 2){
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
        request.input('RegNo', inco_no);
        request.input('EntityName', company_name);
        request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, BusinessTypeId = @TypeList, BusinessLicOwnerTypeId = @BizOwnerType, ApplicationTin = @BizTin, NumberOfUnits = @NoUnit, BusinessClassId = @businessLicenceClassId, ServiceCode = @ServiceCode, SubmittedDate = @Subdet, RegNo = @RegNo, EntityName = @EntityName WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
        function (err, recordset) {
            if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});}
            var request2 = new sql.Request();
                  request2.input('BusLicAppId', Id);
                  request2.input('inputEmail4comp', inputEmail4comp);
                  request2.input('BizTin', BizTin);
                  request2.input('inputEmail4phn', PhoneBuz);
                  request2.input('inputEmail4pobox', inputEmail4pobox);
                  request2.input('issuingAuthorityId', issuingAuthorityId);
                  request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, 0, @issuingAuthorityId, 5, 0)`, function (err, recordset) {
                      if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
      
      
                      var request3 = new sql.Request();
                            request3.input('ApplicationId', Id);
                            request3.input('ServiceCode', '4201');
                            request3.input('ApplicationStatusId', '1');
                            request3.input('userId', userId);
                            request3.input('CreatedDate', new Date());
                            request3.input('ApplicationStageId', '3');
                            request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                            function (err, recordset) {
                                if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}               
      
                                var request4 = new sql.Request();
                                request4.input('BusLicAppId', Id);
                                request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                                function (err, recordset) {
                                  if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
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
      }
      if(BizOwnerType == 4){
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
        request.input('RegNo', bn_no);
        request.input('EntityName', bn_name);
        request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, BusinessTypeId = @TypeList, BusinessLicOwnerTypeId = @BizOwnerType, ApplicationTin = @BizTin, NumberOfUnits = @NoUnit, BusinessClassId = @businessLicenceClassId, ServiceCode = @ServiceCode, SubmittedDate = @Subdet, RegNo = @RegNo, EntityName = @EntityName WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
        function (err, recordset) {
            if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
            var request2 = new sql.Request();
                  request2.input('BusLicAppId', Id);
                  request2.input('inputEmail4comp', inputEmail4comp);
                  request2.input('BizTin', BizTin);
                  request2.input('inputEmail4phn', PhoneBuz);
                  request2.input('inputEmail4pobox', inputEmail4pobox);
                  request2.input('issuingAuthorityId', issuingAuthorityId);
                  request2.query(`INSERT INTO dbo.BusinessLicenceDetails (BusinessLicenceApplicationId, BusinessTIN, Email, PhoneNo, PoBox, IsBranch, IssueingOfficeId, LicenceStatusId, Activated) values (@BusLicAppId, @BizTin, @inputEmail4comp, @inputEmail4phn, @inputEmail4pobox, 0, @issuingAuthorityId, 5, 0)`, function (err, recordset) {
                      if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
      
      
                      var request3 = new sql.Request();
                            request3.input('ApplicationId', Id);
                            request3.input('ServiceCode', '4201');
                            request3.input('ApplicationStatusId', '1');
                            request3.input('userId', userId);
                            request3.input('CreatedDate', new Date());
                            request3.input('ApplicationStageId', '3');
                            request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                            function (err, recordset) {
                                if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}               
      
                                var request4 = new sql.Request();
                                request4.input('BusLicAppId', Id);
                                request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                                function (err, recordset) {
                                  if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
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
      }
  });
  });
  
  
  
});

app.get('/saveApplicationFinal',function(req,res){
  var trackngNo = req.session.TrackingNo;
  var userId = req.session.userID;
  if(typeof req.session.userID !== "undefined" || req.session.userID === true){
  request({
    url: submitApplicationLink,
    method: 'POST',
    json: {trackngNo: trackngNo, userId: userId},
  }, function(error, response, body){
    if(error) {
      console.log("fail to saveApplicationFinal " + error);
     // sql.close();
      res.send({status: "failed"});
    }
  console.log(response.body)
    var message = response.body;
    console.log("1=== " + message)
    if(message == 'data found'){
      request({
        url: submitFinalLink,
        method: 'POST',
        json: {trackngNo: trackngNo, userId: userId},
      }, function(error, response, body){
        if(error) {
          console.log("fail to saveApplicationFinal " + error);
          //sql.close();
          res.send({status: "failed"});
        }
        console.log(response.body)
        
  //       axios
  //         .get('http://41.59.225.60/api/bl-task')
  //         .then(res => {
  //         console.log(`statusCode: ${res.status}`);
  //         console.log(res);
  //      })
  // .catch(error => {
  //   console.error(error);
  // });

        res.send(response.body)
      });
    }else if(message != 'data found'){ 
      res.send(message)
    }
  });
}else{
  //console.log(loginTrial)
  res.redirect('/');
}
});

app.get('/crontabLink', function (req, res) {
  var request = http.request(optionsAlex, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        console.log(data);

    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();
  // res.redirect('http://41.59.225.60/api/bl-task');
})

app.post('/submitApplication', function (req, res) {
  console.log(req.body)
  var trackngNo = req.body.trackngNo;
  var userId = req.body.userId;
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }
    var request1 = new sql.Request();
    request1.input('trackngNo', trackngNo);
    request1.query('SELECT COUNT(*) as kaunti FROM dbo.tblAddress WHERE TrackingNo = @trackngNo', 
    function (err, recordset) {
      if (err) {          
        console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
      var result_form = recordset.recordset;
      var kaunti = result_form[0].kaunti;
      console.log("2222===22.... " + kaunti)
      if(kaunti <= 0){
        res.send("no office address data")
      }else{
        var request2 = new sql.Request();
        request2.input('trackngNo', trackngNo);
        request2.query('SELECT COUNT(*) as kaunti FROM dbo.tblEntityOwner WHERE TrackingNo = @trackngNo', 
        function (err, recordset) {
          if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
          var result_form = recordset.recordset;
          var kaunti = result_form[0].kaunti;
          console.log("4444===444.... " + kaunti)
          if(kaunti <= 0){
            res.send("no owners data")
          }else{
            sql.close();
            res.send("data found")
          }
    
      });
      }
    }
  });
  });
});

app.post('/submitFinal', function (req, res) {
  console.log(req.body)
  var trackngNo = req.body.trackngNo;
  var userId = req.body.userId;
  sql.connect(configBL, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }
    var request1 = new sql.Request();
    console.log("mark")
    request1.input('trackngNo', trackngNo);
    request1.query(`SELECT count(*) as kaunti FROM dbo.BusinessLicenceAttachments WHERE TrackingNo = @trackngNo`, 
    function (err, recordset) {
      if (err) {
        console.log("fail to submitFinal " + err);
       // sql.close();
        res.send({status: "failed"});
      }
      var result_form = recordset.recordset;
      var kaunti = result_form[0].kaunti;
      console.log("5555===555.... " + kaunti)
      if(kaunti <= 0){
        res.send("no attachments")
      }else{
        var request = new sql.Request();
        request.input('userId', userId);
        request.input('trackngNo', trackngNo);
        request.input('Subdet', new Date());
        request.query(`UPDATE dbo.BusinessLicApplication SET SubmittedDate = @Subdet 
        WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
        function (err, recordset) {
          if (err){
            console.log("fail to submitFinal " + err);
           // sql.close();
            res.send({status: "failed"});
          }
            sql.close();
            res.send("success")

        });
      }

      });
  });
  });

app.post('/updateStageTwo', function (req, res) {
  console.log(req.body)
  var trackngNo = req.body.trackngNo;
  var userId = req.body.userId;
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
  var pobox = req.body.pobox;
  var email = req.body.email;
  var phone_no = req.body.phone_no;
  
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      sql.close();
      res.send({status: "failed"});
    }else{
      var request55 = new sql.Request();
      request55.input('trackngNo', trackngNo);
      request55.input('addressAreaB', addressAreaB);
      request55.input('regionlistB', regionlistB);
      request55.input('districtlistB', districtlistB);
      request55.input('wardIdB', wardIdB);
      request55.input('street', street);
      request55.input('postcode', postcode);
      request55.input('road', road);
      request55.input('plot_no', plot_no);
      request55.input('block_no', block_no);
      request55.input('house_no', house_no);
      request55.input('unservayedarea', unservayedarea);
      request55.input('pobox', pobox);
      request55.input('phone_no', phone_no);
      request55.input('email', email);
      request55.query(`UPDATE tblAddress SET AreaTypeId = @addressAreaB, 
      WardId = @wardIdB, PostCode = @postcode, Street = @street, 
      Road = @road, PlotNo = @plot_no, BlockNo = @block_no, 
      RegionCode = @regionlistB, DistrictCode = @districtlistB,
      HouseNo = @house_no, UnsurveyedArea = @unservayedarea, 
      PoBox = @pobox, CompanyEmail = @email, CompanyPhone = @phone_no 
      WHERE TrackingNo = @trackngNo`, 
          function (err, recordset) {
              if (err) {
                console.log("fail to submitFinal " + err);
                sql.close();
                res.send({status: "failed"});
              } else{
                sql.close();
                res.send({status: "success"})
              }  
    });
  }
  });
  
  
  
});

app.post('/AddressRecord', function(req, res){
var trackngNo = req.body.trackngNo;
var userId = req.body.userId;
var BizOwnerType = req.body.BizOwnerType;
var NoUnit = req.body.NoUnit;
var inco_no = req.body.inco_no;
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
var bn_no = req.body.bn_no;
var subwardIdB = req.body.subwardIdB;


if(BizOwnerType == 1){
  sql.connect(config, function(err) {
    if (err) {
      console.log("fail to connect to server " + err);
      sql.close();
      res.send({status: "failed"});
    }
  
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
    .input('OriginTypeId', 1)
    .input('OwnerId', BizOwnerType)
    .execute('Save_Person_SP', function(err, recordsets, returnValue) {
        if(err) {
          console.log("fail to submitFinal " + err);
          //sql.close();
          res.send({status: "failed"});
        }
  
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
        .input('SUBWARD_ID', subwardIdB)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) {
              console.log("fail to Save_Address_SP " + err);
              //sql.close();
              res.send({status: "failed"});
            }
    
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
            .input('OwnerId', BizOwnerType)
            .input('SUBWARD_ID', subwardIdB)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) {
                  console.log("fail to Save_Address_SP " + err);
                  // sql.close();
                  res.send({status: "failed"});
                }

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
         if(err) {
          console.log("fail to Save_Address_SP " + err);
          // sql.close();
          res.send({status: "failed"});
         }

                sql.close();
                res.send("success")// your isTrue value
              });
              });
  
          });
  
        });
  });
}
if(BizOwnerType == 3){
  sql.connect(config, function(err) {
    if (err) {
      console.log("fail to connect to server " + err);
      // sql.close();
      res.send({status: "failed"});
    }
  
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
        if(err) {
          console.log("fail to Save_OtherCorporateBody_SP " + err);
          // sql.close();
          res.send({status: "failed"});
        }
  
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
        .input('IsOfficeAddress', 0)
        .input('CompanyEmail', inputEmail4comp)
        .input('CompanyPhone', PhoneBuz)
        .input('OwnerId', bustype)
        .input('SUBWARD_ID', subwardIdB)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) {
              console.log("fail to Save_Address_SP " + err);
              // sql.close();
              res.send({status: "failed"});
            }
    
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
            .input('SUBWARD_ID', subwardIdB)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) {
                  console.log("fail to Save_Address_SP " + err);
                  // sql.close();
                  res.send({status: "failed"});
                }

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
         if(err) {
          console.log("fail to Save_Address_SP " + err);
          // sql.close();
          res.send({status: "failed"});
         }

                sql.close();
                res.send("success")// your isTrue value
              });
              });
  
          });
  
        });
  });
}
if(BizOwnerType == 2){
  sql.connect(config, function(err) {
    if (err) {
      console.log("fail to connect to server " + err);
      // sql.close();
      res.send({status: "failed"});
    }

        new sql.Request()
        .input('AddressOwnerId', inco_no)
        .input('AddressOwnerTypeId', 3)
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
            if(err) {
              console.log("fail to Save_Address_SP " + err);
              // sql.close();
              res.send({status: "failed"});
            }
    
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
            .input('SUBWARD_ID', subwardIdB)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) {
                  console.log("fail to Save_Address_SP " + err);
                  // sql.close();
                  res.send({status: "failed"});
                }

     new sql.Request()
     .input('EntityTypeId', 3)
     .input('EntityId', BLdetailsId)
     .input('OwnerSubTypeId', BizOwnerType)
     .input('FrontUserId', userId)
     .input('TrackingNo', trackngNo)
     .input('CorporateName', '')
     .input('IsBankOperator', '')
     .input('CompanyTypeId','')
     .input('OwnerId', inco_no)
     .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
         if(err) {
          console.log("fail to Save_Address_SP " + err);
          // sql.close();
          res.send({status: "failed"});
         }

                sql.close();
                res.send("success")// your isTrue value
              });
              });
  
          });
  });
}
if(BizOwnerType == 4){
  sql.connect(config, function(err) {
    if (err) {
      console.log("fail to connect to server " + err);
      // sql.close();
      res.send({status: "failed"});
    }

        new sql.Request()
        .input('AddressOwnerId', bn_no)
        .input('AddressOwnerTypeId', 2)
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
        .input('SUBWARD_ID', subwardIdB)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) {
              console.log("fail to Save_Address_SP " + err);
              // sql.close();
              res.send({status: "failed"});
            }
    
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
                if(err) {
                  console.log("fail to Save_Address_SP " + err);
                  // sql.close();
                  res.send({status: "failed"});
                }

     new sql.Request()
     .input('EntityTypeId', 3)
     .input('EntityId', BLdetailsId)
     .input('OwnerSubTypeId', BizOwnerType)
     .input('FrontUserId', userId)
     .input('TrackingNo', trackngNo)
     .input('CorporateName', '')
     .input('IsBankOperator', '')
     .input('CompanyTypeId','')
     .input('OwnerId', bn_no)
     .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
         if(err) {
          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});
         }

                sql.close();
                res.send("success")// your isTrue value
              });
              });
  
          });
  });
}  
});

app.post('/updateAddressRecord', function(req, res){
  var trackngNo = req.body.trackngNo;
  var userId = req.body.userId;
  var BizOwnerType = req.body.BizOwnerType;
  var NoUnit = req.body.NoUnit;
  var inco_no = req.body.inco_no;
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
  
  var reg_no_other = req.body.reg_no_other;
  var corporate_name = req.body.corporate_name;
  var leadername_nat = req.body.leadername_nat;
  var leadername_nat_2 = req.body.leadername_nat_2;
  var bn_no = req.body.bn_no;
  
  
  if(BizOwnerType == 1){
    sql.connect(config, function(err) {
      if (err) {
        console.log("fail to connect to server " + err);
        // sql.close();
        res.send({status: "failed"});
      }
    
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
          if(err) {
            console.log("fail to Save_EntityOwner_SP " + err);
            // sql.close();
            res.send({status: "failed"});
          }
    
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
              if(err) {
                console.log("fail to Save_EntityOwner_SP " + err);
                // sql.close();
                res.send({status: "failed"});
              }
      
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
                  if(err) {
                    console.log("fail to Save_EntityOwner_SP " + err);
                    // sql.close();
                    res.send({status: "failed"});
                  }
  
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
           if(err) {
            console.log("fail to Save_EntityOwner_SP " + err);
            // sql.close();
            res.send({status: "failed"});
           }
  
                  sql.close();
                  res.send("success")// your isTrue value
                });
                });
    
            });
    
          });
    });
  }
  if(BizOwnerType == 3){
    sql.connect(config, function(err) {
      if(err) {
        console.log("fail to Save_EntityOwner_SP " + err);
        // sql.close();
        res.send({status: "failed"});
      }
    
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
          if(err) {
            console.log("fail to Save_EntityOwner_SP " + err);
            // sql.close();
            res.send({status: "failed"});
          }
    
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
              if(err) {
                console.log("fail to Save_EntityOwner_SP " + err);
                // sql.close();
                res.send({status: "failed"});
              }
      
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
                  if(err) {
                    console.log("fail to Save_EntityOwner_SP " + err);
                    // sql.close();
                    res.send({status: "failed"});
                  }
  
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
           if(err) {
            console.log("fail to Save_EntityOwner_SP " + err);
            // sql.close();
            res.send({status: "failed"});
           }
  
                  sql.close();
                  res.send("success")// your isTrue value
                });
                });
    
            });
    
          });
    });
  }
  if(BizOwnerType == 2){
    sql.connect(config, function(err) {
      if(err) {
        console.log("fail to Save_EntityOwner_SP " + err);
        // sql.close();
        res.send({status: "failed"});
      }
  
          new sql.Request()
          .input('AddressOwnerId', inco_no)
          .input('AddressOwnerTypeId', 3)
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
              if(err) {
                console.log("fail to Save_EntityOwner_SP " + err);
                // sql.close();
                res.send({status: "failed"});
              }
      
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
                  if(err) {
                    console.log("fail to Save_EntityOwner_SP " + err);
                    // sql.close();
                    res.send({status: "failed"});
                  }
  
       new sql.Request()
       .input('EntityTypeId', 3)
       .input('EntityId', BLdetailsId)
       .input('OwnerSubTypeId', BizOwnerType)
       .input('FrontUserId', userId)
       .input('TrackingNo', trackngNo)
       .input('CorporateName', '')
       .input('IsBankOperator', '')
       .input('CompanyTypeId','')
       .input('OwnerId', inco_no)
       .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
           if(err) {
            console.log("fail to Save_EntityOwner_SP " + err);
            // sql.close();
            res.send({status: "failed"});
           }
  
                  sql.close();
                  res.send("success")// your isTrue value
                });
                });
    
            });
    });
  }
  if(BizOwnerType == 4){
    sql.connect(config, function(err) {
      if(err) {
        console.log("fail to Save_EntityOwner_SP " + err);
        // sql.close();
        res.send({status: "failed"});
      }
  
          new sql.Request()
          .input('AddressOwnerId', bn_no)
          .input('AddressOwnerTypeId', 2)
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
              if(err) {
                console.log("fail to Save_EntityOwner_SP " + err);
                // sql.close();
                res.send({status: "failed"});
              }
      
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
                  if(err) {
                    console.log("fail to Save_EntityOwner_SP " + err);
                    // sql.close();
                    res.send({status: "failed"});
                  }
  
       new sql.Request()
       .input('EntityTypeId', 3)
       .input('EntityId', BLdetailsId)
       .input('OwnerSubTypeId', BizOwnerType)
       .input('FrontUserId', userId)
       .input('TrackingNo', trackngNo)
       .input('CorporateName', '')
       .input('IsBankOperator', '')
       .input('CompanyTypeId','')
       .input('OwnerId', bn_no)
       .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
           if(err) {
            console.log("fail to Save_EntityOwner_SP " + err);
            // sql.close();
            res.send({status: "failed"});
           }
  
                  sql.close();
                  res.send("success")// your isTrue value
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
   
    if (err) {
      console.log("fail to connect to server " + err);
      // sql.close();
      res.send({status: "failed"});
    }
   console.log("======>>> " + BLNo)
     var request1 = new sql.Request();
     request1.input('BLNo', BLNo);
     request1.query('SELECT Id, EntityName, RegNo FROM dbo.BusinessLicApplication WHERE TrackingNo = @BLNo', 
     function (err, recordset) {
     if (err) {
      console.log("fail to Save_EntityOwner_SP " + err);
      // sql.close();
      res.send({status: "failed"});
     }
     var result_from = recordset.recordset;
     
       var Id = result_from[0].Id;
       var EntityName = result_from[0].EntityName;
       var RegNo = result_from[0].RegNo;
       req.session.req_id = Id;
       req.session.req_id_touse = Id;
       var id_touse = Id;
       console.log(RegNo + " ====jkfsg======== " + EntityName)
       
       var request1 = new sql.Request();
       request1.input('trackNo', trackNo);
       request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackNo', 
       function (err, recordset) {
       if (err) {
        console.log("fail to Save_EntityOwner_SP " + err);
        // sql.close();
        res.send({status: "failed"});
       }
       var result_from1 = recordset.recordset;
       var BranchId = result_from1[0].Id;
      //  console.log("======+++ " + BranchId)
       var request1 = new sql.Request();
       request1.input('Id', Id);
       request1.query('SELECT BusinessTIN, IssueingOfficeId, BLNumber, FeePaid FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @Id', 
       function (err, recordset) {
       if (err) {          
        console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});
        }
       var result_from1 = recordset.recordset;
       var ApplicationTin = result_from1[0].BusinessTIN;
       var IssueingOfficeId = result_from1[0].IssueingOfficeId;
       var BLNumber = result_from1[0].BLNumber;
       var FeePaid = result_from1[0].FeePaid;
     var request = new sql.Request();
     request.input('userId', userId);
     request.input('trackngNo', trackNo);
     request.input('EntityName', EntityName);
     request.input('RegNo', RegNo);
     request.input('Subdet', new Date());
     request.query(`UPDATE dbo.BusinessLicApplication SET ApplicationStep = 3, RegNo = @RegNo, EntityName = @EntityName, SubmittedDate = @Subdet WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
     function (err, recordset) {
         if (err) {
          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});
         }
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
                   if (err) {
                    console.log("fail to Save_EntityOwner_SP " + err);
                    // sql.close();
                    res.send({status: "failed"});
                   }
   
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BranchId);
                         request3.input('ServiceCode', '4203');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', userId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err, recordset) {
                             if (err) {
                              console.log("fail to Save_EntityOwner_SP " + err);
                              // sql.close();
                              res.send({status: "failed"});
                             }              
   
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BranchId);
                             request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err, recordset) {
                               if (err) {
                                console.log("fail to Save_EntityOwner_SP " + err);
                                // sql.close();
                                res.send({status: "failed"});
                               }
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
   
    if (err) {
      console.log("fail to connect to server " + err);
      // sql.close();
      res.send({status: "failed"});
    }
   // console.log("======>>> " + BLNo)
     var request1 = new sql.Request();
     request1.input('BLNo', BLNo);
     request1.query('SELECT Id, EntityName, RegNo FROM dbo.BusinessLicApplication WHERE TrackingNo = @BLNo', 
     function (err, recordset) {
     if (err) {
      console.log("fail to Save_EntityOwner_SP " + err);
      // sql.close();
      res.send({status: "failed"});
     }
     var result_from = recordset.recordset;
     
       var Id = result_from[0].Id;
       var EntityName = result_from[0].EntityName;
       var RegNo = result_from[0].RegNo;
       req.session.req_id = Id;
       req.session.req_id_touse = Id;
       var id_touse = Id;
       
       var request1 = new sql.Request();
       request1.input('trackNo', trackNo);
       request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackNo', 
       function (err, recordset) {
       if (err) {
        console.log("fail to Save_EntityOwner_SP " + err);
        // sql.close();
        res.send({status: "failed"});
       }
       var result_from1 = recordset.recordset;
       var BranchId = result_from1[0].Id;
      //  console.log("======+++ " + BranchId)
       var request1 = new sql.Request();
       request1.input('Id', Id);
       request1.query('SELECT BusinessTIN, IssueingOfficeId, BLNumber, FeePaid, PrincipalLicNo FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @Id', 
       function (err, recordset) {
       if (err) {
        console.log("fail to Save_EntityOwner_SP " + err);
        // sql.close();
        res.send({status: "failed"});
       }
       var result_from1 = recordset.recordset;
       var ApplicationTin = result_from1[0].BusinessTIN;
       var IssueingOfficeId = result_from1[0].IssueingOfficeId;
       var BLNumber = result_from1[0].BLNumber;
       var FeePaid = result_from1[0].FeePaid;
       var PrincipalLicNo = result_from1[0].PrincipalLicNo;
     var request = new sql.Request();
     request.input('userId', userId);
     request.input('trackngNo', trackNo);
     request.input('EntityName', EntityName);
     request.input('RegNo', RegNo);
     request.input('Subdet', new Date());
     request.query(`UPDATE dbo.BusinessLicApplication SET EntityName = @EntityName, RegNo = @RegNo, ApplicationStep = 3, SubmittedDate = @Subdet WHERE TrackingNo = @trackngNo AND CreatedByUserId = @userId`, 
     function (err, recordset) {
         if (err) {
          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});
         }
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
                   if (err) {
                    console.log("fail to Save_EntityOwner_SP " + err);
                    // sql.close();
                    res.send({status: "failed"});
                   }
   
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BranchId);
                         request3.input('ServiceCode', '4202');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', userId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err, recordset) {
                             if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}               
   
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BranchId);
                             request4.query('SELECT Id FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err, recordset) {
                               if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
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
   
    if (err) {
      console.log("fail to connect to server " + err);
      // sql.close();
      res.send({status: "failed"});
    }
   // console.log("======>>> " + BLNo)
     var request1 = new sql.Request();
     request1.input('BLNo', BLNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @BLNo', 
     function (err, recordset) {
     if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
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
       if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
       var result_from1 = recordset.recordset;
       var BranchId = result_from1[0].Id;
      //  console.log("======+++ " + BranchId)
       var request1 = new sql.Request();
       request1.input('Id', Id);
       request1.query('SELECT BusinessTIN, IssueingOfficeId, BLNumber, FeePaid, Email, PhoneNo, PoBox, IsBranch FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @Id', 
       function (err, recordset) {
       if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
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
         if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
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
                   if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
   
   
                   var request3 = new sql.Request();
                         request3.input('ApplicationId', BranchId);
                         request3.input('ServiceCode', '4204');
                         request3.input('ApplicationStatusId', '1');
                         request3.input('userId', userId);
                         request3.input('CreatedDate', new Date());
                         request3.input('ApplicationStageId', '3');
                         request3.query(`INSERT INTO dbo.BLicenseApplicationTracker (ServiceCode, ApplicationId, ApplicationStatusId, FrontUserId, CreatedDate, ApplicationStageId) values (@ServiceCode, @ApplicationId, @ApplicationStatusId, @userId, @CreatedDate, @ApplicationStageId)`, 
                         function (err, recordset) {
                             if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}               
   
                             var request4 = new sql.Request();
                             request4.input('BusLicAppId', BranchId);
                             request4.query('SELECT Id, Email, PhoneNo, PoBox FROM dbo.BusinessLicenceDetails WHERE BusinessLicenceApplicationId = @BusLicAppId', 
                             function (err, recordset) {
                               if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
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
  
    if (err) {
      console.log("fail to connect to server " + err);
      // sql.close();
      res.send({status: "failed"});
    }
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.input('BusLicAppId', req.session.req_id_touse);
      request.query('SELECT * FROM dbo.tblInvoice WHERE PaymentStatus = 1 AND ApplicationID = @BusLicAppId', function (err, recordset) {
  
          if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
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
    if (err) {
      console.log("fail to connect to server " + err);
      // sql.close();
      res.send({status: "failed"});
    }
     var request = new sql.Request();
     request.input('userId', userId);
     request.input('BusLicAppId', req.session.req_id_touse);
     request.input('amount', req.session.AmountTotal);
     request.query(`UPDATE dbo.BusinessLicenceDetails SET PrinciplaFeePaid = @amount WHERE BusinessLicenceApplicationId = @BusLicAppId`, 
     function (err, recordset) {
         if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
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
  var subwardIdB = req.body.subwardIdB;
  var userId = req.body.userId;
  var BLdetailsId = req.body.BLdetailsId;
  
    sql.connect(config, function(err) {
      if (err) {
        console.log("fail to connect to server " + err);
        // sql.close();
        res.send({status: "failed"});
      }
    
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
          .input('SUBWARD_ID', subwardIdB)
          // .input('OwnerId', bustype)
          .input('OwnerId', 1)
          .execute('Save_Address_SP', function(err, recordsets, returnValue) {
              if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
      
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
              .input('SUBWARD_ID', subwardIdB)
              .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                  if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
  
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
           if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
  
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
            .input('SUBWARD_ID', subwardIdB)
            // .input('OwnerId', bustype)
            .input('OwnerId', 3)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
        
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
                .input('OwnerId', 3)
                .input('SUBWARD_ID', subwardIdB)
                .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                    if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
    
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
             if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
          res.send({status: "failed"});}
    
                    sql.close();
                    res.send("success")// your isTrue value
                  });
                  });
      
              });
      }if(OwnerSubTypeId == 2){
        new sql.Request()
        .input('AddressOwnerId', AddressOwnerId)
        .input('AddressOwnerTypeId', 3)
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
        .input('OwnerId', 2)
        .input('SUBWARD_ID', subwardIdB)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});}
    
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
            .input('OwnerId', 2)
            .input('SUBWARD_ID', subwardIdB)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});}

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
         if(err) {          
          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

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
  var subwardIdB = req.body.subwardIdB;
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
      if (err) {
        console.log("fail to connect to server " + err);
       // sql.close();
        res.send({status: "failed"});
      }
    
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
      
      var request11 = new sql.Request();
      request11.input('BLNo', BLNo);
      var userInfo = 'SELECT OwnerSubTypeId, OwnerId FROM dbo.tblEntityOwner WHERE  TrackingNo = @BLNo';
    request11.query(userInfo, function (err1, recordset1) {

      if (err1) console.log(err1)
     //console.log(recordset1.recordset)
      var result_from1 = recordset1.recordset;
      var OwnerSubTypeId = result_from1[0].OwnerSubTypeId;
      var OwnerId = result_from1[0].OwnerId;

      if(OwnerSubTypeId == 1){
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
        .input('SUBWARD_ID', subwardIdB)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
    
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
            .input('SUBWARD_ID', subwardIdB)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

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
         if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

                sql.close();
                res.send("success")// your isTrue value
              });
              });
  
          });
      }
      if(OwnerSubTypeId == 3){
        new sql.Request()
        .input('AddressOwnerId', AddressOwnerId)
        .input('AddressOwnerTypeId', 7)
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
        .input('OwnerId', 3)
        .input('SUBWARD_ID', subwardIdB)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});}
    
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
            .input('OwnerId', 3)
            .input('SUBWARD_ID', subwardIdB)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

     new sql.Request()
     .input('EntityTypeId', 3)
     .input('EntityId', BLdetailsId)
     .input('OwnerSubTypeId', 3)
     .input('FrontUserId', userId)
     .input('TrackingNo', trackNo)
     .input('CorporateName', '')
     .input('IsBankOperator', '')
     .input('CompanyTypeId','')
     .input('OwnerId', OwnerId)
     .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
         if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

                sql.close();
                res.send("success")// your isTrue value
              });
              });
  
          });
      }
      if(OwnerSubTypeId == 2){
        new sql.Request()
        .input('AddressOwnerId', AddressOwnerId)
        .input('AddressOwnerTypeId', 3)
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
        .input('OwnerId', 2)
        .input('SUBWARD_ID', subwardIdB)
        .execute('Save_Address_SP', function(err, recordsets, returnValue) {
            if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
    
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
            .input('OwnerId', 2)
            .input('SUBWARD_ID', subwardIdB)
            .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

     new sql.Request()
     .input('EntityTypeId', 3)
     .input('EntityId', BLdetailsId)
     .input('OwnerSubTypeId', 2)
     .input('FrontUserId', userId)
     .input('TrackingNo', trackNo)
     .input('CorporateName', '')
     .input('IsBankOperator', '')
     .input('CompanyTypeId','')
     .input('OwnerId', OwnerId)
     .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
         if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

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

app.post('/AddressRecordCancel', function(req, res){
  console.log(req.body)
  var OldTrackingNo = req.body.OldTrackingNo;
  var newtrackingNo = req.body.newtrackingNo;
  var BLdetailsPoBox = req.body.BLdetailsPoBox;
  var BLdetailsPhoneNo = req.body.BLdetailsPhoneNo;
  var BLdetailsEmail = req.body.BLdetailsEmail;
  var BLdetailsId = req.body.BLdetailsId;
  
    sql.connect(config, function(err) {
      if (err) {
        console.log("fail to connect to server " + err);
       // sql.close();
        res.send({status: "failed"});
      }
    
      var request11 = new sql.Request();
      request11.input('OldTrackingNo', OldTrackingNo);
      var userInfo = 'SELECT * FROM dbo.tblAddress WHERE  TrackingNo = @OldTrackingNo AND IsOfficeAddress = 0';
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
      var RegionCode = result_from1[0].RegionCode;
      var DistrictCode = result_from1[0].DistrictCode;

      var BlockNo = result_from1[0].BlockNo;
      var HouseNo = result_from1[0].HouseNo;
      var UnsurveyedArea = result_from1[0].UnsurveyedArea;
      var PoBox = result_from1[0].PoBox;
      var AddressOwnerTypeId = result_from1[0].AddressOwnerTypeId;
      var AddressOwnerId = result_from1[0].AddressOwnerId;
      var CompanyEmail = result_from1[0].CompanyEmail;
      var CompanyPhone = result_from1[0].CompanyPhone;
      var OwnerId = result_from1[0].OwnerId;
      var FrontUserId = result_from1[0].FrontUserId;
    //  date_birth = dateFormat(dob, "dd, mmm yyyy");

          
          new sql.Request()
          .input('AddressOwnerId', AddressOwnerId)
          .input('AddressOwnerTypeId', AddressOwnerTypeId)
          .input('AreaTypeId', AreaTypeId)
          .input('WardId', WardId)
          .input('TrackingNo', newtrackingNo)
          .input('PostCode', PostCode)
          .input('Street', Street)
          .input('Road', Road)
          .input('PlotNo', PlotNo)
          .input('BlockNo', BlockNo)
          .input('HouseNo', HouseNo)
          .input('UnsurveyedArea', UnsurveyedArea)
          .input('PoBox', PoBox)
          .input('FrontUserId', FrontUserId)
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
          .input('OwnerId', OwnerId)
          .execute('Save_Address_SP', function(err, recordsets, returnValue) {
              if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});}

              var request111 = new sql.Request();
              request111.input('OldTrackingNo', OldTrackingNo);
              var userInfo = 'SELECT * FROM dbo.tblAddress WHERE  TrackingNo = @OldTrackingNo AND IsOfficeAddress = 1';
            request111.query(userInfo, function (err1, recordset1) {
        
              if (err1) console.log(err1)
             console.log(recordset1.recordset)
              var result_from11 = recordset1.recordset;
              var AreaTypeId1 = result_from11[0].AreaTypeId;
              var WardId1 = result_from11[0].WardId;
              var PostCode1 = result_from11[0].PostCode;
              var Street1 = result_from11[0].Street;
              var Road1 = result_from11[0].Road;
              var PlotNo1 = result_from11[0].PlotNo;
              var RegionCode = result_from11[0].RegionCode;
              var DistrictCode = result_from11[0].DistrictCode;
        
              var BlockNo1 = result_from11[0].BlockNo;
              var HouseNo1 = result_from11[0].HouseNo;
              var UnsurveyedArea1 = result_from11[0].UnsurveyedArea;
              var PoBox1 = result_from11[0].PoBox;
              var AddressOwnerTypeId1 = result_from11[0].AddressOwnerTypeId;
              var AddressOwnerId1 = result_from11[0].AddressOwnerId;
              var CompanyEmail1 = result_from11[0].CompanyEmail;
              var CompanyPhone1 = result_from11[0].CompanyPhone;
              var OwnerId1 = result_from11[0].OwnerId;
              var FrontUserId1 = result_from11[0].FrontUserId;
      
              new sql.Request()
              .input('AddressOwnerId', BLdetailsId)
              .input('AddressOwnerTypeId', AddressOwnerTypeId1)
              .input('AreaTypeId', AreaTypeId1)
              .input('WardId', WardId1)
              .input('TrackingNo', newtrackingNo)
              .input('PostCode', PostCode1)
              .input('Street', Street1)
              .input('Road', Road1)
              .input('PlotNo', PlotNo1)
              .input('BlockNo', BlockNo1)
              .input('HouseNo', HouseNo1)
              .input('UnsurveyedArea', UnsurveyedArea1)
              .input('PoBox', PoBox1)
              .input('FrontUserId', FrontUserId1)
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
              .input('CompanyEmail', CompanyEmail1)
              .input('CompanyPhone', CompanyPhone1)
              .input('OwnerId', OwnerId1)
              .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                  if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

                  var request211 = new sql.Request();
                  request211.input('OldTrackingNo', OldTrackingNo);
                  var entityInfo = 'SELECT OwnerSubTypeId FROM dbo.tblEntityOwner WHERE  TrackingNo = @OldTrackingNo';
                request211.query(entityInfo, function (err1, recordset1) {
                  var result_from121 = recordset1.recordset;
                  var OwnerSubTypeId = result_from121[0].OwnerSubTypeId;
  
       new sql.Request()
       .input('EntityTypeId', 3)
       .input('EntityId', BLdetailsId)
       .input('OwnerSubTypeId', OwnerSubTypeId)
       .input('FrontUserId', FrontUserId1)
       .input('TrackingNo', newtrackingNo)
       .input('CorporateName', '')
       .input('IsBankOperator', '')
       .input('CompanyTypeId','')
       .input('OwnerId', AddressOwnerId)
       .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
           if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
  
                  sql.close();
                  res.send("success")// your isTrue value
                });
                });
              });
              });
            });
    
          });
    });
    
});

app.post('/AddressRecordRenew', function(req, res){
  console.log(req.body)
  var OldTrackingNo = req.body.OldTrackingNo;
  var newtrackingNo = req.body.newtrackingNo;
  var BLdetailsPoBox = req.body.BLdetailsPoBox;
  var BLdetailsPhoneNo = req.body.BLdetailsPhoneNo;
  var BLdetailsEmail = req.body.BLdetailsEmail;
  var BLdetailsId = req.body.BLdetailsId;
  
    sql.connect(config, function(err) {
      if (err) {
        console.log("fail to connect to server " + err);
       // sql.close();
        res.send({status: "failed"});
      }
    
      var request11 = new sql.Request();
      request11.input('OldTrackingNo', OldTrackingNo);
      var userInfo = 'SELECT * FROM dbo.tblAddress WHERE  TrackingNo = @OldTrackingNo AND IsOfficeAddress = 0';
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
      var RegionCode = result_from1[0].RegionCode;
      var DistrictCode = result_from1[0].DistrictCode;

      var BlockNo = result_from1[0].BlockNo;
      var HouseNo = result_from1[0].HouseNo;
      var UnsurveyedArea = result_from1[0].UnsurveyedArea;
      var PoBox = result_from1[0].PoBox;
      var AddressOwnerTypeId = result_from1[0].AddressOwnerTypeId;
      var AddressOwnerId = result_from1[0].AddressOwnerId;
      var CompanyEmail = result_from1[0].CompanyEmail;
      var CompanyPhone = result_from1[0].CompanyPhone;
      var OwnerId = result_from1[0].OwnerId;
      var FrontUserId = result_from1[0].FrontUserId;
    //  date_birth = dateFormat(dob, "dd, mmm yyyy");

          
          new sql.Request()
          .input('AddressOwnerId', AddressOwnerId)
          .input('AddressOwnerTypeId', AddressOwnerTypeId)
          .input('AreaTypeId', AreaTypeId)
          .input('WardId', WardId)
          .input('TrackingNo', newtrackingNo)
          .input('PostCode', PostCode)
          .input('Street', Street)
          .input('Road', Road)
          .input('PlotNo', PlotNo)
          .input('BlockNo', BlockNo)
          .input('HouseNo', HouseNo)
          .input('UnsurveyedArea', UnsurveyedArea)
          .input('PoBox', PoBox)
          .input('FrontUserId', FrontUserId)
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
          .input('OwnerId', OwnerId)
          .execute('Save_Address_SP', function(err, recordsets, returnValue) {
              if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});}

              var request111 = new sql.Request();
              request111.input('OldTrackingNo', OldTrackingNo);
              var userInfo = 'SELECT * FROM dbo.tblAddress WHERE  TrackingNo = @OldTrackingNo AND IsOfficeAddress = 1';
            request111.query(userInfo, function (err1, recordset1) {
        
              if (err1) console.log(err1)
             console.log(recordset1.recordset)
              var result_from11 = recordset1.recordset;
              var AreaTypeId1 = result_from11[0].AreaTypeId;
              var WardId1 = result_from11[0].WardId;
              var PostCode1 = result_from11[0].PostCode;
              var Street1 = result_from11[0].Street;
              var Road1 = result_from11[0].Road;
              var PlotNo1 = result_from11[0].PlotNo;
              var RegionCode = result_from11[0].RegionCode;
              var DistrictCode = result_from11[0].DistrictCode;
        
              var BlockNo1 = result_from11[0].BlockNo;
              var HouseNo1 = result_from11[0].HouseNo;
              var UnsurveyedArea1 = result_from11[0].UnsurveyedArea;
              var PoBox1 = result_from11[0].PoBox;
              var AddressOwnerTypeId1 = result_from11[0].AddressOwnerTypeId;
              var AddressOwnerId1 = result_from11[0].AddressOwnerId;
              var CompanyEmail1 = result_from11[0].CompanyEmail;
              var CompanyPhone1 = result_from11[0].CompanyPhone;
              var OwnerId1 = result_from11[0].OwnerId;
              var FrontUserId1 = result_from11[0].FrontUserId;
      
              new sql.Request()
              .input('AddressOwnerId', BLdetailsId)
              .input('AddressOwnerTypeId', AddressOwnerTypeId1)
              .input('AreaTypeId', AreaTypeId1)
              .input('WardId', WardId1)
              .input('TrackingNo', newtrackingNo)
              .input('PostCode', PostCode1)
              .input('Street', Street1)
              .input('Road', Road1)
              .input('PlotNo', PlotNo1)
              .input('BlockNo', BlockNo1)
              .input('HouseNo', HouseNo1)
              .input('UnsurveyedArea', UnsurveyedArea1)
              .input('PoBox', PoBox1)
              .input('FrontUserId', FrontUserId1)
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
              .input('CompanyEmail', CompanyEmail1)
              .input('CompanyPhone', CompanyPhone1)
              .input('OwnerId', OwnerId1)
              .execute('Save_Address_SP', function(err, recordsets, returnValue) {
                  if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}

                  var request211 = new sql.Request();
                  request211.input('OldTrackingNo', OldTrackingNo);
                  var entityInfo = 'SELECT OwnerSubTypeId FROM dbo.tblEntityOwner WHERE  TrackingNo = @OldTrackingNo';
                request211.query(entityInfo, function (err1, recordset1) {
                  var result_from121 = recordset1.recordset;
                  var OwnerSubTypeId = result_from121[0].OwnerSubTypeId;
  
       new sql.Request()
       .input('EntityTypeId', 3)
       .input('EntityId', BLdetailsId)
       .input('OwnerSubTypeId', OwnerSubTypeId)
       .input('FrontUserId', FrontUserId1)
       .input('TrackingNo', newtrackingNo)
       .input('CorporateName', '')
       .input('IsBankOperator', '')
       .input('CompanyTypeId','')
       .input('OwnerId', AddressOwnerId)
       .execute('Save_EntityOwner_SP', function(err, recordsets, returnValue) {
           if(err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
  
                  sql.close();
                  res.send("success")// your isTrue value
                });
                });
              });
              });
            });
    
          });
    });
    
});

app.post('/uploaadFile', function (req, res) {
  console.log("req.body")
 console.log(req.body)
  var trackngNo = req.body.trackngNo;
  var token = req.body.token;
  var attachmentId = req.body.attachmentId;
  var atachment = req.body.atachment;
  var trackNo = req.body.trackNo;
  
  sql.connect(configBL, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }
  else{
    var request1 = new sql.Request();
    request1.input('trackngNo', trackngNo);
    request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', 
    function (err, recordset) {
      if (err) {          
        console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
      var result_form = recordset.recordset;
      console.log(result_form)
      var Id = result_form[0].Id;
      req.session.req_id = Id;
      request({
        url: BASEURL+"api/addBLAttachment",
        method: 'POST',
        json: {TrackingNo: trackngNo, BusinessAppId: Id, AttachmentTypeId: attachmentId, file: atachment, IsPermit: 0, token: token},
      }, function(error, response, body){
        if(error) {          console.log("fail to Save_EntityOwner_SP " + error);
          //sql.close();
          res.send({status: "failed"});
        }else{
        sql.close();
          res.send({"sucess": "sucess"})
      }
      });
    }
  });
}
  });
});

app.post('/uploaadPFile', function (req, res) {
  console.log(req.body)
   var trackngNo = req.body.trackngNo;
   var token = req.body.token;
   var attachmentId = req.body.attachmentId;
   var atachment = req.body.atachment;
   var trackNo = req.body.trackNo;
   
   sql.connect(configBL, function (err) {
   
     if (err) {
       console.log("fail to connect to server " + err);
       //sql.close();
       res.send({status: "failed"});
     }
   
     var request1 = new sql.Request();
     request1.input('trackngNo', trackngNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err, recordset) {
       if (err) {          
         console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
           res.send({status: "failed"});
         }
       var result_form = recordset.recordset;
       console.log(result_form)
       var Id = result_form[0].Id;
       req.session.req_id = Id;
       request({
         url: BASEURL+"api/addBLAttachment",
         method: 'POST',
         json: {TrackingNo: trackngNo, BusinessAppId: Id, AttachmentTypeId: attachmentId, file: atachment, IsPermit: 1, token: token},
       }, function(error, response, body){
         if(error) {          console.log("fail to Save_EntityOwner_SP " + error);
           //sql.close();
           res.send({status: "failed"});}
         sql.close();
           res.send({"sucess": "sucess"})
       });
   });
   });
 });

app.post('/uploaadFileSup', function (req, res) {
  console.log(req.body)
   var trackngNo = req.body.trackngNo;
   var token = req.body.token;
   var attachmentId = req.body.attachmentId;
   var atachment = req.body.atachment;
   var trackNo = req.body.trackNo;
   
   sql.connect(configBL, function (err) {
   
     if (err) {
       console.log("fail to connect to server " + err);
       //sql.close();
       res.send({status: "failed"});
     }
   
     var request1 = new sql.Request();
     request1.input('trackngNo', trackNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err, recordset) {
       if (err) {          
         console.log("fail to Save_EntityOwner_SP " + err);
          // sql.close();
           res.send({status: "failed"});
         }
       var result_form = recordset.recordset;
       console.log(result_form)
       var Id = result_form[0].Id;
       req.session.req_id = Id;
       request({
         url: BASEURL+"api/addBLAttachment",
         method: 'POST',
         json: {TrackingNo: trackNo, BusinessAppId: Id, AttachmentTypeId: attachmentId, file: atachment, IsPermit: 0, token: token},
       }, function(error, response, body){
         if(error) {          
          console.log("fail to Save_EntityOwner_SP " + error);
           //sql.close();
           res.send({status: "failed"});}
         sql.close();
           res.send({"sucess": "sucess"})
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
   
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }
   
     var request1 = new sql.Request();
     request1.input('trackngNo', trackngNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', function (err, recordset) {
       if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
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
         if(error) {          console.log("fail to Save_EntityOwner_SP " + error);
          //sql.close();
          res.send({status: "failed"});}
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
   
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{
   
     var request1 = new sql.Request();
     request1.input('trackngNo', trackNo);
     request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', 
     function (err, recordset) {
       if (err) {          console.log("fail to uploaadFiley " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
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
         if(error) {          console.log("fail to addBLAttachment " + error);
          //sql.close();
          res.send({"failed": "failed"});
        }else{
           res.send({"sucess": "sucess"})
        }
         // });
       });
      }
   });
  }
   });
   
   
   
 });

app.get('/bizType1', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(configBL, function (err) {

  if (err) {
    console.log("fail to connect to server " + err);
    //sql.close();
    res.send({status: "failed"});
  }else{

    // create Request object
    var request = new sql.Request();

    // query to the database and get the records
    request.query('SELECT * FROM dbo.BusinessTypes', function (err, recordset) {

        if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
         sql.close();
        // send records as a response
        res.send(recordset.recordset);
        }
    });
  }
});
});

app.get('/bizType/:id', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(configBL, function (err) {

  if (err) {
    console.log("fail to connect to server " + err);
    //sql.close();
    res.send({status: "failed"});
  }else{

    // create Request object
    var request = new sql.Request();
    request.input('reg_id', reg_id);
    // query to the database and get the records
    request.query('SELECT * FROM dbo.BusinessTypes WHERE BusinessCategoryId = @reg_id', 
    function (err, recordset) {

        if (err) {          console.log("fail to bizType " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
         sql.close();
        // send records as a response
        res.send(recordset.recordset);
        }
    });
  }
});
});

app.get('/bizTypeAll', function (req, res) {
  // var reg_id = req.params.id;
  // connect to your database
  sql.connect(configBL, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{
  
      // create Request object
      var request = new sql.Request();
  
      // query to the database and get the records
      request.query('SELECT * FROM dbo.BusinessTypes', 
      function (err, recordset) {
  
          if (err) {          console.log("fail to bizTypeAll " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/test', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblOwnerSubType', function (err, recordset) {
          
          if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send(recordset);
        }
      });
    }
  });
});

app.get('/regions', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * FROM tblRegion', function (err, recordset) {
          
          if (err) {          
            console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
     sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/AddressArea', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * FROM tblAreaType', 
      function (err, recordset) {
          if (err) {          
            console.log("fail to AddressArea " + err);
         sql.close();
          res.send({status: "failed"});
        }else{
          // sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/regions/:id', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(config, function (err) {

  if (err) {
    console.log("fail to connect to server " + err);
    //sql.close();
    res.send({status: "failed"});
  }else{

    // create Request object
    var request = new sql.Request();
    request.input('reg_id', reg_id);
    // query to the database and get the records
    request.query('SELECT * FROM dbo.tblDistrict WHERE RegionCode = @reg_id', 
    function (err, recordset) {

        if (err) {          console.log("fail to regions " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
         sql.close();
        // send records as a response
        res.send(recordset.recordset);
        }
    });
  }
});
});

app.get('/lga/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{
  
      // create Request object
      var request = new sql.Request();
      request.input('reg_id', reg_id);
      // query to the database and get the records
      request.query('SELECT * FROM dbo.Lga WHERE Status = 1 AND RegionCode = @reg_id', 
      function (err, recordset) {
  
          if (err) {          console.log("fail to lga " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/GetSavedDistrict/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{
  
      // create Request object
      var request = new sql.Request();
      request.input('reg_id', reg_id);
      // query to the database and get the records
      request.query('SELECT DistrictName FROM dbo.tblDistrict WHERE DistrictCode = @reg_id', 
      function (err, recordset) {
  
          if (err) {          console.log("fail to GetSavedDistrict " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });

});

app.get('/GetSavedWard/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{
  
      // create Request object
      var request = new sql.Request();
      request.input('reg_id', reg_id);
      // query to the database and get the records
      request.query('SELECT WardName FROM dbo.tblWard WHERE WardCode = @reg_id', function (err, recordset) {
  
          if (err) {          
            console.log("fail to GetSavedWard " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
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
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{

      var request1 = new sql.Request();
      request1.input('trackngNo', trackNo);
      request1.query('SELECT Id FROM dbo.BusinessLicApplication WHERE TrackingNo = @trackngNo', 
      function (err, recordset) {
        if (err) {          console.log("fail to atachFile " + err);
          sql.close();
          res.send({status: "failed"});}
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
          if (err) {          console.log("fail to BusinessLicenceAttachments " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send("sucess");
        }
      });
  });
}
  });
});

app.get('/BusSector', function (req, res) {

// connect to your database
sql.connect(configBL, function (err) {
  if (err) {
    console.log("fail to connect to server " + err);
    //sql.close();
   // res.send({status: "failed"});
  }else{
    // create Request object
    var request = new sql.Request();
    // query to the database and get the records
    request.query('SELECT Id, SectorName FROM dbo.BusinessSector WHERE isDeleted = 0', 
    function (err1, recordset1) {

        if (err1) {          
          console.log("fail to BusSector " + err1);
        //  sql.close();
          res.send({status: "failed"});
        }else{
         sql.close();
        // send records as a response
        console.log(recordset1.recordset)
        res.send(recordset1.recordset);
        }
    });
  }
});
});

app.get('/BLAttachmnt', function (req, res) {

  // connect to your database
  sql.connect(configBL, function (err) {

    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query('SELECT AttachmentTypeId, AttachmentName, Description ' + 
                    ' FROM BLAttachmentTypes WHERE AttachmentTypeId = 1', 
      function (err, recordset) {

          if (err) {          
            console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/BLAttachmntBra', function (req, res) {

  // connect to your database
  sql.connect(configBL, function (err) {

    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();

      // query to the database and get the records
      request.query('SELECT AttachmentTypeId, AttachmentName, Description FROM dbo.BLAttachmentTypes', 
      function (err, recordset) {

          if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          console.log(recordset.recordset)
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/BLPermit/:id', function (req, res) {
  var bizNo = req.params.id;
    // connect to your database
    sql.connect(configBL, function (err) {
  
      if (err) {
        console.log("fail to connect to server " + err);
       // sql.close();
        res.send({status: "failed"});
      }else{
  
        // create Request object
        var request = new sql.Request();
        
        request.input('bizNo', bizNo);
        // query to the database and get the records
        request.query('SELECT * FROM dbo.BusinessTypePermits, dbo.Permits WHERE dbo.BusinessTypePermits.PermitId = dbo.Permits.Id AND dbo.BusinessTypePermits.BusinessTypeId = @bizNo', 
        function (err, recordset) {
  
            if (err) {          
              console.log("fail to BLPermit " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
             sql.close();
            // send records as a response
            res.send(recordset.recordset);
        }
        });
      }
    });
});

app.get('/category/:id', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(configBL, function (err) {

  if (err) {
    console.log("fail to connect to server " + err);
   // sql.close();
    res.send({status: "failed"});
  }else{

    // create Request object
    var request = new sql.Request();
    request.input('reg_id', reg_id);
    // query to the database and get the records
    request.query('SELECT * FROM dbo.BusinessCategory WHERE IsDeleted = 0 and BusinessSectorId = @reg_id', 
    function (err, recordset) {

        if (err) {          console.log("fail to category " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
         sql.close();
        // send records as a response
        res.send(recordset.recordset);
        }
    });
  }
});
});

app.get('/district/:id', function (req, res) {
var reg_id = req.params.id;
// connect to your database
sql.connect(config, function (err) {

  if (err) {
    console.log("fail to connect to server " + err);
    // sql.close();
    res.send({status: "failed"});
  }else{

    // create Request object
    var request = new sql.Request();
    request.input('reg_id', reg_id);
    // query to the database and get the records
    request.query('SELECT * FROM dbo.tblWard WHERE DistrictCode = @reg_id', 
    function (err, recordset) {

        if (err) {          console.log("fail to district " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
         sql.close();
        // send records as a response
        res.send(recordset.recordset);
        }
    });
  }
});
});

app.get('/postcode/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{
  
      // create Request object
      var request = new sql.Request();
      request.input('reg_id', reg_id);
      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblWard WHERE WardCode = @reg_id', 
      function (err, recordset) {
  
          if (err) {          console.log("fail to postcode " + err);
          //sql.close();
          res.send({status: "failed"});}
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
  
      });
    }
  });
});

app.get('/getbiz_check/:id', function (req, res) {
    var reg_id = req.params.id;
    // connect to your database
    sql.connect(configBL, function (err) {
  
      if (err) {
        console.log("fail to connect to server " + err);
        //sql.close();
        res.send({status: "failed"});
      }else{
  
        var request1 = new sql.Request();
        request.input('reg_id', reg_id);
        // query to the database and get the records
        request1.query('SELECT count(Id) as kaunti FROM dbo.BusinessLicApplication WHERE ApplicationStatusId NOT IN(2) AND businessTypeId = @reg_id', 
        function (err, recordset) {
  
            if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
            var result_form = recordset.recordset;
            var kaunti = result_form[0].kaunti;
       
              res.send(result_form);
        }
        });
      }
    });
});

app.post('/last_commit', function (req, res) {
  var OldtrackNo = req.body.OldtrackNo;
  // connect to your database
  sql.connect(configBL, function (err) {

    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      var request1 = new sql.Request();
      request.input('OldtrackNo', OldtrackNo);
      // query to the database and get the records
      request1.query('SELECT ApplicationStep FROM dbo.BusinessLicApplication WHERE TrackingNo = @OldtrackNo', 
      function (err, recordset) {

          if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
          var result_form = recordset.recordset;
          var ApplicationStep = result_form[0].ApplicationStep;
     
            res.send(ApplicationStep);
        }
      });
    }
  });
});

app.get('/getbiz/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(configBL, function (err) {

    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
      request.input('reg_id', reg_id);
      // query to the database and get the records
      request.query('SELECT b.Id, a.IsPerUnitFeeApplicable, a.IssuingAuthorityId, b.BusinessLicenceClassCode FROM dbo.BusinessTypes as a, dbo.BusinessLicenceClass as b WHERE a.BusinessLicenceClassCode = b.BusinessLicenceClassCode AND a.IssuingAuthorityId = b.IssuingAuthorityId AND a.businessTypeId = @reg_id', 
      function (err, recordset) {

          if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
          //sql.close();
          res.send({status: "failed"});}
          var result_form = recordset.recordset;
          // var businessLicenceClassCode = result_form[0].BusinessLicenceClassCode;
          // var issuingAuthorityId = result_form[0].IssuingAuthorityId;
  
               sql.close();
              // send records as a response
              console.log(result_form)
              res.send(result_form);

      });
    }
  });
});

app.get('/dltPendApp/:id', function (req, res) {
  var reg_id = req.params.id;
  // connect to your database
  sql.connect(configBL, function (err) {

    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{
      // create Request object
      var request = new sql.Request();
     
      request.input('TrackingNo', reg_id);
      // query to the database and get the records
      request.query('DELETE FROM BusinessLicApplication WHERE TrackingNo = @TrackingNo', 
      function (err, recordset) {

          if (err) {          console.log("fail to dltPendApp " + err);
          //sql.close();
          res.send({"status": "failed"});
        }else{
  
               sql.close();
              // send records as a response
              // console.log(result_form)
              res.send({"status": "success"});
        }
      });
    }
  });
});

app.get('/getParticular/:id',function(req,res){
  console.log('req.params.id')
  console.log(req.params.id)
var obj12 = [];
      var fname, mname, lname, date_birth, gender;
      var citizen = '';
      var user_id = req.params.id;
      sql.connect(configUser, function (err) {
        if (err) {
          console.log("fail to connect to server " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
        // create Request object
        var request11 = new sql.Request();
        request11.input('user_id', user_id);
        var userInfo = 'SELECT * FROM users WHERE id = @user_id';
      request11.query(userInfo, function (err1, recordset1) {

        if (err1) {
          console.log(err1)
          res.send({status: "failed"})
        }else{
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
        obj12.push({
          status: "success", "fname": fname, "mname": mname, 
          "lname": lname, "date_birth": date_birth, "citizen": citizen, "gender": gender
        })
      // 
      sql.close();
      res.send(obj12)
      }
    });
  }
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
  
  if (err) {
    console.log("fail to connect to server " + err);
    //sql.close();
    res.send({status: "failed"});
  }else{

  // create Request object
  var request = new sql.Request();
  request.input('user_id', user_id);
  // query to the database and get the records
  request.query('SELECT Fname, Mname, Lname, Email, DOB FROM users WHERE id = @user_id', 
  function (err, recordset) {
      
      if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
       sql.close();
      // send records as a response
      res.send(recordset.recordset);
  }
  });
}
});   
})  

app.post('/submitApplicantInfoApp', function (req, res) {  
  // Prepare output in JSON format    
  console.log(req.body);  
  res.end(JSON.stringify(req.body));  
}) 

app.get('/genBLTrackingNo', function (req, res) {
  
  sql.connect(configBL, function (err) {
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{
      // create Request object
      var request = new sql.Request();
      // query to the database and execute procedure 
      let query = "exec Get_BLTrackingNo_SP";
      // console.log(query)
      request.query(query, function (err, recordset) {
          if (err) {
            console.log("fail to generate tracking number");
            //sql.close();
            res.send({status: "fail", message: "fail to generate tracking"});
          }else{
         // var trackNo = recordset.recordset;
         sql.close();
          res.send(recordset.recordset);
          }
      });
    }
    });
});

app.get('/busOnwerType', function (req, res) {
var owner_type_id = req.params.id
  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * from tblOwnerSubType where status = 1 AND OwnerSubTypeId NOT IN (5)', 
      function (err1, recordset1) {
          
          if (err1){
            // {        
            console.log("fail to get business type " + err1);
            //sql.close();
            res.send({status: 'fail', message: "fail to get business type"});
          }else{
           sql.close();
          // send records as a response
          res.send(recordset1.recordset);
          }
      });
    }
  });
});

app.get('/busOnwerType/:id', function (req, res) {
  var TrackingNo = req.params.id
    // connect to your database
    sql.connect(configBL, function (err) {
    
        if (err){
          console.log("fail to connect to server " + err);
         // sql.close();
          //res.send("fail to generate tracking");
        }else{
  
        // create Request object
        var request = new sql.Request();
        request.input('TrackingNo', TrackingNo);
        // query to the database and get the records
        request.query('SELECT BusinessLicOwnerTypeId from dbo.BusinessLicApplication where TrackingNo = @TrackingNo', 
        function (err1, recordset1) {
            
            if (err1){
              console.log("fail to get business type " + err1);
              //sql.close();
              //res.send("fail to generate tracking");
            }else{
      sql.close();
            // send records as a response
            res.send(recordset1.recordset);
            }
        });
      }
    });
});

app.get('/GetbusOnwerType/:id', function (req, res) {
  var TrackingNo = req.params.id
    // connect to your database
    sql.connect(configBL, function (err) {
    
        if (err){
          console.log("fail to connect to server " + err);
         // sql.close();
          //res.send("fail to generate tracking");
        }else{
  
        // create Request object
        var request = new sql.Request();
        request.input('TrackingNo', TrackingNo);
        // query to the database and get the records
        request.query('SELECT BusinessLicOwnerTypeId, EntityName, RegNo ' + 
        ' FROM dbo.BusinessLicApplication where TrackingNo = @TrackingNo', 
        function (err1, recordset1) {
            
            if (err1){
              console.log("fail to get business type " + err1);
              //sql.close();
              //res.send("fail to generate tracking");
            }else{
      sql.close();
            // send records as a response
            res.send(recordset1.recordset);
            }
        });
      }
    });
});

app.get('/getSavedTin/:id', function (req, res) {
    var TrackingNo = req.params.id
      // connect to your database
      sql.connect(configBL, function (err) {
      
          if (err) {
            console.log("fail to connect to server " + err);
           // sql.close();
            res.send({status: "failed"});
          }else{
    
          // create Request object
          var request = new sql.Request();
          request.input('TrackingNo', TrackingNo);
          // query to the database and get the records
          request.query('SELECT ApplicationTIN, Id, ServiceCode, BusinessClassId, RegNo, ApplicationStep from dbo.BusinessLicApplication where TrackingNo = @TrackingNo', 
          function (err, recordset1) {
              
              if (err) {          
                console.log("fail to getSavedTin " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
              sql.close();
              // send records as a response
              console.log("=====<>>>> " + recordset1.recordset)
              res.send(recordset1.recordset);
        } 
          });
        }
      });
});

app.get('/getPaymentDetails/:id/:code', function (req, res) {
  var obj = []
  var reg_id = req.params.id;
  var servicecode = req.params.code;
  console.log('reg_id ' + reg_id)
  console.log('servicecode ' + servicecode)
  // connect to your database
  sql.connect(configBill, function (err) {
  
      if (err) {
        console.log("fail to connect to server " + err);
        //sql.close();
        res.send({status: "failed"});
      }else{
  
      // create Request object
      var request = new sql.Request();
      request.input('reg_id', reg_id);
      request.input('servicecode', servicecode);
      // query to the database and get the records
      request.query('SELECT * FROM dbo.tblInvoice WHERE ApplicationID = @reg_id AND TypeCode = @servicecode', 
      function (err1, recordset) {
  
          if (err1) {          
            console.log("fail to getPaymentDetails " + err1);
         // sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          var jsonData = recordset.recordset
          console.log('json ength ' + jsonData.length)
          if(jsonData.length <= 0){
            var AmountTotal = "";
            var ServiceName = "";
            var ExpireDate = "";
            var CurrencyUsed = "";
            var ControlNo = "";
            var InvoiceID = "";
            obj.push({'AmountTotal': AmountTotal, 'ServiceName': ServiceName, 
            'ExpireDate': ExpireDate, 'CurrencyUsed': CurrencyUsed, 
            'ControlNo': ControlNo, 'InvoiceID': InvoiceID})
            res.send(obj);
          }else{
          var AmountTotal = jsonData[0].AmountTotal;
          var ServiceName = jsonData[0].ServiceName;
          var ExpireDate = jsonData[0].ExpireDate;
          var CurrencyUsed = jsonData[0].CurrencyUsed;
          var ControlNo = jsonData[0].ControlNo;
          var InvoiceID = jsonData[0].InvoiceID;
          obj.push({'AmountTotal': AmountTotal, 'ServiceName': ServiceName, 
          'ExpireDate': ExpireDate, 'CurrencyUsed': CurrencyUsed, 
          'ControlNo': ControlNo, 'InvoiceID': InvoiceID})
          res.send(obj);
          }
        }
      });
    }
  });
});

app.get('/getInvoiceDataDetails/:id', function (req, res) {
  var reg_id = req.params.id;
  console.log(reg_id)
  // connect to your database
  sql.connect(configBill, function (err) {
  
      if (err) {
        console.log("fail to connect to server " + err);
        //sql.close();
        res.send({status: "failed"});
      }else{
  
      // create Request object
      var request = new sql.Request();
      request.input('reg_id', reg_id);
      // query to the database and get the records
      request.query('SELECT * FROM tblInvoiceItem WHERE InvoiceID = @reg_id', 
      function (err1, recordset) {
  
          if (err1) {          
            console.log("fail to getPaymentDetails " + err1);
         // sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/getSavedBizType/:id', function (req, res) {
  var TrackingNo = req.params.id
    // connect to your database
    sql.connect(configBL, function (err) {
    
      if (err) {
        console.log("fail to connect to server " + err);
        //sql.close();
        res.send({status: "failed"});
      }else{
  
        // create Request object
        var request = new sql.Request();
        request.input('TrackingNo', TrackingNo);
        // query to the database and get the records
        request.query('SELECT a.BusinessTypeName as BusinessTypeName, a.BusinessTypeId as BusinessTypeId FROM dbo.BusinessTypes as a, dbo.BusinessLicApplication as b WHERE a.BusinessTypeId = b.BusinessTypeId AND b.TrackingNo = @TrackingNo', 
        function (err, recordset1) {
            
            if (err) {          console.log("fail to getSavedBizType " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
      sql.close();
            // send records as a response
            res.send(recordset1.recordset);
        }
        });
      }
    });
});

app.get('/getSavedAreaType/:id', function (req, res) {
  var TrackingNo = req.params.id
    // connect to your database
    sql.connect(config, function (err) {
    
      if (err) {
        console.log("fail to connect to server " + err);
        sql.close();
        res.send({status: "failed"});
      }else{
  
        // create Request object
        var request = new sql.Request();
        request.input('TrackingNo', TrackingNo);
        // query to the database and get the records
        request.query('SELECT * from dbo.tblAddress as a, dbo.tblAreaType as b ' + 
        ' where a.AreaTypeId = b.AreaTypeId AND a.TrackingNo = @TrackingNo', 
        function (err, recordset1) {
            
            if (err) {          console.log("fail to getSavedAreaType " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
      sql.close();
            // send records as a response
            res.send(recordset1.recordset);
        }
        });
      }
    });
});

app.get('/GetbusOnwerTypeName/:id', function (req, res) {
    var BizOwnerTypeId = req.params.id
      // connect to your database
      sql.connect(config, function (err) {
      
        if (err) {
          console.log("fail to connect to server " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
    
          // create Request object
          var request = new sql.Request();
          request.input('BizOwnerTypeId', BizOwnerTypeId);
          // query to the database and get the records
          request.query('SELECT * from dbo.tblOwnerSubType where OwnerSubTypeId = @BizOwnerTypeId', 
          function (err, recordset1) {
              
              if (err) {          console.log("fail to GetbusOnwerTypeName " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
        sql.close();
              // send records as a response
              res.send(recordset1.recordset);
        }
          });
        }
      });
});

app.get('/originType', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * from dbo.tblOriginType', 
      function (err, recordset1) {
          
          if (err) {          
            console.log("fail to originType " + err);
          //sql.close();
          res.send({status: "failed"});
        }else{
          sql.close();
          // send records as a response
          res.send(recordset1.recordset);
        }
      });
    }
  });
});

app.get('/originTypeView/:id', function (req, res) {
var TrackingNo = req.params.id;
console.log(TrackingNo)
  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
     res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
      request.input('TrackingNo', TrackingNo);
      // query to the database and get the records
      request.query('SELECT a.OriginTypeName as OrigTypeName from dbo.tblOriginType as a, dbo.tblPerson as b WHERE b.OriginTypeId = a.OriginTypeId AND b.TrackingNo = @TrackingNo', 
      function (err, recordset1) {
          
          if (err) {          console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
         res.send({status: "failed"});
        }else{

    sql.close();
          // send records as a response
        console.log(recordset1.recordset)
          res.send(recordset1.recordset);
        }
      });
    }
  });
});

app.get('/GetApplicationStatus/:id', function (req, res) {
  var ApplicationStatusId = req.params.id;
  console.log(ApplicationStatusId)
    // connect to your database
    sql.connect(config, function (err) {
    
      if (err) {
        console.log("fail to connect to server " + err);
       // sql.close();
        res.send({status: "failed"});
      }else{
  
        // create Request object
        var request = new sql.Request();
        request.input('ApplicationStatusId', ApplicationStatusId);
        // query to the database and get the records
        request.query('SELECT ApplicationStatusName from dbo.ApplicationStatus WHERE Id = @ApplicationStatusId', 
        function (err, recordset1) {
            
            if (err) {          console.log("fail to GetApplicationStatus " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
  
      sql.close();
            // send records as a response
          console.log(recordset1.recordset)
            res.send(recordset1.recordset);
        } 
        });
      }
    });
});

app.get('/ownerType', function (req, res) {

  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
     sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * from tblOwnerType', 
      function (err, recordset1) {
          
          if (err) {          
            console.log("fail to ownerType " + err);
            sql.close();
            res.send({status: "failed"});
        }else{
          sql.close();
          // send records as a response
          res.send(recordset1.recordset);
        }
      });
    }
  });
});

app.get('/getSavedRegion/:id', function (req, res) {
  var regionCode = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
      request.input('regionCode', regionCode);
      // query to the database and get the records
      request.query('SELECT RegionName FROM dbo.tblRegion WHERE RegionCode = @regionCode', function (err, recordset) {
          
          if (err) {          console.log("fail to getSavedRegion " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
     sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/ownerTypeView/:id', function (req, res) {
  var TrackingNo = req.params.id;
  // connect to your database
  sql.connect(config, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
         
      request.input('TrackingNo', TrackingNo);
      // query to the database and get the records
      request.query('SELECT a.OwnerTypeName as OwnerTypeName from dbo.tblOwnerType as a, dbo.tblPerson as b WHERE a.OwnerTypeId = b.PersonId', 
      function (err, recordset1) {
          
          if (err) {          
            console.log("fail to ownerTypeView " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
    sql.close();
          // send records as a response
          res.send(recordset1.recordset);
        }
      });
    }
  });
});

app.post('/userDetails', function (req, res) {
  var user_id = req.body.user_id;
  // connect to your database
  sql.connect(configUser, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
     // sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
      request.input('user_id', user_id);
      // query to the database and get the records
      request.query('SELECT Fname, Mname, Lname, Email, DOB FROM users WHERE id = @user_id', 
      function (err, recordset) {
          
          if (err) {          
            console.log("fail to Save_EntityOwner_SP " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
    sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

app.get('/sectors', function (req, res) {

  // connect to your database
  sql.connect(configBL, function (err) {
  
    if (err) {
      console.log("fail to connect to server " + err);
      //sql.close();
      res.send({status: "failed"});
    }else{

      // create Request object
      var request = new sql.Request();
         
      // query to the database and get the records
      request.query('SELECT * from BusinessSector', 
      function (err, recordset) {
          
          if (err) {          console.log("fail to sectors " + err);
         // sql.close();
          res.send({status: "failed"});
        }else{
           sql.close();
          // send records as a response
          res.send(recordset.recordset);
        }
      });
    }
  });
});

var server = app.listen(8088);
console.log('Hello ORS');