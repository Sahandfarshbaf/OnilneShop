
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
                               <input type="radio" PostTypeId=${item.id} checked="checked" name="${item.title}">
                                                ${item.title} - ${item.price} تومان
                              </label>
                          </div>`;

            });

            $('#PostTypeDiv').html(html);

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
                                                <input type="radio" PaymentTypeId="${item.id}" checked="checked" name="${item.title}">
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


$(document).ready(() => {

    GetPostTypeList();
    GetPaymentTypeList();

    $(document.body).on('click', '.RemoveGrid', function () {


        Id = parseInt($(this).attr('Productid'));
        RemoveFromCartGrid();

    });
});