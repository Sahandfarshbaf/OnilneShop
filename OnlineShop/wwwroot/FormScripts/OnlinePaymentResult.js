
let Authority = '';
let Status = '';

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};



function VerifyPayment() {


    jQuery.ajax({
        type: "Get",
        url: `/api/CustomerOrderPayment/VerifyPayment?Authority=${Authority}&Status=${Status}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (response) {

           
            alert(1)
            if (response === "error") {
                $('#ok').hide();
                $('#nok').show();
                $('#listProduct1').hide();
                $('#listSefarsh1').hide();

            } else {
                $('#ok').show();
                $('#nok').hide();
                $('#listProduct1').hide();
                $('#listSefarsh1').show();

            }

        },
        error: function (response) {

            console.log(response);
          

        },
        complete: function () {
          
        }
    });
}




$(document).ready(() => {


     Authority = getUrlParameter('Authority');
    Status = getUrlParameter('Status');
    VerifyPayment();
   

});