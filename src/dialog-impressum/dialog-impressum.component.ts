import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-impressum',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './dialog-impressum.component.html',
  styleUrl: './dialog-impressum.component.scss'
})
export class DialogImpressumComponent {
  constructor(public dialogRef: MatDialogRef<DialogImpressumComponent>) {
  }
}
