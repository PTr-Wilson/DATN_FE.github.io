import { Component, OnInit } from '@angular/core';
import { CartService } from '../Service/cart.service';
import { SharedService } from '../shared.service';
import { Ctdonhang } from '../models/ctdonhang/ctdonhang.model';
import { Order } from '../models/order/order.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  
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
  constructor(private cartService: CartService, private service: SharedService) { }

  myCart: []

  ngOnInit(): void {
    this.loadCart();
    this.prdPhotoPath = this.service.PhotoUrl
  }

  
  loadCart() {
    this.cartService.products$.subscribe((res) => {
      this.products = res;
      this.totalMoney = 0;
      for (let p of this.products) {
        this.totalMoney += p.Quantity * p.GIABAN;
      }
      this.soluongtong = 0;
      for (let p1 of this.products) {
        this.soluongtong += p1.Quantity;
      }
    });    
    let user=localStorage.getItem('user');
    if(user){
      this.FullName = JSON.parse(user).TENKH;
      this.Address = JSON.parse(user).DIACHI;
      this.Phone = JSON.parse(user).SODIENTHOAI;
      this.Email = JSON.parse(user).EMAIL;

    }
    
  }

  deleteProduct(id: number): void {
    this.cartService.deleteProduct(id);
    location.reload();
  }

  updateProduct(id: number, Quantity: number): void {
    if (Quantity > 0) {
      this.cartService.updateProduct(id, Quantity);
    }
  }


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
  

}
