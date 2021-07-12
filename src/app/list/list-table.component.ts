import { Component, Input } from '@angular/core';

@Component({
	selector: 'list-table',
	templateUrl: './list-table.component.html',
	styleUrls: ['./list-table.component.scss']
})
export class ListTableComponent {
	@Input()
	lists: any[] = [];

	cols = ['ListID', 'ListName', 'Status', 'UnsubscribedDate', 'CreatedDate', 'ModifiedDate'];
}
