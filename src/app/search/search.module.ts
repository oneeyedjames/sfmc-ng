import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../app-material.module';
import { SubscriberModule } from '../subscriber/subscriber.module';

import { SearchFormComponent } from './search-form.component';
export { SearchFormComponent } from './search-form.component';

import { SearchResultsComponent } from './search-results.component';
export { SearchResultsComponent } from './search-results.component';

export { SearchService } from './search.service';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		AppMaterialModule,
		SubscriberModule
	],
	exports: [
		SearchFormComponent,
		SearchResultsComponent
	],
	declarations: [
		SearchFormComponent,
		SearchResultsComponent
	]
})
export class SearchModule {}
