import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminEditVibrationComponent } from './admin-edit-vibration/admin-edit-vibration.component';
import { AdminAddVibrationComponent } from './admin-add-vibration/admin-add-vibration.component';
import { AdminTarotComponent } from './admin-tarot/admin-tarot.component';
import { AdminAddTarotComponent } from './admin-add-tarot/admin-add-tarot.component';
import { AdminEditTarotComponent } from './admin-edit-tarot/admin-edit-tarot.component';


const routes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'edit/:id', component: AdminEditVibrationComponent },
  { path: 'add', component: AdminAddVibrationComponent },
  { path: 'tarot', component: AdminTarotComponent },
  { path: 'tarot/add', component: AdminAddTarotComponent },
  { path: 'tarot/edit/:id', component: AdminEditTarotComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
