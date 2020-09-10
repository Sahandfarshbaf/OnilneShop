
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


            let Id = 0;
            var image = "/Files/ProductImages/Capture.JPG"

            jQuery.each(response, function (i, item) {
                Html += `<div class="product-thumb clearfix vighe">
                            <div class="image">
                                <a href="Home\Product?` + item.id + `">
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
                ss += `<div class="product-thumb clearfix">
                        <div class="image"><a href="Home\Product"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
                        <div class="caption">
                            <h4><a href="Home\Product">` + item.name + ` </a></h4>
                            <p class="price">` + item.price + ` </p>
                            <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                        </div>
                        <div class="button-group">
                            <button class="btn-primary" type="button" onClick=""><span>افزودن به سبد</span></button>
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



function GetProductTopNew() {
    let newpro = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetLatestProductList",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
            jQuery.each(response, function (i, item) {
                newpro += `<div class="product-thumb clearfix">
                        <div class="image"><a href="Home\Product"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
                        <div class="caption">
                            <h4><a href="Home\Product">` + item.name + ` </a></h4>
                            <p class="price">` + item.price + ` </p>
                        </div>
                        <div class="button-group">
                            <button class="btn-primary" type="button" onClick=""><span>افزودن به سبد</span></button>
                            <div class="add-to-links">
                                <button type="button" data-toggle="tooltip" title="Add to Wish List" onClick=""><i class="fa fa-heart"></i></button>
                                <button type="button" data-toggle="tooltip" title="مقایسه this محصولات" onClick=""><i class="fa fa-exchange"></i></button>
                            </div>
                        </div>
                    </div>`;

            });
         
            console.log(newpro);

            $('#DivMahsulatjadid').html(newpro);

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
function GetProductTopBazdid() {
    let Bazdid = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetMostSeenProductList",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
            jQuery.each(response, function (i, item) {
                Bazdid += `            <div class="product-thumb">
                <div class="image"><a href="Home\Product"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
                <div class="caption">
                    <h4><a href="Home\Product">` + item.name + ` </a></h4>
                    <p class="price">` + item.price + `  تومان </p>
                    <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                </div>
                <div class="button-group">
                    <button class="btn-primary" type="button" onClick=""><span>افزودن به سبد</span></button>
                    <div class="add-to-links">
                        <button type="button" data-toggle="tooltip" title="افزودن به علاقه مندی" onClick=""><i class="fa fa-heart"></i></button>
                        <button type="button" data-toggle="tooltip" title="افزودن به مقایسه" onClick=""><i class="fa fa-exchange"></i></button>
                    </div>
                </div>
            </div>`;

            });




            console.log(Bazdid);

            $('#DivMahsulatTopBazdid').html(Bazdid);

        },
        error: function (response) {

            console.log(response);
        },
      


    });
}

$(document).ready(() => {

    GetProductVige();

    GetProductTopSel();
    GetProductTopNew();
    GetProductTopBazdid();



    $('.slideshow').owlCarousel({
        items: 6,
        autoPlay: 3000,
        singleItem: true,
        navigation: true,
        navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        pagination: true
    });

    



});