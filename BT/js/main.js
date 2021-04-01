function dangKy() {

    var inputHo = document.getElementById('id_ho').value;
    var inputTen = document.getElementById('id_ten').value;
    var inputEmail = document.getElementById('id_mail').value;
    var inputPass = document.getElementById('id_pass').value;
    var inputDay = document.getElementById('id_day').value;
    var inputMonth = document.getElementById('id_month').value;
    var inputYear = document.getElementById('id_year').value;
    var inputRadioNam = document.getElementById('id_nam').value;
    var inputRadioNu = document.getElementById('id_nu').value;

    if (inputHo == '') {
        document.getElementById('hoho').innerHTML = 'Vui lòng nhập Họ'

    }
    if (inputTen == '') {
        document.getElementById('tenten').innerHTML = 'Vui lòng nhập Tên'

    }
    if (inputEmail == '') {
        document.getElementById('mailmail').innerHTML = 'Vui lòng nhập Email'

    }
    if (inputPass == '') {
        document.getElementById('passpass').innerHTML = 'Vui lòng nhập Pass'

    }
  


    if (inputHo != '' && inputTen != '' && inputEmail != '' && inputPass != ''  ) {
        document.write(` Chào mừng ${inputHo} ${inputTen} đã đăng ký thành công <br>`);
        document.write(`Họ và tên: ${inputHo} ${inputTen} <br>`);
        document.write(`Email: ${inputEmail} <br>`);
        document.write(`Ngày sinh: ${inputDay} / ${inputMonth} / ${inputYear} <br>`);

    }




}