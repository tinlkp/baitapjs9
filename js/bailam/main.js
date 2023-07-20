var dsnv = new DSNV();
var validation = new Validation();
getLocalStorage();
// abc
function getEle(id) {
    return document.getElementById(id);
}
getEle("btnThem").onclick=function(){
    getEle("btnThemNV").disabled = false;
    getEle("tknv").disabled = false;
    getEle("btnCapNhat").disabled = true;

}
function layThongTin(isAdd) {
    var _tknv = getEle("tknv").value;
    var _name = getEle("name").value;
    var _email = getEle("email").value;
    var _pass = getEle("password").value;
    var _date = getEle("datepicker").value;
    var _luongCB = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = document.getElementById("gioLam").value;

    // validation
    var isValid = true;
    // check tài khoản
    if(isAdd){
        isValid &= validation.kiemTraRong(_tknv, "tbTKNV", "Vui lòng điền tài khoản !!!")
        && validation.kiemTraDoDaiKitu(_tknv, "tbTKNV", "Vui lòng điền từ 4 đến 6 kí tự !!!", 4, 6)
        && validation.kiemTraGiaTri(_tknv, "tbTKNV", "Tài khoản đã tồn tại !!!", dsnv.arr);
    };
       
    // check name
    isValid &= validation.kiemTraRong(_name, "tbTen", "Vui lòng điền họ và tên !!!")
        && validation.check(_name, "tbTen", "Vui lòng điền đúng họ và tên !!!", "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$");
    //check email
    isValid &= validation.kiemTraRong(_email, "tbEmail", "Vui lòng điền email !!!")
        && validation.check(_email, "tbEmail", "Vui lòng điền đúng định dạng email !!!", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    //check pass
    isValid &= validation.kiemTraRong(_pass, "tbMatKhau", "Vui lòng điền mật khẩu !!!")
        && validation.kiemTraDoDaiKitu(_pass, "tbMatKhau", "Vui lòng điền từ 6 đến 10 kí tự !!!", 6, 10)
        && validation.check(_pass, "tbMatKhau", "Vui lòng điền đủ độ bảo mật !!!", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/);
    // check date
    isValid &= validation.kiemTraRong(_date, "tbNgay", "Vui lòng điền ngày làm !!!")
        && validation.check(_date, "tbNgay", "Vui lòng điền định dạng ngày/tháng/năm !!!", /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/)

    // check lươngCB
    isValid &= validation.kiemTraRong(_luongCB, "tbLuongCB", "Vui lòng điền lương cơ bản !!!")
        && validation.check(_luongCB, "tbLuongCB", "Vui lòng số !!!", /^[0-9]+$/)
        && validation.kiemTraFromTo(_luongCB, "tbLuongCB", "Vui lòng điền từ 1 triệu tới 20 triệu !!!", 1000000, 20000000);
    // check chức vụ
    isValid &= validation.kiemTraRong(_chucVu, "tbChucVu", "Vui lòng chọn chức vụ !!!");

    // check giờ làm
    isValid &= validation.kiemTraRong(_gioLam, "tbGiolam", "Vui lòng điền giờ làm !!!")
        && validation.kiemTraFromTo(_gioLam, "tbGiolam", "Vui lòng điền từ 80 đến 200 giờ thôi !!!", 80, 200);


    if (isValid) {
        var nhanVien = new NhanVien(_tknv, _name, _email, _pass, _date, _luongCB, _chucVu, _gioLam)

        nhanVien.tinhTongLuong();
        nhanVien.xepLoaiNhanVien();
        return nhanVien;
    }
    return null;
}
function rendertable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nhanVien = data[i];

        content += `
        <tr>
        <td>${nhanVien.tknv}</td>
        <td>${nhanVien.name}</td>
        <td>${nhanVien.email}</td>
        <td>${nhanVien.date}</td>
        <td>${nhanVien.chucVu}</td>
        <td>${nhanVien.tongLuong}</td>
        <td>${nhanVien.xeploai}</td>
        <td>
            <button class="btn btn-warning"  data-toggle="modal" data-target="#myModal" onclick="suaNhanVien('${nhanVien.tknv}')">Sửa</button>
            <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.tknv}')">Xóa</button>

        </tr>
        `
    }
    getEle("tableDanhSach").innerHTML = content;

}
function setLocalStorage() {
    var dataString = JSON.stringify(dsnv.arr);
    localStorage.setItem("dsnv", dataString);
}
function getLocalStorage() {
    if (localStorage.getItem("dsnv")) {
        var dataString = localStorage.getItem("dsnv");
        var dataJson = JSON.parse(dataString);
        dsnv.arr = dataJson;
        rendertable(dsnv.arr);
    }

}
// Thêm nhân viên
function themNhanVien() {
    var nhanVien = layThongTin(true);
    if (nhanVien) {
        dsnv.themNV(nhanVien);
        rendertable(dsnv.arr);
        setLocalStorage();
    }


}

// sửa thông tin nhân viên
function suaNhanVien(tknv) {
    getEle("btnThemNV").disabled = true;
    getEle("btnCapNhat").disabled = false;
    var nhanVien = dsnv.layThongTin(tknv);

    if (nhanVien) {
        getEle("tknv").value = nhanVien.tknv;
        getEle("tknv").disabled = true;
        getEle("name").value = nhanVien.name;
        getEle("email").value = nhanVien.email;
        getEle("password").value = nhanVien.pass;
        getEle("datepicker").value = nhanVien.date;
        getEle("luongCB").value = nhanVien.luongCB;
        getEle("chucvu").value = nhanVien.chucVu;
        getEle("gioLam").value = nhanVien.gioLam;
    }
}

// cập nhật lại thông tin cho nhân viên
// thêm onclick cho button có id= btnCapnhat
function capNhatNhanVien() {
    var nhanVien = layThongTin(false);
    dsnv.capNhatNV(nhanVien);
    rendertable(dsnv.arr);
    setLocalStorage();
}

// xóa nhân viên
function xoaNhanVien(tknv) {
    dsnv.xoaNV(tknv);
    rendertable(dsnv.arr);
    setLocalStorage();
}

// tìm nhân viên
function searchNhanVien() {
    var timNhanVien = getEle("searchName").value;
    var mangTimKiem = dsnv.timKiemNhanVien(timNhanVien);
    rendertable(mangTimKiem);
}
getEle("searchName").addEventListener("keyup", searchNhanVien);