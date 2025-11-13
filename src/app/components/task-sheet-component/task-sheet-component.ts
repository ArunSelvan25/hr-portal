import {Component, signal, computed, Inject, inject} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AutosizeDirective } from '../../directives/AutosizeDirective/autosize-directive';

@Component({
  selector: 'app-task-sheet-component',
  imports: [ReactiveFormsModule, CommonModule, AutosizeDirective],
  templateUrl: './task-sheet-component.html',
  styleUrl: './task-sheet-component.css'
})
export class TaskSheetComponent {

  fb = inject(FormBuilder)

  tasksUpdated = signal(0);
  taskData = signal([
      {
        "date": "2025-11-12",
        "projectName": "NotifyNOW",
        "pm": "John Doe",
        "workDescription": "Today I focused on improving the reliability of the scheduled SFTP sync module within the NotifyNOW application. The main objective was to analyze unexpected failures occurring during automated file transfers. I added additional logging around the retry mechanism and validated the connection fallback logic. Updated the internal documentation to reflect these new changes, performed a dry run in staging, and confirmed that the sync now behaves as expected under load. Also discussed improvement plans with the team to optimize retry intervals and error escalation.",
        "hoursPlanned": 2,
        "hoursSpent": 3,
        "status": "Completed",
        "commentLink": "https://example.com/notify/sftp-update"
      },
      {
        "date": "2025-11-11",
        "projectName": "Cobrands Integration",
        "pm": "Sarah Lee",
        "workDescription": "Worked on refining the cobrand rendering mechanism to ensure brand-specific assets display correctly across all landing pages. Investigated mismatched logos reported by QA and found inconsistencies in the asset-loading logic. Implemented a fallback strategy, cleaned outdated image references, and updated the configuration to point to the latest asset bundle. Also coordinated with design to confirm brand guidelines and performed regression testing. Documented the fixes and ensured compatibility with existing caching layers for optimal performance.",
        "hoursPlanned": 3,
        "hoursSpent": 4,
        "status": "In Progress",
        "commentLink": "https://example.com/cobrand/fix-logo"
      },
      {
        "date": "2025-11-10",
        "projectName": "Internal Tools",
        "pm": "Michael Smith",
        "workDescription": "Focused on improving developer efficiency by analyzing build pipeline bottlenecks within the internal tools ecosystem. Worked on replacing slow shell scripts with optimized TypeScript utilities and ensured cross-platform compatibility. Benchmarked execution times before and after changes, achieving a noticeable improvement. Cleaned unused assets and deprecated modules to reduce repository size. Also reviewed open pull requests and contributed to discussions regarding new architectural proposals.",
        "hoursPlanned": 4,
        "hoursSpent": 3,
        "status": "Pending",
        "commentLink": "https://example.com/internal/tools-update"
      },
      {
        "date": "2025-11-09",
        "projectName": "Merrick Bank Fix",
        "pm": "Robert Wilson",
        "workDescription": "Investigated why Merrick Bank files were not transitioning to the completed state even after successful SFTP transfer. Identified a logic gap in the state-update handler where certain transfer statuses were not being evaluated correctly. Added validation checks, corrected conditional branching, and retested the workflow end-to-end. Engaged with backend developers to align on the fix and updated monitoring alerts for better visibility. Documented root cause and recommended long-term improvements.",
        "hoursPlanned": 2,
        "hoursSpent": 2,
        "status": "Completed",
        "commentLink": "https://example.com/merrick-bank/state-fix"
      },
      {
        "date": "2025-11-08",
        "projectName": "Active Scan Report",
        "pm": "Priya Nair",
        "workDescription": "Reviewed the latest active scan security report and analyzed the critical issues. Identified SQL injection risks related to raw queries used in older modules. Suggested safe alternatives using parameterized query builder methods. Collaborated with the security team to prioritize fixes and tested proof-of-concept patches for vulnerable endpoints. Updated the engineering team on required refactoring and documented recommended guidelines for future development to avoid similar issues.",
        "hoursPlanned": 3,
        "hoursSpent": 3,
        "status": "In Progress",
        "commentLink": "https://example.com/security/scan-report"
      },
      {
        "date": "2025-11-07",
        "projectName": "Daily Task Sheet UI",
        "pm": "Alex Martin",
        "workDescription": "Enhanced the Daily Task Sheet UI with Tailwind-based components featuring rounded corners, soft shadows, and improved spacing. Integrated an autosize directive for textareas to offer smoother user interaction. Fixed alignment issues in mobile views and updated the form logic to properly manage dynamic task rows. Conducted user testing and validated that the revised UI is visually consistent and easier to use. Documented all major changes and pushed updates for review.",
        "hoursPlanned": 2,
        "hoursSpent": 2,
        "status": "Completed",
        "commentLink": "https://example.com/ui/task-sheet"
      },
      {
        "date": "2025-11-06",
        "projectName": "Query Optimization",
        "pm": "Nina Patel",
        "workDescription": "Worked on optimizing complex query builder logic that previously relied on DB::raw. Rewrote nested conditions using safer alternatives while keeping the query performant. Ensured no functional change but improved readability and maintainability. Ran benchmarks comparing previous raw queries with new builder-based ones. Verified that all test cases pass and provided documentation for developers explaining how to handle advanced conditions without compromising security.",
        "hoursPlanned": 3,
        "hoursSpent": 2,
        "status": "Completed",
        "commentLink": "https://example.com/db/query-optimization"
      },
      {
        "date": "2025-11-05",
        "projectName": "SFTP Monitoring",
        "pm": "James Carter",
        "workDescription": "Enhanced monitoring around SFTP transactions by implementing structured logging and adding trace identifiers. Worked with AppSignal integration to ensure log traces reflect accurate transaction flow and error sources. Identified some timeouts caused by slow remote servers and recommended retry logic improvements. Validated new monitoring graphs in staging and prepared a summary for the next sprint planning meeting.",
        "hoursPlanned": 1,
        "hoursSpent": 2,
        "status": "In Progress",
        "commentLink": "https://example.com/sftp/monitoring"
      },
      {
        "date": "2025-11-04",
        "projectName": "Asset Cleanup",
        "pm": "Daniel White",
        "workDescription": "Worked on cleaning unused assets across the project. Removed outdated styles, deprecated images, and redundant script files. Ran the application locally to ensure no missing references or regressions. Coordinated with designers to confirm which assets are still actively used. This cleanup reduced bundle size and improved load time. Documented the changes and created a checklist for ongoing asset hygiene.",
        "hoursPlanned": 2,
        "hoursSpent": 1,
        "status": "Completed",
        "commentLink": "https://example.com/assets/cleanup"
      },
      {
        "date": "2025-11-03",
        "projectName": "Team Support",
        "pm": "Kimberly Adams",
        "workDescription": "Provided support to various team members across modules including cobrand implementation, database optimizations, and resolving bugs with scheduled workers. Participated in debugging sessions, reviewed merge requests, and shared insights on best practices for avoiding raw database queries. Helped troubleshoot a UI issue affecting new landing pages and coordinated with backend developers to finalize API responses. Documented all support activities for internal tracking.",
        "hoursPlanned": 3,
        "hoursSpent": 3,
        "status": "Pending",
        "commentLink": "https://example.com/team/support-summary"
      }
    ]
  );

