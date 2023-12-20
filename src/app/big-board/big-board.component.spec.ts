import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBoardComponent } from './big-board.component';

describe('BigBoardComponent', () => {
  let component: BigBoardComponent;
  let fixture: ComponentFixture<BigBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BigBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BigBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
