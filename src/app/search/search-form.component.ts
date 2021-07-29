import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { ApiService } from '../api.service';

@Component({
	selector: 'search-form',
	templateUrl: './search-form.component.html',
	styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
	fieldLabels = {
		key: 'Subscriber Key',
		email: 'Email Address'
	} as { [key: string]: string }

	fieldCtrl = new FormControl('email');
	inputCtrl = new FormControl('', [Validators.required]);

	@Output('search')
	searchEvent = new EventEmitter<void>();

	@Output('results')
	resultsEvent = new EventEmitter<object[]>();
	results = [] as object[];

	constructor(private api: ApiService) {
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

		this.results = [];
		this.fieldCtrl.disable();
		this.inputCtrl.disable();
		this.searchEvent.emit();

		Promise.all([
			this.api.getContacts(this.inputCtrl.value, this.fieldCtrl.value),
			this.api.getSubscribers(this.inputCtrl.value, this.fieldCtrl.value)
		]).then(([cons, subs]) => {
			subs.forEach((sub: any) => {
				sub.Contact = cons.find((c: any) => {
					return c.Id == sub.SubscriberKey;
				}) as any;

				// if (sub.Contact !== undefined) {
				// 	sub.Lists.forEach((list: any) => {
				// 		if (list.ListClassification == 'PublicationList') {
				// 			list.Subscription = sub.Contact.Subscriptions.find((s: any) => {
				// 				return s.GlobalProductCode === list.ListCode;
				// 			}) as any;
				// 		}
				// 	});
				// }
			});

			this.results = subs;
		}).catch(console.error).finally(() => {
			this.fieldCtrl.enable();
			this.inputCtrl.enable();
			this.resultsEvent.emit(this.results);
		});
	}

	reset() {
		this.inputCtrl.reset();
		this.resultsEvent.emit(this.results = []);
	}

	onKeyPress(event: KeyboardEvent) {
		if (event.keyCode == 13) this.search();
	}

	// protected next(data: object[] = []) {
	// 	// data.forEach((sub: any) => sub.Events.sort((e1: any, e2: any) => {
	// 	// 	return Date.parse(e2.EventDate) - Date.parse(e1.EventDate);
	// 	// }));
	//
	// 	this.resultsEvent.emit(this.results = data);
	// }
}
