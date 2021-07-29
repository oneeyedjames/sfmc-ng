import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

type Params = {
	[param: string]: string | number | boolean
}

@Injectable({ providedIn: 'root' })
export class ApiService {
	private baseUrl = 'http://localhost:3000/api';
	private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjQ1Njc4OTAiLCJpc3MiOiJTZXJ2TUMiLCJhdWQiOiJTRk1DIFZpZXdlciIsImlhdCI6MTYyNjM3NDI2MX0.Fmcn3p-lOHgrXsWu5WFEjO3hM3dG5OvfJmzMQPw-XFY';

	constructor(private http: HttpClient) {}

	getSubscribers(input: string, field = 'email') {
		return this.get('subscribers', this.getParams(input, field));
	}

	getSubscriberLists(key: string) {
		return this.get(`subscriber/${key}/lists`);
	}

	getSubscriberEvents(key: string) {
		return this.get(`subscriber/${key}/events`);
	}

	updateSubscriber(key: string, status: string) {

	}

	updateSubscriberList(key: string, listId: string, status: string) {
		return this.post(`subscriber/${key}/lists`, {
			Lists: [{ ID: listId, Status: status }]
		});
	}

	getContacts(input: string, field = 'email') {
		return this.get('contacts', this.getParams(input, field));
	}

	private get(path: string, params: Params = {}) {
		return this.http.get<Array<object>>(`${this.baseUrl}/${path}`, {
			headers: {
				Authorization: `JWT ${this.token}`
			},
			observe: 'body',
			params
		}).toPromise();
	}

	private post(path: string, body: any) {
		return this.http.post<object>(`${this.baseUrl}/${path}`, JSON.stringify(body), {
			headers: {
				Authorization: `JWT ${this.token}`,
				'Content-Type': 'application/json'
			},
			observe: 'body'
		}).toPromise();
	}

	private getParams(value: string, key: string) {
		const params = {} as { [key: string]: string };
		params[key] = value;
		return params;
	}
}
