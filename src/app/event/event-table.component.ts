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

	eventTypes = ['Bounce', 'Click', 'Open', 'Unsubscribe'];
	allEventTypes = ['Bounce', 'Click', 'Open', 'Sent', 'Unsubscribe'];

	cols = ['EventDate', 'EventType', 'ListName'];

	get filteredEvents() {
		return this.events.filter(e => this.isTypeActive(e.EventType));
	}

	constructor(public dialog: MatDialog) {}

	hasMoreInfo(event: any) {
		return ['Bounce', 'Click', 'Unsubscribe'].includes(event.EventType);
	}

	isTypeActive(type: string) {
		return this.eventTypes.includes(type);
	}

	toggleType(type: string) {
		const index = this.eventTypes.indexOf(type);
		if (index < 0) this.eventTypes.push(type);
		else this.eventTypes.splice(index, 1);
	}

	openDialog(event: any) {
		this.dialog.open(EventDialogComponent, { data: event });
	}
}
