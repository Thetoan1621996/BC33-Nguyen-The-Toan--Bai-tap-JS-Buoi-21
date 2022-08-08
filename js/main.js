// Tạo lớp đối tượng nhân viên

function Staff(
  account,
  name,
  email,
  password,
  dayWork,
  normalSalary,
  position,
  totalHour
) {
  this.account = account;
  this.name = name;
  this.email = email;
  this.password = password;
  this.dayWork = dayWork;
  this.normalSalary = normalSalary;
  this.position = position;
  this.totalHour = totalHour;
  this.totalSalary = function () {
    var totalSalary = 0;
    if (this.position == "Giám đốc") {
      totalSalary = this.normalSalary * 3;
    } else if (this.position == "Trưởng phòng") {
      totalSalary = this.normalSalary * 2;
    } else if (this.position == "Nhân viên") {
      totalSalary = this.normalSalary;
    }
    return totalSalary;
  };
  this.staffType = function () {
    var staffType = "";
    if (this.totalHour >= 192) {
      staffType = "Nhân viên xuất sắc";
    } else if (this.totalHour >= 176) {
      staffType = "Nhân viên giỏi";
    } else if (this.totalHour >= 160) {
      staffType = "Nhân viên khá";
    } else if (this.totalHour < 160) {
      staffType = "Nhân viên trung bình";
    }
    return staffType;
  };
}

// Lấy thông tin người dùng nhập vào từ form

var staffList = [];
function createStaff() {
  var staffAccount = document.querySelector("#tknv").value;
  var staffName = document.querySelector("#name").value;
  var staffEmail = document.querySelector("#email").value;
  var staffPassword = document.querySelector("#password").value;
  var staffDayWork = document.querySelector("#datepicker").value;
  var staffNormalSalary = document.querySelector("#luongCB").value;
  var staffPosition = document.querySelector("#chucvu").value;
  var staffTotalHour = document.querySelector("#gioLam").value;

  // Tạo đối tượng nhân viên mới
  var staff1 = new Staff(
    staffAccount,
    staffName,
    staffEmail,
    staffPassword,
    staffDayWork,
    staffNormalSalary,
    staffPosition,
    staffTotalHour
  );
  /**---------------Validation------------------ */
  console.log(staff1);
  //Kiểm tra rỗng

  var valid = true;
  valid &=
    kiemTraRong(staff1.account.trim(), "#tbTKNV", "Tài khoản") &
    kiemTraRong(staff1.name.trim(), "#tbTen", "Tên nhân viên") &
    kiemTraRong(staff1.email.trim(), "#tbEmail", "Email") &
    kiemTraRong(staff1.password.trim(), "#tbMatKhau", "Mật khẩu") &
    kiemTraRong(staff1.dayWork.trim(), "#tbNgay", "Ngày làm") &
    kiemTraRong(staff1.normalSalary.trim(), "#tbLuongCB", "Lương cơ bản") &
    kiemTraRong(staff1.totalHour.trim(), "#tbGiolam", "Giờ làm");

  // Kiểm tra độ dài tài khoản
  if (kiemTraRong(staff1.account.trim(), "#tbTKNV", "Tài khoản")) {
    valid &= kiemTraDoDai(staff1.account, "#tbTKNV", "Tài khoản", 4, 6);
  }

  // Kiểm tra kí tự cho tên
  if (kiemTraRong(staff1.name.trim(), "#tbTen", "Tên nhân viên")) {
    valid &= kiemTraKiTu(staff1.name.trim(), "#tbTen", "Tên nhân viên");
  }

  // Kiểm tra định dạng Email

  if (kiemTraRong(staff1.email.trim(), "#tbEmail", "Email")) {
    valid &= kiemTraEmail(staff1.email.trim(), "#tbEmail", "Email");
  }

  // Kiểm tra password

  if (kiemTraRong(staff1.password.trim(), "#tbMatKhau", "Mật khẩu")) {
    valid &= kiemTraPassWord(staff1.password.trim(), "#tbMatKhau", "Mật khẩu");
  }

  // Kiểm tra lương cơ bản

  if (kiemTraRong(staff1.normalSalary.trim(), "#tbLuongCB", "Lương cơ bản")) {
    valid &= kiemTraGiaTri(
      staff1.normalSalary.trim(),
      "#tbLuongCB",
      "Lương cơ bản",
      1000000,
      20000000
    );
  }

  // Kiểm tra chức vụ
  valid &= kiemTraChucVu(staff1.position, "#tbChucVu", "Chức vụ");

  // Kiêm tra số giờ làm trong tháng
  if (kiemTraRong(staff1.totalHour.trim(), "#tbGiolam", "Giờ làm")) {
    valid &= kiemTraGiaTri(
      staff1.totalHour.trim(),
      "#tbGiolam",
      "Giờ làm",
      80,
      200
    );
  }

  if (!valid) {
    return;
  }

  // Push nhân viên mới tạo vào staffList
  staffList.push(staff1);
  console.log(staffList);
  renderStaffList(staffList);
  saveToLocalStorage(staffList, "arrStaff");
}

