import { Component, Input } from '@angular/core';

@Component({
	selector: 'subscriber',
	templateUrl: './subscriber.component.html'
})
export class SubscriberComponent {
	@Input()
	subscriber: any;
}
