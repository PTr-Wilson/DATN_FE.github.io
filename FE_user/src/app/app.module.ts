import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import {  HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Component/header/header.component';
import { FooterComponent } from './Component/footer/footer.component';
import { SlideComponent } from './Component/slide/slide.component';
import { MainShowComponent } from './main-show/main-show.component';
import { CartComponent } from './cart/cart.component';
import { LocTheoLoaiComponent } from './loc-theo-loai/loc-theo-loai.component';
import { ChitietComponent } from './chitiet/chitiet.component';
import { BestsellNewestComponent } from './bestsell-newest/bestsell-newest.component';
import { ChitietTintucComponent } from './chitiet-tintuc/chitiet-tintuc.component';
import { SearchComponent } from './search/search.component';
import { DanhsachmuaComponent } from './danhsachmua/danhsachmua.component';
import { DanhsachdathangComponent } from './danhsachdathang/danhsachdathang.component';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SlideComponent,
    MainShowComponent,
    CartComponent,
    LocTheoLoaiComponent,
    ChitietComponent,
    BestsellNewestComponent,
    ChitietTintucComponent,
    SearchComponent,
    DanhsachmuaComponent,
    DanhsachdathangComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgxPaginationModule,

    
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
