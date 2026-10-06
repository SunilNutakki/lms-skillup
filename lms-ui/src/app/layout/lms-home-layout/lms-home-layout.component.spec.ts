import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmsHomeLayoutComponent } from './lms-home-layout.component';

describe('LmsHomeLayoutComponent', () => {
  let component: LmsHomeLayoutComponent;
  let fixture: ComponentFixture<LmsHomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LmsHomeLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LmsHomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
