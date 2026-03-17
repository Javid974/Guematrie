import { Vibration } from "./vibration.model";
import { vibrationTarot } from "./vibrationTarot.model";

export interface FinalVibrationResult {
  shouldBeReturn: number;
  evolvingKarma: number;
  shouldBeReturnTarot: vibrationTarot;
  evolvingKarmaTarot: vibrationTarot;
  shouldBeReturnDetail: Vibration[];
  evolvingKarmaDetail: Vibration[];
}
