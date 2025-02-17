import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEditVibrationComponent } from './admin-edit-vibration/admin-edit-vibration.component';
import { AdminAddVibrationComponent } from './admin-add-vibration/admin-add-vibration.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminTarotComponent } from './admin-tarot/admin-tarot.component';
import { AdminAddTarotComponent } from './admin-add-tarot/admin-add-tarot.component';
import { AdminEditTarotComponent } from './admin-edit-tarot/admin-edit-tarot.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminEditVibrationComponent,
    AdminAddVibrationComponent,
    AdminTarotComponent, 
    AdminAddTarotComponent,
    AdminEditTarotComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class AdminModule { }
