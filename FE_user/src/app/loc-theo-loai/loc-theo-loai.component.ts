import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sanpham } from '../models/sanpham/sanpham.model';
import { SharedService } from '../shared.service';
import { CartService } from '../Service/cart.service';
import { Loaisanpham } from '../models/loaisanpham/loaisanpham.model';
import { Router } from '@angular/router';
declare var initHomeLayout:any;
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-loc-theo-loai',
  templateUrl: './loc-theo-loai.component.html',
  styleUrls: ['./loc-theo-loai.component.css']
})
export class LocTheoLoaiComponent implements OnInit ,AfterViewInit{
  totalLength:any;
  totalItem=0
  page:number=1;
  dsLoaiSP: Loaisanpham[]
  items: Sanpham[]
  MOTA: string
  constructor(private service:SharedService,private route: Router, private cartService: CartService,
    private toastr: ToastrService) { }
  ngAfterViewInit(): void {
    initHomeLayout();}

  
    urlHinhanh = this.service.PhotoUrl

    ngOnInit(): void {
  
      this.loadSanpham()
      this.totalItem = this.cartService.getProducts().length
      this.service.getAllCate().subscribe((data:any) => {
      
        console.log(data);
      })
      this.service.getAllCate().subscribe(data => {
        this.dsLoaiSP = data
        
      })
      
    }
   
    loadSanpham(){
      let id = localStorage.getItem("maloai")
      if(id){
        this.service.getProductsByCate(parseInt(id)).subscribe(data =>{
          this.items = data;
          this.totalLength=this.items.length;
          console.log(data);

        })
      }
    }
  
    addToCart(product: any): void {
      this.cartService.addToCart(product);
      this.toastr.success(`Đã thêm ${product.TENSP}`)
      
    }
    locSP(id:number){
      console.log(id);    
      localStorage.removeItem("maloai")
      localStorage.setItem("maloai", JSON.stringify(id));
      this.route.navigate(['/LocSP']);
    }
    // ProductRelative = JSON.parse(localStorage.getItem("ProductRelative"));

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
  
    formatCurrency(value: any) {
      let rs = value.toString().split("");
      for (let i = rs.length - 4; i >= 0; i -= 3) {
          rs[i] += ','
      }
      return rs.join('') + ' vnđ'
    }
  }
  