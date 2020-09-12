
let catId = 0;

function ImproveSearch() {

    jQuery.ajax({
        type: "Get",
        url: `/api/CatProduct/GetCatProductList`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            let html = ``;
            let MajaorList = response.filter(c => c.pid == catId);
            let category = response.filter(c => c.id == catId);
            $('#titleLable').text(category[0].name);

            if (MajaorList.length == 0) {

                $('#ImproveSearch').hide();

            }
            else {

                jQuery.each(MajaorList, function (i, item) {

                    html += `<div class="col-lg-2 col-md-2 col-sm-2 col-xs-4"> <a href="/Home/category/${item.id}"><img src="${item.url}" /></a> <a href="/Home/category/${item.id}">${item.name}</a> </div>`;
                });

                $('.category-list-thumb').html(html);
            }


        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {


        }
    });
}

function BindProductList() {

    let html = ``;
    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductByCatId?catId=${catId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            console.log(response);

            jQuery.each(response, function (i, item) {

                html += ` <div class="product-layout product-list col-xs-12">
                            <div class="product-thumb">
                <div class="image"><a href="product.html"><img src="${item.coverImageUrl}" alt=" ${item.name}" title="${item.name}" class="img-responsive"/></a></div>
                <div>
                  <div class="caption">
                    <h4><a href="product.html"> ${item.name} </a></h4>
                    <p class="description"> آخرین دستاورد های روز دنیا                      
                      شامل تمام اطلاعاتی که به آن نیاز خواهید داشت ...</p>
                    <p class="price"> <span class="price-new">${item.priceAfterOffer} تومان</span> <span class="price-old">${item.price} تومان</span> <span class="saving">-${item.offerValue}%</span></p>
                  </div>
                  <div class="button-group">
                    <button class="btn-primary" type="button" onClick=""><span>افزودن به سبد</span></button>
                    <div class="add-to-links">
                      <button type="button" data-toggle="tooltip" title="افزودن به علاقه مندی ها" onClick=""><i class="fa fa-heart"></i> <span>افزودن به علاقه مندی ها</span></button>
                      <button type="button" data-toggle="tooltip" title="مقایسه این محصول" onClick=""><i class="fa fa-exchange"></i> <span>مقایسه این محصول</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>`;

            });


            $('.products-category').html(html);

        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }


    });
}



$(document).ready(() => {

    catId = parseInt(window.location.pathname.replace('/Home/category/', ''));
    ImproveSearch();
    BindProductList();



});