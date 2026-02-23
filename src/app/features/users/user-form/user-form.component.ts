import { CommonModule, NgFor } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { UsersMockService } from '../services/users-mock.service';
import { DialogService } from '../../../shared/dialog/dialog.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type Crumb = { label: string; link?: string };
@Component({
  selector: 'app-user-form',
  imports: [
    CommonModule,
    NgFor,
    RouterLink,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit, OnDestroy {
  editId: number | null = null;
  crumbs: Crumb[] = [];
  form!: FormGroup;
  hide = signal(true);
  loading = false;

  private sub: Subscription;
  private onlyLetters = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
  private onlyNumbers = /^\d+$/;
  private pass6AlphaNum = /^[A-Za-z0-9]{6}$/;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private usersMock: UsersMockService,
    private confirm: DialogService,
    private snackBar: MatSnackBar,
  ) {
    this.form = this.fb.group(
      {
        fullName: [
          '',
          [
            Validators.required,
            Validators.maxLength(30),
            Validators.pattern(this.onlyLetters),
          ],
        ],
        registration: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(this.onlyNumbers),
          ],
        ],
        email: [
          '',
          [Validators.required, Validators.email, Validators.maxLength(40)],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.maxLength(20),
            Validators.pattern(this.pass6AlphaNum),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordsMatchValidator('password', 'confirmPassword'),
      },
    );

    this.buildBreadcrumb();

    this.sub = this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => this.buildBreadcrumb()); // quando muda rota (novo/editar)
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.editId = idParam ? Number(idParam) : null;

    if (this.editId) {
      const user = this.usersMock.getById(this.editId);
      if (!user) {
        this.router.navigate(['/controle-acesso/usuarios']);
        return;
      }

      this.form.patchValue({
        fullName: user.fullName,
        registration: user.registration ?? '',
        email: user.email,
        password: '',
      });
    }
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private buildBreadcrumb() {
    const currentLabel =
      this.route.snapshot.data['breadcrumb'] ??
      (this.route.snapshot.paramMap.get('id')
        ? 'Editar Usuário'
        : 'Novo Usuário');

    this.crumbs = [
      { label: 'Usuários', link: '/controle-acesso/usuarios' },
      { label: currentLabel },
    ];
  }

  goBack() {
    this.router.navigate(['/controle-acesso/usuarios']);
  }

  get f() {
    return this.form.controls;
  }

  onCancel() {
    this.confirm
      .confirm({
        title: 'Deseja cancelar?',
        message: `Os dados inseridos não serão salvos.`,
        confirmText: 'Sim',
        cancelText: 'Não',
      })
      .subscribe(() => {
        this.router.navigate(['/controle-acesso/usuarios']);
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.form.disable();

    const { fullName, registration, email, password } = this.form.value;

    setTimeout(() => {
      if (this.editId) {
        // Atualizar dados do usuário
        this.usersMock.update(this.editId, {
          fullName: fullName!,
          registration: registration || undefined,
          email: email!,
          password: '',
        });

        // mostra diálogo de confirmação
        this.snackBar.open('Usuário atualizado com sucesso!', 'X', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      } else {
        // criação do usuário
        this.usersMock.create({
          fullName: fullName!,
          registration: registration || undefined,
          email: email!,
          password: password!,
        });

        // mostra diálogo de confirmação
        this.snackBar.open('Cadastro Realizado!', 'X', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['success-snackbar'],
        });
      }
      this.loading = false;
      this.router.navigate(['/controle-acesso/usuarios']);
    }, 800);
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  private passwordsMatchValidator(passKey: string, confirmKey: string) {
    return (group: AbstractControl) => {
      const pass = group.get(passKey)?.value;
      const confirm = group.get(confirmKey)?.value;

      if (!pass || !confirm) return null;

      if (pass !== confirm) {
        group.get(confirmKey)?.setErrors({
          ...(group.get(confirmKey)?.errors ?? {}),
          passwordMismatch: true,
        });
        return { passwordMismatch: true };
      }

      const errors = { ...(group.get(confirmKey)?.errors ?? {}) };
      delete errors['passwordMismatch'];
      group
        .get(confirmKey)
        ?.setErrors(Object.keys(errors).length ? errors : null);

      return null;
    };
  }
}
