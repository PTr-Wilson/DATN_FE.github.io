import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhsachdathangComponent } from './danhsachdathang.component';

describe('DanhsachdathangComponent', () => {
  let component: DanhsachdathangComponent;
  let fixture: ComponentFixture<DanhsachdathangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DanhsachdathangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhsachdathangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
