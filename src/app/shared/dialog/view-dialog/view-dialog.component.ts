import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-view-dialog',
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './view-dialog.component.html',
  styleUrl: './view-dialog.component.scss'
})
export class ViewDialogComponent {

  constructor(
    private ref: MatDialogRef<ViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close() {
    this.ref.close();
  }
}
