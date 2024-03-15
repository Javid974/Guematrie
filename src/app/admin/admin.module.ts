import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEditVibrationComponent } from './admin-edit-vibration/admin-edit-vibration.component';
import { AdminAddVibrationComponent } from './admin-add-vibration/admin-add-vibration.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminEditVibrationComponent,
    AdminAddVibrationComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
