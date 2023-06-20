import { AfterViewInit, Component, OnInit } from '@angular/core';
declare var initHomeLayout: any;
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Khachhang } from './../../models/khachhang/khachhang.model';
import { Loaisanpham } from 'src/app/models/loaisanpham/loaisanpham.model';
import { Sanpham } from 'src/app/models/sanpham/sanpham.model';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public totalItem = 0;
  products: any[] = [];
  totalMoney!: number;
  photoPath: string;
  keyword: string;
  form: FormGroup;
  kh_id: number;
  kh_taikhoan: string;
  kh_matkhau: string;
  kh_matkhau2: string;
  kh_diachi: string;
  kh_sdt: string;
  kh_email: string;
  kh_tenkh: string;

  listUser: Khachhang[];

  user: Khachhang;

  dsLoaiSP: Loaisanpham[];

  // loaij san pham headeaf

  listNewest: Sanpham[];

  listHotest: Sanpham[];
  listBigPrice: Sanpham[];
  listSmallPrice: Sanpham[];

  imagePath: string = this.service.PhotoUrl;
  urlimage: any;
  constructor(
    private service: SharedService,
    private route: Router,
    private cartSerice: CartService,
    private toastr: ToastrService
  ) {}

  ngAfterViewInit(): void {
    initHomeLayout();
  }

  ngOnInit() {
    this.totalItem = this.cartSerice.getProducts().length;
    this.service.getAllCate().subscribe((data) => {
      this.dsLoaiSP = data;
    });
    this.loadData();
    this.loadCart();
    let user = localStorage.getItem('user');

    if (user) {
      this.kh_tenkh = JSON.parse(user).TENKH;
      this.kh_id = parseInt(JSON.parse(user).KhachHangID);
    }
    // this.addUser();
  }

  locSP(id: number) {
    console.log(id);
    localStorage.removeItem('maloai');
    localStorage.setItem('maloai', JSON.stringify(id));
    this.route.navigate(['/loaisanpham']);
  }

  locTinTuc(typeID: number) {
    console.log(typeID);
    localStorage.removeItem('typeID');
    localStorage.setItem('typeID', JSON.stringify(typeID));
    this.route.navigate(['/tintuc']);
  }
  loadData() {
    this.kh_id = 0;
    this.kh_taikhoan = '';
    this.kh_matkhau = '';
    this.kh_matkhau2 = '';
    this.kh_diachi = '';
    this.kh_sdt = '';
    this.kh_email = '';
    this.kh_tenkh = '';
  }

  loginNow() {
    this.service.getAllUser().subscribe((data) => {
      this.listUser = data;
      for (let item of this.listUser) {
        if (this.kh_taikhoan == item.TAIKHOAN) {
          if (this.kh_matkhau == item.MATKHAU) {
            this.user = item;
            localStorage.setItem('user', JSON.stringify(item));
            this.toastr.success(`Chào mừng đã quay trở lại ${item.TENKH}!`);

            // alert(`Chào mừng quay trở lại, ${item.TENKH}!`)
            break;
          } else {
            alert(`Mật khẩu đăng nhập không chính xác`);
            this.loadData();
          }
          this.loadData();
        } else {
          // this.toastr.error(`Không được để trống ô nhập`)
        }
        location.reload();
      }
    });
    // location.reload();
  }

  Validatecheck_nameDN(){

    if (!this.kh_taikhoan) {
      this.toastr.warning('Tên đăng nhập không để trống ');
      // alert("ok");
    }
  }

  log_out() {
    localStorage.removeItem('user');
    location.reload();
  }

  addUser() {
    this.user = {
      KhachHangID: this.kh_id,
      TAIKHOAN: this.kh_taikhoan,
      MATKHAU: this.kh_matkhau,
      DIACHI: this.kh_diachi,
      SODIENTHOAI: this.kh_sdt,
      EMAIL: this.kh_email,
      TENKH: this.kh_tenkh,
    };

    // this.form = new FormGroup({
    //   kh_sdt: new FormControl('', [s
    //     Validators.required,
    //     Validators.pattern('^(0)[0-9]{9}$')
    //   ]),
    // });

    if (
      this.kh_matkhau != this.kh_matkhau2 ||
      this.kh_taikhoan == '' ||
      this.kh_tenkh == '' ||
      this.kh_sdt == ''
    ) {
      alert(
        'Phát hiện dữ liệu truyền vào không hợp lệ, vui lòng kiểm tra lại!'
      );
    } else if (this.checkAccountDB() == false) {
      alert(
        'Tài khoản hoặc số điện thoại đã được sử dụng, vui lòng kiểm tra lại!'
      );
    } else {
      this.service.addUser(this.user).subscribe((data) => {
        alert('Hoàn tất mở tài khoản!');
        location.reload();
      });
    }
  }
  Validatecheck_antoan_matkhau(){
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

    if (!passwordPattern.test(this.kh_matkhau)) {
      this.toastr.warning('Password cần tối thiểu : 6 ký tự, bao gồm CHỮ HOA, chữ thường, số ');
    }
    // 6--8 ký tự, bao gồm CHỮ HOA, chữ thường, số
    return null; // Return null if the password is valid

  }

  //  hàm validate số ddienj thoại và xhenf thêm vào trong html
  Validatecheckpasswordgiongnhau() {

    if (
      this.kh_matkhau != this.kh_matkhau2){
        this.toastr.warning('password xác nhận lại không giống ');

      }
  }

  ValidateInputname(){
    if (!this.kh_tenkh) {
      this.toastr.warning('Tên người dùng không để trống ');
      // alert("ok");
    }
  }

  ValidateInputPhoneNumber() {
    // const phoneNumberPattern = /^(0|\+84)(9\d{8}|1\d{9})$/; // Regular expression pattern for Vietnamese phone number
    // const phoneNumberPattern = /^(0)[0-9]{9}$/; // Regular expression pattern for Vietnamese phone number
    const phoneNumberPattern = /^(0|\+84)(9\d{8}|1\d{9})$/; // Regular expression pattern for Vietnamese phone number

    // if (!this.kh_sdt) {
    //   this.toastr.warning('không để trống ');
    //   // alert("ok");
    // }
    if (!phoneNumberPattern.test(this.kh_sdt)) {
      this.toastr.warning('số điện thoại phải không hợp lệ'); // Show toastr warning message if the phone number does not match the pattern
      // return { 'invalidPhoneNumber': true }; // Return an error if the phone number format is incorrect
    }
    return null; // Return null if the phone number is valid

    // else{
    //   // alert("error");
    //   this.toastr.success(`saio`)

    // }
  }
  ValidateInputEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(this.kh_email)) {
      this.toastr.warning('semail không hợp lệ'); // Show toastr warning message if the phone number does not match the pattern
    }

    return null; // Return null if the email is valid
  }

  checkAccountDB() {
    let rs = true;
    this.service.getAllUser().subscribe((data) => {
      console.log(data);
      for (let i of data) {
        if (this.kh_sdt == i.sdt || this.kh_taikhoan == i.taikhoan) {
          rs = false;
        }
      }
    });
    return rs;
  }

  loadCart() {
    this.cartSerice.products$.subscribe((res) => {
      this.products = res;
      this.totalMoney = 0;
      for (let p of this.products) {
        this.totalMoney += p.Quantity * p.giaban;
      }
    });
    this.photoPath = this.service.PhotoUrl;
  }

  go(keyword: string) {
    localStorage.removeItem('keyword');
    localStorage.setItem('keyword', JSON.stringify(keyword));
    this.route.navigateByUrl(`/search`);
  }

  keyPress(event: any) {
    // let vl =(<HTMLInputElement>document.getElementById("keyword")).value;
    let vl = this.keyword;
    if (vl) {
      if (event.keyCode == 13) {
        this.go(vl);
      }
    }
  }
}
