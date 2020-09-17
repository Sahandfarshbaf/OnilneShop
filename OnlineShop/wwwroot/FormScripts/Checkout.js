let CartList = [];
let postprice = 0;

function GetPostTypeList() {

    let html = `<p>لطفا یک شیوه حمل و نقل انتخاب کنید.</p>`;
    jQuery.ajax({
        type: "Get",
        url: `/api/PostType/GetPostTypeList`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            jQuery.each(response, function (i, item) {

                html += `<div class="radio">
                             <label>
                               <input type="radio" class="postRadio" id="postRadio${item.id}"  PostTypeId=${item.id}  price="${item.price}" name="postRadio">
                                                ${item.title} - ${item.price} تومان
                              </label>
                          </div>`;

            });

            $('#PostTypeDiv').html(html);
            $('#postRadio' + response[0].id).prop('checked', 1);
            postprice = response[0].price;

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });
}

function GetPaymentTypeList() {

    let html = ` <p>لطفا یک شیوه پرداخت برای سفارش خود انتخاب کنید.</p>`;
    jQuery.ajax({
        type: "Get",
        url: `/api/PaymentType/GetPaymentTypeList`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            jQuery.each(response, function (i, item) {

                html += ` <div class="radio">
                                            <label>
                                                <input type="radio" class="paymentRadio" PaymentTypeId="${item.id}"  name="paymentRadio">
                                               ${item.title}
                                            </label>
                                        </div>`;

            });

            $('#PaymentTypeDiv').html(html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });
}

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
                               <input type="text" disabled name="quantity" id="txtCount${item.ProductId}" value="${item.Count}" size="1" class="form-control" />
                               
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
    let topay = (totalPriceAfterOffer + totaltax + postprice);

  

    $('#TotalPriceGrid').html(`${totalPrice} تومان`);
    $('#TotalOfferGrid').html(`${totalOffer} تومان`);
    $('#TotalTaxGrid').html(`${totaltax} تومان`);
    $('#ToPayGrid').html(`${topay} تومان`);
    $('#postprice').html(`${postprice} تومان`);

    $('#CartGridBody').html(html);

}

function  Payment () {
    let param = {
        merchant_id: "82f5b82a-3422-4f9e-bb4d-0182c4dbf5a6",
        amount: "50000",
        description: "تستی",
        metadata: "434",
        mobile: "09142334363",
        email:"fa.azari.a@gmail.com",
        callback_url:"https://localhost:5001/Dargah/OnlinePeyment/"
    }

 
 
    jQuery.ajax({
        type: "POST",
        url: "https://api.zarinpal.com/pg/v4/payment/request.json",
        data: JSON.stringify(about),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (param) {
          console.log(response);  
 

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });
}
$(document).ready(() => {

    GetPostTypeList();
    GetPaymentTypeList();
    BindGrid();
    $(document.body).on('click', '.Paymentt', function () {

        postprice =parseInt($(this).attr('price'));
        Payment();

    });
    $(document.body).on('click', '.postRadio', function () {

        postprice =parseInt($(this).attr('price'));
        BindGrid();

    });
});