import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SarveyComponent } from './sarvey.component';

describe('SarveyComponent', () => {
  let component: SarveyComponent;
  let fixture: ComponentFixture<SarveyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SarveyComponent]
    });
    fixture = TestBed.createComponent(SarveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
