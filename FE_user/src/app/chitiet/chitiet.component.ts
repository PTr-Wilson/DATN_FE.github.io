import { CartService } from './../Service/cart.service';
import {AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Loaisanpham } from '../models/loaisanpham/loaisanpham.model';
import { Sanpham } from '../models/sanpham/sanpham.model';
import { ToastrService } from 'ngx-toastr';

declare var initHomeLayout:any;

@Component({
  selector: 'app-chitiet',
  templateUrl: './chitiet.component.html',
  styleUrls: ['./chitiet.component.css']
})
export class ChitietComponent implements OnInit ,AfterViewInit {
  lis_ngongu:any;
  SanPhamID: number
  TENSP: string
  GIABAN: string
  TENTG:string
  IMAGE: string
  IMAGE1: string
  IMAGE2: string
  items: Sanpham[]
  MALOAI: string
  MOTA: string
  XUATXU: string
  GIANHAP: number
  SOLUONGTON: number
  TENLOAI:string 
  prd: any
  listCate: any[]
  PrdImgPath: string
  constructor(private service: SharedService, public cartService: CartService, private toastr: ToastrService,private route: Router) { }

  
  ngAfterViewInit(): void {
    initHomeLayout();
  }

  ngOnInit(): void {
    this.loadProductDetails();
    this.PrdImgPath = this.service.PhotoUrl
    this.service.getAllCate().subscribe(data => {
      this.listCate = data
    })
    this.getsach_ngongu();
  }

  loadProductDetails() {
    this.prd = localStorage.getItem('ProductDetail')
    if (this.prd) {
      this.SanPhamID = JSON.parse(this.prd).SanPhamID;
      this.TENSP = JSON.parse(this.prd).TENSP;
      this.TENTG = JSON.parse(this.prd).TENTG;

      this.GIABAN = this.formatCurrency(JSON.parse(this.prd).GIABAN)
      this.IMAGE = JSON.parse(this.prd).IMAGE;
      this.IMAGE1 = JSON.parse(this.prd).IMAGE1;
      this.SOLUONGTON=JSON.parse(this.prd).SOLUONGTON;
      this.IMAGE2 = JSON.parse(this.prd).IMAGE2;
      this.MOTA = JSON.parse(this.prd).MOTA;
    }
    let x = document.getElementById("description")
    if (x) {
      x.innerHTML += `<h4 style="margin-top: 50px; color: #FE980F">Mô tả sản phẩm</h4>`
      x.innerHTML += this.MOTA
    }
  }
  addToCartchitiet(product: any): void {
    this.cartService.addToCart(product);
    this.toastr.success(`Đã thêm ${product.TENSP}`)
    
  }

  addToCart(): void {
    if (this.prd) {
      this.cartService.addToCart(JSON.parse(this.prd));
      // alert(`Đã thêm ${JSON.parse(this.prd).TENSP}`)
      this.toastr.success(`Đã thêm ${JSON.parse(this.prd).TENSP}`)

    }
  }
  ProductRelative = JSON.parse(localStorage.getItem("ProductRelative"));
  // chitiet(item: any){
  //   console.log(item);
  //   localStorage.removeItem("ProductDetail")
    
  //   localStorage.setItem("ProductDetail", JSON.stringify(item))
  //   this.route.navigate([`/chitiet`]);
  // }
  
  listSpLq=[];
  chitiet(item: any){
    console.log(item);
    localStorage.removeItem("ProductDetail")
    localStorage.removeItem("ProductRelative")
    this.listSpLq=[];
    this.service.getall().subscribe(res=>{
      res.forEach(Element => {
        if(Element.MALOAI === item.MALOAI && Element.SanPhamID!=item.SanPhamID)
        {
          // console.log(Element);
          this.listSpLq.push(Element);
          // console.log(this.listSpLq);

        }
      });
      localStorage.setItem("ProductRelative", JSON.stringify(this.listSpLq));
    })
    localStorage.setItem("ProductDetail", JSON.stringify(item))
    this.route.navigate([`/chitiet`]);
  }
//   addToCart(): void {
//   this.cartService.addToCart();
//   alert(`Đã thêm ${product.TENSP}`)
// }

  formatCurrency(value: any) {
    let rs = value.toString().split("");
    for (let i = rs.length - 4; i >= 0; i -= 3) {
      rs[i] += ','
    }
    return rs.join('') + ' vnđ'
  }
  getsach_ngongu() {
    this.service.getsach_ngongu().subscribe(res => {
      this.lis_ngongu = res;
      console.log(this.lis_ngongu)
    })
  }

}
