$(document).ready(function () {

    $('#datepicker').datepicker({
        inline: true,
        altField: '#startDate',

    });


    $("#datepicker1").datepicker();


     let showCalendar  = function(){
         let nroDays = 0;
         nroDays = $("#numOfDays").val();
      
     }


    $('#viewCalendar').click(function(){
        showCalendar();
    });



});