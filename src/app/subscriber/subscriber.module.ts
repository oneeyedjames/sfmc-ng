import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppMaterialModule } from '../app-material.module';

import { ListModule } from '../list/list.module';
import { EventModule } from '../event/event.module';

import { SubscriberComponent } from './subscriber.component';
export { SubscriberComponent } from './subscriber.component';

@NgModule({
	imports: [
		BrowserModule,
		AppMaterialModule,
		ListModule,
		EventModule
	],
	exports: [
		SubscriberComponent
	],
	declarations: [
		SubscriberComponent
	]
})
export class SubscriberModule {}
