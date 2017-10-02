$(document).ready(function () {

    let arrayHolydays = [];

    $('#datepicker').datepicker({
        inline: true,
        altField: '#startDate',

    });


    //$("#datepicker1").datepicker();


     let showCalendar  = function(){
         
        let nroDays = 0;    
        if($("#numOfDays").val().toString().trim() == ""){
            nroDays = 0;
        }else{
            nroDays = parseInt($("#numOfDays").val());
        }

         
        
         let  date1 = $("#datepicker").val();
         let date2 = $("#datepicker").datepicker('getDate');
         let tempDate1 = $("#datepicker").datepicker('getDate');
         date2.setDate(date2.getDate() + nroDays - 1);
         let tempDate2 = date2;
         date2 = (date2.getMonth() + 1) + '/' + date2.getDate() + '/' + date2.getFullYear();
        
         let nroMonths =parseInt(monthDiff(tempDate1,tempDate2));
        
         $("#datepicker1").datepicker("destroy");
         $("#datepicker1").datepicker({
             numberOfMonths: nroMonths + 1,
             beforeShowDay: highlightDays  
         });
         $("#datepicker1").datepicker("option", "minDate", date1);
         $("#datepicker1 ").datepicker("option","maxDate",date2);

     }


     let highlightDays = function (date) {
        for (var i = 0; i < arrayHolydays.length; i++) {
            if (new Date(arrayHolydays[i]).toString() == date.toString()) {
                return [true, 'highlight'];
            }
        }
        return [true, ''];

    } 

    $('#viewCalendar').click(function(){
        let countryCode = '';
        countryCode = $('#countryCode').val();
        getHolyDays(countryCode);       
        showCalendar();
    });

    let monthDiff = function(date1,date2){
        let diffYears = date2.getFullYear()-date1.getFullYear();
        let diffMonths = date2.getMonth()-date1.getMonth();
        let diffDays = date2.getDate()-date1.getDate();

        let months = (diffYears*12 + diffMonths);
        if(diffDays>0) {
            months += '.'+diffDays;
        } else if(diffDays<0) {
            months--;
            months += '.'+(new Date(date2.getFullYear(),date2.getMonth(),0).getDate()+diffDays);
        }

        return months;
    }


    let getHolyDays = function (sCountryCode) {
        $.ajax({
            method: "get",
            dataType: 'json',
            async: true,
            url: "https://holidayapi.com/v1/holidays",
            data: {
                key: "79659086-e899-4cf1-ab13-7e5fad886fa9",
                country: sCountryCode,
                year: 2017
            },
            beforeSend: function () {
                console.log("Getting Holidays ... ");
            },
            success: function (Response) {
                console.log("Success");
                if (Response.status === 200) {
                    Object.keys(Response.holidays).forEach(function (key, keyIndex) {

                        arrayHolydays.push(convertDate(key));

                    });

                    console.log(arrayHolydays);
                }
                                    
            },
            error: function (err) {
                console.log(err);
            }
        });
    };  



    let convertDate = function (dateString) {
        let newDate;

        let myDate = dateString.split("-");
        if (parseInt(myDate[1]) < 10 && myDate[1].length == 1)
            myDate[1] = "0" + myDate[1]
        if (parseInt(myDate[2]) < 10 && myDate[2].length == 1)
            myDate[2] = "0" + myDate[2]
            
        newDate = myDate[1] + "/" + myDate[2] + "/" + myDate[0];

        return newDate

    }


});