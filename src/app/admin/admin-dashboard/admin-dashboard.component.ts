import { Component, OnInit } from '@angular/core';
import { VibrationTypeEnum } from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vibrations: Vibration[] = [
    { letter: 'A', vibration: '100Hz', vibrationType: VibrationTypeEnum.MajorVibration, description: 'Initial vibration' },
    { letter: 'B', vibration: '200Hz', vibrationType: VibrationTypeEnum.MinorVibration, description: 'Secondary vibration' },
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
