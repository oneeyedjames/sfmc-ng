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

	constructor() {}

	onClick(type: ClickType) {
		switch (type) {
			case 'menu':
			case 'more':
				console.log(type);
				break;
		}
	}
}
