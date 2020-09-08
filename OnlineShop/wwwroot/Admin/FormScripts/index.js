
let Id = 0;

function GetProductVige() {
    let Html = ``;
    alert("1")
    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetTopProductListWithRate",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("2")
            console.log(response);        
            let Id = 0;

            jQuery.each(response, function (i, item) {

                Html += `<div class="product-thumb clearfix vighe">
                            <div class="image">
                                <a href="Home\Product?` + + `">
                                       <img src="` + + `" alt="` + + `" title="` + + `" class="img-responsive" /></a>
                            </div>
                            <div class="caption">
                                 <h4><a href="Home\Product">` + + `</a></h4>
                                 <p class="price">
                                    <span class="price-new">` + + `</span> 
                                    <span class="price-old">` + + `</span> 
                                    <span class="saving">` + + `</span> 
                                 </p>
                            </div>
                        </div>`;
            });       

            $('.vighe').html(Html);

        },
      

    });
}
function GetProductTopSel() {
    let Html = ``;
    alert("1")
    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetTopProductListWithRate",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("2")
            console.log(response);        
            let Id = 0;

            jQuery.each(response, function (i, item) {

                Html += `<div class="product-thumb clearfix vighe">
                            <div class="image">
                                <a href="Home\Product?` + + `">
                                       <img src="` + + `" alt="` + + `" title="` + + `" class="img-responsive" /></a>
                            </div>
                            <div class="caption">
                                 <h4><a href="Home\Product">` + + `</a></h4>
                                 <p class="price">
                                    <span class="price-new">` + + `</span> 
                                    <span class="price-old">` + + `</span> 
                                    <span class="saving">` + + `</span> 
                                 </p>
                            </div>
                        </div>`;
            });       

            $('.vighe').html(Html);

        },
      

    });
}


 



$(document).ready(() => {

    GetProductVige();

    GetProductTopSel();


  
});