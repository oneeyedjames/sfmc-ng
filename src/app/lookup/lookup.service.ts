import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LookupService {
	private contactSubj = new Subject<object[]>();
	private subscriberSubj = new Subject<object[]>();

	get contacts(): Observable<object[]> {
		return this.contactSubj;
	}

	// set contacts(cons: Observable<object[]>) {
	// 	cons.subscribe(this.contactSubj);
	// }

	get subscribers(): Observable<object[]> {
		return this.subscriberSubj;
	}

	// set subscribers(subs: Observable<object[]>) {
	// 	subs.subscribe(this.subscriberSubj);
	// }
}
