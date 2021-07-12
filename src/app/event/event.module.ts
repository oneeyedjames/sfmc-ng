import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppMaterialModule } from '../app-material.module';

import { EventTableComponent } from './event-table.component';
export { EventTableComponent } from './event-table.component';

import { EventDialogComponent } from './event-dialog.component';
export { EventDialogComponent } from './event-dialog.component';

@NgModule({
	imports: [
		AppMaterialModule,
		BrowserModule
	],
	exports: [
		EventTableComponent,
		EventDialogComponent
	],
	declarations: [
		EventTableComponent,
		EventDialogComponent
	]
})
export class EventModule {}
