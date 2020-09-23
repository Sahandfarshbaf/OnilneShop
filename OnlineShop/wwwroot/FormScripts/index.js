
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
                                 <h4><a href="Home/Product/` + item.id + `">` + item.name + `</a></h4>
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
                            <h4><a href="Home/Product/` + item.id + `">` + item.name + ` </a></h4>
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
                            <h4><a href="Home/Product/` + item.id + `">` + item.name + ` </a></h4>
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
                    <h4><a href="Home/Product/` + item.id + `">` + item.name + ` </a></h4>
                    <p class="price">` + item.price + `  تومان </p>
                   
                </div>
                <div class="button-group">
                     <button class="btn-primary cartt" type="button"  productid="` + item.id + `" ><span>افزودن به سبد</span></button>
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
                <div class="image"><a href="Home/Product/` + item.id + `"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a></div>
                <div class="caption">
                    <h4><a href="Home/Product/` + item.id + `">` + item.name + `</a></h4>
                    <p class="price"> ` + item.price + ` تومان </p>
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
 
    let tabs = ' <ul id="sub-cat" class="tabs" >';


    jQuery.ajax({
        type: "Get",
        url: "/api/CatProduct/GetTopCatProductList",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            jQuery.each(response, function (i, item) {

                tabs += ` <li><a href="#tab-cat${item.id}">` + item.name + `</a></li>`;

            });
            tabs += '</ul>';

            $('#DivCategory').html(tabs);

            jQuery.each(response, function (i, item) {

                Getsubcatid(item.id);
            });
            

        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {

            $("#latest_category .owl-carousel.latest_category_tabs").owlCarousel({
                itemsCustom: [[320, 1], [600, 2], [768, 3], [992, 5], [1199, 5]],
                lazyLoad: true,
                navigation: true,
                navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
                scrollPerPage: true,
            });
            $("#latest_category .tab_content").addClass("deactive");
            $("#latest_category .tab_content:first").show();
            //Default Action
            $("#latest_category ul#sub-cat li:first").addClass("active").show(); //Activate first tab
            //On Click Event
            $("#latest_category ul#sub-cat li").on("click", function () {
                $("#latest_category ul#sub-cat li").removeClass("active"); //Remove any "active" class
                $(this).addClass("active"); //Add "active" class to selected tab
                $("#latest_category .tab_content").hide();
                var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
                $(activeTab).fadeIn(); //Fade in the active content
                return false;
            });

        }



    });




}

function Getsubcatid(catidd) {

    let subcat = `<div id="tab-cat${catidd}" class="tab_content">
                    <div class="owl-carousel latest_category_tabs">`;

    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductByCatId?catId=${catidd}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            jQuery.each(response, function (i, item) {

                subcat += ` <div class="product-thumb">
                                    <div class="image">
                                        <a href="Home/Product/` + item.id + `"><img src="` + item.coverImageUrl + `" alt="` + item.name + `" title="` + item.name + `" class="img-responsive" /></a>
                                    </div>
                                    <div class="caption">
                                        <h4><a href="Home/Product/` + item.id + `">` + item.name + `</a></h4>
                                        <p class="price"> <span class="price-new">` + item.price + ` تومان</span> <span class="price-old">` + item.price + ` تومان</span> <span class="saving">` + item.offerValue + `%</span> </p>
                                        
                                    </div>
                                    <div class="button-group">
                                        <button class="btn-primary  cartt" type="button" productid="` + item.id + `" ><span>افزودن به سبد</span></button>
                                        <div class="add-to-links">
                                            <button type="button" data-toggle="tooltip" title="افزودن به علاقه مندی" onClick=""><i class="fa fa-heart"></i></button>
                                            <button type="button" data-toggle="tooltip" title="افزودن به مقایسه" onClick=""><i class="fa fa-exchange"></i></button>
                                        </div>
                                    </div>
                                </div>`;



            });

            subcat += `</div></div>`;


            $('#DivCategory').append(subcat);
            console.log(catidd);
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
    GetProductTopSel();
    GetProductTopNew();
    GetProductTopBazdid();
    GetProductTopTaze();
    Getsubcat();


    $('.slideshow').owlCarousel({
        items: 6,
        autoPlay: 3000,
        singleItem: true,
        navigation: true,
        navigationText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
        pagination: true
    });





});