import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'event-dialog',
	templateUrl: './event-dialog.component.html',
	styleUrls: ['./event-dialog.component.scss']
})
export class EventDialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public event: any) {}

	get hasMoreInfo() {
		return this.isClick || this.isBounce || this.isUnsub;
	}

	get isClick() {
		return this.event.URL !== undefined;
	}

	get isBounce() {
		return this.event.BounceCategory !== undefined;
	}

	get isUnsub() {
		return this.event.IsMasterUnsubscribed !== undefined;
	}
}
