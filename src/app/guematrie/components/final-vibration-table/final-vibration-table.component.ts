import { Component, Input } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { FinalVibrationResult } from 'src/models/finalVibrationResult.model';
import { vibrationTarot } from 'src/models/vibrationTarot.model';
import { Vibration } from 'src/models/vibration.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-final-vibration-table',
  templateUrl: './final-vibration-table.component.html',
  styleUrls: ['./final-vibration-table.component.css'],
})
export class FinalVibrationTableComponent {
  @Input() birthDate: string | null = null;
  @Input() errorMessage: string = '';
  @Input() finalVibrationResult: FinalVibrationResult = {
    lectureA: [],
    lectureB: [],
    lectureAGroups: [],
    shouldBeReturn: 0,
    evolvingKarma: 0,
    shouldBeReturnTarot: {
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
    evolvingKarmaTarot: {
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
    shouldBeReturnDetail: [],
    evolvingKarmaDetail: [],
  };

  readonly upcomingReadings: string[] = ['Lecture C'];

  getLectureBExpression(): string {
    if (!this.birthDate) return '';
    const [year, month, day] = this.birthDate.split('-');
    const parts = [day, month, year.slice(0, 2), year.slice(2)];
    const sum = parts.reduce((total, part) => total + Number(part), 0);
    return parts.join('+') + '=' + sum;
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

  getFormattedDateVibrationNumber(vibration: Vibration, decomposed: boolean = false): string {
    const formatted = this.getFormattedVibrationNumber(vibration);
    return decomposed ? formatted : formatted.replace(/^\d+/, digits => digits.padStart(2, '0'));
  }

  getSummationTarotExpression(
    summation: number,
    vibrationTarot: vibrationTarot | null | undefined
  ): string {
    if (summation === null || summation === undefined) {
      return '';
    }

    const digits = `${summation}`.split('');
    return `${digits.join('+')}=${vibrationTarot?.summationTarot ?? ''}`;
  }

  getTarotImageUrl(vibrationTarot: vibrationTarot | null | undefined): string {
    const imagePath = vibrationTarot?.tarotCard?.imagePath;

    if (!imagePath) {
      return '';
    }

    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }

    return `${environment.imageBaseUrl}${imagePath}`;
  }
}
