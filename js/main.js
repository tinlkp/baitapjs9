var dsnv = new DSNV();

getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}
function layThongTin() {
    var _tknv = getEle("tknv").value;
    var _name = getEle("name").value;
    var _email = getEle("email").value;
    var _pass = getEle("password").value;
    var _date = getEle("datepicker").value;
    var _luongCB = getEle("luongCB").value;
    var _chucVu = getEle("chucvu").value;
    var _gioLam = document.getElementById("gioLam").value;



    var nhanVien = new NhanVien(_tknv, _name, _email, _pass, _date, _luongCB, _chucVu, _gioLam)

    nhanVien.tinhTongLuong();
    nhanVien.xepLoaiNhanVien();
    console.log(dsnv);
    return nhanVien;
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
    localStorage.setItem("dsnv", dataString)
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
    var nhanVien = layThongTin();

    dsnv.themNV(nhanVien);
    rendertable(dsnv.arr);
    setLocalStorage();

}

// sửa thông tin nhân viên
function suaNhanVien(tknv) {
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
    }
}

// cập nhật lại thông tin cho nhân viên
// thêm onclick cho button có id= btnCapnhat
function capNhatNhanVien(){
    var nhanVien=layThongTin();
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
function searchNhanVien(){
    var timNhanVien=getEle("searchName").value;
    var mangTimKiem=dsnv.timKiemNhanVien(timNhanVien);
    console.log(mangTimKiem);
    rendertable(mangTimKiem);
}
getEle("searchName").addEventListener("keyup", searchNhanVien)