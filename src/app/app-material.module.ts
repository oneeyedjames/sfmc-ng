import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
	exports: [
		LayoutModule,
		MatToolbarModule,
		MatTooltipModule,
		MatSidenavModule,
		MatDividerModule,
		MatButtonModule,
		MatDialogModule,
		MatTableModule,
		MatCardModule,
		MatIconModule,
		MatListModule,
		MatMenuModule,
		MatTabsModule,
		MatInputModule,
		MatRadioModule,
		MatSelectModule,
		MatCheckboxModule,
		MatFormFieldModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatExpansionModule,
		MatSnackBarModule
	]
})
export class AppMaterialModule {}
