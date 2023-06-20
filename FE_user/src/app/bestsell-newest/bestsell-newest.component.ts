import { AfterViewInit,Component, OnInit } from '@angular/core';
declare var initHomeLayout:any;
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { Loaitin } from '../models/loaitin/loaitin.model';
import { Tintuc } from '../models/tintuc/tintuc.model';

@Component({
  selector: 'app-bestsell-newest',
  templateUrl: './bestsell-newest.component.html',
  styleUrls: ['./bestsell-newest.component.css']
})
export class BestsellNewestComponent implements OnInit, AfterViewInit{

  ngAfterViewInit(): void {
    initHomeLayout();
  }
  items: Tintuc[]
  photoPath: string = this.service.PhotoUrl
  ActivateAddEdit: boolean = false
  typeOptions: any[]

  blog: any
  dstinganday:any[]
  listBlogs: any[]
  dsLoaitin:Loaitin[]
  loaitintuc: any[]
  totalLength:any;
  page:number=1;
  constructor(private service: SharedService,private route:Router) { }

  ngOnInit(): void {
    this.filterCate();
    // this.refreshData();
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

  // refreshData() {
  //   this.service.getAllNews_tl().subscribe(data => {
  //     this.listBlogs = data;
  //   })
  //   this.service.getAllTypeNew().subscribe(data => {
  //     this.typeOptions = data;
  //   })
  // }

  filterCate() {
    let id = localStorage.getItem("typeID")
    if(id){
      this.service.getNewsByCate(parseInt(id)).subscribe(data =>{
        this.listBlogs = data
        console.log(data);
        // this.urlimage=this.service.PhotoUrl;        
        })
    
    }
    
  }
  Tinganday() {
    let id = localStorage.getItem("typeID")
    if(id){
      this.service.getNewsByCate(parseInt(id)).subscribe(data =>{
        this.dstinganday = data
        console.log(data);
        // this.urlimage=this.service.PhotoUrl;        
        })
    
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
  locTinTuc(typeID:number){
    console.log(typeID);    
    localStorage.removeItem("typeID")
    localStorage.setItem("typeID", JSON.stringify(typeID));
    this.route.navigate(['/tintuc']);
  }


}