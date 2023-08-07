import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AnonymoususerattributesPage } from './anonymoususerattributes.page';

describe('AnonymoususerattributesPage', () => {
  let component: AnonymoususerattributesPage;
  let fixture: ComponentFixture<AnonymoususerattributesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AnonymoususerattributesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
