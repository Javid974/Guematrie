import { Vibration } from "./vibration.model";

export interface FinalVibrationResult {
  shouldBeReturn: number;
  evolvingKarma: number;
  shouldBeReturnDetail: Vibration[];
  evolvingKarmaDetail: Vibration[];
}
