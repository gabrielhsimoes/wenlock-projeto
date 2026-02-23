import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map, Observable } from 'rxjs';
import { ConfirmDialogOptions, DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirm(options: ConfirmDialogOptions): Observable<boolean> {
    const ref = this.dialog.open(DialogComponent, {
      width: options.width ?? '420px',
      data: options,
    });

    return ref.afterClosed().pipe(map((v) => !!v));
  }

  open(component: any, data: any) {
    return this.dialog.open(component, {
      data,
      panelClass: 'right-sheet-dialog',
      width: '420px',
      height: '100vh',
      position: { right: '0', top: '0' },
      autoFocus: false,
    });
  }
}
