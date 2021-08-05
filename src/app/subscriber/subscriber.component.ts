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

	updateStatus(status = 'Active') {
		this.subscriber.loading = true;

		const subKey = this.subscriber.SubscriberKey as string;

		this.api.updateSubscriber(subKey, status)
		.then((res: any) => {
			this.subscriber.loading = false;

			if (res[0].StatusCode === 'OK') {
				this.subscriber.Status = status;
				this.subscriber.UnsubscribedDate = undefined;
			} else {
				console.error(res);
			}
		})
		.catch(console.error);
	}

	updateList([listId, status]: [string, string]) {
		const list = this.subscriber.Lists.find((l: any) => l.ListID == listId);

		if (list !== undefined) {
			list.loading = true;

			const subKey = this.subscriber.SubscriberKey as string;

			this.api.updateSubscriberList(subKey, listId, status)
			.then((res: any) => {
				list.loading = false;

				if (res[0].StatusCode === 'OK') {
					list.Status = status;
					list.UnsubscribedDate = undefined;
				} else {
					console.error(res);
				}
			})
			.catch(console.error);
		}
	}
}
