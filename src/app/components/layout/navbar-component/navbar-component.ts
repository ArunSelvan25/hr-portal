import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../services/common/layout-service';

@Component({
  selector: 'app-navbar-component',
  imports: [],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent {
  layoutService = inject(LayoutService);

  toggleSidebar() {
    console.log('Sidebar state before toggle:', this.layoutService.isSidebarOpen());
    this.layoutService.isSidebarOpen.set(!this.layoutService.isSidebarOpen());
    console.log('Sidebar state after toggle:', this.layoutService.isSidebarOpen());
  }
}
