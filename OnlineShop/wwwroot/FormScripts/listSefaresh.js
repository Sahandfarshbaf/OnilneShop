//import { id } from "module";

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
                                    <td class="text-right">جزئیات</td>
                                </tr>
                            </thead>
                            <tbody>`;

    jQuery.ajax({
        type: "Get",
        url: "/api/CustomerOrder/GetCustomerOrderListByCustomerId",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
             
            console.log(response);
            jQuery.each(response, function (i, item) {
                
                Html += `
                                <tr>
                                    <td class="text-center">` + item.orderPrice + `</td>
                                    <td class="text-left"><a href="product.html">` + item.orderPrice + `</a></td>
                                    <td class="text-left">محصول 20</td>
                                    <td class="text-right">موجود</td>
                                    <td class="text-right"><div class="price"> 400000 تومان </div></td>
                                    <td class="text-right">
                                        <button class="btn btn-primary" title="" data-toggle="tooltip" onClick="cart.add('48');" type="button" data-original-title="افزودن به سبد"><i class="fa fa-shopping-cart"></i></button>
                                        <a class="btn btn-danger" title="" data-toggle="tooltip" href=" " data-original-title="حذف"><i class="fa fa-times"></i></a>
                                    </td>
                                </tr>`;
            });
            Html += `</tbody></table>`;
 
            $('.listSefarsh').html(Html);


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
   

});