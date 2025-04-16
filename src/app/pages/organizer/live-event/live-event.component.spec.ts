import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveEventComponent } from './live-event.component';

describe('LiveEventComponent', () => {
  let component: LiveEventComponent;
  let fixture: ComponentFixture<LiveEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveEventComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiveEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
