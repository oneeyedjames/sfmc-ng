import { Component, Input, Output, EventEmitter } from '@angular/core';

export type ClickType = 'menu' | 'more';

@Component({
	selector: 'navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
	@Input()
	title: string = 'Navbar';

	@Output('click')
	click = new EventEmitter<ClickType>();
}
