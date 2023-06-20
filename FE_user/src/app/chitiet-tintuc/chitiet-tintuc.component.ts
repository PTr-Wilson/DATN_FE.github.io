import { AfterViewInit,Component, OnInit } from '@angular/core';
declare var initHomeLayout:any;
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Loaitin } from '../models/loaitin/loaitin.model';

@Component({
  selector: 'app-chitiet-tintuc',
  templateUrl: './chitiet-tintuc.component.html',
  styleUrls: ['./chitiet-tintuc.component.css']
})
export class ChitietTintucComponent implements OnInit,AfterViewInit {
  ngAfterViewInit(): void {
    initHomeLayout();
  }
  TinTucID:number
  TIEUDE:string
  NGAYDANG:Date
  NOIDUNG:string
  IMAGE:string
  TRICHDAN:string

  prd: any
  loaitintuc: any[]
  PrdImgPath: string

  //tag va ten loai tin
  photoPath: string = this.service.PhotoUrl
  ActivateAddEdit: boolean = false
  typeOptions: any[]

  blog: any
  dstinganday:any[]
  listBlogs: any[]
  dsLoaitin:Loaitin[]
  totalLength:any;
  page:number=1;
  constructor(private service: SharedService,private route:Router) { }

  ngOnInit(): void {
    this.loadProductDetails();
    this.PrdImgPath = this.service.PhotoUrl
    this.service.getAllTypeNew().subscribe(d => {
      this.loaitintuc = d
    })
    this.refreshData();
    this.service.getAllCate().subscribe(data => {
      this.dsLoaitin = data
      this.totalLength=this.dsLoaitin.length;
      console.log(data);
    })
    this.service.getAllTypeNew().subscribe((d:any) => {
      this.loaitintuc = d;
      this.totalLength=this.loaitintuc.length;
      console.log(d);
    })
    this.service.getAlltinganday().subscribe(data => {
      this.dstinganday = data
    })
  }

  refreshData() {
    this.service.getAllNews_tl().subscribe(data => {
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
      this.service.getAllNews_tl().subscribe(data => {
        this.listBlogs = data;
      })
    }
  }
  loadProductDetails() {
    this.prd = localStorage.getItem('TintucDetail')
    if (this.prd) {
      this.TinTucID = JSON.parse(this.prd).TinTucID;
      this.TIEUDE = JSON.parse(this.prd).TIEUDE;
      this.NOIDUNG = JSON.parse(this.prd).NOIDUNG;
      this.IMAGE = JSON.parse(this.prd).IMAGE;
      this.NGAYDANG = JSON.parse(this.prd).NGAYDANG;
    }
   
  }


  chitiettintuc(item: any){
    console.log(item);
    localStorage.removeItem("TintucDetail");
    localStorage.setItem("TintucDetail",JSON.stringify(item));
 
    this.route.navigate([`/chitiettintuc`]);
    
    // localStorage.removeItem("ProductDetail")
    // localStorage.setItem("ProductDetail", JSON.stringify(item))
    // this.route.navigate([`/chitiettintuc`]);
  }
}