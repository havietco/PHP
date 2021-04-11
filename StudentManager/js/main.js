

class SinhVien {
    constructor() {
        this.txtMaSV = '';
        this.txtHoten = '';
        this.txtEmail = '';
        this.txtDienThoai = '';
        this.DSSV = [];
        this.danhSachSinhVien;

    }

    //Kiểm tra Số Điện Thoại
    KiemTraPhone(txtDienThoai) {
        let txtNhapPhone = /^(\+{0,1}( )*)([0-9](( )*\.{0,1}( )*))*[0-9]{1}$/;
        return !(txtNhapPhone.test(this.txtDienThoai));
 
    }

    //Kiểm tra nhập Email
    KiemTraEmail(txtEmail) {
        let txtNhapEmail =
            /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/;
        return !(txtNhapEmail.test(this.txtEmail));
    }
    // Hàm thêm sinh viên
    ThemSinhVien() {
        
        this.txtMaSV = document.getElementById('txtMaSV').value;
        this.txtHoTen = document.getElementById('txtHoTen').value;
        this.txtEmail = document.getElementById('txtEmail').value;
        this.txtDienThoai = document.getElementById('txtDienThoai').value;
        this.flag = true;
        if (this.txtMaSV === '') {
            document.getElementById('errorMaSV').innerHTML = `Vui lòng nhập Mã Sinh Viên`;
            this.flag = false;
        } else if (this.txtMaSV.length < 3) {
            document.getElementById('errorMaSV').innerHTML = `Vui lòng nhập đúng 00X`;
            this.flag = false;
        } else {
            document.getElementById('errorMaSV').innerHTML = ``;
        }

        //Kiểm tra thông tin txtHoTen
        if (this.txtHoTen === '') {
            document.getElementById('errorHoTen').innerHTML = `Vui lòng nhập Họ Tên`;
            this.flag = false;
        } else if (this.txtHoTen.length < 3) {
            document.getElementById('errorHoTen').innerHTML = `Vui lòng nhập đúng 3 ký tự`;
            this.flag = false;
        } else {
            document.getElementById('errorHoTen').innerHTML = ``;
        }

        //Kiểm tra thông tin Email
        if (this.txtEmail === '') {
            document.getElementById('errorEmail').innerHTML = `Vui lòng nhập Email `;
            this.flag = false;
        } else if (this.KiemTraEmail(txtEmail)) {
            document.getElementById('errorEmail').innerHTML = `Bạn nhập sai định dạng Emial "@"`;
            this.flag = false;
        } else {
            document.getElementById('errorEmail').innerHTML = ``;
        }

        //Kiểm Tra thông tin Số Điện Thoại
        if (this.txtDienThoai === '') {
            document.getElementById('errorDienThoai').innerHTML = `Vui lòng nhập Số Điện Thoại`;
            this.flag = false;        
        } else if (this.txtDienThoai.length < 10 || this.txtDienThoai.length > 10) {
            document.getElementById('errorDienThoai').innerHTML = `Số điện thoại 10 số`;
            this.flag = false;
        } else if (this.KiemTraPhone(this.txtDienThoai)) {
            document.getElementById('errorDienThoai').innerHTML = `Bạn nhập sai đinh dạng số điện thoại`;
            this.flag = false;
        } else {
            document.getElementById('errorDienThoai').innerHTML = ``;
            this.flag = true;
        } 

        //Kiểm tra Mã SV trùng thì không thêm vào Danh sách
        for (let i = 0; i < this.DSSV.length; i++) {
            if (this.txtMaSV == this.DSSV[i][0]) {
                return alert(`Mã Sinh viên đã tồn tại!!!`);
            }
        }
        /* var ketQua = document.getElementById('ketQua');
         ketQua.innerHTML = `${this.txtMaSV} / ${this.txtHoTen} / ${this.txtEmail} / ${this.txtDienThoai}`; */

        this.a = [`${this.txtMaSV}`, `${this.txtHoTen}`, `${this.txtEmail}`, `${this.txtDienThoai}`];
        if (this.flag == true) {

            this.DSSV.push(this.a);
            document.getElementById('txtMaSV').value = '';
            document.getElementById('txtHoTen').value = '';
            document.getElementById('txtEmail').value = '';
            document.getElementById('txtDienThoai').value = '';

            let mangSinhVien = this.DSSV;
            mangSinhVien = JSON.stringify(mangSinhVien);//chuyển về json
            localStorage.setItem("DaTa", mangSinhVien); //dùng JSON.stringify để lưu mảng 
        }


    }
    HienThiSinhVien() {

        let tableDanhSach = document.getElementById('tableDanhSach');
        tableDanhSach.innerHTML = '';

        //lay data cu
        let get_data_arr = localStorage.getItem("DaTa");
        this.DSSV = JSON.parse(get_data_arr);

        this.DSSV.forEach(function (v, i) {
            tableDanhSach.innerHTML += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${v[0]}</td>
                    <td>${v[1]}</td>
                    <td>${v[2]}</td>
                    <td>${v[3]}</td>
                    <td>
                        <a href="javascript:;" class="btn btn-warning btn-sm" onclick='SuaSinhVien(${i})'>Sửa</a>
                        <a href="javascript:;" class="btn btn-danger btn-sm"  onclick='XoaSinhVien(${i})'>Xóa</a>
                    </td>
                </tr>

            `;
        }); 
    }// Kết thúc Hiển thị danh sách

} // Kết thúc Class

//Khởi tạo đối tượng
objSinhVien = new SinhVien();
objSinhVien.HienThiSinhVien(); // 

// Bắt sự kiện Thêm Sinh viên
document.getElementById('txtButtonAdd').addEventListener('click', function() {
    objSinhVien.ThemSinhVien();
    objSinhVien.HienThiSinhVien();
})

//Hàm sửa Sinh Viên
function SuaSinhVien(id) {

    let SV = objSinhVien.DSSV[id];

    document.getElementById('txtMaSV').value = SV[0];
    document.getElementById('txtHoTen').value = SV[1];
    document.getElementById('txtEmail').value = SV[2];
    document.getElementById('txtDienThoai').value = SV[3];
    document.getElementById('id_hidden').value = id;

}
//Hàm cập nhật Sinh Viên 
function CapNhatSinhVien(id) {

    //Lấy tên Sinh Viên cần xóa 
    if (!id) {
        return alert(`Bạn chưa chọn Mã Sinh Viên`);
    }
    //Duyệt ID trong mảng lấy ID giá trị cập sửa
    let SV = objSinhVien.DSSV[id];
    
    //Hiện tại giá trị lên trường nhập để sửa
    SV[0] = document.getElementById('txtMaSV').value;
    SV[1] = document.getElementById('txtHoTen').value;
    SV[2] = document.getElementById('txtEmail').value;
    SV[3] = document.getElementById('txtDienThoai').value;

    console.log(SV[0],SV[1],SV[2],SV[3]); // Đã lấy được thông tin sinh viên cần cập nhật

    //Xóa trường nhập sao khi Cập nhật thành công
    document.getElementById('txtMaSV').value = '';
    document.getElementById('txtHoTen').value = '';
    document.getElementById('txtEmail').value = '';
    document.getElementById('txtDienThoai').value = '';
    document.getElementById('id_hidden').value = '';


	//Cập nhật lại đối tượng
	objSinhVien.DSSV[id] = SV;
	
	//Lưu danh sách sau khi cập nhật
	let mangSinhVien = objSinhVien.DSSV;
    mangSinhVien = JSON.stringify(mangSinhVien);//chuyển về json
    localStorage.setItem("DaTa", mangSinhVien); //dùng JSON.stringify để lưu mảng 

    //Hiển thị lại bảng danh sách đã được cập nhật
    objSinhVien.HienThiSinhVien(); // Nhưng không lưu và hiển thị ra ngoài được. 

}
// Hàm Xóa Sinh Viên
function XoaSinhVien(id) {
    //Duyệt mảng
    let SV = objSinhVien.DSSV;

    //Lấy tên Sinh Viên cần xóa - 
    let TenSinhVien = SV[id][1];
    let idMaSV = SV[id][0];

    //Xóa phần từ trong mảng
    SV.splice(id, 1);

    //Dùng JSON để lưu danh sách cục bộ 
    let mangSinhVien = objSinhVien.DSSV;
    mangSinhVien = JSON.stringify(mangSinhVien);//chuyển về json
    localStorage.setItem("DaTa", mangSinhVien); //dùng JSON.stringify để lưu mảng 

    //Hiển thị lại bảng cập nhật 
    objSinhVien.HienThiSinhVien();

    //Xóa trường nhập sao khi Cập nhật thành công
    document.getElementById('txtMaSV').value = '';
    document.getElementById('txtHoTen').value = '';
    document.getElementById('txtEmail').value = '';
    document.getElementById('txtDienThoai').value = '';
    document.getElementById('id_hidden').value = '';

    //Thông báo xác nhận xóa 1 Sinh Viên
    $.notify(`Bạn đã xóa ${TenSinhVien} có ID ${idMaSV} thành công`, "success");

} // Kết thúc Hàm Xóa Sinh Viên



function TimKiemSinhVien(timkiem) {
    //Duyệt mảng
    let SV = objSinhVien.DSSV;

    let danhsachTimThay = [];
    for (i = 0; i < SV.length; i++) {
        if (SV[i][0] == timkiem) {
            danhsachTimThay.push(SV[i]);
        };
    }
    let tableDanhSach1 = document.getElementById('tableDanhSach');
    tableDanhSach1.innerHTML = '';

    danhsachTimThay.forEach(function (v, i) {
        tableDanhSach1.innerHTML += `
             <tr>
                 <td>${i + 1}</td>
                 <td>${v[0]}</td>
                 <td>${v[1]}</td>
                 <td>${v[2]}</td>
                 <td>${v[3]}</td>
                 <td>
                     <a href="javascript:;" class="btn btn-warning btn-sm" onclick='SuaSinhVien(${i})'>Sửa</a>
                     <a href="javascript:;" class="btn btn-danger btn-sm"  onclick='XoaSinhVien(${i})'>Xóa</a>
                 </td>
             </tr>

         `;
    }); // Kết thúc Hiển thị danh sách

}// Kết thúc Hàm Tìm Kiếm Sinh Viên

// Bắt sự kiện tìm kiếm trong input
let timkiemSV = document.getElementById('timkiemSV');
timkiemSV.addEventListener('keyup', function () {
    if (timkiemSV.value != '') {
        TimKiemSinhVien(timkiemSV.value);
    } else {
        objSinhVien.HienThiSinhVien();
    }
})


