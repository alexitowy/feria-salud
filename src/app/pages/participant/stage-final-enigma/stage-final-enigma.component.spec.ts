import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageFinalEnigmaComponent } from './stage-final-enigma.component';

describe('StageFinalEnigmaComponent', () => {
  let component: StageFinalEnigmaComponent;
  let fixture: ComponentFixture<StageFinalEnigmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageFinalEnigmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageFinalEnigmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
