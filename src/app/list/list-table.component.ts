import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ListDialogComponent } from './list-dialog.component';

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
	update = new EventEmitter<[string, string]>();

	constructor(private dialog: MatDialog) {}

	getSyncStatus(list: any) {
		if (list.Subscription === undefined) return undefined;
		if (list.Subscription.Status != list.Status)
			return list.Subscription.Status;

		return undefined;
	}

	resubscribe(listId: string) {
		this.update.emit([listId, 'Active']);
	}

	unsubscribe(listId: string) {
		this.dialog.open(ListDialogComponent)
		.afterClosed().subscribe(res => {
			if (res === 'unsubscribe') {
				this.update.emit([listId, 'Unsubscribed']);
			}
		});
	}
}
