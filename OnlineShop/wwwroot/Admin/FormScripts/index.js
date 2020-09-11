
let Id = 0;
let cat1 = 0;
let cat2 = 0;
let cat3 = 0;
let cat4 = 0;
let cat5 = 0;
let cat6 = 0;
let cat7 = 0;




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
            
            jQuery.each(response, function (i, item) {
                ss += `<div class="product-thumb clearfix">
                        <div class="image"><a href="Home/Product/` + item.id + `"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
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
           
            jQuery.each(response, function (i, item) {
                newpro += `<div class="product-thumb clearfix">
                        <div class="image"><a href="Home/Product/` + item.id + `"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
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
         
           

            $('#DivMahsulatjadid').html(newpro);

        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {

          
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
        
            jQuery.each(response, function (i, item) {
                Bazdid += `            <div class="product-thumb">
                <div class="image"><a href="Home/Product/` + item.id + `"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
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




          

            $('#DivMahsulatTopBazdid').html(Bazdid);

        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {

           
        }
      


    });
}

function GetProductTopTaze() {
    let Bazdid = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetMostSeenProductList",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
         
            jQuery.each(response, function (i, item) {
                Bazdid += `                      <div class="product-thumb clearfix">
                <div class="image"><a href="Home\Product"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
                <div class="caption">
                    <h4><a href="Home\Product">` + item.name + `</a></h4>
                    <p class="price"> ` + item.price + ` تومان </p>
                    <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
                </div>
            </div>`;

            });




       
            $('#DivMahsolatTaze').html(Bazdid);

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



function Getsubcat() {
    let subcat = ``;

    jQuery.ajax({
        type: "Get",
        url: "/api/CatProduct/GetTopCatProductList",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
            jQuery.each(response, function (i, item) {


                if (i === 1) {
                    subcat += ` <li><a href="#tab-cat1">` + item.name + `</a></li>`;
                    let cat1 = item.id;
                    console.log(cat1);
                } else if(i === 2)  {
                    subcat += ` <li><a href="#tab-cat2">` + item.name + `</a></li>`;
                    let cat2 = item.id;
                    console.log(cat2);

                } else if (i === 3) {
                    subcat += ` <li><a href="#tab-cat3">` + item.name + `</a></li>`;
                    let cat3 = item.id;
                    console.log(cat3);

                } else if (i === 4) {
                    subcat += ` <li><a href="#tab-cat4">` + item.name + `</a></li>`;
                    let cat4 = item.id;

                } else if (i === 5) {
                    subcat += ` <li><a href="#tab-cat5">` + item.name + `</a></li>`;
                    let cat5 = item.id;

                } else if (i === 6) {
                    subcat += ` <li><a href="#tab-cat6">` + item.name + `</a></li>`;
                    let cat6 = item.id;

                } else if (i === 7) {
                    subcat += ` <li><a href="#tab-cat7">` + item.name + `</a></li>`;
                    let cat7 = item.id;

                }
               

            });


            $('#sub-cat').html(subcat);

        },
        error: function (response) {

            console.log(response);
        },
        //complete: function () {

        //    $(".tabs").owlCarousel({
        //        itemsCustom: [[320, 1], [600, 2], [768, 3], [992, 5], [1199, 5]],
        //        lazyLoad: true,
        //        navigation: true,
        //        //navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        //        scrollPerPage: true
        //    });
        //}



    });




}

function Getsubcatid() {
    console.log(cat1);
    let subcat = `<div class="owl-carousel latest_category_tabs"  >`;

    jQuery.ajax({
        type: "Get",    
        //url: `/api/Product/GetProductByCatId?catId=${cat1}
        url: `/api/Product/GetProductByCatId?catId=22`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);
            jQuery.each(response, function (i, item) {

 
                    subcat += ` <div class="product-thumb">
                                    <div class="image">
                                        <a href="Home/Product/` + item.id + `"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a>
                                    </div>
                                    <div class="caption">
                                        <h4><a href="Home\Product">` + item.name + `</a></h4>
                                        <p class="price"> <span class="price-new">` + item.price + ` تومان</span> <span class="price-old">` + item.price + ` تومان</span> <span class="saving">` + item.offerValue + `%</span> </p>
                                        <div class="rating"> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star fa-stack-2x"></i><i class="fa fa-star-o fa-stack-2x"></i></span> <span class="fa fa-stack"><i class="fa fa-star-o fa-stack-2x"></i></span> </div>
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
            subcat += `   </div>`;

            $('#tab-cat1').html(subcat);

        },
        error: function (response) {

            console.log(response);
        },
        //complete: function () {

        //    $(".tabs").owlCarousel({
        //        itemsCustom: [[320, 1], [600, 2], [768, 3], [992, 5], [1199, 5]],
        //        lazyLoad: true,
        //        navigation: true,
        //        //navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
        //        scrollPerPage: true
        //    });
        //}



    });
}





$(document).ready(() => {

    GetProductVige();
    GetProductTopSel();
    GetProductTopNew();
    GetProductTopBazdid();
    GetProductTopTaze();
    Getsubcat();
    Getsubcatid();
    $('.slideshow').owlCarousel({
        items: 6,
        autoPlay: 3000,
        singleItem: true,
        navigation: true,
        navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        pagination: true
    });

    



});