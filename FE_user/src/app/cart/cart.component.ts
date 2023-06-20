import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { Sanpham } from '../models/sanpham/sanpham.model';

import { SharedService } from '../shared.service';
import { CartService } from '../Service/cart.service';
import { Ctdonhang } from '../models/ctdonhang/ctdonhang.model';
import { Order } from '../models/order/order.model';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']

})
export class CartComponent implements OnInit {
  // /thanh pho
  listCity: any[] = [];
  listDistrict: any[] = [];
  listCommune: any[] = [];
  city: string;
  district: string;
  commune: string;
  //xa

  products: any[] = [];
  totalMoney!: number;
  soluongtong!: number;
  // gianhap!: number;
  // GIANHAP: number;
    prdPhotoPath: string
  TENSP: any
  IDKhachhang:any;
  UserName: string = ''
  Password: string = ''
  Address: string = ''
  Phone: string = ''
  Email: string = ''
  FullName: string = ''
  Notes: string = ''

  constructor(private cartService: CartService, private service: SharedService,
    private toastr: ToastrService, private router: Router) { }



  ngOnInit(): void {
    let elem = document.getElementsByClassName('script');
    if (elem.length != undefined) {
      for (var i = elem.length - 1; 0 <= i; i--) {
        elem[i].remove();
      }
    }
    this.getCity();

    this.loadCart();
    this.prdPhotoPath = this.service.PhotoUrl
  }

  // change(id:any,q:any,slt:number)
  // {
  //   this.cartService.change(id, q);

  // }
  change(id:any,quantity:number,sl:any)
  {
    if(quantity>sl)
    {
      this.toastr.warning(`Quá số lượng tồn `)

      this.cartService.change(id, sl);
    }
    else if(quantity<sl)
    {
      this.cartService.updatevalidatestringofp(id,'');
      this.cartService.change(id,quantity);
    }
    else
    {
      this.cartService.updatevalidatestringofp(id,'');
      this.cartService.change(id, quantity);

    }
  }
    loadCart() {
    this.cartService.products$.subscribe((res) => {
      this.products = res;
      console.log(res);
      this.totalMoney = 0;
      for (let p of this.products) {
        this.totalMoney += p.Quantity * p.GIABAN;
      }
      // this.gianhap = 0;
      // for (let gn of this.products) {
      //   this.gianhap += gn.Quantity * gn.GIANHAP;
      // }
      this.soluongtong = 0;
      for (let p1 of this.products) {
        this.soluongtong += p1.Quantity;
      }
     

    });
    let user = localStorage.getItem('user');
    if (user) {
      this.FullName = JSON.parse(user).TENKH;
      this.Address = JSON.parse(user).DIACHI;
      this.Phone = JSON.parse(user).SODIENTHOAI;
    }

  }

  deleteProduct(id: number): void {
    this.cartService.deleteProduct(id);
    // location.reload();
    this.toastr.error(`Đã xóa sản phẩm`)
    this.cartService.deleteProduct(id);
    // this.toastr.success(`Đã thêm ${product.TENSP}`)

  }

  // updateProduct(id: number, Quantity: number,sl:any,tstring:string): void {
  //   if (Quantity > 0) {
  //     this.cartService.updateProduct(id, Quantity);
  //   }
  // }
  updateProduct(id: number, Quantity: number,sl:any,tstring:string): void {

    if(tstring=='giam')
    {
      if (Quantity > 0) {
        this.cartService.updatevalidatestringofp(id,'')
        this.cartService.updateProduct(id, Quantity);
      }
    }
    else if(tstring=='tang')
    {
      if(Quantity>sl)
      {
            // this.cartService.updatevalidatestringofp(id,'quá số lượng,nhập lại!')
            this.toastr.warning(`Vượt quá số lượng tồn!`)
          }
      else
      {
        if (Quantity > 0) {
          this.cartService.updatevalidatestringofp(id,'');
          this.cartService.updateProduct(id, Quantity);
        }
      }

    }
   
  }
  // letOrder() {
  //   let user = localStorage.getItem("user")

  //   console.log(user);
  //   if (user) {
  //     console.log(user);

  //     let order: Order = {
  //       DonHangID: 0,
  //       NGAYDAT: new Date(),
  //       TONGTIEN: this.totalMoney,
  //       KHACHHANG: JSON.parse(user).KhachHangID,
  //       GHICHU: this.Notes,
  //       DIACHI: this.Address,
  //       SDT: this.Phone,
  //       TENKH: this.FullName,
  //     }
  //     this.service.addOrder(order).subscribe(data => {
  //       console.log(data)
  //       this.service.getNewestOd().subscribe(newestID => {

  //         let cart = localStorage.getItem("carts")
  //         let orderDtail: Ctdonhang
  //         if (cart) {
  //           cart = JSON.parse(cart)
  //           for (let item of Object(cart)) {
  //             orderDtail = {
  //               CTDonHangID: 0,
  //               MAHDX: newestID[0],
  //               MASP: item.SanPhamID,
  //               SOLUONG: item.Quantity,
  //               GIABAN: item.GIABAN,
  //               THANHTIEN: item.Quantity * item.GIABAN,
  //               TRANGTHAI: item.TRANGTHAI
  //             }
  //             this.service.addOrderDetail(orderDtail).subscribe(res => void {})
  //           }
  //         }
  //         localStorage.removeItem('carts')
  //         alert("Đặt hàng thành công!")
  //         location.reload();
  //       })
  //     })
  //   }
  //   else if(this.products.length==0){
  //     alert("giỏ hàng đang trống")
  //   }
  //   else {
  //     // this.toastr.warning(`Vui lòng đăng nhập tài khoản`)
      
