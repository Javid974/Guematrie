import { VibrationTypeEnum } from "src/app/emum/vibration-type.enum";

export interface Vibration {
  letter: string;
  vibration: string; 
  description: string;
  vibrationType: VibrationTypeEnum
}

