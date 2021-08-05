import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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

		this.allLists = Array.from(listMap.entries()).map(entry =>
			({ Id: entry[0], Name: entry[1] })).sort((l1: any, l2: any) =>
			(l1.Name as string).localeCompare(l2.Name));

		this.lists = Array.from(listMap.keys());

		const types = events.map(event => event.EventType as string);

		this.allTypes = Array.from(new Set<string>(types)).sort();
		this.types = Array.from(new Set<string>(types));
	}

	lists: string[] = [];
	allLists: any[] = [];

	types: string[] = [];
	allTypes: string[] = [];

	cols = ['ListID', 'ListName', 'EventType', 'EventDate', 'EventInfo'];

	get filteredEvents() {
		return this.events.filter(event => {
			return this.isListActive(event.ListID) &&
				this.isTypeActive(event.EventType);
		});
	}

	constructor(public dialog: MatDialog) {}

	hasMoreInfo(event: any) {
		return !['Open', 'Sent'].includes(event.EventType);
	}

	isListActive(listId: string) {
		return this.lists.includes(listId);
	}

	isTypeActive(type: string) {
		return this.types.includes(type);
	}

	toggleList(listId: string) {
		const index = this.lists.indexOf(listId);
		if (index < 0) this.lists.push(listId);
		else this.lists.splice(index, 1);
	}

	toggleType(type: string) {
		const index = this.types.indexOf(type);
		if (index < 0) this.types.push(type);
		else this.types.splice(index, 1);
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
				return event.IsMasterUnsubscribed === 'true'
					? 'from All' : 'from ' + event.ListCode;
			default:
				return undefined;
		}
	}

	openDialog(event: any) {
		this.dialog.open(EventDialogComponent, { data: event });
	}
}
