function NhanVien(_tknv, _name, _email, _pass, _date, _luongCB, _chucVu, _gioLam) {
    this.tknv=_tknv;
    this.name=_name;
    this.email=_email;
    this.pass=_pass;
    this.date=_date;
    this.luongCB=_luongCB;
    this.chucVu=_chucVu;
    this.gioLam=_gioLam;

    this.tinhTongLuong=function(){
        // 
        if(this.chucVu===1){
            this.tongLuong=this.luongCB*3;
        }else if(this.chucVu===2){
            this.tongLuong=this.luongCB*2;
        }else if(this.chucVu===3){
            this.tongLuong=this.luongCB;
        }else{
            alert("Vui lòng chọn chức vụ!!!");
        }
    };
    this.xepLoaiNhanVien=function(){
        if(this.gioLam>=192){
            this.xeploai="Nhân viên xuất sắc";
        }else if(192>this.gioLam&&this.gioLam>=176){
            this.xeploai="Nhân Viên giỏi";
        }else if(176>this.gioLam&&this.gioLam>=160){
            this.xeploai="Nhân viên khá";
        }else if(this.gioLam<160){
            this.xeploai="Nhân viên trung bình";
        }
    };
}