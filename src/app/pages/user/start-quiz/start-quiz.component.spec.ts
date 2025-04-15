import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQUizComponent } from './start-quiz.component';

describe('StartQUizComponent', () => {
  let component: StartQUizComponent;
  let fixture: ComponentFixture<StartQUizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StartQUizComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartQUizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
