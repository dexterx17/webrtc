import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';



@Component({
  selector: 'arsi-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

	@Output() toggleSidenav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDir = new EventEmitter<void>();

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
  }

  openAddContactDialog(): void{
  	let dialogRef = this.dialog.open(NewContactDialogComponent, {
  		width: '450px'
  	});

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);

      if(result){
        this.openSnackBar('Contact Added', "Navigate")
        .onAction().subscribe(() => {
          this.router.navigate(['/contactmanager',result.id]);
        });
      }
    });
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action,{
      duration: 5000
    });
  }

}
