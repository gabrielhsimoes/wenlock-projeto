import { Component, ViewChild } from '@angular/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { MatSidenavContainer } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    SidebarComponent,
    RouterOutlet,
  ],
  templateUrl: './main-layout.component.html',
  styles: [],
})
export class MainLayoutComponent {
  collapsed = false;

  @ViewChild(MatSidenavContainer) sidenavContainer!: MatSidenavContainer;

  toggleSidebar() {
    this.collapsed = !this.collapsed;

    setTimeout(() => {
      this.sidenavContainer.updateContentMargins();
    });
  }
}
