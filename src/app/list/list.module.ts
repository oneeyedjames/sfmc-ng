import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppMaterialModule } from '../app-material.module';

import { ListTableComponent } from './list-table.component';
export { ListTableComponent } from './list-table.component';

@NgModule({
	imports: [
		AppMaterialModule,
		BrowserModule
	],
	exports: [
		ListTableComponent
	],
	declarations: [
		ListTableComponent
	]
})
export class ListModule {}
