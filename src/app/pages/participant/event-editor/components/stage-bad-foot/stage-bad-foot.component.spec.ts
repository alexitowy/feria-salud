import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageBadFootComponent } from './stage-bad-foot.component';

describe('StageBadFootComponent', () => {
  let component: StageBadFootComponent;
  let fixture: ComponentFixture<StageBadFootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageBadFootComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageBadFootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
