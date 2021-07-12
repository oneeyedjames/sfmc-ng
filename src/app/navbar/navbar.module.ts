import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app-material.module';
import { LookupModule } from '../lookup/lookup.module';

import { NavbarComponent } from './navbar.component';
export { NavbarComponent, ClickType } from './navbar.component';

@NgModule({
	imports: [
		AppMaterialModule,
		LookupModule
	],
	exports: [
		NavbarComponent
	],
	declarations: [
		NavbarComponent
	]
})
export class NavbarModule {}