// Hàm xuất danh sách nhân viên ra màn hình
function renderStaffList(arrStaff) {
  var output = [];
  for (i = 0; i < arrStaff.length; i++) {
    var objStaff = arrStaff[i];
    objStaff.totalSalary = function () {
      var totalSalary = 0;
      if (this.position == "Sếp") {
        totalSalary = this.normalSalary * 3;
      } else if (this.position == "Trưởng phòng") {
        totalSalary = this.normalSalary * 2;
      } else if (this.position == "Nhân viên") {
        totalSalary = this.normalSalary;
      }
      return totalSalary;
    };
    objStaff.staffType = function () {
      var staffType = "";
      if (this.totalHour >= 192) {
        staffType = "Nhân viên xuất sắc";
      } else if (this.totalHour >= 176) {
        staffType = "Nhân viên giỏi";
      } else if (this.totalHour >= 160) {
        staffType = "Nhân viên khá";
      } else if (this.totalHour < 160) {
        staffType = "Nhân viên trung bình";
      }
      return staffType;
    };

    var trStaff = `
        <tr>
            <td>${objStaff.account}</td>
            <td>${objStaff.name}</td>
            <td>${objStaff.email}</td>
            <td>${objStaff.dayWork}</td>
            <td>${objStaff.position}</td>
            <td>${objStaff.totalSalary()}</td>
            <td>${objStaff.staffType()}</td>
            <td><button class="btn btn-danger" onclick = "delStaff('${
              objStaff.account
            }')">Delete</button><br> <br>
            <button data-toggle="modal" data-target="#myModal" class="btn btn-success" onclick = "editStaff('${
              objStaff.account
            }')">Update</button></td>
        </tr>`;
    output += trStaff;
  }
  document.querySelector("#tableDanhSach").innerHTML = output;
}

// Hàm lưu dữ liệu vào localstorage

function saveToLocalStorage(ob, key) {
  var str = JSON.stringify(ob);
  localStorage.setItem(key, str);
}

// Hàm lấy dữ liệu từ localstorage về

function getData(key) {
  if (localStorage.getItem(key)) {
    var str = localStorage.getItem(key);
    var ob = JSON.parse(str);
    return ob;
  }
  return [];
}

// Hàm window.onload
window.onload = function () {
  staffList = getData("arrStaff");
  renderStaffList(staffList);
};

// Hàm xóa nhân viên
function delStaff(accountClick) {
  var indexDel = -1;
  for (index = 0; index < staffList.length; index++) {
    if (staffList[index].account == accountClick) {
      indexDel = index;
      break;
    }
  }
  if (indexDel != -1) {
    staffList.splice(indexDel, 1);
    renderStaffList(staffList);
    saveToLocalStorage(staffList, "arrStaff");
  }
}

// Hàm tìm nhân viên theo xếp loại

var findStaff = function () {
  var keyWord = document.querySelector("#searchName").value;
  keyWord = removeVietnameseTones(keyWord);
  var output = [];
  for (index = 0; index < staffList.length; index++) {
    var hangNhanVien = removeVietnameseTones(staffList[index].staffType());
    if (hangNhanVien.search(keyWord) != -1) {
      output.push(staffList[index]);
    }
  }
  renderStaffList(output);
};
document.querySelector("#searchName").oninput = findStaff;

// Hàm sửa thông tin nhân viên

function editStaff(accountClick) {
  var staffEdit = null;
  for (index = 0; index < staffList.length; index++) {
    if (staffList[index].account == accountClick) {
      staffEdit = staffList[index];
      break;
    }
  }
  if (staffEdit != null) {
    document.querySelector("#tknv").value = staffEdit.account;
    document.querySelector("#name").value = staffEdit.name;
    document.querySelector("#email").value = staffEdit.email;
    document.querySelector("#password").value = staffEdit.password;
    document.querySelector("#datepicker").value = staffEdit.dayWork;
    document.querySelector("#luongCB").value = staffEdit.normalSalary;
    document.querySelector("#chucvu").value = staffEdit.position;
    document.querySelector("#gioLam").value = staffEdit.totalHour;
  }
  document.querySelector("#myModal").classList.add("show");
}

