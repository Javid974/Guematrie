import { Component, Input } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { FinalVibrationResult } from 'src/models/finalVibrationResult.model';
import { Vibration } from 'src/models/vibration.model';

@Component({
  selector: 'app-final-vibration-table',
  templateUrl: './final-vibration-table.component.html',
  styleUrls: ['./final-vibration-table.component.css'],
})
export class FinalVibrationTableComponent {
  @Input() errorMessage: string = '';
  @Input() finalVibrationResult: FinalVibrationResult = {
    shouldBeReturn: 0,
    evolvingKarma: 0,
    shouldBeReturnDetail: [],
    evolvingKarmaDetail: [],
  };

  readonly interpretationSections: string[] = [
    'Lecture A',
    'Lecture B',
    'Lecture C',
  ];

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

  getFormattedVibrationNumber(vibration: Vibration): string {
    let formattedNumber = `${vibration.vibrationNumber}`;
    if (vibration.karmic) {
      formattedNumber += '*';
    }
    if (vibration.consciousness) {
      formattedNumber += '**';
    }
    return formattedNumber;
  }
}
