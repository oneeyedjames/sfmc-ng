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

	constructor(private api: ApiService) {}

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
}
