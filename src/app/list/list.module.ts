import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppMaterialModule } from '../app-material.module';

import { ListTableComponent } from './list-table.component';
export { ListTableComponent } from './list-table.component';

import { ListDialogComponent } from './list-dialog.component';
export { ListDialogComponent } from './list-dialog.component';

@NgModule({
	imports: [
		AppMaterialModule,
		BrowserModule
	],
	exports: [
		ListTableComponent,
		ListDialogComponent
	],
	declarations: [
		ListTableComponent,
		ListDialogComponent
	]
})
export class ListModule {}
