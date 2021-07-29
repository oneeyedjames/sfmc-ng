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

	getInfo() {
		const url = new URL(this.event.URL);
		console.log(url);
	}

	getUrl() {
		if (this.event.URL !== undefined) {
			const url = new URL(this.event.URL);
			return url.origin + url.pathname;
		}

		return '';
	}

	getSearchParams() {
		const params: { key: string; value: string; }[] = [];

		if (this.event.URL !== undefined) {
			new URL(this.event.URL).searchParams
			.forEach((value, key) => params.push({ key, value }));
		}

		return params;
	}
}
