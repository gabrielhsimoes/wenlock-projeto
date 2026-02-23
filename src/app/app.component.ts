import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-root',
  imports: [
    MainLayoutComponent,
    MatSlideToggleModule
  ],
  template: `<app-main-layout />`,
  styles: []
})
export class AppComponent {
  title = 'wenlock';
}
