import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Params = {
	[param: string]: string | number | boolean
}

@Injectable({ providedIn: 'root' })
export class ApiService {
	private baseUrl = 'http://localhost:3000/api';

	constructor(private http: HttpClient) {}

	getSubscriber(email: string) {
		return this.get('subscriber/complete', { email });
	}

	getSubscriberLists(email: string) {
		return this.get('subscriber/lists', { email });
	}

	getSubscriberEvents(email: string) {
		return this.get('subscriber/events', { email });
	}

	getContact(email: string) {
		return this.get('contact/subscriptions', { email });
	}

	private async get(path: string, params: Params) {
		return await this.http.get<Array<object>>(`${this.baseUrl}/${path}`,
			{ params, observe: 'body' }).toPromise();
	}
}
