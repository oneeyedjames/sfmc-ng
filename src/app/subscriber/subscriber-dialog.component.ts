import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'subscriber-dialog',
	templateUrl: './subscriber-dialog.component.html',
	// styleUrls: ['./subscriber-dialog.component.scss']
})
export class SubscriberDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public subscriber: any) {}
}
