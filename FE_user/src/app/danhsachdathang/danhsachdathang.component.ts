import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SharedService } from './../shared.service';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-danhsachdathang',
  templateUrl: './danhsachdathang.component.html',
  styleUrls: ['./danhsachdathang.component.css']
})
export class DanhsachdathangComponent implements OnInit {

  constructor(private service: SharedService, private activatedRoute: ActivatedRoute,private http:HttpClient)  { }

  MyOrders: any[]
  KhachHangID: number
  currentDate = new Date()
  totalLength:any;
  page:number=1;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.KhachHangID = params["KhachHangID"];

      this.getxemdondat();

    });

}



getxemdondat() {
  
  this.service.getdathang(this.KhachHangID).subscribe(data => {
    this.MyOrders = data
    this.totalLength=this.MyOrders.length;

    if (this.MyOrders) {
      this.MyOrders.forEach(element => {
      });
    }
    // setTimeout(this.voting, 0.1)
    console.log(data);
  })


}

changestatus(item:any){

  this.http.put('http://localhost:58922/UpdateStatus',item ).subscribe(res=>{

  });
  
}
}
