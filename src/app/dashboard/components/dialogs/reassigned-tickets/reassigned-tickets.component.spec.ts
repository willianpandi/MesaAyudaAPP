import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignedTicketsComponent } from './reassigned-tickets.component';

describe('ReassignedTicketsComponent', () => {
  let component: ReassignedTicketsComponent;
  let fixture: ComponentFixture<ReassignedTicketsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReassignedTicketsComponent]
    });
    fixture = TestBed.createComponent(ReassignedTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
