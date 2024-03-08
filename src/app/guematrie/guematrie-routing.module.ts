import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuematrieFormComponent } from './components/guematrie-form/guematrie-form.component';
import { InnerVibrationComponent } from './components/inner-vibration/inner-vibration.component';

const routes: Routes = [
  { path: '', component: GuematrieFormComponent },
  { path: 'inner-vibration', component: InnerVibrationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuematrieRoutingModule {}
