import { AfterViewInit,Component, OnInit } from '@angular/core';
declare var initHomeLayout:any;
import { Khachhang } from './../../models/khachhang/khachhang.model';
import { Loaisanpham } from 'src/app/models/loaisanpham/loaisanpham.model';
import { Sanpham } from 'src/app/models/sanpham/sanpham.model';
import { SharedService } from 'src/app/shared.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Service/cart.service';
import { Loaitin } from './../../models/loaitin/loaitin.model';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit,AfterViewInit{
//tintuc

// photoPath: string = this.service.PhotoUrl
ActivateAddEdit: boolean = false
typeOptions: any[]

blog: any

listBlogs: any[]
dsLoaitin:Loaitin[]
// loaitintuc: any[]
totalLength:any;
page:number=1;
//


  public totalItem = 0
  products: any[] = [];
  totalMoney!: number;
  photoPath: string

  keyword: string

  kh_id:number
  kh_taikhoan:string
  kh_matkhau:string
  kh_matkhau2: string
  kh_diachi:string
  kh_sdt:string
  kh_email:string
  kh_tenkh:string

  listUser: Khachhang[]

  user: Khachhang

  dsLoaiSP: Loaisanpham[]

  // loaij san pham headeaf
  

  listNewest: Sanpham[]

  listHotest: Sanpham[]
  listBigPrice: Sanpham[]
  listSmallPrice: Sanpham[]

  imagePath: string = this.service.PhotoUrl
  urlimage:any;
  constructor(private service: SharedService, private route: Router, private cartSerice: CartService,
    private toastr: ToastrService) { }


  ngAfterViewInit(): void {
    initHomeLayout();
  }

  ngOnInit() {
    this.totalItem = this.cartSerice.getProducts().length
    this.service.getAllCate().subscribe(data => {
      this.dsLoaiSP = data
    })
    this.refreshData();
    this.service.getAllTypeNew().subscribe((d:any) => {
      this.dsLoaitin = d
      // console.log(d);
    })
    // this.service.getAllTypeNew().subscribe(data => {
    //   this.loaitintuc = data;
    //   // this.totalLength=this.loaitintuc.length;
    //   // console.log(d);
    // })
    
  }

  locSP(id:number){
    console.log(id);    
    localStorage.removeItem("maloai")
    localStorage.setItem("maloai", JSON.stringify(id));
    this.route.navigate(['/loaisanpham']);
  }
  locTinTuc(typeID:number){
    console.log(typeID);    
    localStorage.removeItem("typeID")
    localStorage.setItem("typeID", JSON.stringify(typeID));
    this.route.navigate(['/tintuc']);
  }
  refreshData() {
    this.service.getAllNews().subscribe(data => {
      this.listBlogs = data;
    })
    this.service.getAllTypeNew().subscribe(data => {
      this.typeOptions = data;
    })
  }

  filterCate(event: any) {
    let cateID: number = parseInt(event.target.value)
    if (cateID) {
      this.service.getNewsByCate(cateID).subscribe(data => {
        this.listBlogs = data;
      })
    }
    else {
      this.service.getAllNews().subscribe(data => {
        this.listBlogs = data;
      })
    }
  }

  chitiettintuc(item: any){
    console.log(item);
    localStorage.removeItem("ProductDetail")
    localStorage.setItem("ProductDetail", JSON.stringify(item))
    this.route.navigate([`/chitiettintuc`]);
  }


}
