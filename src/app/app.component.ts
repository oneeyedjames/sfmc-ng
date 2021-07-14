import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { ClickType } from './navbar/navbar.module';
import { SearchService } from './search/search.module';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	title = 'SFMC Viewer';

	subs: any[] = [];

	sub?: Subscription;

	constructor(
		private svc: SearchService,
		// private snackBar: MatSnackBar
	) {}

	ngOnInit() {
		this.sub = this.svc.subscribers.subscribe(subs => {
			subs.forEach((sub: any) => {
				sub.Events.sort((e1: any, e2: any) => {
					return Date.parse(e2.EventDate) - Date.parse(e1.EventDate);
				})
			});

			this.subs = subs;

			// if (subs.length > 0) {
			// 	this.snackBar.open(subs.length + ' Result(s) Found!', 'Clear')
			// 	.onAction().subscribe(() => this.subs = []);
			// }
		}, console.error);
	}

	ngOnDestroy() {
		if (this.sub !== undefined) {
			this.sub.unsubscribe();
			this.sub = undefined;
		}
	}

	onClick(type: ClickType) {
		switch (type) {
			case 'menu':
			case 'more':
				console.log(type);
				break;
		}
	}
}
