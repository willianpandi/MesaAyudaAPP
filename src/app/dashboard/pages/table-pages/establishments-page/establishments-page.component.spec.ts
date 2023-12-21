import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablishmentsPageComponent } from './establishments-page.component';

describe('EstablishmentsPageComponent', () => {
  let component: EstablishmentsPageComponent;
  let fixture: ComponentFixture<EstablishmentsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstablishmentsPageComponent]
    });
    fixture = TestBed.createComponent(EstablishmentsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
