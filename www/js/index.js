/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

jQuery.support.cors = true;
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function scan() {
    var url = 'http://ec2-54-191-94-161.us-west-2.compute.amazonaws.com/post-validateb64.php'
    //var data = '/Td6WFoAAATm1rRGAgAhARwAAAAQz1jM4AeWBHNdADIaSmd7v3oHsYKnHgWNbyTSIlw3Q7yFKNxx+SuT68F3+diwtRU/TNXHwXeSwI/9pN9ez7s7MfnkYW9RqDWobQSbOLPe77QEB6z6IguvExuVu/FbZsDXqnjs7z8ZBGybrN1Wkc5UlAylCraESR/6FNEtZoNmCxH+ZVw/0+I66cbd9arrUXO7VwdMOKr5Wtvmabff3DydBtjMCC9r93cPZMCB2r9kYbJArDKqdJkuBrpd8HYnxybiYqbm9iw7hXfaxxT7iXIhBAxMt8POMI3BGKIwijIXZeiTTk5e50ghGfKNcpWKKpUl54RGN4+lxl4qkyPxIj4BX72ivfTtOkSYJrlwq8OnXwqf+MNxaIi0F5OFbus/yCNtiXrVz9T2v24mlHbvx8vJ1WRhvpoxADWW1fS64RJXUP4e39O8kE0niU1UOCzuYt/8cvoeK2AuyflWvMf4ZKJMDPj1wDqZrxwDtfFl80pboRHYW1RBTkgHs8iOnr6mxjoGwJP2vta0IFsu+CYSWDiVU3EvYU75yZGK4Cs1Pid95YTxrNaRN704ZPFCIGlRO2FgMtPwPtM12TXxI0ra3paHCs8qXX6HfYLwqYBYZKsmPQvSWc+sj5hJE90wuH1XFgWrGHM8b1d++TrgtIX5KzZYnD1PPH4JUYWI5yJLdbPpkJo1ATMyNxCO5unYRj0BcMJMSHiSp2E+c2Opso62dgmw5hThOY9wJAgEp8pBvlh52BEf9ODBrLuBiD2KOu9xN+CJiGSoTlOr5d+2kZlgsbHP0DhXHcmMXry7FqunNL6OmhJzMtChvJ8cRncHLcCQro2S/iDIKaY00U3e3C5viXt5jrFJKi7p7URotn1T5B5wmWpR8NCJ/67U+5emzU4kItS5P9UvNSHdRMV9tKOOSIgnEv3AyZ8SW6Dvsf0t/7EMXTlHlLqgY3RiDy2H0y/Xv4UGS/OXpvHIhECuMRuRETP5VxNN9zJMylIxKrie/ALVZ53YKYNG+MAZV/RKCFp0HArn+1fPwbCnuHpOa0UJBighu+9ZQTrfCE9zpU8HOq5EAK+1SSF4i/AG1tWEqGiFJU4PaaRazQvNZi8prom8bvj4TIEpR23JxfarPxF2fv/5xiYdk2rukWFdPDtIAXm2U5TFVTIYUGwehFlU04I7csRnlzWKio+jLQpcEK3pmA4l4egZAKUEsi2ktZG2HWVk+kxwNUov2Ksvs1UbBZNO+xreDFMul5IEdBgZJ65kSFG7jKuaT3XxsGq+V84l7oGGcKS4qlAA7bZHtL7f6jsOtAgleufah1I614r8Ng9kXVUMjev+YYEEDZ11d9i6kTRvleg0qvWXvQg2G5FO8navGKOOwC3H1PemMDsB56snijPkFs0S1nydrS3iWsyutcpRjLRUlccBFJHrTdXLb7Q6ZIrecZxyVqUBPLUoFU0xpudtRrd13rKOnyu5DZHlSGlQlYT3oXIQJsG+VBLITkHM32iNkI+F/RvXxE9swP4ZvnmKJ28Phwq8DurbpW4wErmeAAAK5+QlCEdLMQABjwmXDwAAgY5oCrHEZ/sCAAAAAARZWg=='

    cordova.plugins.barcodeScanner.scan(
      function (result) {
        //console.log(result)
        alert(getByteLen(result.text));
        alert(lengthInUtf8Bytes(result.text));
        //alert(btoa(result.text))
        var request = $.ajax({
          url: url,
          type: "POST",
          data: btoa(result.text)
        });

        request.success(function(result){
          alert(result)
        })

        request.error(function(err){
          alert(err)
        })

        request.done(function(result) {
          //alert(result)
        })
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

function getByteLen(normal_val) {
    // Force string type
    normal_val = String(normal_val);

    var byteLen = 0;
    for (var i = 0; i < normal_val.length; i++) {
        var c = normal_val.charCodeAt(i);
        byteLen += c < (1 <<  7) ? 1 :
                   c < (1 << 11) ? 2 :
                   c < (1 << 16) ? 3 :
                   c < (1 << 21) ? 4 :
                   c < (1 << 26) ? 5 :
                   c < (1 << 31) ? 6 : Number.NaN;
    }
    return byteLen;
}

function lengthInUtf8Bytes(str) {
  // Matches only the 10.. bytes that are non-initial characters in a multi-byte sequence.
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

