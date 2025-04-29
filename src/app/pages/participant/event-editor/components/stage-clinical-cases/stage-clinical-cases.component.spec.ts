import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageClinicalCasesComponent } from './stage-clinical-cases.component';

describe('StageClinicalCasesComponent', () => {
  let component: StageClinicalCasesComponent;
  let fixture: ComponentFixture<StageClinicalCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageClinicalCasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageClinicalCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
