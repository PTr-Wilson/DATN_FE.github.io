import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsellNewestComponent } from './bestsell-newest.component';

describe('BestsellNewestComponent', () => {
  let component: BestsellNewestComponent;
  let fixture: ComponentFixture<BestsellNewestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BestsellNewestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestsellNewestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
