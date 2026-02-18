import { Component, Input } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { environment } from 'src/environments/environment';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
import { GrowthStage } from 'src/models/growthStage.model';
import { InnerVibrationResult } from 'src/models/innerVibrationResult.model';
import { Tarot } from 'src/models/tarot.model';
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
  innerVibrationResult: InnerVibrationResult = {
    syllabes: [],
    innerVibration: [[]],
    growthStage: { stageDetail: [[]], stage: [] },
    vibrationSummation: { summationDetail: [], summation: 0 },
    vibrationTarot: {
      summationTarot: 0,
      tarotCard: {
        id: '',
        name: '',
        number: 0,
        description: null,
        imagePath: '',
        vibrationId: null
      }
    }
  };


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

  getFormattedVibrationNumber(vibration: any): string {
    let formattedNumber = `${vibration.vibrationNumber}`;
    if (vibration.karmic) {
      formattedNumber += '*';
    }
    if (vibration.consiousness) {
      formattedNumber += '**';
    }
    return formattedNumber;
  }


  getSummationTarotExpression(): string {
    const summation = this.innerVibrationResult?.vibrationSummation?.summation;
    const summationTarot = this.innerVibrationResult?.vibrationTarot?.summationTarot;

    if (summation === null || summation === undefined) {
      return '';
    }

    const digits = `${summation}`.split('');
    return `${digits.join('+')}=${summationTarot ?? ''}`;
  }

  getTarotImageUrl(): string {
    const imagePath = this.innerVibrationResult?.vibrationTarot?.tarotCard?.imagePath;

    if (!imagePath) {
      return '';
    }

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    return `${environment.imageBaseUrl}${imagePath}`;
  }
}
