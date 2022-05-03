import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { formatDateTime } from '../app.functions';
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
	private _localSubscriber?: any;
	private _locale?: string;

	fetching?: 'global' | 'local';

	get subscriber() { return this._subscriber; }

	@Input()
	set subscriber(subscriber: any) {
		this._subscriber = subscriber;

		const subKey = subscriber.SubscriberKey as string;

		if (subscriber.Contact !== undefined) {
			this._locale = subscriber.Contact.BusinessLocation;

			this.api.getSubscribers(subKey, this._locale)
			.then(subs => {
				this._localSubscriber = subs[0];
			}).catch(console.error);
		} else {
			this.dialog.open(SubscriberDialogComponent, {
				data: {
					title: 'Data Unavailable',
					message: 'Sync data could not be retrieved for this subscriber.'
				}
			});
		}

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
			const formatEvent = (locale?: string) => (event: any) => {
				event.Locale = locale;
			}

			this.fetching = 'global';

			this.api.getSubscriberEvents(subKey)
			.then(events => {
				subscriber.Events = events;
				events.forEach(formatEvent());

				if (subscriber.Contact) {
					this.fetching = 'local';
					return this.api.getSubscriberEvents(subKey,
						subscriber.Contact.BusinessLocation);
				} else {
					this.fetching = undefined;
					return [];
				}
			})
			.then(events => {
				subscriber.Events = [ ...subscriber.Events, ...events ];
				events.forEach(formatEvent(subscriber.Contact.BusinessLocation));

				this.fetching = undefined;
			})
			.catch(err => {
				this.fetching = undefined;
				console.error(err);
			});
		}
	}

	get syncEmail() {
		return this.subscriber.Contact !== undefined
			? this.subscriber.Contact.Email : 'Unknown';
	}

	get syncStatus() {
		return this.subscriber.Contact !== undefined
			? this.subscriber.Contact.Status : 'Unknown';
	}

	get locale() { return this._locale; }

	get localStatus() {
		if (this._localSubscriber === undefined) return undefined;
		return this._localSubscriber.Status;
	}

	get localUnsubscribedDate() {
		if (this._localSubscriber === undefined) return undefined;
		return this._localSubscriber.UnsubscribedDate;
	}

	constructor(
		private api: ApiService,
		private svc: SearchService,
		private dialog: MatDialog
	) {}

	deactivate(locale?: string) {
		this.dialog.open(SubscriberDialogComponent, {
			data: {
				title: 'Confirm Unsubscribe',
				message: 'Are you sure you want to unsubscribe?',
				isDestructive: true,
				isCancellable: true
			}
		}).afterClosed().subscribe(res => {
			if (res === 'ok') {
				this.updateStatus('Unsubscribed', locale);
			}
		})
	}

	reactivate(locale?: string) {
		this.updateStatus('Active', locale);
	}

	updateStatus(status: string, locale?: string) {
		if (locale === undefined)
			this.subscriber.loading = true;
		else
			this.subscriber.localLoading = true;

		const subKey = this.subscriber.SubscriberKey as string;

		this.api.updateSubscriber(subKey, status, locale)
		.then((res: any) => {
			if (locale === undefined)
				this.subscriber.loading = false;
			else
				this.subscriber.localLoading = false;

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
		return formatDateTime(date) || 'never';
	}

	search(input: string, event?: Event) {
		if (event !== undefined)
			event.preventDefault();

		this.svc.search(input);
	}
}