  //     let order: Order = {
  //       DonHangID: 0,
  //       NGAYDAT: new Date(),
  //       TONGTIEN: this.totalMoney,
  //       KHACHHANG: this.IDKhachhang,
  //       GHICHU: this.Notes,
  //       DIACHI: this.Address,
        
  //       SDT: this.Phone,
  //       TENKH: this.FullName,
  //     }
  //     this.service.addOrder(order).subscribe(data => {
  //       console.log(data)
  //       this.service.getNewestOd().subscribe(newestID => {

  //         let cart = localStorage.getItem("carts")
  //         let orderDtail: Ctdonhang
  //         if (cart) {
  //           cart = JSON.parse(cart)
  //           for (let item of Object(cart)) {
  //             orderDtail = {
  //               CTDonHangID: 0,
  //               MAHDX: newestID[0],
  //               MASP: item.SanPhamID,
  //               SOLUONG: item.Quantity,

  //               GIABAN: item.GIABAN,
  //               THANHTIEN: item.Quantity * item.GIABAN,
  //               TRANGTHAI: item.TRANGTHAI
  //             }
  //             this.service.addOrderDetail(orderDtail).subscribe(res => void {})
  //           }
  //         }
  //         localStorage.removeItem('carts')
  //         alert("Đặt hàng thành công!")
  //         location.reload();
  //       })
  //     })
  //   }
  // }

  letOrder() {
    let user = localStorage.getItem("user");
  
    console.log(user);
    if (user) {
      console.log(user);
  
      let order: Order = {
        DonHangID: 0,
        NGAYDAT: new Date(),
        TONGTIEN: this.totalMoney,
        KHACHHANG: JSON.parse(user).KhachHangID,
        GHICHU: this.Notes,
        DIACHI: this.Address,
        SDT: this.Phone,
        TENKH: this.FullName,
      };
  
      if (this.products.length === 0) {
        alert("Giỏ hàng đang trống");
      } else {
        this.service.addOrder(order).subscribe((data) => {
          console.log(data);
          this.service.getNewestOd().subscribe((newestID) => {
            let cart = localStorage.getItem("carts");
            let orderDtail: Ctdonhang;
  
            if (cart) {
              cart = JSON.parse(cart);
              for (let item of Object(cart)) {
                orderDtail = {
                  CTDonHangID: 0,
                  MAHDX: newestID[0],
                  MASP: item.SanPhamID,
                  SOLUONG: item.Quantity,
                  GIABAN: item.GIABAN,
                  THANHTIEN: item.Quantity * item.GIABAN,
                  TRANGTHAI: item.TRANGTHAI,
                };
                this.service.addOrderDetail(orderDtail).subscribe((res) => {});
              }
            }
            localStorage.removeItem("carts");
            alert("Đặt hàng thành công!");
            location.reload();
          });
        });
      }
    } else {
      if (this.products.length === 0) {
        alert("Giỏ hàng đang trống");
      } else {
        let order: Order = {
          DonHangID: 0,
          NGAYDAT: new Date(),
          TONGTIEN: this.totalMoney,
          KHACHHANG: this.IDKhachhang,
          GHICHU: this.Notes,
          DIACHI: this.Address,
          SDT: this.Phone,
          TENKH: this.FullName,
        };
  
        this.service.addOrder(order).subscribe((data) => {
          console.log(data);
          this.service.getNewestOd().subscribe((newestID) => {
            let cart = localStorage.getItem("carts");
            let orderDtail: Ctdonhang;
  
            if (cart) {
              cart = JSON.parse(cart);
              for (let item of Object(cart)) {
                orderDtail = {
                  CTDonHangID: 0,
                  MAHDX: newestID[0],
                  MASP: item.SanPhamID,
                  SOLUONG: item.Quantity,
                  GIABAN: item.GIABAN,
                  THANHTIEN: item.Quantity * item.GIABAN,
                  TRANGTHAI: item.TRANGTHAI,
                };
                this.service.addOrderDetail(orderDtail).subscribe((res) => {});
              }
            }
            localStorage.removeItem("carts");
            alert("Đặt hàng thành công!");
            location.reload();
          });
        });
      }
    }
  }
  

  getCity() {
    this.service.getCity().subscribe((data: any) => {
      this.listCity = data;
    })
  }

  getDistrict(name: any) {
    console.log(name)
    this.city = name;
    document.getElementById("huyen")?.classList.remove("disabled");
    for (let i = 0; i < this.listCity.length; i++) {
      if (this.listCity[i].name === name) {
        this.listDistrict = this.listCity[i].huyen;
      }
    }
  }

  getCommune(name: any) {
    this.district = name;
    document.getElementById('xa')?.classList.remove("disabled");
    for (let i = 0; i < this.listDistrict.length; i++) {
      if (this.listDistrict[i].name === name) {
        this.listCommune = this.listDistrict[i].xa;
      }
    }
  }

  getNameCommune(name: any) {
    this.commune = name;
    // document.getElementById('xa')?.classList.remove("disabled");
    // for (let i = 0; i < this.listCommune.length; i++) {
    //   if (this.listCommune[i].name === name) {
    //     this.listCommune = this.listCommune[i].xa;
    //   }
    // }
  }
}
