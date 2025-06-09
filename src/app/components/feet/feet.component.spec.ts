import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeetComponent } from './feet.component';

describe('FeetComponent', () => {
  let component: FeetComponent;
  let fixture: ComponentFixture<FeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
