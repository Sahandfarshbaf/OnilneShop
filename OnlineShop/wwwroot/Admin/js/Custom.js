var SessionStatus = 1;
var txtAlert;
var LoginUrl = "../Home/Login";
var Controll;
var NoeLoad;
var RowID;
var EncodeValue;
var DecodeValue;

function isNumOnly(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    //alert(charCode);
    if ((charCode >= 48 && charCode <= 57) || (charCode == 8) || (charCode == 46) || (charCode == 47)) {
        return true;
    }
    else {

        jQuery('#PnlWarning').removeClass();
        jQuery('#PnlWarning').addClass('alert alert-dismissible alert-warning');

        jQuery('#PnlWarning p').html('لطفا عدد وارد نمایید.<br/>');
        jQuery('#PnlWarning strong').html('توجه!');

        jQuery('.ShowMessage').click();

        return false;
    }
}

function isIntOnly(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    //alert(charCode);
    if ((charCode >= 48 && charCode <= 57) || (charCode == 8)) {
        return true;
    }
    else {

        jQuery('#PnlWarning').removeClass();
        jQuery('#PnlWarning').addClass('alert alert-dismissible alert-warning');

        jQuery('#PnlWarning p').html('لطفا عدد وارد نمایید.<br/>');
        jQuery('#PnlWarning strong').html('توجه!');

        jQuery('.ShowMessage').click();

        return false;
    }
}

//چک می کند که کاربر هیچ کاراکتری غیر از کاراکترهای فارسی وارد نکند
//var langFarsi = true;
//var langenglish = true;
var farsikey = [
	0x0020, 0x0021, 0x061B, 0x066B, 0x00A4, 0x066A, 0x060C, 0x06AF,
	0x0029, 0x0028, 0x002A, 0x002B, 0x0648, 0x002D, 0x002E, 0x002F,
	0x06F0, 0x06F1, 0x06F2, 0x06F3, 0x06F4, 0x06F5, 0x06F6, 0x06F7,
	0x06F8, 0x06F9, 0x003A, 0x06A9, 0x003E, 0x003D, 0x003C, 0x061F,
	0x066C, 0x0624, 0x200C, 0x0698, 0x064A, 0x064D, 0x0625, 0x0623,
	0x0622, 0x0651, 0x0629, 0x00BB, 0x00AB, 0x0621, 0x004E, 0x005D,
	0x005B, 0x0652, 0x064B, 0x0626, 0x064F, 0x064E, 0x0056, 0x064C,
	0x0058, 0x0650, 0x0643, 0x062C, 0x0698, 0x0686, 0x00D7, 0x0640,
	0x067E, 0x0634, 0x0630, 0x0632, 0x0649, 0x062B, 0x0628, 0x0644,
	0x0627, 0x0647, 0x062A, 0x0646, 0x0645, 0x0626, 0x062F, 0x062E,
	0x062D, 0x0636, 0x0642, 0x0633, 0x0641, 0x0639, 0x0631, 0x0635,
	0x0637, 0x063A, 0x0638, 0x007D, 0x007C, 0x007B, 0x007E, 1740,
    8, 97
];

function isFarsiOnly(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    //    alert(charCode);
    for (var i = 0; i <= farsikey.length; i++) {
        if (farsikey[i] == charCode) {
            return true;
        }
    }

    jQuery('#PnlWarning').removeClass();
    jQuery('#PnlWarning').addClass('alert alert-dismissible alert-warning');

    jQuery('#PnlWarning p').html('لطفا فارسی وارد نمایید.<br/>');
    jQuery('#PnlWarning strong').html('توجه!');

    jQuery('.ShowMessage').click();
    return false;

}

// چک فارسی و اعداد بودن ورود 
function isFarsi(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    //    alert(charCode);
    if ((charCode >= 48 && charCode <= 57) || (charCode == 8) || (charCode == 46) || (charCode == 47)) {
        return true;
    }
    for (var i = 0; i <= farsikey.length; i++) {
        if (farsikey[i] == charCode) {

            return true;
        }
    }
    txtAlert = 'لطفا فارسی وارد نمایید.<br/>';
    WarningAlert(txtAlert);

    return false;

};

function isfloatOnly(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    //alert(charCode);
    if ((charCode >= 48 && charCode <= 57) || (charCode == 8) || (charCode == 46) || (charCode == 47)) {
        return true;
    }
    else {

        txtAlert = 'لطفا عدد وارد نمایید. شامل اعداد اعشاری نیز می باشد.<br/>';
        WarningAlert(txtAlert);

        return false;
    }
};

