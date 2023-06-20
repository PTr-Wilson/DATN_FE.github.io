import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SharedService } from './../shared.service';
import { Xemlaidonhang } from './../models/xemlaidonhang/xemlaidonhang.model';
// import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
declare var initHomeLayout:any;
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-danhsachmua',
  templateUrl: './danhsachmua.component.html',
  styleUrls: ['./danhsachmua.component.css']
})
export class DanhsachmuaComponent implements OnInit ,AfterViewInit{

  constructor(private service: SharedService, private activatedRoute: ActivatedRoute, private toastr: ToastrService)  { }

  SODIEM = 3
  BINHLUAN = ''
  MASANPHAM:number

  MyOrders: any[]
  PrdImgPath: string
  KhachHangID: number

  currentDate = new Date()

  ngAfterViewInit(): void {
    initHomeLayout();}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.KhachHangID = params["KhachHangID"];
      this.loadMyOrders();

    });
    

    this.PrdImgPath = this.service.PhotoUrl
  }

  loadMyOrders() {

    this.service.getMyOrders(this.KhachHangID).subscribe(data => {
      this.MyOrders = data

      if (this.MyOrders) {
        this.MyOrders.forEach(element => {
        });
      }
      // setTimeout(this.voting, 0.1)
      console.log(data);
    })

  }

  // vote(val: any){
  //   return this.http.post(this.APIUrl + '/DanhGias', val)
  // }
  // getVoteProduct(SanPhamID: number):Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl + `/RvwProduct/${SanPhamID}`)
  // }
  // }
  btnVoted(param:number){
    console.log(param);
    let user = localStorage.getItem("user")
    if(user){
      let thisRate:Xemlaidonhang = {
        id: 0,
        MASANPHAM: param,
        SODIEM: this.SODIEM,
        BINHLUAN: this.BINHLUAN,
        HANG: JSON.parse(user).TENKH
      }
      this.service.vote(thisRate).subscribe(data=>{
        this.toastr.success(`Hệ thống sẽ cập nhật sau giây lát`)

        // alert(`Đánh giá thành công, hệ thống sẽ cập nhật sau giây lát!`)
      })
    }
    const customerVote = document.querySelectorAll(".customer-vote")
    if (customerVote) {
      customerVote.forEach(element => {
        element.setAttribute("style", "display: none")
      });
    }
    this.SODIEM = 3; this.BINHLUAN = ''
  }

  btnExitVoted(){
    const customerVote = document.querySelectorAll(".customer-vote")
    if (customerVote) {
      customerVote.forEach(element => {
        element.setAttribute("style", "display: none")
      });
    }
    this.SODIEM = 3; this.BINHLUAN = ''
  }

  voting() {
    const btnVote = document.querySelectorAll(".btn-vote")
    const customerVote = document.querySelectorAll(".customer-vote")
    if (btnVote) {
      for (let i = 0; i <= btnVote.length; i++) {
        btnVote[i].addEventListener('click', () => {
          customerVote[i].setAttribute("style", "display: block")
        })
      }
    }
  }

  voted() {
    const btnVote = document.querySelectorAll(".btn-voted")
    if (btnVote) {
      for (let i = 0; i <= btnVote.length; i++) {
        btnVote[i].addEventListener('click', () => {
          alert(`Bạn chỉ có thể thực hiện 1 đánh giá với 1 lần mua!`)
        })
      }
    }
  }

}
