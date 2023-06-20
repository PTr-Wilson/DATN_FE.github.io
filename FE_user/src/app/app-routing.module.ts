import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BestsellNewestComponent } from './bestsell-newest/bestsell-newest.component';
import { CartComponent } from './cart/cart.component';
import { ChitietTintucComponent } from './chitiet-tintuc/chitiet-tintuc.component';
import { ChitietComponent } from './chitiet/chitiet.component';
import { LocTheoLoaiComponent } from './loc-theo-loai/loc-theo-loai.component';
import { MainShowComponent } from './main-show/main-show.component';
import { SearchComponent } from './search/search.component';
import { DanhsachmuaComponent } from './danhsachmua/danhsachmua.component';
import { DanhsachdathangComponent } from './danhsachdathang/danhsachdathang.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes = [
  {
    path: '',component: MainShowComponent},
    {path:'loaisanpham', component: LocTheoLoaiComponent},
    { path: 'cart', component: CartComponent },
    { path: 'chitiet', component: ChitietComponent },
    { path: 'tintuc', component: BestsellNewestComponent },
    { path: 'chitiettintuc', component: ChitietTintucComponent },
    { path: 'search', component: SearchComponent },
    {path: 'danhsachmua/:KhachHangID', component: DanhsachmuaComponent},
    {path: 'danhsachdathang/:KhachHangID', component: DanhsachdathangComponent},
    {path:'checkout',component:CheckoutComponent},

    // { path: "login", component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
