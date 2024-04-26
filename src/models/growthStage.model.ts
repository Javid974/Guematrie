import { Vibration } from "./vibration.model";

export interface GrowthStage {
    stage : number[],
    stageDetail : Vibration[][]
}