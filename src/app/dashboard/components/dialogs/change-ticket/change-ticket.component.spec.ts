import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeTicketComponent } from './change-ticket.component';

describe('ChangeTicketComponent', () => {
  let component: ChangeTicketComponent;
  let fixture: ComponentFixture<ChangeTicketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeTicketComponent]
    });
    fixture = TestBed.createComponent(ChangeTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
