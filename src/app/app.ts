import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutService } from './services/common/layout-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('hr-spark');
  layoutService = inject(LayoutService);
}
