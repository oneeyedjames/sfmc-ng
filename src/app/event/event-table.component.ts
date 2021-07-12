import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { EventDialogComponent } from './event-dialog.component';

@Component({
	selector: 'event-table',
	templateUrl: './event-table.component.html',
	styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent {
	@Input()
	events: any[] = [];

	cols = ['EventDate', 'EventType', 'ListName'];

	constructor(public dialog: MatDialog) {}

	hasMoreInfo(event: any) {
		return ['Bounce', 'Click', 'Unsub'].includes(event.EventType);
	}

	openDialog(event: any) {
		this.dialog.open(EventDialogComponent, { data: event });
	}
}
