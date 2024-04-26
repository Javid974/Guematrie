import { Component, Input } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
import { GrowthStage } from 'src/models/growthStage.model';
import { InnerVibrationResult } from 'src/models/innerVibrationResult.model';
import { Vibration } from 'src/models/vibration.model';
import { GuematrieService } from 'src/services/guematrie.service';

@Component({
  selector: 'app-vibration-table',
  templateUrl: './vibration-table.component.html',
  styleUrls: ['./vibration-table.component.css'],
})
export class VibrationTableComponent {

  @Input() firstName: string = '';
  @Input() title: string = '';
  errorMessage : string = '';
  innerVibrationResult: InnerVibrationResult = { syllabes: [], innerVibration: [[]], growthStage:{stageDetail:[[]], stage:[]} };


  constructor(private guematrieService: GuematrieService) {}

  ngOnInit(): void {
 
    if (this.title === 'Vibration Interieure'){
      this.guematrieService.generate(this.firstName).subscribe(
        {
          next: (vibrationResult: InnerVibrationResult) => {
            debugger;
            this.innerVibrationResult = vibrationResult;
          },
          error: (v) => {
            this.errorMessage = v.error;
          }
      });
    }
  }

 getColor(vibrationColor: VibrationColor): string {
    switch (vibrationColor) {
      case VibrationColor.Red:
        return 'red';
      case VibrationColor.Green:
        return 'green';
      case VibrationColor.Yellow:
        return '#dbdb31';
      case VibrationColor.Orange:
        return 'orange';
      default:
        return 'transparent';
    }
  }
}
