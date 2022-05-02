import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { formatDateTime } from '../app.functions';
import { EventDialogComponent } from './event-dialog.component';

@Component({
	selector: 'event-table',
	templateUrl: './event-table.component.html',
	styleUrls: ['./event-table.component.scss']
})
export class EventTableComponent {
	private _events: any[] = [];

	get events() { return this._events; }

	@Input()
	set events(events: any[]) {
		this._events = events.sort((e1: any, e2: any) => {
			return Date.parse(e2.EventDate) - Date.parse(e1.EventDate);
		});

		const listMap = new Map<string, string>();

		events.forEach(event => {
			const name = event.ListName as string;
			const keys = name.match(/^(.+) - (.+)$/i);
			event.ListCode = keys ? keys[1] : name;
			listMap.set(event.ListID, event.ListCode);
		});

		this.lists = Array.from(listMap.entries())
		.map(entry => ({ id: entry[0], name: entry[1], selected: true }))
		.sort((l1, l2) => l1.name.localeCompare(l2.name));

		const types = events.map(event => event.EventType as string);

		this.types = Array.from(new Set<string>(types))
		.map(type => ({ name: type, selected: true }))
		.sort((t1, t2) => t1.name.localeCompare(t2.name));
	}

	lists: any[] = [];
	types: any[] = [];

	cols = ['ListID', 'ListName', 'EventType', 'EventDate', 'EventInfo'];

	get selectedLists() {
		return this.lists.filter(l => l.selected);
	}

	get selectedTypes() {
		return this.types.filter(t => t.selected);
	}

	get filteredEvents() {
		return this.events.filter(e => (
			this.isListSelected(e.ListID) &&
			this.isTypeSelected(e.EventType)
		));
	}

	constructor(public dialog: MatDialog) {}

	isListSelected(listId: string) {
		const list = this.lists.find(l => l.id === listId);
		return list && list.selected;
	}

	isTypeSelected(name: string) {
		const type = this.types.find(t => t.name === name);
		return type && type.selected;
	}

	getInfo(event: any) {
		switch (event.EventType) {
			case 'Click':
				try {
					const url = new URL(event.URL);
					return url.hostname + url.pathname;
				} catch (e) {
					return event.URL;
				}
			case 'Unsubscribe':
				return 'from ' + (event.IsMasterUnsubscribed === 'true'
					? event.Locale || 'All' : event.ListCode);
			default:
				return undefined;
		}
	}

	hasMoreInfo(event: any) {
		return !['Open', 'Sent'].includes(event.EventType);
	}

	openDialog(event: any) {
		this.dialog.open(EventDialogComponent, { data: event });
	}

	formatDate(date?: Date) {
		return formatDateTime(date);
	}
}
