import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDashBoardComponent } from './management-dash-board.component';

describe('ManagementDashBoardComponent', () => {
  let component: ManagementDashBoardComponent;
  let fixture: ComponentFixture<ManagementDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
