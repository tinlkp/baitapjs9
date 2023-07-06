function DSNV() {
    this.arr = [];

    this.themNV = function (nhanVien) { 
        this.arr.push(nhanVien);
    };
    this.vitri =function(tknv){
        var index=-1;
        for( var i =0;this.arr.length;i++){
            var nhanVien=this.arr[i];
            if(nhanVien.tknv===tknv){
                index=i;
                break;
            }
        }
        return index;
    };

    this.xoaNV = function (tknv) {
        var xoavitri= this.vitri(tknv);
        if(xoavitri !== -1){
            this.arr.splice(xoavitri, 1);
        }
     };
    this.layThongTin = function (tknv) {
        var index=this.vitri(tknv);
        if(index !== -1 ){
            var nhanVien=this.arr[index];
            return nhanVien;
        }

     };
    this.capNhatNV = function (nhanVien) {
        var index= this.vitri(nhanVien.tknv);
        if(index !== -1){
            this.arr[index]= nhanVien;
        }
     };
     this.timKiemNhanVien=function(keyword){
        var mangTimKiem=[];
        for (var i =0; i<this.arr.length;i++){
            var nhanVien=this.arr[i];
            // convert keyword
            var keywordLowerCase=keyword.toLowerCase();
            var xeploaiLowerCase=nhanVien.xeploai.toLowerCase();

            if(xeploaiLowerCase.indexOf(keywordLowerCase) !== -1){
                mangTimKiem.push(nhanVien);
            }
        }
        return mangTimKiem;
     }
}