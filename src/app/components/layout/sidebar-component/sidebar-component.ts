import { Component, inject, signal } from '@angular/core';
import { LayoutService } from '../../../services/common/layout-service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-sidebar-component',
  imports: [NgClass],
  templateUrl: './sidebar-component.html',
  styleUrls: ['./sidebar-component.css']
})
export class SidebarComponent {
  layoutService = inject(LayoutService);
  router = inject(Router);

  sidebarMenus = signal([
    { id: 1, name: 'Dashboard', link: 'dashboard', icon: 'fa-home' },
    { id: 2, name: 'Profile', link: 'profile', icon: 'fa-user' },
    { id: 3, name: 'Settings', link: 'settings', icon: 'fa-cog' }
  ]);

  // Signal to track current active URL
  activeUrl = signal(this.router.url.replace(/^\//, ''));

  constructor() {
    // Update signal on route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.activeUrl.set(event.urlAfterRedirects.replace(/^\//, ''));
      });
  }

  navigateToPage(id: number) {
    const menu = this.sidebarMenus().find(item => item.id === id);
    if (menu) {
      this.router.navigate([menu.link]);
    } else {
      console.warn('Menu not found for id:', id);
    }
  }

  logout() {
    console.log('Logout clicked');
  }
}
