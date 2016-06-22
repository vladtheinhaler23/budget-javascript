
$(".button-collapse").sideNav();
$(document).ready(function(){
    $('.parallax').parallax();
  });

    $(document).ready(function(){
      $('.collapsible').collapsible({
        accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });
    });

      $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
      });
      $(document).ready(function() {
        $('select').material_select();
      });
      $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 70 // Creates a dropdown of 15 years to control year
      });
