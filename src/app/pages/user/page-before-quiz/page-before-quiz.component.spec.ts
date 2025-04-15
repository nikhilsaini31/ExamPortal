import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBeforeQuizComponent } from './page-before-quiz.component';

describe('PageBeforeQuizComponent', () => {
  let component: PageBeforeQuizComponent;
  let fixture: ComponentFixture<PageBeforeQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageBeforeQuizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageBeforeQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
