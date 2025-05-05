import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntibioticSelectorComponent } from './antibiotic-selector.component';

describe('AntibioticSelectorComponent', () => {
  let component: AntibioticSelectorComponent;
  let fixture: ComponentFixture<AntibioticSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntibioticSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntibioticSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
