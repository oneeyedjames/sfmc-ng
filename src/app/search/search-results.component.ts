import { Component, Input } from '@angular/core';

@Component({
	selector: 'search-results',
	templateUrl: './search-results.component.html',
	styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent {
	@Input()
	results: any[] = [];

	subscriber: any;

	get columns() {
		return this.subscriber ? ['SubscriberKey'] :
			['SubscriberKey', 'EmailAddress', 'Status', 'ListCount'];
	}

	select(subscriber?: any) {
		this.deselect();

		this.subscriber = subscriber;
		this.subscriber.selected = true;
	}

	deselect() {
		this.results!.forEach(sub => sub.selected = false);
		this.subscriber = undefined;
	}
}
