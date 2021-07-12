import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppMaterialModule } from '../app-material.module';

import { LookupComponent } from './lookup.component';
export { LookupComponent } from './lookup.component';

export { LookupService } from './lookup.service';

@NgModule({
	imports: [
		AppMaterialModule,
		BrowserModule,
		FormsModule
	],
	exports: [
		LookupComponent
	],
	declarations: [
		LookupComponent
	]
})
export class LookupModule {}
