import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Sanpham } from '../models/sanpham/sanpham.model';
import { CartService } from '../Service/cart.service';
import { SharedService } from '../shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

declare var initHomeLayout:any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit,AfterViewInit{
  totalLength:any;
  totalItem=0
  page:number=1;
  
  listPrd: Sanpham[]
  listName:string
  PrdImgPath = this.service.PhotoUrl

  constructor(private service: SharedService, private route: Router, private cartService: CartService,
    private toastr: ToastrService) { }
  ngAfterViewInit(): void {
    initHomeLayout();
  }


  ngOnInit(): void {
    let keySearch = localStorage.getItem("keyword")
    if(keySearch){
      console.log(keySearch);
      
      this.service.GetSPByName(keySearch).subscribe(data => {
        this.listPrd = data
        console.log(this.listPrd);
      })
    
      this.listName = 'Có '+this.listPrd.length+' kết quả cho '+keySearch;
      console.log(this.listName);
    }
    
  }
  chitiet(item: any){
    console.log(item);
    localStorage.removeItem("ProductDetail")
    localStorage.setItem("ProductDetail", JSON.stringify(item))
    this.route.navigate([`/chitiet`]);
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
      this.toastr.success(`Đã thêm ${product.TENSP}`)
  }

}
