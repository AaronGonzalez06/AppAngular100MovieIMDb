import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeenComponent } from './seen.component';

describe('SeenComponent', () => {
  let component: SeenComponent;
  let fixture: ComponentFixture<SeenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeenComponent]
    });
    fixture = TestBed.createComponent(SeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
