import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productsCart = new BehaviorSubject<any[]>([]);
  myStorage!: any;
  products$ = this.productsCart.asObservable();

  constructor( private toastr: ToastrService) {
    let carts = localStorage.getItem('carts');
    if (carts) {
      this.myStorage = JSON.parse(carts);
    }

    if (!this.myStorage) this.myStorage = [];
    this.productsCart.next(this.myStorage);
  }


  addToCart(product: any, Quantity: number = 1): void {

    product.Quantity = Quantity;
    let myStorage: any[] = [];

    if (localStorage.getItem('carts') == null) {
      myStorage.push(product);
    }
    
    else {
      let carts = localStorage.getItem('carts');
      if (carts) {
        myStorage = JSON.parse(carts);
      }

      let checkProduct: boolean = true;
      for (let p of myStorage) {
        if (p.SanPhamID == product.SanPhamID) {
          checkProduct = false;
          p.Quantity += Quantity;
          break;
        }
      }

      if (checkProduct) myStorage.push(product);
    }

    localStorage.setItem('carts', JSON.stringify(myStorage));
    this.productsCart.next(myStorage);
    
  }


  getProducts(): any[] {
    let myStorage = localStorage.getItem('carts');
    return myStorage == null ? [] : JSON.parse(myStorage);
  }


  deleteProduct(id: number) {
    let myStorage = this.getProducts().filter((p) => p.SanPhamID != id);
    localStorage.setItem('carts', JSON.stringify(myStorage));
    this.productsCart.next(myStorage);
  }
  

  updateProduct(id: number, Quantity: number) {
    let products = localStorage.getItem('carts');
    if (products) {
      let lstproducts = JSON.parse(products);
      for (let p of lstproducts) {
        if (p.SanPhamID == id) {
          p.Quantity = Quantity;
          break;
        }
      }
      localStorage.setItem('carts', JSON.stringify(lstproducts));
      this.productsCart.next(lstproducts);
    }
  }

  updatevalidatestringofp(id: number, validatestring:string) {
    let products = localStorage.getItem('carts');
    if (products) {
      let lstproducts = JSON.parse(products);
      for (let p of lstproducts) {
        if (p.SanPhamID == id) {
          p.Validate = validatestring;
          break;
        }
      }
      localStorage.setItem('carts', JSON.stringify(lstproducts));
      this.productsCart.next(lstproducts);
    }
  }


  clearCart() {
    localStorage.removeItem('carts');
    this.productsCart.next([]);
  }

  change(id:any,q:any)
  {
    if(q==0)
    {
      this.deleteProduct(id);
      this.toastr.error(`Đã xóa sản phẩm do số lượng bằng 0  `)


    }
    let products = localStorage.getItem('carts');
    if (products) {
      let lstproducts = JSON.parse(products);
      for (let p of lstproducts) {
        if (p.SanPhamID == id) {
          if(q>0)
          {
            p.Quantity = q;
            this.toastr.success(`Đã thay đổi số lượng `)
            // addToCart(product: any): void {
            //   this.cartService.addToCart(product);
            //   this.toastr.success(`Đã thêm ${product.TENSP}`)
          
            //   // alert(`Đã thêm ${product.TENSP}`)
            // }
            break;
          }
          else{
            p.Quantity = 1;
            this.toastr.warning(`Số lượng không được âm   `)
            break;
          }
        }
      }
      localStorage.setItem('carts', JSON.stringify(lstproducts));
      this.productsCart.next(lstproducts);
  }
  }
}
