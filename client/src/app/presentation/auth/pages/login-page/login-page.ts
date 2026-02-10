import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../../../infrastructure/services/auth.service';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-login-page',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatIcon
  ],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.scss'],
})
export class LoginPage {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  public isLoading = signal(false);

  public myForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit() {
    if (this.myForm.invalid) return;

    this.isLoading.set(true);
    const { email } = this.myForm.value;

    // Nota: Como tu backend solo pide email para login/register en el ejemplo básico,
    // usaremos ese campo.
    this.authService.login({ email: email! })
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/tasks');
        },
        error: (errorMessage) => {
          this.isLoading.set(false);
          // Si es 404 (No existe), mostramos el diálogo
          if (errorMessage.status === 404 || errorMessage.error?.error === 'User not found') {
            console.log(errorMessage.error?.error)
            this.openCreateDialog(email!);
          } else {
            this.showError(errorMessage);

          }
        }
      });
  }

  registerUser(email: string) {
    this.isLoading.set(true);
    // Nota: Asegúrate de que tu servicio 'register' acepte solo email ahora
    this.authService.register({ email }).subscribe({
      next: () => {
        // Requirement[cite: 10]: Si se crea, navega directo a principal
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        this.isLoading.set(false);
        console.error(err);
        alert('No se pudo crear el usuario');
      }
    });
  }

  // MÉTODO PARA CREAR O EDITAR
  openCreateDialog(email: string) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '400px',
      disableClose: true,
      data: {
        title: 'Usuario no encontrado',
        message: `El correo <strong>${email}</strong> no existe.<br>¿Deseas crear una cuenta nueva?`,
        confirmText: 'Crear Cuenta',
        color: 'primary'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.registerUser(email);
      }
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

}
