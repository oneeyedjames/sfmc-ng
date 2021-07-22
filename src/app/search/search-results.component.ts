import { Component, Input } from '@angular/core';

@Component({
	selector: 'search-results',
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
	private _results: any[] = [];
	private _subscriber: any;

	get results(): any[] {
		return this._results;
	}

	@Input()
	set results(results: any[]) {
		this._results = results;
		this._subscriber = undefined;
	}

	get subscriber(): any {
		return this._subscriber;
	}

	get columns() {
		return this.subscriber ? ['SubscriberKey'] :
			['SubscriberKey', 'EmailAddress', 'Status', 'ListCount'];
	}

	select(subscriber?: any) {
		this.deselect();

		this._subscriber = subscriber;
		this._subscriber.selected = true;
	}

	deselect() {
		this.results!.forEach(sub => sub.selected = false);
		this._subscriber = undefined;
	}
}
