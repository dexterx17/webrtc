import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service';


@Component({
	selector: 'arsi-new-contact-dialog',
	templateUrl: './new-contact-dialog.component.html',
	styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit {

	user: User;
	avatars = [
		'drone', 'control'
	];

	constructor(
		private userService: UserService,
		private dialogRef: MatDialogRef<NewContactDialogComponent>
		) { }

	name = new FormControl('', [Validators.required]);

	getErrorMessage() {
	    return this.name.hasError('required') ? 'You must enter a name' : '';
	}

	ngOnInit() {
		this.user = new User();
	}

	save() {
		this.userService.addUser(this.user).then(user => {
			this.dialogRef.close(user);
		});
		this.dialogRef.close(this.user);
	}

	dismiss() {
		this.dialogRef.close(null);
	}

}
