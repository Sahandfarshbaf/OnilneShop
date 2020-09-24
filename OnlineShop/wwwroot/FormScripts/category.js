//import { id } from "module";

let Id = 0;
let productList;
let pageNumber = 1;

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
                                <a href="/Home/Product/${item.id}">
                                       <img src="${item.coverImageUrl}" alt="${item.name}" title="${item.name}" class="img-responsive" />
                                </a>
                            </div>
                            <div class="caption">
                                 <h4><a href="Home\Product?${item.id}">${item.name}</a></h4>                      
                                 <p class="price">`;
                if (item.offerValue !== 0) {

                    Html += `   <span class="price-new">${item.priceAfterOffer} تومان</span> 
                                    <span class="price-old">${item.price}تومان</span> 
                                    <span class="saving">${item.offerValue}</span> 
                                 </p>
                            </div>
                        </div>`;

                } else {

                    Html += `   <span class="price-new">${item.price} تومان</span> 
                                 </p>
                            </div>
                        </div>`;
                }

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

    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductByParentCatId?catId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            productList = response;
            RenderProductList();

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

                    if (item.productCount > 0) {
                        cateHtml += ` <div class="col-lg-2 col-md-2 col-sm-2 col-xs-4"> <a href="/Home/Category/${item.id}"><img src="${item.icon}" alt="${item.name}" /></a> <a href="/Home/Category/${item.id}">${item.name} (${item.productCount})</a> </div>`;

                    }

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

function RenderProductList() {

    let cateHtml = ``;
    let counter = 0;
    let itemCount = 0;
    let PageSize = parseInt($('#input-limit').val());
    let pagination = '';

    jQuery.each(productList, function (i, item) {

        if ((pageNumber - 1) * PageSize <= counter && counter < (pageNumber * PageSize)) {

            cateHtml += `<div class="product-layout product-list col-xs-12">
                        <div class="product-thumb">
                            <div class="image"><a href="/Home/Product/${item.id}"><img src="${item.coverImageUrl}" alt="${item.name}" title="${item.name}" class="img-responsive" style="width:150px;height:150px;" /></a></div>
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
            itemCount++;
        }

        counter++;
    });

    $('.products-category').html(cateHtml);

    let PageNumbers = (productList.length / PageSize);

    if ((productList.length % PageSize) !== 0) {
        PageNumbers++;
    }


    for (var j = 1; j <= PageNumbers; j++) {
        if (j === pageNumber) {

            pagination += `  <li class="active pagethumb" pagenumber="${j}"><span>${j}</span></li>`;
        }

        else {
            pagination += ` <li class="pagethumb" pagenumber="${j}" ><span>${j}<span></li>`;
        }

    }

    $('.pagination').html(pagination);


    if (pageNumber === 1) {

        $('#recordindicator').html(`نمایش 1 تا ${itemCount} از ${productList.length} محصول`);
    }
    else {
        $('#recordindicator').html(`نمایش ${(pageNumber - 1) * PageSize} تا ${((pageNumber - 1) * PageSize) + itemCount} از ${productList.length} محصول`);
    }


}

function SortByName(a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function SortByNameDesc(a, b) {
    var aName = a.name.toLowerCase();
    var bName = b.name.toLowerCase();
    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
}

function SortByPrice(a, b) {
    return parseFloat(a.price) - parseFloat(b.price);
}

function SortByPriceDesc(a, b) {
    return parseFloat(b.price) - parseFloat(a.price);
}




$(document).ready(() => {

    Id = parseInt(window.location.pathname.replace('/Home/Category/', ''));
    GetProductVige();
    GetProductList();
    GetImproveSearch();
    productList.sort(SortByName);
    RenderProductList();

    $(document.body).on('change', '#input-sort', function () {

        let sortid = $(this).val();

        switch (sortid) {
            case "1":
                productList.sort(SortByName);
                break;
            case "2":
                productList.sort(SortByNameDesc);
                break;
            case "3":
                productList.sort(SortByPrice);
                break;
            case "4":
                productList.sort(SortByPriceDesc);
                break;

        }
        pageNumber = 1;

        RenderProductList();
    });

    $(document.body).on('change', '#input-limit', function () {

        pageNumber = 1;
        RenderProductList();
    });

    $(document.body).on('click', '.pagethumb', function () {

        $('.pagethumb').removeClass('active');
        $(this).addClass('active');
        pageNumber = parseInt($(this).attr('pagenumber'));

        RenderProductList();
    });


});