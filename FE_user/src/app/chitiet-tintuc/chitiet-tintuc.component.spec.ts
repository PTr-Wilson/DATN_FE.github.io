import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietTintucComponent } from './chitiet-tintuc.component';

describe('ChitietTintucComponent', () => {
  let component: ChitietTintucComponent;
  let fixture: ComponentFixture<ChitietTintucComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChitietTintucComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChitietTintucComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
