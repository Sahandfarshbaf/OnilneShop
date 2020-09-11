
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
    let html = '';
    jQuery.each(CartList, function (i, item) {

        html += `<tr>
                            <td class="text-center"><a href="product.html"><img class="img-thumbnail" title="${item.Name}" alt="کفش راحتی مردانه" src="${item.CoverImageURL}" style="width:75px;height:75px;"></a></td>
                            <td class="text-left"><a href="product.html">${item.Name}</a></td>
                            <td class="text-right">1 عدد</td>
                            <td class="text-right">${item.Price} تومان</td>
                            <td class="text-center"><button class="btn btn-danger btn-xs remove RemoveCartItem" productid="${item.ProductId}" title="حذف"  type="button"><i class="fa fa-times"></i></button></td>
                        </tr>`;
        totalPrice += item.Price;

    });

    $('#CartTableBody').html(html);

    let totaltax = totalPrice * 0.09;
    let totaloffer = 0;
    let topay = (totalPrice + totaltax) - totaloffer;


    $('#cart-total').html(`${CartList.length} آیتم - ${totalPrice} تومان`);
    $('#TotalPrice').html(`${totalPrice} تومان`);
    $('#TotalOffer').html(`0 تومان`);
    $('#TotalTax').html(`${totaltax} تومان`);
    $('#ToPay').html(`${topay} تومان`);
}

function AddToCart() {


    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductById?productId=${productId}`,
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
                Count:1,
                CoverImageURL: response.coverImageUrl
            }

            CartList.push(item);
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



$(document).ready(() => {


    RenderCart();
    $(document.body).on('click', '.cartt', function () {

        productId = parseInt($(this).attr('productid'));
        AddToCart();

    });

    $(document.body).on('click', '.RemoveCartItem', function () {

        productId = parseInt($(this).attr('productid'));
        RemoveFromCart();

    });


});