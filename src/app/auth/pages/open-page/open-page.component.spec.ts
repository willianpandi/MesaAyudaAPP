import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenPageComponent } from './open-page.component';

describe('OpenPageComponent', () => {
  let component: OpenPageComponent;
  let fixture: ComponentFixture<OpenPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenPageComponent]
    });
    fixture = TestBed.createComponent(OpenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
