import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocTheoLoaiComponent } from './loc-theo-loai.component';

describe('LocTheoLoaiComponent', () => {
  let component: LocTheoLoaiComponent;
  let fixture: ComponentFixture<LocTheoLoaiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocTheoLoaiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocTheoLoaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
