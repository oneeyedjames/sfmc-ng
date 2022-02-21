import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { formatDate } from '../app.functions';
import { ApiService } from '../api.service';

import { SearchService } from '../search/search.module';

import { SubscriberDialogComponent } from './subscriber-dialog.component';

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

				lists.forEach((list: any) => {
					list.CreatedDate = new Date(list.CreatedDate);
					list.ModifiedDate = new Date(list.ModifiedDate);
					list.UnsubscribedDate = list.UnsubscribedDate || undefined;

					if (list.UnsubscribedDate !== undefined)
						list.UnsubscribedDate = new Date(list.UnsubscribedDate);
				});

				subs.forEach((sub: any) => {
					const list = lists.find((l: any) => {
						return l.ListCode == sub.GlobalProductCode;
					}) as any;

					if (list !== undefined)
						list.Subscription = sub;
					else
						lists.push({
							ListID: 0,
							ListCode: sub.GlobalProductCode,
							ListName: sub.GlobalProductCode,
							ListClassification: 'PublicationList',
							Status: 'Unsynced',
							UnsubscribedDate: undefined,
							CreatedDate: undefined,
							ModifiedDate: undefined,
							Subscription: sub
						});
				});
			}).catch(err => {
				subscriber.Lists = [];
				console.log(err);
			});
		}

		if (!subscriber.Events) {
			this.api.getSubscriberEvents(subKey)
			.then(events => {
				subscriber.Events = events;

				events.forEach((event: any) => {
					event.EventDate = new Date(event.EventDate);
				});

				if (subscriber.Contact) {
					return this.api.getSubscriberEvents(subKey,
						subscriber.Contact.BusinessLocation);
				} else {
					return [];
				}
			})
			.then(events => {
				subscriber.Events = [ ...subscriber.Events, ...events ];

				events.forEach((event: any) => {
					event.EventDate = new Date(event.EventDate);
				});
			})
			.catch(err => {
				// subscriber.Events = [];
				console.error(err);
			});
		}
	}

	get syncEmail() {
		if (this.subscriber.Contact === undefined) return undefined;
		if (this.subscriber.Contact.Email != this.subscriber.EmailAddress)
			return this.subscriber.Contact.Email;

		return null
	}

	get syncStatus() {
		if (this.subscriber.Contact === undefined) return undefined;
		if (this.subscriber.Contact.Status != this.subscriber.Status)
			return this.subscriber.Contact.Status;

		return null;
	}

	constructor(
		private api: ApiService,
		private svc: SearchService,
		private dialog: MatDialog
	) {}

	deactivate() {
		this.dialog.open(SubscriberDialogComponent)
		.afterClosed().subscribe(res => {
			if (res === 'unsubscribe') {
				this.updateStatus('Unsubscribed');
			}
		})
	}

	reactivate() {
		this.updateStatus('Active');
	}

	updateStatus(status: string) {
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

	formatDate(date?: Date) {
		return formatDate(date);
	}

	search(input: string, event?: Event) {
		if (event !== undefined)
			event.preventDefault();

		this.svc.search(input);
	}
}
