import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageBalanceComponent } from './stage-balance.component';

describe('StageBalanceComponent', () => {
  let component: StageBalanceComponent;
  let fixture: ComponentFixture<StageBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageBalanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
