import { GrowthStage } from "./growthStage.model";
import { Vibration } from "./vibration.model";

export interface InnerVibrationResult {
    syllabes : string[],
    innerVibration: Vibration[][];
    growthStage:GrowthStage;
}
  