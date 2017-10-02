$(document).ready(function () {

    $('#datepicker').datepicker({
        inline: true,
        altField: '#startDate',

    });


    $("#datepicker1").datepicker();


     let showCalendar  = function(){
         
        let nroDays = 0;
        if($("#numOfDays").val().toString().trim() == ""){
            nroDays = 0;
        }else{
            nroDays = parseInt($("#numOfDays").val());
        }

         
      
         let  date1 = $("#datepicker").val();
         let date2 = $("#datepicker").datepicker('getDate');
         date2.setDate(date2.getDate() + nroDays - 1);
         console.log(date2);
         date2 = (date2.getMonth() + 1) + '/' + date2.getDate() + '/' + date2.getFullYear();

         $("#datepicker1").datepicker("destroy");
         $("#datepicker1").datepicker({});
         $("#datepicker1").datepicker("option", "minDate", date1);
         $("#datepicker1 ").datepicker("option","maxDate",date2);

     }


    $('#viewCalendar').click(function(){
        showCalendar();
    });



});