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
                                    <span class="price-new">` + item.price + ` تومان</span> 
                                    <span class="price-old">` + item.price + `تومان</span> 
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

function GetProductList() {



    let cateHtml = ``;

    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductByParentCatId?catId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            jQuery.each(response, function (i, item) {


                cateHtml += `<div class="product-layout product-list col-xs-12">
                        <div class="product-thumb">
                            <div class="image"><a href="product.html"><img src="${item.coverImageUrl}" alt="${item.name}" title="${item.name}" class="img-responsive" style="width:150px;height:150px;" /></a></div>
                            <div>
                                <div class="caption">
                                    <h4><a href="product.html"> ${item.name} </a></h4>`;
                if (item.offerValue !== 0) {

                    cateHtml += `<p class="price"> <span class="price-new">${item.priceAfterOffer} تومان</span> <span class="price-old">${item.price} تومان</span><span class="saving">-${item.offerValue}%</span></p>`;
                } else {

                    cateHtml += `<p class="price"> <span class="price-new">${item.price} تومان</span></p>`;
                }

                cateHtml += ` </div>
                                <div class="button-group">
                                    <button class="btn-primary cartt" type="button"  productid="` + item.id + `" ><span>افزودن به سبد</span></button>
                                    <div class="add-to-links">
                                        <button type="button" data-toggle="tooltip" title="افزودن به علاقه مندی ها" onClick=""><i class="fa fa-heart"></i> <span>افزودن به علاقه مندی ها</span></button>
                                        <button type="button" data-toggle="tooltip" title="مقایسه این محصول" onClick=""><i class="fa fa-exchange"></i> <span>مقایسه این محصول</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;


            });

            $('.products-category').html(cateHtml);


        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }


    });
}

function GetImproveSearch() {



    let cateHtml = ``;

    jQuery.ajax({
        type: "Get",
        url: `/api/CatProduct/GetCatProductListByParentId?catId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            if (response.length == 0) {
                $('#ImproveSearch').hide();

            }
            else {

                jQuery.each(response, function (i, item) {

                    cateHtml += ` <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4"> <a href="/Home/Category/${item.id}"><img src="${item.icon}" alt="${item.name}" /></a> <a href="/Home/Category/${item.id}">${item.name} (${item.productCount})</a> </div>`;

                });
                $('.category-list-thumb').html(cateHtml);
                $('#ImproveSearch').show();
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
    Id = parseInt(window.location.pathname.replace('/Home/Category/', ''));
    GetProductVige();
    GetProductList();
    GetImproveSearch();
});