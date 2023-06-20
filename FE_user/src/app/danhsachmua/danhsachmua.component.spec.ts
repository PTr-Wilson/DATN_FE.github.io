import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachmuaComponent } from './danhsachmua.component';

describe('DanhsachmuaComponent', () => {
  let component: DanhsachmuaComponent;
  let fixture: ComponentFixture<DanhsachmuaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachmuaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhsachmuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
