import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstableishmentDialogComponent } from './estableishment-dialog.component';

describe('EstableishmentDialogComponent', () => {
  let component: EstableishmentDialogComponent;
  let fixture: ComponentFixture<EstableishmentDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstableishmentDialogComponent]
    });
    fixture = TestBed.createComponent(EstableishmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
