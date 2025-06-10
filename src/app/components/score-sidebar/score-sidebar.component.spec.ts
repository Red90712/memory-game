import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreSidebarComponent } from './score-sidebar.component';

describe('ScoreSidebarComponent', () => {
  let component: ScoreSidebarComponent;
  let fixture: ComponentFixture<ScoreSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
