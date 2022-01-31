import { Component, Input } from '@angular/core';

import { formatDate } from '../app.functions';

import { SearchService } from './search.service';

@Component({
	selector: 'search-results',
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
	private _results: any[] = [];
	private _subscriber: any;

	@Input()
	loading = false;

	get results(): any[] {
		return this._results;
	}

	@Input()
	set results(results: any[]) {
		this._results = results;
		this.select(results.length > 0 ? results[0] : undefined);
	}

	get subscriber(): any {
		return this._subscriber;
	}

	get columns() {
		return this.subscriber ? ['SubscriberKey'] :
			['SubscriberKey', 'Name', 'EmailAddress', 'Status', 'CreatedDate'];
	}

	constructor(private svc: SearchService) {}

	getClass(subscriber?: any) {
		subscriber = subscriber || this.subscriber;

		const classes = [] as string[];

		switch (subscriber.Status) {
			// case 'Active':       classes.push('success'); break;
			case 'Unsubscribed': classes.push('warn');    break;
		}

		if (subscriber.selected) classes.push('selected');

		return classes.join(' ');
	}

	getColor(subscriber?: any) {
		subscriber = subscriber || this.subscriber;

		switch (subscriber.Status) {
			case 'Unsubscribed': return 'warn';
			default: return 'accent';
		}
	}

	getTitle(subscriber?: any) {
		subscriber = subscriber || this.subscriber;

		return subscriber.Contact ? subscriber.Contact.Name : undefined;
	}

	getSubtitle(subscriber?: any) {
		subscriber = subscriber || this.subscriber;

		return subscriber.SubscriberKey;
	}

	getPermalink(subscriber?: any) {
		subscriber = subscriber || this.subscriber;

		return `https://odb.lightning.force.com/lightning/r/Contact/${subscriber.SubscriberKey}/view`;
	}

	select(subscriber?: any) {
		this.deselect();

		if (this._subscriber = subscriber)
			this._subscriber.selected = true;
	}

	deselect() {
		this.results!.forEach(sub => sub.selected = false);
		this._subscriber = undefined;
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
