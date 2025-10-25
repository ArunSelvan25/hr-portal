import { Component } from '@angular/core';
import { SidebarComponent } from '../../components/layout/sidebar-component/sidebar-component';
import { NavbarComponent } from '../../components/layout/navbar-component/navbar-component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  imports: [SidebarComponent, NavbarComponent, RouterOutlet],
  templateUrl: './layout-page.html',
  styleUrl: './layout-page.css'
})
export class LayoutPage {

}
