﻿//import { id } from "module";

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
                                <a href="Home\Product` + item.id + `">
                                       <img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" />
                                </a>
                            </div>
                            <div class="caption">
                                 <h4><a href="Home\Product` + item.id + `">` + item.name + `</a></h4>
                                 <p class="price">
                                    <span class="price-new">` + item.price + ` تومان</span> 
                                   
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
    let productHtml = ``;

    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductInfoById?producId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $('#titleLable').text(response.name);
            
                    productHtml += `<div class="col-sm-6">
                            <div class="image"><img class="img-responsive" itemprop="image" id="zoom_01" src="${response.coverImageUrl}" title="` + response.name + `" alt="` + response.name + `" data-zoom-image="image/product/macbook_air_1-500x500.jpg" /> </div>
                        </div>
                        <div class="col-sm-6">
                            <ul class="list-unstyled description">
                                <li><b>نام گروه :</b> <a href="#"><span itemprop="brand">` + response.catProductName + `</span></a></li>
                                <li><b>کد محصول :</b> <span itemprop="mpn">` + response.id + `</span></li>
                                <li><b>امتیازات خرید:</b> 700</li>
                                <li><b>وضعیت موجودی :</b> <span class="instock">موجود</span></li>
                            </ul>
                            <ul class="price-box">
                                <li class="price" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
                                <span class="price-old">` + response.price + `</span>
                                <span itemprop="price">` + response.price + `<span itemprop="availability" content="موجود"></span></span></li>
                                <li></li>                                
                            </ul>
                <div id="product">
                  
                  <div class="cart">
                    <div>
                      
                      <button class="btn-primary cartt" type="button"  productid="` + response.id + `" ><span>افزودن به سبد</span></button>
                    </div>
                    <div>
                      <button type="button" class="wishlist" onClick=""><i class="fa fa-heart"></i> افزودن به علاقه مندی ها</button>
                      <br />
                      <button type="button" class="wishlist" onClick=""><i class="fa fa-exchange"></i> مقایسه این محصول</button>
                    </div>
                  </div>
                </div>
                            <div class="rating" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
                                <meta itemprop="ratingValue" content="0" />
                                <p><span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i></span> <a onClick="$('a[href=\'#tab-review\']').trigger('click'); return false;" href=""><span itemprop="reviewCount">1 بررسی</span></a> / <a onClick="$('a[href=\'#tab-review\']').trigger('click'); return false;" href="">یک بررسی بنویسید</a></p>
                            </div>
                            <hr>
                            <div class="addthis_toolbox addthis_default_style"> <a class="addthis_button_facebook_like" fb:like:layout="button_count"></a> <a class="addthis_button_tweet"></a> <a class="addthis_button_google_plusone" g:plusone:size="medium"></a> <a class="addthis_button_pinterest_pinit" pi:pinit:layout="horizontal" pi:pinit:url="http://www.addthis.com/features/pinterest" pi:pinit:media="http://www.addthis.com/cms-content/images/features/pinterest-lg.png"></a> <a class="addthis_counter addthis_pill_style"></a> </div>
                            <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-514863386b357649"></script>

                        </div>`;


               
               
                $('#productkol').html(productHtml);

             
        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }


    });
}

function GetProductdescription() {

    let Idd = parseInt(window.location.pathname.replace('/Home/Product/', ''));
    console.log(Idd);
    let desHtml = ``;

    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductInfoById?producId=${Idd}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            

            jQuery.each(response, function (i, item) {
             
                console.log(item);
                //desHtml += item.;

                 
            });
            console.log(desHtml);
            $('.discriptionj').html(desHtml);


        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }


    });
}

function GetProductTopSel() {
    let ss = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetTopProductListWithRate",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            console.log(response);
            jQuery.each(response, function (i, item) {
                console.log(item);
                ss += `<div class="product-thumb clearfix">
                        <div class="image"><a href="Home/Product/` + item.id + `"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
                        <div class="caption">
                            <h4><a href="Home\Product` + item.id + `">` + item.name + ` </a></h4>
                            <p class="price">` + item.price + ` تومان</p>
                                                    </div>
                        <div class="button-group">
                            <button class="btn-primary cartt" type="button"  productid="` + item.id + `" ><span>افزودن به سبد</span></button>
                            <div class="add-to-links">
                                <button type="button" data-toggle="tooltip" title="Add to Wish List" onClick=""><i class="fa fa-heart"></i></button>
                                <button type="button" data-toggle="tooltip" title="مقایسه this محصولات" onClick=""><i class="fa fa-exchange"></i></button>
                            </div>
                        </div>
                    </div>`;

            });



            $('#DivMahsulatBartar').html(ss);

        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {

            $(".owl-carousel.product_carousel, .owl-carousel.latest_category_carousel, .owl-carousel.latest_brands_carousel, .owl-carousel.related_pro").owlCarousel({
                itemsCustom: [[320, 1], [600, 2], [768, 3], [992, 5], [1199, 5]],
                lazyLoad: true,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                scrollPerPage: true
            });
        }



    });
}

$(document).ready(() => {
    
    GetProductVige();
    GetProductTopSel();
    Product();   
    GetProductdescription();

});