// Hàm update thông tin nhân viên

document.querySelector("#btnCapNhat").onclick = function () {
  var updateStaff = new Staff();
  updateStaff.account = document.querySelector("#tknv").value;
  updateStaff.name = document.querySelector("#name").value;
  updateStaff.email = document.querySelector("#email").value;
  updateStaff.password = document.querySelector("#password").value;
  updateStaff.dayWork = document.querySelector("#datepicker").value;
  updateStaff.normalSalary = document.querySelector("#luongCB").value;
  updateStaff.position = document.querySelector("#chucvu").value;
  updateStaff.totalHour = document.querySelector("#gioLam").value;
  var indexUpdate = -1;
  for (index = 0; index < staffList.length; index++) {
    if (staffList[index].account == updateStaff.account) {
      indexUpdate = index;
      break;
    }
  }
  if (indexUpdate !== -1) {
    // staffList[indexUpdate].account = updateStaff.account;
    staffList[indexUpdate].name = updateStaff.name;
    staffList[indexUpdate].email = updateStaff.email;
    staffList[indexUpdate].password = updateStaff.password;
    staffList[indexUpdate].dayWork = updateStaff.dayWork;
    staffList[indexUpdate].normalSalary = updateStaff.normalSalary;
    staffList[indexUpdate].position = updateStaff.position;
    staffList[indexUpdate].totalHour = updateStaff.totalHour;
    //Kiểm tra rỗng

    var valid = true;
    valid &=
      kiemTraRong(updateStaff.account.trim(), "#tbTKNV", "Tài khoản") &
      kiemTraRong(updateStaff.name.trim(), "#tbTen", "Tên nhân viên") &
      kiemTraRong(updateStaff.email.trim(), "#tbEmail", "Email") &
      kiemTraRong(updateStaff.password.trim(), "#tbMatKhau", "Mật khẩu") &
      kiemTraRong(updateStaff.dayWork.trim(), "#tbNgay", "Ngày làm") &
      kiemTraRong(
        updateStaff.normalSalary.trim(),
        "#tbLuongCB",
        "Lương cơ bản"
      ) &
      kiemTraRong(updateStaff.totalHour.trim(), "#tbGiolam", "Giờ làm");

    // Kiểm tra độ dài tài khoản
    if (kiemTraRong(updateStaff.account.trim(), "#tbTKNV", "Tài khoản")) {
      valid &= kiemTraDoDai(updateStaff.account, "#tbTKNV", "Tài khoản", 4, 6);
    }

    // Kiểm tra kí tự cho tên
    if (kiemTraRong(updateStaff.name.trim(), "#tbTen", "Tên nhân viên")) {
      valid &= kiemTraKiTu(updateStaff.name.trim(), "#tbTen", "Tên nhân viên");
    }

    // Kiểm tra định dạng Email

    if (kiemTraRong(updateStaff.email.trim(), "#tbEmail", "Email")) {
      valid &= kiemTraEmail(updateStaff.email.trim(), "#tbEmail", "Email");
    }

    // Kiểm tra password

    if (kiemTraRong(updateStaff.password.trim(), "#tbMatKhau", "Mật khẩu")) {
      valid &= kiemTraPassWord(
        updateStaff.password.trim(),
        "#tbMatKhau",
        "Mật khẩu"
      );
    }

    // Kiểm tra lương cơ bản

    if (
      kiemTraRong(updateStaff.normalSalary.trim(), "#tbLuongCB", "Lương cơ bản")
    ) {
      valid &= kiemTraGiaTri(
        updateStaff.normalSalary.trim(),
        "#tbLuongCB",
        "Lương cơ bản",
        1000000,
        20000000
      );
    }

    // Kiểm tra chức vụ
    valid &= kiemTraChucVu(updateStaff.position, "#tbChucVu", "Chức vụ");

    // Kiêm tra số giờ làm trong tháng
    if (kiemTraRong(updateStaff.totalHour.trim(), "#tbGiolam", "Giờ làm")) {
      valid &= kiemTraGiaTri(
        updateStaff.totalHour.trim(),
        "#tbGiolam",
        "Giờ làm",
        80,
        200
      );
    }

    if (!valid) {
      return;
    }

    renderStaffList(staffList);
  }
};
