import { Component } from '@angular/core';

import { ClickType } from './navbar/navbar.module';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'SFMC Viewer';

	subscribers: any[] = [];

	searching = false;

	constructor() {}

	onClick(type: ClickType) {
		switch (type) {
			case 'menu':
			case 'more':
				console.log(type);
				break;
		}
	}

	onSearch() {
		console.log('SEARCHING');
		this.searching = true;
		this.subscribers = [];
	}

	onResults(results: any[]) {
		console.log('RESULT', results);
		this.searching = false;
		this.subscribers = results;
	}
}
