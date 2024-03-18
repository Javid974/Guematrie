import { VibrationColorEnum } from "src/app/emum/vibration-color.enum";
import { VibrationTypeEnum } from "src/app/emum/vibration-type.enum";

export interface Vibration {
  letter: string;
  vibration: number; 
  description: string;
  vibrationType: VibrationTypeEnum, 
  vibrationColor:VibrationColorEnum,
  karmic: boolean;
  consciousness: boolean;
}

