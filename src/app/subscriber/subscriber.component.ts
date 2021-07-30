import { Component, Input } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
	selector: 'subscriber',
	templateUrl: './subscriber.component.html'
})
export class SubscriberComponent {
	private _subscriber: any;

	get subscriber() { return this._subscriber; }

	@Input()
	set subscriber(subscriber: any) {
		this._subscriber = subscriber;

		const subKey = subscriber.SubscriberKey as string;

		if (!subscriber.Lists) {
			Promise.all([
				this.api.getSubscriberLists(subKey),
				this.api.getContactSubscriptions(subKey)
			]).then(([lists, subs]) => {
				subscriber.Lists = lists;

				subs.forEach((sub: any) => {
					const list = lists.find((l: any) => {
						return l.ListCode == sub.GlobalProductCode;
					}) as any;
				});

				console.log(lists);
			}).catch(err => {
				subscriber.Lists = [];
				console.log(err);
			});
		}

		if (!subscriber.Events) {
			this.api.getSubscriberEvents(subKey)
			.then(events => subscriber.Events = events)
			.catch(err => {
				subscriber.Events = [];
				console.error(err);
			});
		}
	}

	constructor(private api: ApiService) {}

	get syncStatus() {
		if (this.subscriber.Contact === undefined) return undefined;
		if (this.subscriber.Contact.Status != this.subscriber.Status)
			return this.subscriber.Contact.Status;

		return null;
	}

	updateList(list: any) {
		this.api.updateSubscriberList(
			this.subscriber.SubscriberKey,
			list.ListID, list.Status
		).then(console.log, console.error);
	}
}
