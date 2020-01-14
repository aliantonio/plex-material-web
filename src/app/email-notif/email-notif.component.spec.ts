import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotifComponent } from './email-notif.component';

describe('EmailNotifComponent', () => {
  let component: EmailNotifComponent;
  let fixture: ComponentFixture<EmailNotifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailNotifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailNotifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
