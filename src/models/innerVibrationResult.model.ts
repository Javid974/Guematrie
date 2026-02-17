import { GrowthStage } from "./growthStage.model";
import { Vibration } from "./vibration.model";
import { VibrationSummation } from "./vibrationSummation.model";
import { vibrationTarot } from "./vibrationTarot.model";

export interface InnerVibrationResult {
    syllabes : string[],
    innerVibration: Vibration[][];
    growthStage:GrowthStage;
    vibrationSummation: VibrationSummation
    vibrationTarot: vibrationTarot
}
  