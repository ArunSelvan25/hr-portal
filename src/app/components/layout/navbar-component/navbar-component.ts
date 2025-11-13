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
    this.layoutService.isSidebarOpen.set(!this.layoutService.isSidebarOpen());
  }
}
