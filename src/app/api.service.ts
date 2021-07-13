import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Params = {
	[param: string]: string | number | boolean
}

@Injectable({ providedIn: 'root' })
export class ApiService {
	private baseUrl = 'http://localhost:3000/api';

	constructor(private http: HttpClient) {}

	getSubscriber(input: string, field = 'email') {
		return this.get('subscriber/complete', this.getParams(input, field));
	}

	getContact(input: string, field = 'email') {
		return this.get('contact/subscriptions', this.getParams(input, field));
	}

	private async get(path: string, params: Params) {
		return await this.http.get<Array<object>>(`${this.baseUrl}/${path}`,
			{ params, observe: 'body' }).toPromise();
	}

	private getParams(value: string, key: string) {
		const params = {} as { [key: string]: string };
		params[key] = value;
		return params;
	}
}
