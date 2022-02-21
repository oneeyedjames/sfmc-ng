import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppMaterialModule } from '../app-material.module';

import { ListModule } from '../list/list.module';
import { EventModule } from '../event/event.module';

import { SubscriberComponent } from './subscriber.component';
export { SubscriberComponent } from './subscriber.component';

import { SubscriberDialogComponent } from './subscriber-dialog.component';
export { SubscriberDialogComponent } from './subscriber-dialog.component';

@NgModule({
	imports: [
		BrowserModule,
		AppMaterialModule,
		ListModule,
		EventModule
	],
	exports: [
		SubscriberComponent,
		SubscriberDialogComponent
	],
	declarations: [
		SubscriberComponent,
		SubscriberDialogComponent
	]
})
export class SubscriberModule {}
