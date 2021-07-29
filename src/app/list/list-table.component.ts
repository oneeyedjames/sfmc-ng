import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'list-table',
	templateUrl: './list-table.component.html',
	styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent {
	@Input()
	lists: any[] = [];

	cols = [
		'ListID',
		'ListName',
		'Status',
		'UnsubscribedDate',
		'CreatedDate',
		'ModifiedDate',
		'Action'
	];

	@Output()
	update = new EventEmitter<any>();

	getSyncStatus(list: any) {
		if (list.Subscription === undefined) return undefined;
		if (list.Subscription.Status != list.Status)
			return list.Subscription.Status;

		return undefined;
	}

	activate(list: any) {
		list.Status = 'Active';
		this.update.emit(list);
	}

	unsubscribe(list: any) {
		list.Status = 'Unsubscribed';
		this.update.emit(list);
	}
}
