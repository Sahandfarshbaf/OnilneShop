
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
function Bind_CmbSeller() {

    var Html_Dg = ''
    $.ajax({
        type: "Get",
        async: false,
        url: "/api/Seller/GetSellerList",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            var a = result;;
            Html_Dg += ' <option class="lbl" value="-1">انتخاب کنید</option>'
            jQuery.each(a, function (i, item) {
                Html_Dg += ' <option class="lbl" value="' + item.id + '">' + item.sellername + '</option>'
            });
            Html_Dg += ' </select>';
            jQuery('#CmbSeller').html(Html_Dg);
        },
        failure: function (result) {

        },
        complete: function () {
            jQuery('#CmbSeller').selectpicker('refresh');

        }
    });


};
function Bind_cmbColor() {

    var Html_Dg = ''
    $.ajax({
        type: "Get",
        async: false,
        url: "/api/Color/GetColorList",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            console.log(result);
            var a = result;;
            Html_Dg += ' <option class="lbl" value="-1">انتخاب کنید</option>'
            jQuery.each(a, function (i, item) {
                Html_Dg += ' <option class="lbl" value="' + item.id + '">' + item.name + '</option>'
            });
            Html_Dg += ' </select>';
            jQuery('#CmbColor').html(Html_Dg);
        },
        failure: function (result) {

        },
        complete: function () {
            jQuery('#CmbColor').selectpicker('refresh');

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
                            <td><img src=${item.coverImageUrl} alt=` + $(this).attr('name') + ` title=` + $(this).attr('name') + ` class="img-responsive"   style="width:50px;height:50px" /></td> 

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
 
function GetAllImage() {
    let Html = `<table id="example2" class="table">
               <thead>
                  <tr>
                    <th> ردیف </th>
                     <th> عکس </th>
                     <th> رنگ </th>
                     <th>حذف</th>
                  </tr>
               </thead>
             <tbody>`;

    jQuery.ajax({
        type: "Get",
        url: `/api/ProductImage/GetImageList?productId=${Id}`,
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
                            <td><img src=${item.imageURL}   class="img-responsive"   style="width:50px;height:50px" /></td>                            
                            <td>${item.colorName}</td> 
                            <td class="tdTextCenter"><span class="Trash" ProductID=${item.productImageId} ><i class="fa fa-trash text text-danger"></i></span></td>
                       </tr>`;
            });
            Html += `</tbody></table>`; 
            $('.TblListTasvir').html(Html); 
        }, 
    });
}
function AddProduct() {
    let Product = {
        Id: 0,
        SellerId: parseInt($('#CmbSeller').val()),
        CatProductId: parseInt($('#CmbCategory').val()),
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
        Description: tinyMCE.activeEditor.getContent(),
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
 
    var myfile = $("#FaileZamimeTasvir");
    console.log(myfile);
    var formData = new FormData(); 

    formData.append('ImageFile', myfile[0].files[0]);
 
 

    ShowLoader();
    jQuery.ajax({
        type: "Post",
        url: `/api/ProductImage/InsertProductImage?productId=${Id}&colorId=${parseInt($('#CmbColor').val())}`,
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {
            EndLoader();

            GetAllImage();

            Swal.fire(
                'ثبت شد !',
                'تصویر محصول  با موفقیت ثبت شد',
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
            console.log(response);

            $('#cmbVahed').val(response.productMeterId);
            $('#txtOnvaneProduct').val(response.name);
            $('#txtEnProduct').val(response.enName);
            $('#txtCodeProduct').val(response.coding);
            $('#txtPriceProduct').val(response.price);
            $('#txtMojodiProduct').val(response.count);
            $('#CmbCategory').val(response.CatProductId);
            
            $('#InsertModal').show();
            $('#PnlList').hide();
            GetAllImage(); 
 tinymce.get("elm1").setContent(response.Description);
        },

        error: function (response) {

            console.log(response);

        },
        complete: function () {


        }
    });
}
function UpdateProduct() {
   

    let Product = {       
        Id: Id,
        SellerId: null,
        CatProductId: parseInt($('#CmbSeller').val()),
        ProductMeterId: parseInt($('#cmbVahed').val()),
        Name: $('#txtOnvaneProduct').val(),
        EnName: $('#txtEnProduct').val(),
        Rkey: null,
        Coding: parseInt($('#txtCodeProduct').val()),
        Price: parseInt($('#txtPriceProduct').val()),
        FinalStatusId: null,
        FirstCount: parseInt($('#txtMojodiProduct').val()),
        Count:null,
        CoverImageUrl: "",
        CoverImageHurl: null,
        SeenCount: null,
        LastSeenDate: null,
        Description: tinyMCE.activeEditor.getContent(),
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

    //let Product = {
    //    Id: Id,
    //    SellerId: 1,
    //    CatProductId: 1,
    //    ProductMeterId: 1,
    //    Name: "asd",
    //    EnName: "asd",
    //    Rkey: 1,
    //    Coding: 1,
    //    Price: 42,
    //    FinalStatusId: 1,
    //    FirstCount:2,
    //    Count: 2,
    //    CoverImageUrl: "",
    //    CoverImageHurl: "",
    //    SeenCount: 1,
    //    LastSeenDate: 1,
    //    Description: null,
    //    AparatUrl: null,
    //    Weight: 1,
    //    CuserId: null,
    //    Cdate: 1,
    //    DuserId: null,
    //    Ddate: 1,
    //    MuserId: null,
    //    Mdate: 1,
    //    DaUserId: null,
    //    DaDate: 1
    //}



    var myfile = $("#FaileZamime");
    var formData = new FormData();

    formData.append('ImageFile', myfile[0].files[0]);
    formData.append('Product', JSON.stringify(Product));


    jQuery.ajax({
        type: "put",
        url: `/api/Product/EditProduct?productId=${Id}`,
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {            
            Swal.fire(
                'ثبت شد !',
                'محصول با موفقیت بروز رسانی شد',
                'success'
            );
            GetAllCatProduct();
            GetAllImage();
            $('#txtOnvaneProduct').val('');
            $('#txtEnProduct').val('');                      
            $('#txtCodeProduct').val('');
            $('#txtPriceProduct').val('');                                 
            $('#txtMojodiProduct').val('');
            $('#editor1').val('');
            $('#txtLinkAparat').val('');

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
function GenerateProductCategory() {


    jQuery.ajax({
        type: "Get",
        url: `/api/CatProduct/GetCatProductList`,
        data: "",
        async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {

            let html = `<select data-placeholder="Select an Account"  class="select2 form-control mb-3 custom-select" style="width: 100%; height:36px;"  id="cash_account">`;
            let MajaorList = response.filter(c => c.pid == null);

            jQuery.each(MajaorList, function (i, item) {

                html += ` <optgroup label=${item.name}> `;

                let MinorList = response.filter(c => c.pid == item.id);

                jQuery.each(MinorList, function (j, itemmm) {

                    html += `<option value=${itemmm.id} alt=${itemmm.name}>${itemmm.name}</option>`;
                });
                html += ` </optgroup>`;
            });


            $('#CmbCategory').html(html);

        },
        error: function (response) {

            console.log(response);

        },
        complete: function () {

            $('#CmbCategory').cutomAccordion({
                saveState: false,
                autoExpand: true
            });
        }
    });














    (function () {
        $(function () {
            return $('select').select2({
                width: 'resolve'
            });

        });

    }).call(this);

}



$(document).ready(() => {
    GenerateProductCategory();

    Bind_cmbVahedKala();
    Bind_cmbColor();
    GetAllProduct();
    Bind_CmbSeller();
    $(document.body).on('click', '#btnJadid', () => {
        Id = 0;
        $('#txtOnvaneProduct').val('');
        $('#txtEnProduct').val('');
        $('#txtCodeProduct').val('');
        $('#txtPriceProduct').val('');
        $('#MojodiProduct').val('');
        $('#editor1').val('');
        $('#txtLinkAparat').val('');
        $('#elm1').val('');
        $('#txtMojodiProduct').val('');
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
    //$(document.body).on('click', '#btnJadidTasvir', () => {
    //    IdImage = 0;  
    //});
    $(document.body).on('click', '#btnSabtTasvir', () => {
        //if (IdImage === 0) {
            AddImaage();
        //} else {
        //    UpdateImaage();
        //}
    });
    $(document.body).on('click', '.Edit', function () {

        Id = parseInt($(this).attr('ProductID'));
       
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
   
    
  

});