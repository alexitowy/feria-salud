import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageWaitingComponent } from './stage-waiting.component';

describe('StageWaitingComponent', () => {
  let component: StageWaitingComponent;
  let fixture: ComponentFixture<StageWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageWaitingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
