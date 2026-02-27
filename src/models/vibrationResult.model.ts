import { GrowthStage } from "./growthStage.model";
import { Vibration } from "./vibration.model";
import { VibrationSummation } from "./vibrationSummation.model";
import { vibrationTarot } from "./vibrationTarot.model";

export interface VibrationAdvice {
  advice: number;
  adviceDetail: Vibration[];
}

export interface VibrationResult {
  syllabes: string[];
  vibration: Vibration[][];
  growthStage: GrowthStage;
  vibrationSummation: VibrationSummation;
  vibrationTarot: vibrationTarot;
  vibrationAdvices: VibrationAdvice[];
}
