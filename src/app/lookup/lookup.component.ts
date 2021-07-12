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
	email = 'ascott@rbc.org';
	loading = false;

	@Output('loaded')
	loaded = new EventEmitter<object[]>();

	// private get contacts() {
	// 	return this.svc.contacts as Subject<object[]>;
	// }

	private get subscribers() {
		return this.svc.subscribers as Subject<object[]>;
	}

	constructor(private svc: LookupService, private api: ApiService) {}

	search(email: string) {
		this.next();
		this.loading = true;

		// Promise.all([
		// 	this.api.getContact(email),
		// 	this.api.getSubscriber(email)
		// ]).then(([cons, subs]) => {
		// 	const customers: {[key:string]:object} = {};
		// 	const subscriptions: {[key:string]:object} = {};
		//
		// 	cons.forEach((con: any) => {
		// 		customers[con.Id] = {
		// 			...con,
		// 			Status: {
		// 				SalesCloud: con.Status
		// 			}
		// 		};
		//
		// 		con.Subscriptions.forEach((sub: any) => {
		// 			console.log(sub);
		// 			const key = [
		// 				sub.ContactId,
		// 				sub.GlobalProductCode
		// 			].join('-');
		//
		// 			subscriptions[key] = sub;
		// 		});
		// 	});
		//
		// 	subs.forEach((sub: any) => {
		// 		const subKey = sub.SubscriberKey as string;
		// 		const con = customers[subKey] as any;
		//
		// 		customers[subKey] = {
		// 			...con,
		// 			Id: subKey,
		// 			Email: sub.EmailAddress,
		// 			Status: {
		// 				...con.Status,
		// 				MarketingCloud: sub.Status
		// 			},
		// 			CreatedDate: sub.CreatedDate
		// 		};
		// 	});
		//
		// 	console.log(customers);
		// }, console.error);

		this.api.getSubscriber(email)
		.then(result => {
			this.loading = false;
			this.next(result);
		})
		.catch(err => {
			this.loading = false;
			this.subscribers.error(err);
		});
	}

	protected next(data: object[] = []) {
		console.log('SUBSCRIBERS', data);
		this.loaded.emit(data);
		this.subscribers.next(data);
	}
}
