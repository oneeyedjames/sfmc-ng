import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'list-dialog',
	templateUrl: './list-dialog.component.html',
	// styleUrls: ['./list-dialog.component.scss']
})
export class ListDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public list: any) {}
}