function isEnglishOnly(evt) {

    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode >= 65 && charCode <= 99) || (charCode >= 97 && charCode <= 122) || (charCode === 32) || (charCode === 42) || (charCode === 43) || (charCode === 45) || (charCode >= 48 && charCode <= 57)
    || (charCode === 46) || (charCode === 47) || (charCode === 44) || (charCode === 33) || (charCode === 34) || (charCode === 39) || (charCode === 35) || (charCode === 38) || (charCode === 37)
    || (charCode === 92) || (charCode === 96) || (charCode === 94) || (charCode === 95) || (charCode === 93) || (charCode === 91) || (charCode === 41) || (charCode === 40) || (charCode === 36)
    || (charCode === 125) || (charCode === 62) || (charCode === 63) || (charCode === 64) || (charCode === 58) || (charCode === 59) || (charCode === 60) || (charCode === 61) || (charCode === 123)
     || (charCode === 127) || (charCode === 126) || (charCode === 13) || (charCode === 8)) {
        return true;
    }
    else {
        jQuery('#PnlWarning').removeClass();
        jQuery('#PnlWarning').addClass('alert alert-dismissible alert-warning');

        jQuery('#PnlWarning p').html('لطفا انگلیسی وارد نمایید.<br/>');
        jQuery('#PnlWarning strong').html('توجه!');

        jQuery('.ShowMessage').click();
        return false;
    }
}

