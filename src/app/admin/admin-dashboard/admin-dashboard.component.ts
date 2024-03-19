import { Component, OnInit } from '@angular/core';
import { VibrationColorEnum } from 'src/app/emum/vibration-color.enum';
import { VibrationTypeEnum } from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vibrations: Vibration[] = [
    { uuid:'', letter: 'A', vibrationNumber: 12, vibrationType: VibrationTypeEnum.MajorVibration, vibrationColor: VibrationColorEnum.Green, description: 'Initial vibration', karmic:false, consciousness:false },
    { uuid:'',letter: 'B', vibrationNumber: 13, vibrationType: VibrationTypeEnum.MinorVibration, vibrationColor: VibrationColorEnum.Green, description: 'Secondary vibration', karmic:false, consciousness:false },
    // Ajoutez d'autres vibrations ici selon le besoin
  ];

  constructor() {}

  ngOnInit(): void {}

  getVibrationTypeDescription(vibrationType: VibrationTypeEnum): string {
    switch (vibrationType) {
      case VibrationTypeEnum.MajorVibration:
        return 'Vibration Majeure';
      case VibrationTypeEnum.MinorVibration:
        return 'Vibration Mineure';
      default:
        return 'Type Inconnu';
    }
  }
}
