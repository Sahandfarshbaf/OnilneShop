let CartList = [];
let id = 0;

function BindGrid() {

    CartList = GetCartItems();
    let html = ``;
    let totalPrice = 0;
    let totalCount = 0;
    let totalPriceAfterOffer = 0;

    jQuery.each(CartList, function (i, item) {

        html += ` <tr>
                       <td class="text-center"><a href="/Home/Product/${item.ProductId}"><img style="width:50px;height:50px;" src="${item.CoverImageURL}" alt="${item.Name}" title="${item.Name}" class="img-thumbnail" /></a></td>
                       <td class="text-left">
                           <a href="product.html">${item.Name}</a><br />                                    
                       </td>
                       <td class="text-left">
                           <div class="input-group btn-block quantity">
                               <input type="text" name="quantity" id="txtCount${item.ProductId}" value="${item.Count}" size="1" class="form-control" />
                               <span class="input-group-btn">
                                    <button type="button" data-toggle="tooltip" title="بروزرسانی" class="btn btn-primary UpdateGrid"  ProductId="${item.ProductId}"><i class="fa fa-refresh"></i></button>
                                    <button type="button" data-toggle="tooltip" title="حذف" class="btn btn-danger RemoveGrid"  ProductId="${item.ProductId}"><i class="fa fa-times-circle"></i></button>
                               </span>
                            </div>
                        </td>
                        <td class="text-right">${item.Price} تومان</td>
                        <td class="text-right">${item.Price * item.Count} تومان</td>
                    </tr>`;

        totalPrice += (item.Count * item.Price);
        totalCount += item.Count;
        totalPriceAfterOffer += (item.Count * item.PriceAfterOffer);

    });

    let totalOffer = totalPrice - totalPriceAfterOffer;
    let totaltax = totalPriceAfterOffer * 0.09;
    let topay = (totalPriceAfterOffer + totaltax);


    $('#TotalPriceGrid').html(`${totalPrice} تومان`);
    $('#TotalOfferGrid').html(`${totalOffer} تومان`);
    $('#TotalTaxGrid').html(`${totaltax} تومان`);
    $('#ToPayGrid').html(`${topay} تومان`);

    $('#CartGridBody').html(html);

}

function RemoveFromCartGrid() {

    var CartList = GetCartItems();
    CartList = CartList.filter(x => x.ProductId != Id);
    Cookies.set('CartItems', JSON.stringify(CartList));
    RenderCart();
    BindGrid();
}

function UpdateCartGrid() {

    let newCount = parseInt($(`#txtCount${Id}`).val());
    var CartList = GetCartItems();
    for (var i = 0; i < CartList.length; i++) {

        if (CartList[i].ProductId == Id) {
            CartList[i].Count = newCount;
        }
    }
    Cookies.set('CartItems', JSON.stringify(CartList));
    RenderCart();
    BindGrid();
}


function InsertCustomerOrder() {

    var CartList = GetCartItems();

    let ProductList = new Array();

    $.each(CartList, function (i, item) {

        let product = {
            Id: 0,
            CustomerOrderId: 0,
            ProductId: item.ProductId,
            ProductName: item.Name,
            ProductColorId: 1,
            ProductPrice: item.Price,
            ProductOfferValue: item.OfferValue,
            ProductOfferCode: '',
            ProductOfferPrice: 0,
            FinalStatusId: null,
            OrderCount: item.Count,
            Weight: null,
            ProductCode: null,
            Description: '',
            CuserId: null,
            Cdate: null,
            DuserId: null,
            Ddate: null,
            MuserId: null,
            Mdate: null,
            DaUserI: null,
            DaDate: null
        }
        ProductList.push(product);
    })


    let customerOrderProductlist = JSON.stringify(ProductList);

    jQuery.ajax({
        type: "Post",
        url: "/api/CustomerOrder/InsertCustomerOrder",
        data: customerOrderProductlist,
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            
            window.location = '../Home/CheckOut/'+response;
        },
        error: function (response) {

            console.log(response);


        },
        complete: function () {

        }
    });


}






$(document).ready(() => {

    BindGrid();

    $(document.body).on('click', '.RemoveGrid', function () {


        Id = parseInt($(this).attr('Productid'));
        RemoveFromCartGrid();

    });

    $(document.body).on('click', '.UpdateGrid', function () {

        Id = parseInt($(this).attr('Productid'));
        UpdateCartGrid();

    });

    $(document.body).on('click', '#btnEdame', function () {

        var CartList = GetCartItems();

        if (CartList.length == 0) {
            alert('کالایی در سبد خرید وجود ندارد');
        }
        else {

            InsertCustomerOrder();
        }

    });

});

