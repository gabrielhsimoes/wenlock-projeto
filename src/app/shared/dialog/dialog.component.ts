import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export type ConfirmDialogOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  width?: string;
  color?: 'primary' | 'accent' | 'warn';
};

@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogOptions
  ) { }

  close(v: boolean) {
    this.dialogRef.close(v);
  }
}