  /* ---------------------------------------
     PAGINATION + SORTING SIGNALS
  ---------------------------------------- */

  currentPage = signal(1);
  pageSize = signal(5);

  sortOrder = signal<'asc' | 'desc'>('desc');


  /* ---------------------------------------
     CONSTRUCTOR
  ---------------------------------------- */

  constructor() {
    this.loadTasks(this.taskData());
  }

  /* ---------------------------------------
     FORM + INITIAL TASK DATA
  ---------------------------------------- */

  form = this.fb.group({
    tasks: this.fb.array([])
  });

  get tasks(): FormArray {
    return this.form.get('tasks') as FormArray;
  }

  /* ---------------------------------------
     CREATE FG
  ---------------------------------------- */

  createTaskGroup(task: any): FormGroup {
    return this.fb.group({
      date: [task.date, Validators.required],
      projectName: [task.projectName, Validators.required],
      pm: [task.pm],
      workDescription: [task.workDescription, Validators.required],
      hoursPlanned: [task.hoursPlanned, [Validators.required, Validators.min(0)]],
      hoursSpent: [task.hoursSpent, [Validators.required, Validators.min(0)]],
      status: [task.status, Validators.required],
      commentLink: [task.commentLink]
    });
  }

  /* ---------------------------------------
     LOAD TASKS
  ---------------------------------------- */

  loadTasks(tasks: any[]) {
    this.tasks.clear();
    tasks.forEach(t => this.tasks.push(this.createTaskGroup(t)));
    this.currentPage.set(1);
    this.tasksUpdated.update(v => v + 1);
  }


  /* ---------------------------------------
     SORTING
  ---------------------------------------- */

  toggleSort() {
    const order = this.sortOrder() === 'asc' ? 'desc' : 'asc';
    this.sortOrder.set(order);

    const sorted = [...this.tasks.value].sort((a, b) =>
      order === 'asc'
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date)
    );

    this.loadTasks(sorted);
  }

  /* ---------------------------------------
     PAGINATION (computed signal)
  ---------------------------------------- */

  paginatedTasks = computed(() => {
    this.tasksUpdated(); // 👈 forces re-evaluation

    const start = (this.currentPage() - 1) * this.pageSize();
    const end = start + this.pageSize();
    return this.tasks.controls.slice(start, end);
  });

  nextPage() {
    const totalPages = Math.ceil(this.tasks.length / this.pageSize());
    if (this.currentPage() < totalPages) {
      this.currentPage.update(v => v + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update(v => v - 1);
    }
  }

  /* ---------------------------------------
     ROW OPERATIONS
  ---------------------------------------- */

  addTask() {
    this.tasks.insert(
      0,
      this.createTaskGroup({
        date: '',
        projectName: '',
        pm: '',
        workDescription: '',
        hoursPlanned: 0,
        hoursSpent: 0,
        status: 'Pending',
        commentLink: ''
      })
    );
    this.tasksUpdated.update(v => v + 1);
  }


  duplicateTask(i: number) {
    const realIndex = i + (this.currentPage() - 1) * this.pageSize();
    const original = this.tasks.at(realIndex).value;
    this.tasks.insert(realIndex + 1, this.createTaskGroup(original));
    this.tasksUpdated.update(v => v + 1);
  }


  saveTask(i: number) {
    const realIndex = i + (this.currentPage() - 1) * this.pageSize();
    alert('Task Saved!');
  }

  removeTask(i: number) {
    const realIndex = i + (this.currentPage() - 1) * this.pageSize();
    this.tasks.removeAt(realIndex);
    this.tasksUpdated.update(v => v + 1);
  }

}
