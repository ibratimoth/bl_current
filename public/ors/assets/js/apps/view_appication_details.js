function firstView()
{ 
    // $('#paymentId')
    //     .empty()
    //     // $(".unservayed").hide();
        $.ajax({
            url: "/firstStageView",
            type: 'GET',
            contentType: 'application/json', // added data type
            success: function(response) {
            if(typeof(response) === "string"){response = JSON.parse(response)}
            
            var ServiceCode = response.ServiceCode;
            
            var txtBox9 = document.getElementById('serviceCode');
            txtBox9.value = ServiceCode;
            var fname = response.person[0].fname;
            var mname = response.person[0].mname;
            var lname = response.person[0].lname;
            var gender = response.person[0].gender;
            var dob = response.person[0].date_birth;
            var citizen = response.person[0].citizen;

            var trackingNo = response.trackNo;
            var OrigTypeName = response.OrigTypeName;
            var AplicationID = response.AplicationID;
            var OwnerSubTypeName = response.OwnerSubTypeName;
            var OwnerSubTypeId = response.OwnerSubTypeId;
            var EntityName = response.EntityName;
            var AplicationTIN = response.AplicationTIN;
            var BusinessClassId = response.BusinessClassId;
            var BusinessTypeName = response.BusinessTypeName;
            var BusinessTypeId = response.BusinessTypeId;
            var AreaTypeName = response.AreaTypeName;
            var Road = response.Road;
            var PostCode = response.PostCode;
            var Street = response.Street;
            var PoBox = response.PoBox;
            var CompanyPhone = response.CompanyPhone;
            var CompanyEmail = response.CompanyEmail;
            var UnsurveyedArea = response.UnsurveyedArea;
            var ApplicationStageId = response.ApplicationStageId;
            var PlotNo = response.PlotNo;
            var BlockNo = response.BlockNo;
            var HouseNo = response.HouseNo;
            var RegionName = response.RegionName;
            var DistrictName = response.DistrictName;
            var WardName = response.WardName;ControlNo;
            var DistrictCode = response.DistrictCode;
            var RegionCode = response.RegionCode;
            var AreaTypeId = response.AreaTypeId;
            var RegNo = response.RegNo;
            var BusinessLicOwnerTypeId = response.BusinessLicOwnerTypeId;
            var WardId = response.WardId;
            var txtBox = document.getElementById('tracking_number');
            txtBox.value = trackingNo;
            // var txtBoxtrackNo = document.getElementById('trackNo');
            // txtBoxtrackNo.value = trackingNo;
            // var txtBox1 = document.getElementById('fname');
            // txtBox1.value = fname;
            // var txtBox2 = document.getElementById('mname');
            // txtBox2.value = mname;
            // var txtBox3 = document.getElementById('lname');
            // txtBox3.value = lname;
            // var txtBox4 = document.getElementById('gender');
            // txtBox4.value = gender;
            // var txtBox5 = document.getElementById('dob');
            // txtBox5.value = dob;
            // var txtBox6 = document.getElementById('citizen');
            // txtBox6.value = citizen;
            // var txtBox7 = document.getElementById('busorigintype');
            // txtBox7.value = OrigTypeName;
            // var txtBox8 = document.getElementById('applicationId');
            // txtBox8.value = AplicationID;
            // var tin_no = document.getElementById('tin_no');
            // tin_no.value = AplicationTIN;

            // // var txtBox9 = document.getElementById('typelist');
            // // txtBox9.value = 'BusinessTypeName';
            // // var txtBox10 = document.getElementById('addressAreaB');
            // // txtBox10.value = AreaTypeName;
            // var txtBox11 = document.getElementById('inputroad');
            // txtBox11.value = Road;
            // var txtBox12 = document.getElementById('postcode');
            // txtBox12.value = PostCode;
            // var txtBox13 = document.getElementById('inputEmail4Street');
            // txtBox13.value = Street;
            // var txtBox14 = document.getElementById('inputEmail4pobox');
            // txtBox14.value = PoBox;
            // var txtBox15 = document.getElementById('inputEmail4phn');
            // txtBox15.value = CompanyPhone;
            // var txtBox16 = document.getElementById('inputEmail4comp');
            // txtBox16.value = CompanyEmail;
            // var txtBox17 = document.getElementById('unservayedarea');
            // txtBox17.value = UnsurveyedArea;
            // var txtBox18 = document.getElementById('plot_no');
            // txtBox18.value = PlotNo;
            // var txtBox19 = document.getElementById('block_no');
            // txtBox19.value = BlockNo;
            // var txtBox20 = document.getElementById('house_no');
            // txtBox20.value = HouseNo;
            // var txtBox21 = document.getElementById('businessLicenceClassId');
            // txtBox21.value = BusinessClassId;
            // var txtBox22 = document.getElementById('nida_no');
            // txtBox22.value = RegNo;

            // var txtBox24 = document.getElementById('reg_no_other');
            // txtBox24.value = RegNo;
            // var txtBox24 = document.getElementById('bn_no');
            // txtBox24.value = RegNo;
            //     var txtBox23 = document.getElementById('inco_no');
            //     txtBox23.value = RegNo;
            //     var company_name = document.getElementById('company_name');
            //     company_name.value = EntityName;
            // var paymentDetails = response.payment;
            // var invoiceDetails = response.invoiceData;

            // document.getElementById("loading").style.display = "none";
            // document.getElementById("mask").style.display = "none";
            // alert(paymentDetails[0].AmountTotal)
            // // alert(AmountTotal)
            // if(typeof paymentDetails[0].AmountTotal == 'undefined' || paymentDetails[0].AmountTotal == ''){
            //     $('.paymentDiv').hide()
            //     var row = $('<tr><td class="text-black cheque-amt tacker" id="tacker">-</td>'+
            //     '<td class="text-black">-</td>'+
            //     '<td class="text-black">No control Number yet</td>'+
            //     '<td class="text-black">-</td>'+
            //         '</tr>');
            // $('#paymentId').append(row);
            // }else if(paymentDetails[0].AmountTotal > 0){
            //     $('.paymentDiv').show()
            //     for(var i = 0; i < paymentDetails.length; i++){
            //     var AmountTotal = paymentDetails[i].AmountTotal;
            //     var ServiceName = paymentDetails[i].ServiceName;
            //     var ExpireDate = paymentDetails[i].ExpireDate;
            //     var ControlNo = paymentDetails[i].ControlNo;
            //     var CurrencyUsed = paymentDetails[i].CurrencyUsed;
            //     var nf = Intl.NumberFormat();
            //     var row = $('<tr><td class="text-black cheque-amt tacker" id="tacker">' + ServiceName+ '</td>'+
            //     '<td class="text-black">' + CurrencyUsed + " " + nf.format(AmountTotal) + '</td>'+
            //     '<td class="text-black">' + ControlNo + '</td>'+
            //     '<td class="text-black">' + ExpireDate + '</td>'+
            //         '</tr>');
            // $('#paymentId').append(row);
            // }
            // }
            // $("#busowntype").append(`<option value='${BusinessLicOwnerTypeId}'> ${OwnerSubTypeName}</option>`)
            // $("#addressAreaB").append(`<option value='${AreaTypeId}'> ${AreaTypeName}</option>`)
            // $("#typelist").append(`<option value='${BusinessTypeId}'> ${BusinessTypeName}</option>`)
            // $("#regionlistB").append(`<option value='${RegionCode}'> ${RegionName}</option>`)
            // $("#districtlistB").append(`<option value='${DistrictCode}'> ${DistrictName}</option>`)
            // // $("#districtlistB").append(`<option value='${DistrictName}'> ${DistrictName}</option>`)
            // $("#wardIdB").append(`<option value='${WardId}'> ${WardName}</option>`)
            // if(AreaTypeId === '1'){
            //     $(".maeneo").show();
            //     // $(".locationB").show();
            //     $(".unservayedB").hide();
            // }if(AreaTypeId === '2'){
            //     $(".maeneo").hide();
            //     // $(".locationB").hide();
            //     $(".unservayedB").show();
            // }if(AreaTypeId === '--Select--'){
            //     $(".maeneo").hide();
            //     $(".locationB").hide();
            //     $(".unservayedB").hide();
            // }
// comment();
// // getBusOwnTypeData();
// regGetAddressArea();
// regB();
// getAttachments();
            // 


            }
            
        });

}
window.onload = firstView;