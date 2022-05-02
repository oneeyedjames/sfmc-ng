import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { formatDateTime } from '../app.functions';

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

	get url() {
		if (this.isClick) {
			const url = new URL(this.event.URL);
			return url.origin + url.pathname;
		}

		return undefined;
	}

	get urlParams() {
		const params: { key: string; value: string; }[] = [];

		if (this.isClick) {
			new URL(this.event.URL).searchParams
			.forEach((value, key) => params.push({ key, value }));
		}

		return params;
	}

	get unsubContext() {
		if (this.isUnsub) {
			return this.event.IsMasterUnsubscribed === 'true'
				? this.event.Locale || 'All' : this.event.ListCode;
		}

		return undefined;
	}

	formatDate(date?: Date) {
		return formatDateTime(date);
	}
}
