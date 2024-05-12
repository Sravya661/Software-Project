import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private defaultSnackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };


  constructor(private snackBar : MatSnackBar
  ) { }


  toast(message: string, action?: string, config?: MatSnackBarConfig<any>) {
    this.snackBar.open(message, action, this.defaultSnackBarConfig);
}
}