import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from './user.model';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { UsersMockService } from './services/users-mock.service';
import { CommonModule } from '@angular/common';
import { DialogService } from '../../shared/dialog/dialog.service';
import { ViewDialogComponent } from '../../shared/dialog/view-dialog/view-dialog.component';
import { CustomPaginator } from '../../shared/custom-paginator-intl';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    RouterLink,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useFactory: CustomPaginator }],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit, AfterViewInit {
  users$!: Observable<User[]>;
  displayedColumns: string[] = ['name', 'actions'];
  searchFilter = new FormControl('');
  dataSource = new MatTableDataSource<User>([]);
  private sub?: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get hasFilter(): boolean {
    return (this.searchFilter.value ?? '').trim().length > 0;
  }

  constructor(
    private router: Router,
    private usersMock: UsersMockService,
    private confirm: DialogService,
    private snackBar: MatSnackBar,
  ) {
    this.users$ = this.usersMock.users$;

    this.dataSource.filterPredicate = (user: User, filter: string) => {
      const term = filter.trim().toLowerCase();
      return (user.fullName ?? '').toLowerCase().includes(term);
    };
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sub = this.users$.subscribe((users) => {
      this.dataSource.data = users ?? [];
      this.dataSource.paginator = this.paginator;
    });

    this.searchFilter.valueChanges.subscribe((value) => {
      this.applyFilter(value ?? '');
    });
  }

  onCreateUser() {
    this.router.navigate(['/controle-acesso/usuarios/novo']);
  }

  onDeleteUser(u: User) {
    this.confirm
      .confirm({
        title: 'Deseja excluir?',
        message: `O usuário será excluido.`,
        confirmText: 'Sim',
        cancelText: 'Não',
        color: 'warn',
      })
      .subscribe((ok) => {
        if (!ok) return;

        this.usersMock.remove(u.id);

        // mostra diálogo de confirmação
        this.snackBar.open('Exclusão realizada!', 'X', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      });
  }

  onEditUser(u: User) {
    this.router.navigate(['/controle-acesso/usuarios', u.id, 'editar']);
  }

  openView(user: User) {
    this.confirm.open(ViewDialogComponent, user);
  }

  clearSearch() {
    this.searchFilter.setValue('');
  }

  private applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
