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

		if (!subscriber.Lists) {
			this.api.getSubscriberLists(subscriber.SubscriberKey)
			.then(lists => subscriber.Lists = lists)
			.catch(err => subscriber.Lists = []);
		}

		if (!subscriber.Events) {
			this.api.getSubscriberEvents(subscriber.SubscriberKey)
			.then(events => subscriber.Events = events)
			.catch(err => subscriber.Events = []);
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
