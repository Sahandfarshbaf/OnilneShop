
let Id = 0;
function Getcart() {

    var Html_Dg = ''  
    $.ajax({
        type: "post",
        async: false,
        url: "/api/CustomerOrder/InsertCustomerOrder",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
        },
        failure: function (result) {

        },
        complete: function () {
         
 
        }
    });


};

$(document).ready(() => {
    alert("1");
    $(document.body).on('click', '#viwesa', () => {
        alert("2");
        Getcart();     
    });  
});