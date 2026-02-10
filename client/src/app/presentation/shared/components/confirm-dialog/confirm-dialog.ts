import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Interfaz para tipar los datos que recibe el diálogo
export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  color?: 'primary' | 'warn' | 'accent'; // Para cambiar el color del botón (ej: rojo para borrar)
}

@Component({
  selector: 'app-confirm-dialog',
  imports: [MatDialogModule,MatButtonModule,MatIconModule],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss',
})
export class ConfirmDialog {

  private dialogRef = inject(MatDialogRef<ConfirmDialog>);
  public data: ConfirmDialogData = inject(MAT_DIALOG_DATA);

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
