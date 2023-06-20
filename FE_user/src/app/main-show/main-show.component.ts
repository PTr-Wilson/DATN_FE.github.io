import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { Sanpham } from '../models/sanpham/sanpham.model';
import { Loaisanpham } from '../models/loaisanpham/loaisanpham.model';
import { Router } from '@angular/router';
import { CartService } from './../Service/cart.service';
import { registerLocaleData } from '@angular/common';
import {formatNumber} from '@angular/common';
import { ToastrService } from 'ngx-toastr';

import localeFr from '@angular/common/locales/fr';
import { Loaitin } from '../models/loaitin/loaitin.model';
registerLocaleData(localeFr, 'fr');
declare var initHomeLayout:any;
@Component({
  selector: 'app-main-show',
  templateUrl: './main-show.component.html',
  styleUrls: ['./main-show.component.css']
})
export class MainShowComponent implements OnInit ,AfterViewInit{

  constructor(private service: SharedService, private route: Router, private cartService: CartService,
    private toastr: ToastrService) { }
  ngAfterViewInit(): void {
    initHomeLayout();
  }


  totalItem=0
listall:Sanpham[]
  dsLoaiSP: Loaisanpham[]
  listNewest: Sanpham[]

  listHotest: Sanpham[]
  listBigPrice: Sanpham[]
  listSmallPrice: Sanpham[]
  loaitintuc: Loaitin[]
  totalLength:any;
  // list_ngonngu: Sanpham[]
lis_ngongu:any;
  imagePath: string = this.service.PhotoUrl
  urlimage:any;

  ngOnInit(): void {
    this.lamMoiDuLieu();
    this.getsach_ngongu();
    this.totalItem = this.cartService.getProducts().length
    this.service.getAllCate().subscribe(data => {
      this.dsLoaiSP = data
    })
    this.service.getAllTypeNew().subscribe(data => {
      this.loaitintuc = data;
      // this.totalLength=this.loaitintuc.length;
      // console.log(d);
    })
    

 
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.toastr.success(`Đã thêm ${product.TENSP}`)

    // alert(`Đã thêm ${product.TENSP}`)
  }


  lamMoiDuLieu(){
    this.service.getHostest().subscribe(data => {
      this.listHotest = data
      this.urlimage=this.service.PhotoUrl;
    })
    this.service.getall().subscribe(data => {
      this.listall = data
      this.urlimage=this.service.PhotoUrl;
    })
    this.service.getNewest().subscribe(data => {
      this.listNewest = data
      this.urlimage=this.service.PhotoUrl;      
    })
    
    this.service.GetByPrice().subscribe(data => {
      this.listBigPrice = data
      this.urlimage=this.service.PhotoUrl;      
    })

    this.service.GetByPriceSmall().subscribe(data => {
      this.listSmallPrice = data
      this.urlimage=this.service.PhotoUrl;      
    })
   
 
  }
  
  
  locSP(id:number){
    console.log(id);    
    localStorage.removeItem("maloai")
    localStorage.setItem("maloai", JSON.stringify(id));
    this.route.navigate(['/loaisanpham']);
  }
  
  ProductRelative = JSON.parse(localStorage.getItem("ProductRelative"));
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
  locTinTuc(typeID:number){
    console.log(typeID);    
    localStorage.removeItem("typeID")
    localStorage.setItem("typeID", JSON.stringify(typeID));
    this.route.navigate(['/tintuc']);
  }

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


