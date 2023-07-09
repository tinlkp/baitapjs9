function Validation() {
    this.kiemTraRong = function (value, iderror, mes) {
        if (value === "") {
            getEle(iderror).innerHTML = mes;
            getEle(iderror).style.display = "block";

            return false;
        }
        getEle(iderror).innerHTML = "";
        getEle(iderror).style.display = "none";

        return true;
    };


    this.kiemTraDoDaiKitu = function (value, iderror, mes, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) {
            getEle(iderror).innerHTML = "";
            getEle(iderror).style.display = "none";

            return true;
        }
        getEle(iderror).innerHTML = mes;
        getEle(iderror).style.display = "block";

        return false;
    };
    this.check = function (value, iderror, mes, letter) {
        if (value.match(letter)) {
            getEle(iderror).innerHTML = "";
            getEle(iderror).style.display = "none";

            return true;
        }
        getEle(iderror).innerHTML = mes;
        getEle(iderror).style.display = "block";

        return false;
    };
    this.kiemTraFromTo = function (value, iderror, mes, min, max) {
        if (min <= value && value <= max) {
            getEle(iderror).innerHTML = "";
            getEle(iderror).style.display = "none";

            return true;
        }
        getEle(iderror).innerHTML = mes;
        getEle(iderror).style.display = "block";

        return false;

    };
    this.kiemTraGiaTri = function (value, iderror, mes, listNV) {
        var isExist = false;
        for (var i = 0; i < listNV.length; i++) {
            var nhanVien = listNV[i];
            if (nhanVien.tknv == value) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            getEle(iderror).innerHTML = mes;
            getEle(iderror).style.display = "block";

            return false;

        }
        getEle(iderror).innerHTML = "";
        getEle(iderror).style.display = "none";

        return true;
    };
}