
let Id = 0;

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
    alert("1")
    jQuery.ajax({
        type: "Get",
        url: "/api/Product/GetSellerProductList?SellerID=1",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("2")
            console.log(response);
            
let Id = 0;

function GetAllProduct() {
    let Html = `<table id="example2" class="table">
               <thead>
                  <tr>
                    <th> ردیف </th>
                     <th> تیتر محصول </th>
                     <th> لینک آپارات </th>
                     <th> لینک محصول </th>
                     <th> نمایش در فروشگاه </th>
                     <th> وضعیت نمایش </th>
                     <th> امکان نظرسنجی </th>  
                     <th> نمایش در فروشگاه </th>
                     <th> وضعیت نمایش </th>
                     <th> امکان نظرسنجی </th>  
                    <th>ویرایش</th>
                    <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;
    jQuery.ajax({
        type: "post",
        url: "/api/Product/GetAllProduct",
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            jQuery.each(response, function (i, item) {

                Html += `<tr>
                            <td>${i + 1}</td>                            
                            <td>`+ $(this).attr('OnvaneProduct') + `</td>
                            <td>`+ item.onvaneProduct + `</td>
                            <td>${item.languageID}</td>
                            <td>${item.matneProduct}</td>
                            <td>${item.linkeProduct}</td>
                            <td>${item.pinStatus}</td>
                            <td>${item.emkaneNazardehi}</td>
                            <td>${item.PinStatus}</td>
                            <td>${item.tarikheSabt}</td>
                            <td class="tdTextCenter"><span class="Edit" ProductID=${item.ProductID} ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" ProductID=${item.ProductID} ><i class="fa fa-trash text text-danger"></i></span></td>
                       </tr>`;
            });
            Html += `</tbody></table>`;

            $('.TblList').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

            $("#example2").DataTable({
                "language": {
                    "decimal": "",
                    "emptyTable": "رکوردی برای نمایش وجود ندارد.",
                    "info": "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
                    "infoEmpty": "نمایش 0 تا 0 از 0 رکورد",
                    "infoFiltered": "(فیلتر شده از _MAX_ رکورد)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "نمایش _MENU_ رکورد",
                    "loadingRecords": "Loading...",
                    "processing": "Processing...",
                    "search": "جستجو:",
                    "zeroRecords": "رکوردی یافت نشد",
                    "paginate": {
                        "next": "بعدی",
                        "previous": "قبلی"
                    }
                },
                "info": false,
                "lengthChange": false
            });


        }
    });
}



function AddProduct() {

    alert(parseInt($('#cmbCategory').val()))

    let Product = {
        ID: 0,
        CategoryID: parseInt($('#cmbCategory').val()),
        LanguageID: parseInt($('#cmbLangouge').val()),
        TypeCategoryID: parseInt($('#cmbTypeProduct').val()),
        //ShowInShop: 1,
        //PinStatus: 1,
        //EmkaneNazardehi: 1,
        TitleProduct: $('#txtTitleProduct').val(),
        OnvaneProduct: $('#txtOnvaneProduct').val(),
        MatneProduct: tinyMCE.activeEditor.getContent()
        //KholaseyeProduct: $('#KholaseyeProduct').val(),
        //UrlProduct: $('#UrlProduct').val(),
        //linkeProduct: $('#linkeProduct').val(),
        //KilideProduct: $('#KilideProduct').val()
        //FaileZamime: $('#FaileZamime').val()
        //IconProduct: $('#KholaseyeProduct').val(),
        //TasvireKochak: $('#KholaseyeProduct').val(),
        //TasvireBozorg: $('#KholaseyeProduct').val(),
        //AparatUrl: $('#KholaseyeProduct').val(),
        //MetaTag: $('#KholaseyeProduct').val(),
        //MetaDescription: $('#KholaseyeProduct').val(),
        //AzTarikhEnteshar: $('#KholaseyeProduct').val(),
        //TaTarikhEnteshar: $('#KholaseyeProduct').val(),
        //TarikheDarj: $('#KholaseyeProduct').val(),
        //SaateDarj: $('#KholaseyeProduct').val(),
        //TarikheSabt: $('#KholaseyeProduct').val(),
        //SaateSabt: $('#KholaseyeProduct').val(),
        //UserSabtID: 0,
        //RecHazfi: 0

    }

    alert("2")

    jQuery.ajax({
        type: "Post",
        url: "/api/Product/AddProduct",
        data: JSON.stringify(Product),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //EndLoader();
            alert("3")
            GetAllProduct();
            $('#InsertModal').hide();
            $('#PnlList').show();
            Swal.fire(
                'ثبت شد !',
                'درباره ما با موفقیت ثبت شد',
                'success'
            );







        },
        error: function (response) {
            alert(response)
            console.log(response);


        },
        complete: function () {

        }
    });
}


function GetProductById() {
    alert("2");
    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            $('#cmbLangouge').val(response.languageID);           
            jQuery('#cmbLangouge').change();
            $('#cmbCategory').val(response.categoryID);
            jQuery('#cmbCategory').change();
            $('#cmbTypeProduct').val(response.typeCategoryID);
            jQuery('#cmbTypeProduct').change();

            $('#txtOnvaneProduct').val(response.onvaneProduct);
            $('#txtTitleProduct').val(response.titleProduct);
            $('#MatneProduct').val(response.matneProduct);
            tinymce.get("elm1").setContent(response.matneProduct);

            $('#txtlinkeProduct').val(response.linkeProduct);
            $('#txtKilideProduct').val(response.kilideProduct);
            $('#txtAparatUrl').val(response.aparatUrl);
            $('#mdate').val(response.azTarikhEnteshar);

            $('#InsertModal').show();
            $('#PnlList').hide();

        },
        error: function (response) {
            alert("13");
            console.log(response);

        },
        complete: function () {

            alert("4");
        }
    });
}

function UpdateProduct() {
    alert("jj");

    let Product = {
        ID: Id,
        TitleProduct: $('#txtTitleProduct').val(),

    }

    alert("hj");
    jQuery.ajax({
        type: "Post",
        url: "api/Product/UpdateProduct",
        data: JSON.stringify(Product),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("i");
            Swal.fire(
                'ثبت شد !',
                'درباره ما با موفقیت بروز رسانی شد',
                'success'
            );

            GetAllAbout();


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
    GetAllProduct();

    $(document.body).on('click', '#btnJadid', () => {

        Id = 0;
        $('#txtOnvaneProduct').val('');
        $('#txtTitleProduct').val('');
        $('#elm1').val('');
        $('#txtlinkeProduct').val('');
        $('#txtKilideProduct').val('');
        $('#txtAparatUrl').val('');
        $('#IconProduct').val('');

        $('#InsertModal').show();
        $('#PnlList').hide();
    });

    $(document.body).on('click', '#btnSabt', () => {

        //let textalert = "";

        //if ($('#txtTitle').val().length === 0) {
        //    textalert += `عنوان را وارد نمایید`;
        //}
        //else if ($('#exampleInputFile').val().length === 0 && Id === 0) {
        //    textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
        //    Swal.fire({
        //        icon: 'error',
        //        title: 'فیلدهای اجباری را وارد نمایید !',
        //        text: textalert

        //    });
        //}


        //if (textalert !== "") {

        //    Swal.fire({
        //        icon: 'error',
        //        title: 'فیلدهای اجباری را وارد نمایید !',
        //        text: textalert

        //    });
        //} else {
        
            if (Id === 0) {
                AddProduct();
            } else {
                alert("1");
                UpdateProduct();
            }

        //}


    });
    $(document.body).on('click', '.Edit', function () {

        Id = parseInt($(this).attr('ProductID'));
        alert("1");
        GetProductById();

    });

    $(document.body).on('click', '#btnEnseraf', function () {

        $('#InsertModal').hide();
        $('#PnlList').show();
    });


});
            jQuery.each(response, function (i, item) {

                Html += `<tr>
                            <td>${i + 1}</td>                            
                            <td>`+ $(this).attr('OnvaneProduct') + `</td>
                            <td>`+ item.OnvaneProduct + `</td>
                            <td>${item.LanguageID}</td>
                            <td>${item.MatneProduct}</td>
                            <td>${item.linkeProduct}</td>
                            <td>${item.PinStatus}</td>
                            <td>${item.EmkaneNazardehi}</td>
                            <td>${item.PinStatus}</td>
                            <td>${item.EmkaneNazardehi}</td>
                            <td class="tdTextCenter"><span class="Edit" ProductID=${item.ProductID} ><i class="fa fa-edit text text-info"></i></span></td>
                            <td class="tdTextCenter"><span class="Trash" ProductID=${item.ProductID} ><i class="fa fa-trash text text-danger"></i></span></td>
                       </tr>`;
            });
            Html += `</tbody></table>`;

            $('.TblList').html(Html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

            $("#example2").DataTable({
                "language": {
                    "decimal": "",
                    "emptyTable": "رکوردی برای نمایش وجود ندارد.",
                    "info": "نمایش _START_ تا _END_ از _TOTAL_ رکورد",
                    "infoEmpty": "نمایش 0 تا 0 از 0 رکورد",
                    "infoFiltered": "(فیلتر شده از _MAX_ رکورد)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "نمایش _MENU_ رکورد",
                    "loadingRecords": "Loading...",
                    "processing": "Processing...",
                    "search": "جستجو:",
                    "zeroRecords": "رکوردی یافت نشد",
                    "paginate": {
                        "next": "بعدی",
                        "previous": "قبلی"
                    }
                },
                "info": false,
                "lengthChange": false
            });


        }
    });
}



function AddProduct() {

    alert(parseInt($('#cmbCategory').val()))
    $('#txtOnvaneProduct').val('');
    $('#txtEnProduct').val('');
    $('#txtCodeProduct').val('');
    $('#txtPriceProduct').val('');
    $('#MojodiProduct').val('');
    $('#elm1').val('');
    $('#txtLinkAparat').val('');


    let Product = {
 
        Name: $('#txtOnvaneProduct').val(),
        EnName: $('#txtEnProduct').val(),
        CatProductId: 1,
        Coding: $('#txtCodeProduct').val(),
        Price: $('#txtPriceProduct').val(),
        FirstCount: $('#MojodiProduct').val(),
        ProductImages: '',
        ProductMeterId: parseInt($('#cmbVahed').val()),
        MatneProduct: tinyMCE.activeEditor.getContent()
    }

    alert("2")

    jQuery.ajax({
        type: "Post",
        url: "/api/Product/InsertProduct",
        data: JSON.stringify(Product),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            //EndLoader();
            alert("3")
            GetAllProduct();
            $('#InsertModal').hide();
            $('#PnlList').show();
            Swal.fire(
                'ثبت شد !',
                'درباره ما با موفقیت ثبت شد',
                'success'
            );
        },
        error: function (response) {
            alert(response)
            console.log(response);
        },
        complete: function () {
        }
    });
}
function GetProductById() {
    alert("2");
    jQuery.ajax({
        type: "Get",
        url: `/api/Product/GetProductById?id=${Id}`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {



            $('#txtTitleProduct').val("gbcv");



            $('#InsertModal').show();
            $('#PnlList').hide();

        },
        error: function (response) {
            alert("13");
            console.log(response);

        },
        complete: function () {

            alert("4");
        }
    });
}

function UpdateProduct() {
    alert("jj");

    let Product = {
        ID: Id,
        TitleProduct: $('#txtTitleProduct').val(),
        Name: $('#txtOnvaneProduct').val(),
        EnName: $('#txtEnProduct').val(),
        CatProductId: 1,
        Coding: $('#txtCodeProduct').val(),
        Price: $('#txtPriceProduct').val(),
        FirstCount: $('#MojodiProduct').val(),
        ProductImages: '',
        ProductMeterId: parseInt($('#cmbVahed').val()),
        MatneProduct: tinyMCE.activeEditor.getContent()
    }

    alert("hj");
    jQuery.ajax({
        type: "Post",
        url: "api/Product/EditProduct",
        data: JSON.stringify(Product),
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("i");
            Swal.fire(
                'ثبت شد !',
                'درباره ما با موفقیت بروز رسانی شد',
                'success'
            );

            GetAllAbout();


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
  



   GetAllProduct();

    $(document.body).on('click', '#btnJadid', () => {

        Id = 0;
        $('#txtOnvaneProduct').val('');
        $('#txtEnProduct').val('');
        $('#txtCodeProduct').val('');
        $('#txtPriceProduct').val('');
        $('#MojodiProduct').val('');
        $('#elm1').val('');
        $('#txtLinkAparat').val('');

        $('#InsertModal').show();
        $('#PnlList').hide();
    });

    $(document.body).on('click', '#btnSabt', () => {

        //let textalert = "";

        //if ($('#txtTitle').val().length === 0) {
        //    textalert += `عنوان را وارد نمایید`;
        //}
        //else if ($('#exampleInputFile').val().length === 0 && Id === 0) {
        //    textalert += `فایلی جهت بارگذاری انتخاب نشده است !`;
        //    Swal.fire({
        //        icon: 'error',
        //        title: 'فیلدهای اجباری را وارد نمایید !',
        //        text: textalert

        //    });
        //}


        //if (textalert !== "") {

        //    Swal.fire({
        //        icon: 'error',
        //        title: 'فیلدهای اجباری را وارد نمایید !',
        //        text: textalert

        //    });
        //} else {
        
            if (Id === 0) {
                AddProduct();
            } else {
                alert("1");
                UpdateProduct();
            }

        //}


    });
    //$(document.body).on('click', '.Edit', function () {

    //    Id = parseInt($(this).attr('ProductID'));
    //    alert("1");
    //    GetProductById();

    //});

    //$(document.body).on('click', '#btnEnseraf', function () {

    //    $('#InsertModal').hide();
    //    $('#PnlList').show();
    //});

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