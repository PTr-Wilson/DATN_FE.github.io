import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var initHomeLayout:any;

@Injectable({
  providedIn: 'root'
})
export class SharedService  {

constructor(private http:HttpClient) { }
readonly APIUrl = 'http://localhost:44316/api'
  readonly PhotoUrl = 'http://localhost:44316/Photos/'


  getCity() {
    return this.http.get("https://raw.githubusercontent.com/xuanvu99/DiaGioiHanhChinhVN/master/json/all.json");
  }
   // SAN PHAM
   getNewest():Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Sachs/Newest-Products')
  }
  getall():Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Sanphams')
  }
  // mở api ra trong controler saả phẩm ý, tìm 2 cai naà um đợi
  GetByPrice():Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Sachs/GetByPrice')
  }

  GetByPriceSmall():Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Sachs/GetByPriceSmall')
  }  
  
  getHostest():Observable<any>{
    return this.http.get<any>(this.APIUrl + '/Sachs/Hotest-Products')
  }

  GetSPByName(TENSP: string):Observable<any>{
    let rmv = /"/gi; // tìm kiếm những chuỗi có giá trị = " trong url
    let url = this.APIUrl + `/Sachs/Search/${TENSP}`
    console.log(url);
    
    return this.http.get<any>(url.replace(rmv, '')) // thay thế " = rỗng
  }

    // KHACH HANG
  getUsers(id: number){
    return this.http.get(this.APIUrl + '/KhachHangs/'+id)
  }

  getAllUser():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/KhachHangs');
  }
  addUser(val: any){
    return this.http.post(this.APIUrl + '/KhachHangs/', val)
  }

  getAllCate():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/loaisanphams/')
  }

  // chi tiết đơn hang
  addOrderDetail(val: any){
    return this.http.post(this.APIUrl + '/ChiTietDonHangs/', val)
  }

  getProductsByCate(id:number):Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/Sachs/LocTheoLoai/?maloai='+id)
  }

  // DON HANG
  addOrder(val: any){
    return this.http.post(this.APIUrl + '/DonHangs/', val);
  }

  getNewestOd():Observable<any[]>{
    return this.http.get<any>(this.APIUrl + '/DonHangs/GetNewestOrderID/');
  }


  // getAllCate():Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl + '/loaisanphams/')
  // }

 //TIN TUC
 getAllTypeNew():Observable<any[]>{
  return this.http.get<any>(this.APIUrl + '/LoaiTins/')
}

getAllNews():Observable<any[]>{
  return this.http.get<any>(this.APIUrl + '/TinTucs')
}
getAllNews_tl():Observable<any[]>{
  return this.http.get<any>(this.APIUrl + '/TinTucs/getall')
}
getAlltinganday():Observable<any[]>{
  return this.http.get<any>(this.APIUrl + '/TinTucs/Tinganday')
}

getNewsByCate(typeID: number):Observable<any[]>{
  return this.http.get<any>(this.APIUrl +'/Tintucs/GetNewBytypeName?typeID='+ typeID)
}
logTheoLoaiTin(typeID: number): Observable<any[]> {
  return this.http.get<any>(this.APIUrl + '/Tintucs/LocTheoLoai?typeID=' + typeID)
}
  // getMyOrders(id: number):Observable<any[]>{
  //   return this.http.get<any>(this.APIUrl + '/Users/myOrders/' + id)
  // }
getsach_ngongu() {
  return this.http.get('http://localhost:44316/api/Sachs/LocTheoLoai?MALOAI=10');

}
getMyOrders(id: number):Observable<any[]>{
  return this.http.get<any>(this.APIUrl + '/KhachHangs/myOrders/' + id)
}
/// VOTE PRODUCT
vote(val: any){
  return this.http.post(this.APIUrl + '/DanhGias', val)
}
getVoteProduct(SanPhamID: number):Observable<any[]>{
  return this.http.get<any>(this.APIUrl + `/RvwProduct/${SanPhamID}`)
}
getdathang(makh: number):Observable<any[]>{
  return this.http.get<any>(this.APIUrl + '/KhachHangs/LocTheoKhachhang/' + makh)
}
}
