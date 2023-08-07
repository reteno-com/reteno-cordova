import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomeventsPage } from './customevents.page';

describe('CustomeventsPage', () => {
  let component: CustomeventsPage;
  let fixture: ComponentFixture<CustomeventsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CustomeventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
