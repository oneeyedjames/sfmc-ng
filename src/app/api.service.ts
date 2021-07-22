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

	getSubscriber(input: string, field = 'email') {
		return this.get('subscriber/complete', this.getParams(input, field));
	}

	getContact(input: string, field = 'email') {
		return this.get('contact/subscriptions', this.getParams(input, field));
	}

	private async get(path: string, params: Params) {
		return await this.http.get<Array<object>>(`${this.baseUrl}/${path}`, {
			params, observe: 'body',
			headers: { Authorization: `JWT ${this.token}` }
		}).toPromise();
	}

	private getParams(value: string, key: string) {
		const params = {} as { [key: string]: string };
		params[key] = value;
		return params;
	}
}
