//import { id } from "module";

let Id = 0;

function GetProductVige() {
    let Html = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetTopProductListWithRate",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {


            jQuery.each(response, function (i, item) {
                Html += `<div class="product-thumb clearfix vighe">
                            <div class="image">
                                <a href="Home/Product/` + item.id + `">
                                       <img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" />
                                </a>
                            </div>
                            <div class="caption">
                                 <h4><a href="Home\Product?` + item.id + `">` + item.name + `</a></h4>
                                 <p class="price">
                                    <span class="price-new">` + item.price + `</span> 
                                    <span class="price-old">` + item.price + `</span> 
                                    <span class="saving">0</span> 
                                 </p>
                            </div>
                        </div>`;
            });

            $('.vighe').html(Html);


        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }


    });
}

function Product() {

    let Id = parseInt(window.location.pathname.replace('/Home/Product/', ''));
    console.log(Id);
    let Html = ``;

    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductInfoById?producId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);

            jQuery.each(response, function (i, item) {
             

                Html += `<div class="product-thumb clearfix vighe">
                            <div class="image">
                                <a href="Home/Product/` + item.id + `">
                                       <img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" />
                                </a>
                            </div>
                            <div class="caption">
                                 <h4><a href="Home\Product?` + item.id + `">` + item.name + `</a></h4>
                                 <p class="price">
                                    <span class="price-new">` + item.price + `</span> 
                                    <span class="price-old">` + item.price + `</span> 
                                    <span class="saving">0</span> 
                                 </p>
                            </div>
                        </div>`;

                 
            });

            $('.product').html(Html);


        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }


    });
}



$(document).ready(() => {
    
    GetProductVige();
    Product();
});