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
            

            jQuery.each(response, function (i, item) {
             
                console.log(item);
                Html += `<div class="col-sm-6">
                            <div class="image"><img class="img-responsive" itemprop="image" id="zoom_01" src="` + item.coverImageUrl + `" title="` + item.name + `" alt="` + item.name + `" data-zoom-image="image/product/macbook_air_1-500x500.jpg" /> </div>
                        </div>
                        <div class="col-sm-6">
                            <ul class="list-unstyled description">
                                <li><b>نام گروه :</b> <a href="#"><span itemprop="brand">` + item.catProductName + `</span></a></li>
                                <li><b>کد محصول :</b> <span itemprop="mpn">` + item.id + `</span></li>
                                <li><b>امتیازات خرید:</b> 700</li>
                                <li><b>وضعیت موجودی :</b> <span class="instock">موجود</span></li>
                            </ul>
                            <ul class="price-box">
                                <li class="price" itemprop="offers" itemscope itemtype="http://schema.org/Offer"><span class="price-old">12 میلیون تومان</span> <span itemprop="price">10 میلیون تومان<span itemprop="availability" content="موجود"></span></span></li>
                                <li></li>
                                <li>بدون مالیات : 9 میلیون تومان</li>
                            </ul>

                            <div class="rating" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
                                <meta itemprop="ratingValue" content="0" />
                                <p><span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-1x"></i><i class="fa fa-star-o fa-stack-1x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-1x"></i></span> <a onClick="$('a[href=\'#tab-review\']').trigger('click'); return false;" href=""><span itemprop="reviewCount">1 بررسی</span></a> / <a onClick="$('a[href=\'#tab-review\']').trigger('click'); return false;" href="">یک بررسی بنویسید</a></p>
                            </div>
                            <hr>

                            <div class="addthis_toolbox addthis_default_style"> <a class="addthis_button_facebook_like" fb:like:layout="button_count"></a> <a class="addthis_button_tweet"></a> <a class="addthis_button_google_plusone" g:plusone:size="medium"></a> <a class="addthis_button_pinterest_pinit" pi:pinit:layout="horizontal" pi:pinit:url="http://www.addthis.com/features/pinterest" pi:pinit:media="http://www.addthis.com/cms-content/images/features/pinterest-lg.png"></a> <a class="addthis_counter addthis_pill_style"></a> </div>
                            <script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=ra-514863386b357649"></script>

                        </div>`;

                 
            });
            console.log(Html);
            $('.productkol').html(Html);


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