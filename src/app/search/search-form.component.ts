import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ApiService } from '../api.service';
import { SearchService } from './search.service';

@Component({
	selector: 'search-form',
	templateUrl: './search-form.component.html',
	styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit, OnDestroy {
	inputCtrl = new FormControl('', [Validators.required]);

	@Output('search')
	searchEvent = new EventEmitter<void>();

	@Output('results')
	resultsEvent = new EventEmitter<object[]>();
	results = [] as object[];

	private sub?: Subscription;

	constructor(private svc: SearchService, private api: ApiService) {}

	ngOnInit() {
		this.sub = this.svc.subscribe(input => {
			this.inputCtrl.setValue(input);
			this.search();
		});
	}

	ngOnDestroy() {
		if (this.sub !== undefined)
			this.sub.unsubscribe();
	}

	search() {
		this.inputCtrl.markAsTouched();
		if (this.inputCtrl.invalid) return;

		this.results = [];
		this.inputCtrl.disable();
		this.searchEvent.emit();

		Promise.all([
			this.api.getContacts(this.inputCtrl.value),
			this.api.getSubscribers(this.inputCtrl.value)
		]).then(([cons, subs]) => {
			subs.forEach((sub: any) => {
				sub.CreatedDate = new Date(sub.CreatedDate);

				if (sub.UnsubscribedDate !== undefined)
					sub.UnsubscribedDate = new Date(sub.UnsubscribedDate);
			});

			cons.forEach((con: any) => {
				const sub = subs.find((s: any) => {
					return s.SubscriberKey == con.Id;
				}) as any;

				if (sub !== undefined)
					sub.Contact = con;
				else
					subs.push({
						SubscriberKey: con.Id,
						EmailAddress: con.Email,
						Status: 'Unsynced',
						Contact: con
					});
			});

			this.results = subs;
		}).catch(console.error).finally(() => {
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
}
