import { Component, Input } from '@angular/core';

import { ApiService } from '../api.service';

@Component({
	selector: 'subscriber',
	templateUrl: './subscriber.component.html',
	styleUrls: ['./subscriber.component.scss']
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

					if (list !== undefined)
						list.Subscription = sub;
				});

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

	activate() {
		this.subscriber.loading = true;

		const subKey = this.subscriber.SubscriberKey as string;

		const cb = (res: any) => {
			this.subscriber.loading = false;
			this.subscriber.Status = 'Active';
			this.subscriber.UnsubscribedDate = undefined;
		};

		this.api.updateSubscriber(subKey, 'Active')
		.then(cb).catch(console.error);
	}

	updateList([listId, status]: [string, string]) {
		const list = this.subscriber.Lists.find((l: any) => l.ListID == listId);

		if (list !== undefined) {
			list.loading = true;

			const subKey = this.subscriber.SubscriberKey as string;

			const cb = (res: any) => {
				list.loading = false;
				list.Status = status;
				list.UnsubscribedDate = undefined;
			};

			this.api.updateSubscriberList(subKey, listId, status)
			.then(cb).catch(console.error);
		}
	}
}
