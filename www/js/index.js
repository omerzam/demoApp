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
    //var data = '/Td6WFoAAATm1rRGAgAhARwAAAAQz1jM4AeWBHNdADIaSmd7v3oHsYKnHgWNbyTSIlw3Q7yFKNxx+SuT68F3+diwtRU/TNXHwXeSwI/9pN9ez7s7MfnkYW9RqDWobQSbOLPe77QEB6z6IguvExuVu/FbZsDXqnjs7z8ZBGybrN1Wkc5UlAylCraESR/6FNEtZoNmCxH+ZVw/0+I66cbd9arrUXO7VwdMOKr5Wtvmabff3DydBtjMCC9r93cPZMCB2r9kYbJArDKqdJkuBrpd8HYnxybiYqbm9iw7hXfaxxT7iXIhBAxMt8POMI3BGKIwijIXZeiTTk5e50ghGfKNcpWKKpUl54RGN4+lxl4qkyPxIj4BX72ivfTtOkSYJrlwq8OnXwqf+MNxaIi0F5OFbus/yCNtiXrVz9T2v24mlHbvx8vJ1WRhvpoxADWW1fS64RJXUP4e39O8kE0niU1UOCzuYt/8cvoeK2AuyflWvMf4ZKJMDPj1wDqZrxwDtfFl80pboRHYW1RBTkgHs8iOnr6mxjoGwJP2vta0IFsu+CYSWDiVU3EvYU75yZGK4Cs1Pid95YTxrNaRN704ZPFCIGlRO2FgMtPwPtM12TXxI0ra3paHCs8qXX6HfYLwqYBYZKsmPQvSWc+sj5hJE90wuH1XFgWrGHM8b1d++TrgtIX5KzZYnD1PPH4JUYWI5yJLdbPpkJo1ATMyNxCO5unYRj0BcMJMSHiSp2E+c2Opso62dgmw5hThOY9wJAgEp8pBvlh52BEf9ODBrLuBiD2KOu9xN+CJiGSoTlOr5d+2kZlgsbHP0DhXHcmMXry7FqunNL6OmhJzMtChvJ8cRncHLcCQro2S/iDIKaY00U3e3C5viXt5jrFJKi7p7URotn1T5B5wmWpR8NCJ/67U+5emzU4kItS5P9UvNSHdRMV9tKOOSIgnEv3AyZ8SW6Dvsf0t/7EMXTlHlLqgY3RiDy2H0y/Xv4UGS/OXpvHIhECuMRuRETP5VxNN9zJMylIxKrie/ALVZ53YKYNG+MAZV/RKCFp0HArn+1fPwbCnuHpOa0UJBighu+9ZQTrfCE9zpU8HOq5EAK+1SSF4i/AG1tWEqGiFJU4PaaRazQvNZi8prom8bvj4TIEpR23JxfarPxF2fv/5xiYdk2rukWFdPDtIAXm2U5TFVTIYUGwehFlU04I7csRnlzWKio+jLQpcEK3pmA4l4egZAKUEsi2ktZG2HWVk+kxwNUov2Ksvs1UbBZNO+xreDFMul5IEdBgZJ65kSFG7jKuaT3XxsGq+V84l7oGGcKS4qlAA7bZHtL7f6jsOtAgleufah1I614r8Ng9kXVUMjev+YYEEDZ11d9i6kTRvleg0qvWXvQg2G5FO8navGKOOwC3H1PemMDsB56snijPkFs0S1nydrS3iWsyutcpRjLRUlccBFJHrTdXLb7Q6ZIrecZxyVqUBPLUoFU0xpudtRrd13rKOnyu5DZHlSGlQlYT3oXIQJsG+VBLITkHM32iNkI+F/RvXxE9swP4ZvnmKJ28Phwq8DurbpW4wErmeAAAK5+QlCEdLMQABjwmXDwAAgY5oCrHEZ/sCAAAAAARZWg=='
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        var request = $$.ajax({
          url: url,
          type: "POST",
          data: result.text,
          success: requestSuccess,
          error: requestError,
          done: requestDone
        });

        function requestSuccess(result){
          //console.log('success' + result)
           var parsedResult = {}
          try{
            parsedResult = JSON.parse(result)
          } catch(e){
            console.log(e)
          }
         //alert(result)
          console.log(result)
          console.log(parsedResult)
          if(parsedResult.validation.status === 0){
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
          }
          else{
            alert(result)
          }
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
