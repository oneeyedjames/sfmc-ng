import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'subscriber-dialog',
	templateUrl: './subscriber-dialog.component.html',
	// styleUrls: ['./subscriber-dialog.component.scss']
})
export class SubscriberDialogComponent {
	get okButtonColor() {
		return this.config.isDestructive ? 'warn' : 'primary';
	}

	get useCancelButton() {
		return this.config.isCancellable || this.config.isDestructive;
	}

	constructor(@Inject(MAT_DIALOG_DATA) public config: SubscriberDialogConfig) {}
}

export interface SubscriberDialogConfig {
	icon?: string;
	title?: string;
	message?: string;
	isCancellable?: boolean;
	isDestructive?: boolean;
}
