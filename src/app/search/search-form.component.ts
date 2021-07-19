import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subject, combineLatest } from 'rxjs';

import { ApiService } from '../api.service';

import { SearchService } from './search.service';

@Component({
	selector: 'search-form',
	templateUrl: './search-form.component.html'
})
export class SearchFormComponent {
	fieldLabels = {
		key: 'Subscriber Key',
		email: 'Email Address'
	} as { [key: string]: string }

	fieldCtrl = new FormControl('email');
	inputCtrl = new FormControl('', [Validators.required]);

	@Output('loaded')
	loaded = new EventEmitter<object[]>();

	private get contacts() {
		return this.svc.contacts as Subject<object[]>;
	}

	private get subscribers() {
		return this.svc.subscribers as Subject<object[]>;
	}

	constructor(private svc: SearchService, private api: ApiService) {
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
		this.inputCtrl.markAsTouched();
		if (this.inputCtrl.invalid) return;

		this.next();
		this.fieldCtrl.disable();
		this.inputCtrl.disable();

		this.api.getContact(this.inputCtrl.value, this.fieldCtrl.value)
		.then(result => {
			console.log(result);
			this.contacts.next(result);
		}).catch(err => console.error(err));

		this.api.getSubscriber(this.inputCtrl.value, this.fieldCtrl.value)
		.then(result => this.next(result))
		.catch(err => this.subscribers.error(err))
		.finally(() => {
			this.fieldCtrl.enable();
			this.inputCtrl.enable();
		});
	}

	reset() {
		this.inputCtrl.reset();
		this.next();
	}

	onKeyPress(event: KeyboardEvent) {
		if (event.keyCode == 13) this.search();
	}

	protected next(data: object[] = []) {
		this.loaded.emit(data);
		this.subscribers.next(data);
	}
}
