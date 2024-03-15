import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEditVibrationComponent } from './admin-edit-vibration/admin-edit-vibration.component';
import { AdminAddVibrationComponent } from './admin-add-vibration/admin-add-vibration.component';


const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'edit', component: AdminEditVibrationComponent },
  { path: 'add', component: AdminAddVibrationComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
