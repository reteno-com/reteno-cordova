import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserattributesPage } from './userattributes.page';

describe('UserattributesPage', () => {
  let component: UserattributesPage;
  let fixture: ComponentFixture<UserattributesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UserattributesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
