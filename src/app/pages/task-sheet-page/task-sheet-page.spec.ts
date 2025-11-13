import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSheetPage } from './task-sheet-page';

describe('TaskSheetPage', () => {
  let component: TaskSheetPage;
  let fixture: ComponentFixture<TaskSheetPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskSheetPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
