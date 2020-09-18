
let Id = 0;
function Bind_cmbVahedKala() {

    var Html_Dg = ''
    $.ajax({
        type: "Get",
        async: false,
        url: "/api/ProductMeter/GetProductMeterList",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var a = result;;
            Html_Dg += ' <option class="lbl" value="-1">انتخاب کنید</option>'
            jQuery.each(a, function (i, item) {
                Html_Dg += ' <option class="lbl" value="' + item.id + '">' + item.name + '</option>'
            });
            Html_Dg += ' </select>';
            jQuery('#cmbVahed').html(Html_Dg);
        },
        failure: function (result) {

        },
        complete: function () {
            jQuery('#cmbVahed').selectpicker('refresh');

        }
    });


};

function GetAllProduct() {
    let Html = `<table id="example2" class="table">
               <thead>
                  <tr>
                    <th> ردیف </th>
                     <th> نام محصول </th>
                     <th> قیمت محصول </th>
                     <th> موجودی اولیه</th>
                     <th> موجودی حال </th>
                     <th>عکس کالا </th>                              
                     <th> عدم فروش </th>  
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;

    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetSellerProductList?SellerID=1",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) { 
            console.log(response);
            let Id = 0; 
            jQuery.each(response, function (i, item) { 
                Html += `<tr>
                            <td>${i + 1}</td>                            
                            <td>`+ $(this).attr('name') + `</td>
                            <td>`+ item.price + `</td>
                            <td>${item.firstCount}</td>
                            <td>${item.count}</td>
                            <td>${item.coverImageUrl}</td> 
                            <td class="tdTextCenter"><span class="vaz" ProductID=${item.id} ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Edit" ProductID=${item.id} ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" ProductID=${item.id} ><i class="fa fa-trash text text-danger"></i></span></td>
                       </tr>`;
            });
            Html += `</tbody></table>`; 
            $('.TblList').html(Html); 
        }, 
    });
}
function GetAllCatProduct() {

    jQuery.ajax({
        type: "Get",
        url: "/api/CatProduct/GetCatProductList",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) { 
            console.log(response);
            let Id = 0; 
        },
    });
}

function AddProduct() {
    let Product = {
        Id: 0,
        SellerId: 1,
        CatProductId: 1,
        ProductMeterId: parseInt($('#cmbVahed').val()),
        Name: $('#txtOnvaneProduct').val(),
        EnName: $('#txtEnProduct').val(),
        Rkey: null,
        Coding: parseInt($('#txtCodeProduct').val()),
        Price: parseInt($('#txtPriceProduct').val()),
        FinalStatusId: null,
        FirstCount: parseInt($('#txtMojodiProduct').val()),
        Count: parseInt($('#txtMojodiProduct').val()),
        CoverImageUrl: "",
        CoverImageHurl: "",
        SeenCount: null,
        LastSeenDate: null,
        Description: null,
        AparatUrl: null,
        Weight: null,
        CuserId: null,
        Cdate: null,
        DuserId: null,
        Ddate: null,
        MuserId: null,
        Mdate: null,
        DaUserId: null,
        DaDate: null
    }


    var myfile = $("#FaileZamime");
    var formData = new FormData(); 

    formData.append('ImageFile', myfile[0].files[0]);
    formData.append('Product', JSON.stringify(Product));


    jQuery.ajax({
        type: "Post",
        url: "/api/Product/InsertProduct",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {


            GetAllProduct();
            $('#InsertModal').hide();
            $('#PnlListTasvir').hide();
            $('#PnlList').show();
            Swal.fire(
                'ثبت شد !',
                'محصول با موفقیت ثبت شد',
                'success'
            );
        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }
    });
}
function AddImaage() {
    let Image = {
        Id: 0,
        SellerId: 1,
        CatProductId: 1,
        ProductMeterId: parseInt($('#cmbVahed').val())
    }


    var myfile = $("#FaileZamime");
    var formData = new FormData(); 

    formData.append('ImageFile', myfile[0].files[0]);
    formData.append('Product', JSON.stringify(Product));


    jQuery.ajax({
        type: "Post",
        url: "/api/Product/InsertProduct",
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {


            GetAllProduct();
            $('#InsertModal').hide();
            $('#PnlListTasvir').hide();
            $('#PnlList').show();
            Swal.fire(
                'ثبت شد !',
                'محصول با موفقیت ثبت شد',
                'success'
            );
        },
        error: function (response) {

            console.log(response);
        },
        complete: function () {
        }
    });
}
function GetProductById() {
    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductById?productId=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) { 
            

            $('#cmbVahed').val(response.productMeterId);
            $('#txtOnvaneProduct').val(response.name);
            $('#txtEnProduct').val(response.enName);
            $('#txtCodeProduct').val(response.coding);
            $('#txtPriceProduct').val(response.price);
            $('#txtMojodiProduct').val(response.count);

            $('#InsertModal').show();
            $('#PnlList').hide();

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {


        }
    });
}

function UpdateProduct() {
    alert("jj");

    let Product = {       
        Id: Id,
        SellerId: 1,
        CatProductId: 1,
        ProductMeterId: parseInt($('#cmbVahed').val()),
        Name: $('#txtOnvaneProduct').val(),
        EnName: $('#txtEnProduct').val(),
        Rkey: null,
        Coding: parseInt($('#txtCodeProduct').val()),
        Price: parseInt($('#txtPriceProduct').val()),
        FinalStatusId: null,
        FirstCount: parseInt($('#txtMojodiProduct').val()),
        Count: parseInt($('#txtMojodiProduct').val()),
        CoverImageUrl: "",
        CoverImageHurl: "",
        SeenCount: null,
        LastSeenDate: null,
        Description: null,
        AparatUrl: null,
        Weight: null,
        CuserId: null,
        Cdate: null,
        DuserId: null,
        Ddate: null,
        MuserId: null,
        Mdate: null,
        DaUserId: null,
        DaDate: null
    }




    //jQuery.ajax({
    //    type: "Put",
    //    url: "/api/Employe/UpdateEmploye",
    //    data: JSON.stringify(Employe),
    //    async: false,
    //    contentType: "application/json; charset=utf-8",
    //    dataType: "json",
    //    success: function (response) {





    alert("hj");
    jQuery.ajax({
        type: "put",
        url: `/api/Product/EditProduct?productId=${Id}`,
        data: JSON.stringify(Product),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("i");
            Swal.fire(
                'ثبت شد !',
                'محصول با موفقیت بروز رسانی شد',
                'success'
            );
            GetAllCatProduct();
            $('#txtTitleProduct').val('');
            $('#InsertModal').hide();
            $('#PnlList').show();
        },
        error: function (response) {
            console.log(response);

        },
        complete: function () {

        }
    });
}



$(document).ready(() => {

    GetAllCatProduct();
    Bind_cmbVahedKala();
    GetAllProduct();

    $(document.body).on('click', '#btnJadid', () => {
        Id = 0;
        $('#txtOnvaneProduct').val('');
        $('#txtEnProduct').val('');
        $('#txtCodeProduct').val('');
        $('#txtPriceProduct').val('');
        $('#MojodiProduct').val('');
        $('#editor1').val('');
        $('#txtLinkAparat').val('');

        $('#InsertModal').show();
        $('#PnlList').hide();
    });

    $(document.body).on('click', '#btnSabt', () => {
        let textalert = "";

        if ($('#txtOnvaneProduct').val().length === 0) {
            textalert += `عنوان را وارد نمایید`;
        }
        else if ($('#FaileZamime').val().length === 0 && Id === 0) {
            textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        }
        if (textalert !== "") {

            Swal.fire({
                icon: 'error',
                title: 'فیلدهای اجباری را وارد نمایید !',
                text: textalert

            });
        } else {

            if (Id === 0) {
                AddProduct();
            } else {
                UpdateProduct();
            }

        }


    });
    $(document.body).on('click', '#btnSabtTasvir', () => {
        if (Id === 0) {
            AddImaage();
        } else {
            UpdateImaage();
        }
    });
    $(document.body).on('click', '.Edit', function () {

        Id = parseInt($(this).attr('ProductID'));
        alert("1");
        $('#InsertModal').show();
        $('#PnlList').hide();
        GetProductById();

    });

    $(document.body).on('click', '#btnEnseraf', function () {


        //var vv = $('#editor1').data("wysihtml5").editor;
        //alert(vv.getvalue());
        $('#InsertModal').hide();
        $('#PnlList').show();
    });
   
    
    //$('#txtAzTarikh').persianDatepicker({
    //    observer: true,
    //    format: 'YYYY/MM/DD',
    //    altField: '#AzTarikhObserver',
    //    autoClose: true

    //});

    //$('#txtTaTarikh').persianDatepicker({
    //    observer: true,
    //    format: 'YYYY/MM/DD',
    //    altField: '#TaTarikhObserver',
    //    autoClose: true

    //});


});