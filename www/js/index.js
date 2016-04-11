jQuery.support.cors = true;

// Initialize app
var myApp = new Framework7({
  material: true, //enable Material theme
  template7Pages: true
});


// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});
  
// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");
});

// Handle scan Event
$$('.scan_button').on('click', scan);


// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }
})

// // Option 2. Using live 'pageInit' event handlers for each page
// $$(document).on('pageInit', '.page[data-page="about"]', function (e) {
//     // Following code will be executed for page with data-page attribute equal to "about"
//     myApp.alert('Here comes About page');
// })

function scan() {
    var url = 'http://ec2-54-191-94-161.us-west-2.compute.amazonaws.com/post-validateb64.php'
    // var url = 'validreponse.json'

    cordova.plugins.barcodeScanner.scan(
      function (result) {
        var request = $.ajax({
          url: url,
          type: "POST",
          data: result.text,
          success: requestSuccess,
          error: requestError,
          done: requestDone
        });

        function requestSuccess(result){
          //console.log('success' + result)
          // var parsedResult = {}
          try{
            parsedResult = JSON.parse(result)
          } catch(e){
            console.log(e)
          }
         //alert(result)
          //console.log(parsedResult)
          // if(parsedResult.validation.status === 0){
            mainView.router.load({
              url: 'validscan.html',
              context: {
                header: parsedResult.diploma.header,
                degree: parsedResult.diploma.degree,
                tail: parsedResult.diploma.tail,
                person: parsedResult.diploma.person,
                footer: parsedResult.diploma.footer,
                place: parsedResult.diploma.place,
                date: parsedResult.diploma.date
              }
            })
            //mainView.router.loadPage('validscan.html');
          // }
          //else{
            //alert(result)
          //}
        }

        function requestError(err){
          console.log(err)
          alert('err')
        }

        function requestDone(result) {
          console.log('done' + result)
          //alert(result)
        }
          // alert("We got a barcode\n" +
          //       "Result: " + result.text + "\n" +
          //       "Format: " + result.format + "\n" +
          //       "Cancelled: " + result.cancelled);
      }, 
      function (error) {
          alert("Scanning failed: " + error);
      },
      {'SCAN_MODE': 'QR_CODE_MODE'}
   );
}
