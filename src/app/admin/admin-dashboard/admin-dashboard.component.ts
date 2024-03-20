import { Component, OnInit } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType} from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vibrations: Vibration[] = [
    { id:'', letter: 'A', vibrationNumber: 12, vibrationType: VibrationType.MajorVibration, vibrationColor: VibrationColor.Green, description: 'Initial vibration', karmic:false, consciousness:false },
    { id:'',letter: 'B', vibrationNumber: 13, vibrationType: VibrationType.MinorVibration, vibrationColor: VibrationColor.Green, description: 'Secondary vibration', karmic:false, consciousness:false },
    // Ajoutez d'autres vibrations ici selon le besoin
  ];

  constructor() {}

  ngOnInit(): void {}

  getVibrationTypeDescription(vibrationType: VibrationType): string {
    switch (vibrationType) {
      case VibrationType.MajorVibration:
        return 'Vibration Majeure';
      case VibrationType.MinorVibration:
        return 'Vibration Mineure';
      default:
        return 'Type Inconnu';
    }
  }
}
