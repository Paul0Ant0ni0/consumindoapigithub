import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly config: MatSnackBarConfig = {
    duration: 3000, // Duração em milissegundos (3 segundos)
    horizontalPosition: 'end', // Posição horizontal ('start', 'center', 'end', 'left', 'right')
    verticalPosition: 'top', // Posição vertical ('top', 'bottom')
    panelClass: 'custom-snackbar', // Classe CSS personalizada para o snackbar
  };

  constructor(
    private snackBar: MatSnackBar
  ) { }


  
  public openSnackBar(message: string) {
    this.snackBar.open(message, "Fechar", this.config);
  }
}
