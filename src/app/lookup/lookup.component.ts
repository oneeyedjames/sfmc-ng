import { Component, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { ApiService } from '../api.service';

import { LookupService } from './lookup.service';

@Component({
	selector: 'lookup-form',
	templateUrl: './lookup.component.html',
	// styleUrls: ['./lookup.component.scss']
})
export class LookupComponent {
	input = '';
	field = 'email';

	fieldLabels = {
		key: 'Subscriber Key',
		email: 'Email Address'
	} as { [key: string]: string }

	loading = false;

	@Output('loaded')
	loaded = new EventEmitter<object[]>();

	private get contacts() {
		return this.svc.contacts as Subject<object[]>;
	}

	private get subscribers() {
		return this.svc.subscribers as Subject<object[]>;
	}

	constructor(private svc: LookupService, private api: ApiService) {
		// combineLatest([
		// 	svc.contacts,
		// 	svc.subscribers
		// ]).subscribe(([cons, subs]) => {
		// 	const customers: {[id:string]:any} = {};
		// 	const subscriptions: {[id:string]:any} = {};
		//
		// 	cons.forEach((con: any) => {
		// 		customers[con.Id] = {
		// 			Id: con.Id,
		// 			Name: con.Name,
		// 			Email: { SalesCloud: con.Email },
		// 			Status: { SalesCloud: con.Status },
		// 			Subscriptions: {}
		// 		}
		//
		// 		con.Subscriptions.forEach((sub: any) => {
		// 			const key = `${sub.ContactId}:${sub.GlobalProductCode}`;
		// 			customers[con.Id].Subscriptions[key] = subscriptions[key] = {
		// 				ContactId: sub.ContactId,
		// 				ProductCode: sub.GlobalProductCode,
		// 				Status: { SalesCloud: sub.Status },
		// 				InactiveReason: { SalesCloud: sub.InactiveReason }
		// 			};
		// 		});
		// 	});
		//
		// 	subs.forEach((sub: any) => {
		// 		const cust = customers[sub.SubscriberKey] || {
		// 			Id: sub.SubscriberKey,
		// 			Email: { SalesCloud: undefined },
		// 			Status: { SalesCloud: undefined },
		// 			Subscriptions: {}
		// 		};
		//
		// 		cust.Email.MarketingCloud = sub.EmailAddress;
		// 		cust.Status.MarketingCloud = sub.Status;
		//
		// 		customers[sub.SubscriberKey] = cust;
		//
		// 		sub.Lists.forEach((listSub: any) => {
		// 			if (listSub.ListClassification == 'PublicationList') {
		// 				const subKey = sub.SubscriberKey as string;
		// 				const key = `${subKey}:${listSub.ListCode}`;
		//
		// 				const custSub = subscriptions[key] || {
		// 					ContactId: subKey,
		// 					ProductCode: listSub.ListCode,
		// 					Status: { SalesCloud: undefined },
		// 					InactiveReason: { SalesCloud: undefined }
		// 				};
		//
		// 				custSub.Status.MarketingCloud = listSub.Status;
		// 				custSub.InactiveReason.MarketingCloud = listSub.InactiveReason;
		//
		// 				customers[subKey].Subscriptions[key] = subscriptions[key] = custSub;
		// 			}
		// 		});
		// 	});
		//
		// 	console.log(customers);
		// });
	}

	search() {
		this.next();
		this.loading = true;

		this.api.getContact(this.input, this.field)
		.then(result => this.contacts.next(result))
		.catch(err => console.error(err));

		this.api.getSubscriber(this.input, this.field)
		.then(result => {
			this.loading = false;
			this.next(result);
		})
		.catch(err => {
			this.loading = false;
			this.subscribers.error(err);
		});
	}

	onKeyPress(event: KeyboardEvent) {
		if (event.keyCode == 13) this.search();
	}

	protected next(data: object[] = []) {
		console.log('SUBSCRIBERS', data);
		this.loaded.emit(data);
		this.subscribers.next(data);
	}
}
