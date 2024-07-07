import {Component, Inject} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { DialogImpressumComponent } from '../dialog-impressum/dialog-impressum.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogImpressumComponent, {
    });
  }
}
