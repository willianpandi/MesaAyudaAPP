import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictsPageComponent } from './districts-page.component';

describe('DistrictsPageComponent', () => {
  let component: DistrictsPageComponent;
  let fixture: ComponentFixture<DistrictsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistrictsPageComponent]
    });
    fixture = TestBed.createComponent(DistrictsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
