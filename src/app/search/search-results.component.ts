import { Component, Input } from '@angular/core';

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

	getTitle(subscriber: any) {
		return subscriber.Contact ? subscriber.Contact.Name : undefined;
	}

	getSubtitle(subscriber: any) {
		return subscriber.Contact ? subscriber.SubscriberKey : undefined;
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
}