function isEnglish(evt) {
    if ((charCode >= 48 && charCode <= 57) || (charCode == 8) || (charCode == 46) || (charCode == 47)) {
        return true;
    }
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode >= 65 && charCode <= 99) || (charCode >= 97 && charCode <= 122) || (charCode === 32) || (charCode === 42) || (charCode === 43) || (charCode === 45) || (charCode >= 48 && charCode <= 57)
    || (charCode === 46) || (charCode === 47) || (charCode === 44) || (charCode === 33) || (charCode === 34) || (charCode === 39) || (charCode === 35) || (charCode === 38) || (charCode === 37)
    || (charCode === 92) || (charCode === 96) || (charCode === 94) || (charCode === 95) || (charCode === 93) || (charCode === 91) || (charCode === 41) || (charCode === 40) || (charCode === 36)
    || (charCode === 125) || (charCode === 62) || (charCode === 63) || (charCode === 64) || (charCode === 58) || (charCode === 59) || (charCode === 60) || (charCode === 61) || (charCode === 123)
     || (charCode === 127) || (charCode === 126) || (charCode === 13) || (charCode === 8)) {
        return true;
    }
    else {

        txtAlert = 'لطفا انگلیسی وارد نمایید.<br/>';
        WarningAlert(txtAlert);
        return false;
    }
};
// چک صحیح بودن کد ملی 
function CheckMeliCode(meli_code) {
    if (meli_code.length == 10) {
        if (meli_code == '1111111111' ||
			meli_code == '0000000000' ||
			meli_code == '2222222222' ||
			meli_code == '3333333333' ||
			meli_code == '4444444444' ||
			meli_code == '5555555555' ||
			meli_code == '6666666666' ||
			meli_code == '7777777777' ||
			meli_code == '8888888888' ||
			meli_code == '9999999999' ||
			meli_code == '0123456789'
			) {
            return false;
        }
        c = parseInt(meli_code.charAt(9));
        n = parseInt(meli_code.charAt(0)) * 10 +
			parseInt(meli_code.charAt(1)) * 9 +
			parseInt(meli_code.charAt(2)) * 8 +
			parseInt(meli_code.charAt(3)) * 7 +
			parseInt(meli_code.charAt(4)) * 6 +
			parseInt(meli_code.charAt(5)) * 5 +
			parseInt(meli_code.charAt(6)) * 4 +
			parseInt(meli_code.charAt(7)) * 3 +
			parseInt(meli_code.charAt(8)) * 2;
        r = n - parseInt(n / 11) * 11;
        if ((r == 0 && r == c) || (r == 1 && c == 1) || (r > 1 && c == 11 - r)) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
};

function BarcodeControl(Barcode) {
    //BarcodeControl($('.ctrlIsBarcodeOk').val)

    if (Barcode.length >= 16) {
        var aCheck = Barcode.substring(0, 2)
        Barcode = Barcode.substring(1, 17)
        if (aCheck != "=R") {
            return false
            return;
        }
        var a1 = 8192 * parseInt(HarfValue(Barcode.substring(0, 1)))
        var a2 = 4096 * parseInt(HarfValue(Barcode.substring(1, 2)))
        var a3 = 2048 * parseInt(HarfValue(Barcode.substring(2, 3)))
        var a4 = 1024 * parseInt(HarfValue(Barcode.substring(3, 4)))
        var a5 = 512 * parseInt(HarfValue(Barcode.substring(4, 5)))
        var a6 = 256 * parseInt(HarfValue(Barcode.substring(5, 6)))
        var a7 = 128 * parseInt(HarfValue(Barcode.substring(6, 7)))
        var a8 = 64 * parseInt(HarfValue(Barcode.substring(7, 8)))
        var a9 = 32 * parseInt(HarfValue(Barcode.substring(8, 9)))
        var a10 = 16 * parseInt(HarfValue(Barcode.substring(9, 10)))
        var a11 = 8 * parseInt(HarfValue(Barcode.substring(10, 11)))
        var a12 = 4 * parseInt(HarfValue(Barcode.substring(11, 12)))
        var a13 = 2 * parseInt(HarfValue(Barcode.substring(12, 13)))
        var x = ((parseInt(a1) + parseInt(a2) + parseInt(a3) + parseInt(a4)
             + parseInt(a5) + parseInt(a6) + parseInt(a7) + parseInt(a8)
             + parseInt(a9) + parseInt(a10) + parseInt(a11) + parseInt(a12) + parseInt(a13)) % 37);

        var y = 38 - x;

        var Resault = y % 37;
        //alert(Resault)
        if (parseInt(HarfValue(Barcode.substring(15, 16))) === Resault) {

            return true
        }
        else {

            return false
        }
    };

};

function HarfValue(harf) {
    var resualt = 0
    switch (harf) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
            resualt = harf
            return resualt
            break;
        case 'A':
            resualt = 10
            return resualt
            break;
        case 'B':
            resualt = 11
            return resualt
            break;
        case 'C':
            resualt = 12
            return resualt
            break;
        case 'D':
            resualt = 13
            return resualt
            break;
        case 'E':
            resualt = 14
            return resualt
            break;
        case 'F':
            resualt = 15
            return resualt
            break;
        case 'G':
            resualt = 16
            return resualt
            break;
        case 'H':
            resualt = 17
            return resualt
            break;
        case 'I':
            resualt = 18
            return resualt
            break;
        case 'J':
            resualt = 19
            return resualt
            break;
        case 'K':
            resualt = 20
            return resualt
            break;
        case 'L':
            resualt = 21
            return resualt
            break;
        case 'M':
            resualt = 22
            return resualt
            break;
        case 'N':
            resualt = 23
            return resualt
            break;
        case 'O':
            resualt = 24
            return resualt
            break;
        case 'P':
            resualt = 25
            return resualt
            break;
        case 'Q':
            resualt = 26
            return resualt
            break;
        case 'R':
            resualt = 27
            return resualt
            break;
        case 'S':
            resualt = 28
            return resualt
            break;
        case 'T':
            resualt = 29
            return resualt
            break;
        case 'U':
            resualt = 30
            return resualt
            break;
        case 'V':
            resualt = 31
            return resualt
            break;
        case 'W':
            resualt = 32
            return resualt
            break;
        case 'X':
            resualt = 33
            return resualt
            break;
        case 'Y':
            resualt = 34
            return resualt
            break;
        case 'Z':
            resualt = 35
            return resualt
            break;
        case '*':
            resualt = 36
            return resualt
            break;
    }

};

function ReadMenu() {
  
    $.ajax({
        type: "Get",
        async: false,
        url: "/api/Login?Menu=0",
        data: "",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (result) {
            //alert(result);
            $('.sidebar-menu').html(result);
        },
    });
};


$(document).ready(function () {

   
    $('.Tarikh').datepicker({
        changeMonth: true,
        changeYear: true,
	yearRange: "c-100:c+10"
    });
    $('.TXTSpliter').timepicki({
        min_hour_value: 0,
        max_hour_value: 23,
        show_meridian: false,
    });

    $('select.styled').customSelect();

  
});

$(document).keyup(function (e) {
    if (e.keyCode == 13 || e.keyCode == 27) {
        jQuery('.EndMessage').click();
    }
});

//$(document).ready(function () {
    //$('.TXTSpliter').timepicki({
    //    min_hour_value: 0,
    //    max_hour_value: 23,
    //    show_meridian: false,
    //});
   //$('.TXTSpliter').keyup(function () {
    //    var Value = $(this).val();
    //    if (Value.length == 2) {
    //        Value += ':';
    //        $(this).val(Value);
    //    }
    //});
//});

//********************** ctrl barcode



