import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveDialogComponent } from './directive-dialog.component';

describe('DirectiveDialogComponent', () => {
  let component: DirectiveDialogComponent;
  let fixture: ComponentFixture<DirectiveDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DirectiveDialogComponent]
    });
    fixture = TestBed.createComponent(DirectiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
