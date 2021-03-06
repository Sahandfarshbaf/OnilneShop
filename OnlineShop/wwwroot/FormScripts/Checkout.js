﻿let CartList = [];
let postprice = 0;
let Id = 0;
let OfferCodeValue = 0;
let OfferCodePrice = 0;
let totalPrice = 0;
let totalCount = 0;
let totalOffer = 0;
let totalPriceAfterOffer = 0;
let totaltax = 0;
let topay = 0;
let CustomerOfferId = 0;

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
                                                ${item.title} - ${Currency(item.price)} تومان
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
                                                <input type="radio" id="paymentRadio${item.id}" class="paymentRadio" PaymentTypeId="${item.id}"  name="paymentRadio">
                                               ${item.title}
                                            </label>
                                        </div>`;

            });

            $('#PaymentTypeDiv').html(html);
            $('#paymentRadio' + response[0].id).prop('checked', 1);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });
}

function BindGrid() {


    let html = ``;


    jQuery.ajax({
        type: "Get",
        url: `/api/CustomerOrder/GetCustomerOrderById?customerOrderId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

        
            jQuery.each(response.customerOrderProduct, function (i, item) {
                html += ` <tr>
                       <td class="text-center"><a href="/Home/Product/${item.productId}"><img style="width:50px;height:50px;" src="${item.product.coverImageUrl}" alt="${item.productName}" title="${item.productName}" class="img-thumbnail" /></a></td>
                       <td class="text-left">
                           <a href="product.html">${item.productName}</a><br />                                    
                       </td>
                       <td class="text-left">
                           <div class="input-group btn-block quantity">
                               <input type="text" disabled name="quantity" id="txtCount${item.productId}" value="${item.orderCount}" size="1" class="form-control" />
                               
                            </div>
                        </td>
                        <td class="text-right">${Currency(item.productPrice)} تومان</td>
                        <td class="text-right">${Currency(item.productPrice * item.orderCount)} تومان</td>
                    </tr>`;

                totalPrice += (item.orderCount * item.productPrice);
                totalOffer += (item.orderCount * item.productOfferPrice);
                totalCount += item.orderCount;


            });

            Calculator();
            $('#CartGridBody').html(html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

        }
    });




}

function Payment() {

    jQuery.ajax({
        type: "Put",
        url: `/api/CustomerOrder/FinalOrderInsert?customerOrderId=${Id}&postTypeId=${$("input[name=postRadio]:checked").attr('posttypeid')}
                                                                    &paymentTypeId=${$("input[name=paymentRadio]:checked").attr('PaymentTypeId')}
                                                                    &customerDescription=${$("#confirm_comment").val()}
                                                                    &offerCode=${$('#input-coupon').val()}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "text",
        success: function (response) {
          
            if (response != "") {
                window.location = response;
            }

        },
        error: function (response) {

            console.log(response);


        },
        complete: function () {

        }
    });

}
function GetCoupenValue(Code) {


    jQuery.ajax({
        type: "Get",
        url: `/api/CustomerOffer/GetCustomerOfferByCode?code=${Code}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            OfferCodeValue = response / 100;
            CustomerOfferId = response.id;


        },
        error: function (response) {

            console.log(response);
            OfferCodeValue = 0;
            CustomerOfferId = 0;

        },
        complete: function () {
            Calculator();
        }
    });
}

function Calculator() {


    totalPriceAfterOffer = totalPrice - totalOffer;
    OfferCodePrice = totalPriceAfterOffer * OfferCodeValue;
    totalPriceAfterOffer -= OfferCodePrice;
    totaltax = totalPriceAfterOffer * 0.09;
    topay = (totalPriceAfterOffer + totaltax + postprice);



    $('#TotalPriceGrid').html(`${Currency(totalPrice)} تومان`);
    $('#TotalOfferGrid').html(`${Currency(totalOffer)} تومان`);
    $('#CopunOfferGrid').html(`${Currency(OfferCodePrice)} تومان`);
    $('#TotalTaxGrid').html(`${Currency(totaltax)} تومان`);
    $('#ToPayGrid').html(`${Currency(topay)} تومان`);
    $('#postprice').html(`${Currency(postprice)} تومان`);
}


$(document).ready(() => {

    Id = parseInt(window.location.pathname.replace('/Home/CheckOut/', ''));
    GetPostTypeList();
    GetPaymentTypeList();
    BindGrid();

    $(document.body).on('click', '.Paymentt', function () {

        postprice = parseInt($(this).attr('price'));
        Payment();

    });

    $(document.body).on('click', '.postRadio', function () {

        postprice = parseInt($(this).attr('price'));
        BindGrid();

    });

    $(document.body).on('click', '#button-coupon', function () {

        let Code = $('#input-coupon').val();
        if (Code.trim().length > 0) {

            GetCoupenValue(Code);
        }
        else {
            OfferCodeValue = 0;
            CustomerOfferId = 0;
            Calculator();
        }

    });

});