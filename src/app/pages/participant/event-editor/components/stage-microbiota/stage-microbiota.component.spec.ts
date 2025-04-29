import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageMicrobiotaComponent } from './stage-microbiota.component';

describe('StageMicrobiotaComponent', () => {
  let component: StageMicrobiotaComponent;
  let fixture: ComponentFixture<StageMicrobiotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageMicrobiotaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageMicrobiotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
