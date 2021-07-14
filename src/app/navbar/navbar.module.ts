import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app-material.module';
// import { SearchModule } from '../search/search.module';

import { NavbarComponent } from './navbar.component';
export { NavbarComponent, ClickType } from './navbar.component';

@NgModule({
	imports: [
		AppMaterialModule,
		// SearchModule
	],
	exports: [
		NavbarComponent
	],
	declarations: [
		NavbarComponent
	]
})
export class NavbarModule {}
