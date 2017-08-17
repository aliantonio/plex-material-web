import { Injectable } from '@angular/core';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) { }

  public show(title: string, message: string): Observable<boolean> {
    let dialogRef: MdDialogRef<DialogComponent>;

    dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }

}
