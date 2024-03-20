import { VibrationColor } from "src/app/emum/vibration-color.enum";
import { VibrationType } from "src/app/emum/vibration-type.enum";

export interface Vibration {
  id: string;
  letter: string;
  vibrationNumber: number; 
  description: string;
  vibrationType: VibrationType, 
  vibrationColor:VibrationColor,
  karmic: boolean;
  consciousness: boolean;
}

