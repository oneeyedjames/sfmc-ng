import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';

import { NavbarModule } from './navbar/navbar.module';
import { SearchModule } from './search/search.module';
import { ListModule } from './list/list.module';
import { EventModule } from './event/event.module';

@NgModule({
	imports: [
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		AppMaterialModule,
		NavbarModule,
		SearchModule,
		ListModule,
		EventModule
	],
	// providers: [],
	declarations: [
		AppComponent
	],
	bootstrap: [
		AppComponent
	]
})
export class AppModule {}
