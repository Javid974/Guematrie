import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GuematrieRoutingModule } from './guematrie-routing.module';
import { GuematrieFormComponent } from './components/guematrie-form/guematrie-form.component';
import { InnerVibrationComponent } from './components/inner-vibration/inner-vibration.component';
import { FormsModule } from '@angular/forms';
import { VibrationTableComponent } from './components/vibration-table/vibration-table.component';

@NgModule({
  declarations: [GuematrieFormComponent, InnerVibrationComponent, VibrationTableComponent],
  imports: [CommonModule, GuematrieRoutingModule, FormsModule],
})
export class GuematrieModule {}
