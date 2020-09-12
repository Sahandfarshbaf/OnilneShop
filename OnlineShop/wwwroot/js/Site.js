
var productId;

function GetCartItems() {
    var CartList = new Array();
    var list = Cookies.get('CartItems');
    if (list != undefined) {
        CartList = JSON.parse(list);
    }
    return CartList;
}

function RenderCart() {

    var CartList = GetCartItems();
    //var list = Cookies.get('CartItems');
    //if (list != undefined) {
    //    CartList = JSON.parse(list);
    //}
    let totalPrice = 0;
    let totalCount = 0;
    let totalPriceAfterOffer = 0;
    let html = '';
    jQuery.each(CartList, function (i, item) {

        html += `<tr>
                            <td class="text-center"><a href="product.html"><img class="img-thumbnail" title="${item.Name}" alt="کفش راحتی مردانه" src="${item.CoverImageURL}" style="width:75px;height:75px;"></a></td>
                            <td class="text-left"><a href="product.html">${item.Name}</a></td>
                            <td class="text-right">${item.Count} عدد</td>
                            <td class="text-right">${item.Price} تومان</td>
                            <td class="text-center"><button class="btn btn-danger btn-xs remove RemoveCartItem" productid="${item.ProductId}" title="حذف"  type="button"><i class="fa fa-times"></i></button></td>
                        </tr>`;
        totalPrice += (item.Count * item.Price);
        totalCount += item.Count;
        totalPriceAfterOffer += (item.Count * item.PriceAfterOffer);
       

    });

    $('#CartTableBody').html(html);
    let totalOffer = totalPrice - totalPriceAfterOffer;
    let totaltax = totalPriceAfterOffer * 0.09;
    let topay = (totalPriceAfterOffer + totaltax);


    $('#cart-total').html(`${totalCount} آیتم - ${topay} تومان`);
    $('#TotalPrice').html(`${totalPrice} تومان`);
    $('#TotalOffer').html(`${totalOffer} تومان`);
    $('#TotalTax').html(`${totaltax} تومان`);
    $('#ToPay').html(`${topay} تومان`);
}

function AddToCart() {


    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetFullInfoProductById?productId=${productId}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            var CartList = GetCartItems();

            var item = {
                ProductId: response.id,
                Name: response.name,
                Price: response.price,
                OfferValue: response.offerValue,
                PriceAfterOffer: response.priceAfterOffer,
                Count: 1,
                CoverImageURL: response.coverImageUrl
            }
            debugger;
            var isExist = CartList.filter(x => x.ProductId == response.id);

            if (isExist.length == 0) {
                CartList.push(item);
            }
            else {
                item.Count = isExist[0].Count + 1
                CartList = CartList.filter(x => x.ProductId != isExist[0].ProductId)
                CartList.push(item);
            }

            Cookies.set('CartItems', JSON.stringify(CartList));

            RenderCart();


        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });
}

function RemoveFromCart() {

    var CartList = GetCartItems();

    CartList = CartList.filter(x => x.ProductId != productId);
    Cookies.set('CartItems', JSON.stringify(CartList));

    RenderCart();
}

function GenerateProductCategory() {

    jQuery.ajax({
        type: "Get",
        url: `/api/CatProduct/GetCatProductList`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            let html = ``;
            let MajaorList = response.filter(c => c.pid == null);

            jQuery.each(MajaorList, function (i, item) {

                html += ` <li><a href="/Home/category/${item.id}">${item.name}</a> <span class="down"></span>
                            <ul>`;

                let MinorList = response.filter(c => c.pid == item.id);

                jQuery.each(MinorList, function (j, itemmm) {

                    html += `<li><a href="/Home/category/${itemmm.id}">${itemmm.name}</a></li>`;
                });
                html += `     </ul>
                         </li>`;
            });


            $('#cat_accordion').html(html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

            $('#cat_accordion').cutomAccordion({
                saveState: false,
                autoExpand: true
            });
        }
    });
}



$(document).ready(() => {


    RenderCart();
    GenerateProductCategory();

    $(document.body).on('click', '.cartt', function () {

        productId = parseInt($(this).attr('productid'));
        AddToCart();

    });

    $(document.body).on('click', '.RemoveCartItem', function () {

        productId = parseInt($(this).attr('productid'));
        RemoveFromCart();

    });


});