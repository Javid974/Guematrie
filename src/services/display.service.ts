import { Injectable } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
import { Color } from 'src/models/color.model';
import { Type } from 'src/models/type.model';

@Injectable({
  providedIn: 'root',
})
export class DisplayService {
    
  public colors: Array<Color> = [];
  public types: Array<Type> = [];

  constructor() {
    this.colors = [
      { text: this.getVibrationColorDescription(VibrationColor.Green), value: VibrationColor.Green },
      { text: this.getVibrationColorDescription(VibrationColor.GreenYellow), value: VibrationColor.GreenYellow },
      { text: this.getVibrationColorDescription(VibrationColor.Yellow), value: VibrationColor.Yellow },
      { text: this.getVibrationColorDescription(VibrationColor.Red), value: VibrationColor.Red },
    ];

    this.types = [ 
      {text: this.getVibrationTypeDescription(VibrationType.MajorVibration), value: VibrationType.MajorVibration},
      {text: this.getVibrationTypeDescription(VibrationType.MinorVibration), value: VibrationType.MinorVibration}
    ]
  }

  public getColors(): Array<Color> {
    return this.colors;
  }

  public getTypes(): Array<Type> {
    return this.types;
  }

  getVibrationTypeDescription(vibrationType : VibrationType) : string {
    switch (vibrationType) {
      case VibrationType.MajorVibration:
        return 'Vibration Majeure';
      default:
        return 'Vibration Mineure';
    }
  }

  getVibrationColorDescription(vibrationColor:   VibrationColor): string {
    switch (vibrationColor) {
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