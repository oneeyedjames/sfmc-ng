import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../app-material.module';

import { SearchComponent } from './search.component';
export { SearchComponent } from './search.component';

export { SearchService } from './search.service';


@NgModule({
	imports: [
		AppMaterialModule,
		BrowserModule,
		FormsModule
	],
	exports: [
		SearchComponent
	],
	declarations: [
		SearchComponent
	]
})
export class SearchModule {}
