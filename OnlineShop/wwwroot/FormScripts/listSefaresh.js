﻿//import { id } from "module";

let Id = 0;

function GetCustomerOrderList() {
    let Html = `<table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <td class="text-center">ردیف</td>
                                    <td class="text-left">کد سفارش</td>
                                    <td class="text-left">تاریخ سفارش</td>
                                    <td class="text-right">مبلغ سفارش</td>
                                    <td class="text-right">وضعیت سفارش</td>
                                    <td class="text-right">تعداد محصول</td>
                                    <td class="text-right">جزئیات</td>
                                </tr>
                            </thead>
                            <tbody>`;

    jQuery.ajax({
        type: "Get",
        url: "/api/CustomerOrder/GetCustomerOrderShortListByCustomerId",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
             
            console.log(response);
            jQuery.each(response, function (i, item) {
                
                Html += `<tr>
                    <td>${i + 1}</td>
                    <td>`+ item.id + `</td>
                    <td>`+ item.orderDate + `</td>
                    <td><div class="price">${item.orderPrice}</div></td>
                    <td>${item.paymentStatus}</td>
                    <td>${item.productCount}</td>
                    <td class="tdTextCenter"><span class="joz" OrderID=${item.id} ><i class="fa fa-edit text text-info"></i></span></td>
                    </tr>`;
            });
            Html += `</tbody></table>`;
 
            $('#listSefarsh').html(Html);


        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }


    });
}
function GetOrderById() {

    let Html = `<table class="table table-bordered table-hover">
                            <thead>
                                <tr>
                                    <td class="text-center">ردیف</td>
                                    <td class="text-left">عکس محصول</td>
                                    <td class="text-left">نام صنعتگر</td>
                                    <td class="text-right">مبلغ محصول</td>
                                    <td class="text-right">تعداد محصول</td>
 
                                </tr>
                            </thead>
                            <tbody>`;
    jQuery.ajax({
        type: "Get",
        url: `/api/CustomerOrder/GetCustomerOrderProductList?customerOrderId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
           
            jQuery.each(response, function (i, item) {

                Html += `<tr>
                    <td>${i + 1}</td>
                    <td><img src=${item.coverImageUrl} alt=` + $(this).attr('productName') + ` title=` + $(this).attr('productName') + ` class="img-responsive"   style="width:50px;height:50px" /></td> 
                    <td>`+ item.sellerName + `</td>
                    <td><div class="price">${item.productPrice}</div></td>
                    <td>${item.count}</td>
                    </tr>`;
            });
            Html += `</tbody></table> <br/>  <button class="btn btn-success" class="order">بازگشت به لیست سفارشات</button>

`;

            $('#listProduct').html(Html);

        },

        error: function (response) {

            console.log(response);

        },
        complete: function () {


        }
    });
}

$(document).ready(() => {
    
    GetCustomerOrderList();
   
    $(document.body).on('click', '.joz', function () {
        $('#listSefarsh1').hide();
        Id = parseInt($(this).attr('OrderID'));        
        GetOrderById();

    });
    $(document.body).on('click', '.order', function () {

        $('#listProduct1').hide();
        $('#listSefarsh1').show();

    });
});