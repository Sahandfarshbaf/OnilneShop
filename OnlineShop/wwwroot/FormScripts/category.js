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

function category() {

   
  
    let cateHtml = ``;

    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductByCatId?catId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);

            jQuery.each(response, function (i, item) {
             

                //cateHtml += `<div class="product-layout product-list col-xs-12">
                //        <div class="product-thumb">
                //            <div class="image"><a href="product.html"><img src="~/image/product/macbook_pro_1-200x200.jpg" alt=" کتاب آموزش باغبانی " title=" کتاب آموزش باغبانی " class="img-responsive" /></a></div>
                //            <div>
                //                <div class="caption">
                //                    <h4><a href="product.html"> کتاب آموزش باغبانی </a></h4>
                //                    <p class="description">
                //                        آخرین دستاورد های روز دنیا

                //                        شامل تمام اطلاعاتی که به آن نیاز خواهید داشت ...
                //                    </p>
                //                    <p class="price"> <span class="price-new">98000 تومان</span> <span class="price-old">120000 تومان</span> <span class="saving">-26%</span> <span class="price-tax">بدون مالیات : 90000 تومان</span> </p>
                //                </div>
                //                <div class="button-group">
                //                    <button class="btn-primary" type="button" onClick=""><span>افزودن به سبد</span></button>
                //                    <div class="add-to-links">
                //                        <button type="button" data-toggle="tooltip" title="افزودن به علاقه مندی ها" onClick=""><i class="fa fa-heart"></i> <span>افزودن به علاقه مندی ها</span></button>
                //                        <button type="button" data-toggle="tooltip" title="مقایسه این محصول" onClick=""><i class="fa fa-exchange"></i> <span>مقایسه این محصول</span></button>
                //                    </div>
                //                </div>
                //            </div>
                //        </div>
                //    </div>`;

                 
            });

            $('.cate').html(cateHtml);


        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }


    });
}



$(document).ready(() => {
     Id = parseInt(window.location.pathname.replace('/Home/category/', ''));
    GetProductVige();
    category();
});