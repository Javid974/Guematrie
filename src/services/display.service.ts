import { Injectable } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { Color } from 'src/models/color.model';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
    
  public colors: Array<Color> = [];

  constructor() {
    this.colors = [
      { text: this.getVibrationColorDescription(VibrationColor.Green), value: VibrationColor.Green },
      { text: this.getVibrationColorDescription(VibrationColor.GreenYellow), value: VibrationColor.GreenYellow },
      { text: this.getVibrationColorDescription(VibrationColor.Yellow), value: VibrationColor.Yellow },
      { text: this.getVibrationColorDescription(VibrationColor.Red), value: VibrationColor.Red },
    ];

  }

  public getColors(): Array<Color> {
    return this.colors;
  }

  getVibrationColorDescription(vibrationType:   VibrationColor): string {
    switch (vibrationType) {
      case VibrationColor.GreenYellow:
        return 'Vert/Jaune';
      case VibrationColor.Green:
        return 'Vert';
      case VibrationColor.Red:
        return 'Rouge';
      case VibrationColor.Yellow:
        return 'Jaune';
      default:
        return 'Couleur Inconnu';
    }
  }
  
}