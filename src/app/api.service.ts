import { Injectable } from '@angular/core';

import {
	HttpClient,
	HttpHeaders,
	HttpContext,
	HttpParams
} from '@angular/common/http';

import { env } from '../../env';

type Params = {
	[param: string]: string | number | boolean
}

type Scalar = string | number | boolean;

type HttpOptions = {
	headers?: HttpHeaders | { [header: string]: string | string[]; };
	context?: HttpContext;
	observe?: 'body';
	params?: HttpParams | { [param: string]: Scalar | readonly Scalar[]; };
	reportProgress?: boolean;
	responseType?: 'json';
	withCredentials?: boolean;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
	private baseUrl = 'http://localhost:3000/api';

	private token = env.API_KEY || '';

	private headers = { Authorization: `JWT ${this.token}` };

	constructor(private http: HttpClient) {}

	getSubscribers(input: string) {
		return this.get('subscribers', { search: input });
	}

	getSubscriberLists(key: string) {
		return this.get(`subscriber/${key}/lists`);
	}

	getSubscriberEvents(key: string, locale?: string) {
		return locale === undefined ? this.get(`subscriber/${key}/events`)
			: this.get(`${locale.toLowerCase()}/subscriber/${key}/events`);
	}

	updateSubscriber(key: string, status: string) {
		return this.put(`subscriber/${key}`, { Status: status });
	}

	updateSubscriberList(key: string, listId: string, status: string) {
		return this.put(`subscriber/${key}/lists`, {
			Lists: [{ ID: listId, Status: status }]
		});
	}

	getContacts(input: string) {
		return this.get('contacts', { search: input });
	}

	getContact(id: string) {
		return this.get(`contact/${id}`);
	}

	getContactSubscriptions(id: string) {
		return this.get(`contact/${id}/subscriptions`);
	}

	private get(path: string, params: Params = {}) {
		return this.http.get<Array<object>>(`${this.baseUrl}/${path}`,
			{ headers: this.headers, params }).toPromise();
	}

	private put(path: string, body: any) {
		return this.http.put<object>(`${this.baseUrl}/${path}`, JSON.stringify(body), {
			headers: { ...this.headers, 'Content-Type': 'application/json' }
		}).toPromise();
	}

	private buildOptions(opts: HttpOptions): HttpOptions {
		return {
			...opts,
			headers: {
				...this.headers,
				...(opts.headers || {})
			}
		};
	}
}
