import { Injectable } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
    
  constructor() {}

  getVibrationColorDescription(vibrationType:   VibrationColor): string {
    switch (vibrationType) {
      case VibrationColor.GreenYellow:
        return 'Vert/Jaune';
      case VibrationColor.Green:
        return 'Vert';
      case VibrationColor.Red:
        return 'Rouge';
      default:
        return 'Couleur Inconnu';
    }
  }
  
}