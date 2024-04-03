import { Component, OnInit } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType} from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model'; // Assurez-vous que le chemin d'importation est correct
import { VibrationService } from 'src/services/vibration.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vibrations: Vibration[] = [
  ];

  constructor(private vibrationService: VibrationService) {}

  ngOnInit(): void {
    this.vibrationService.getAll().subscribe(
      {
        next: (v) => 
        {
          this.vibrations = v;
        },
      error: (v) => 
      {
      }
    });
  }

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
