import { Component, Input } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationResult } from 'src/models/vibrationResult.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vibration-table',
  templateUrl: './vibration-table.component.html',
  styleUrls: ['./vibration-table.component.css'],
})
export class VibrationTableComponent {
  @Input() title: string = 'Vibration';
  @Input() errorMessage: string = '';
  @Input() vibrationResult: VibrationResult = {
    syllabes: [],
    vibration: [[]],
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
        vibrationId: null,
      },
    },
    vibrationAdvices: [],
  };

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
    const summation = this.vibrationResult?.vibrationSummation?.summation;
    const summationTarot = this.vibrationResult?.vibrationTarot?.summationTarot;

    if (summation === null || summation === undefined) {
      return '';
    }

    const digits = `${summation}`.split('');
    return `${digits.join('+')}=${summationTarot ?? ''}`;
  }

  getTarotImageUrl(): string {
    const imagePath = this.vibrationResult?.vibrationTarot?.tarotCard?.imagePath;

    if (!imagePath) {
      return '';
    }

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    return `${environment.imageBaseUrl}${imagePath}`;
  }
}
