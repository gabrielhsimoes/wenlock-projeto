import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  icon?: string;
  route?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatIconModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggle = new EventEmitter<void>();

  openIndex: number | null = null;
  menuItems: MenuItem[] = [
    {
      label: 'Home',
      icon: 'icon-home.svg',
      route: '/home',
    },
    {
      label: 'Controle de Acesso',
      icon: 'icon-access.svg',
      children: [
        {
          label: 'Usuários',
          route: '/controle-acesso/usuarios',
          icon: 'user-icon.svg',
        },
      ],
    },
  ];

  toggleSidebar() {
    this.toggle.emit();
  }

  toggleItem(index: number) {
    this.openIndex = this.openIndex === index ? null : index;
  }
}
