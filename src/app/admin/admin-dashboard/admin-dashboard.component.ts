import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType} from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model';
import { VibrationService } from 'src/services/vibration.service';
import { saveAs } from 'file-saver'; // npm install --save file-saver @types/file-saver
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vibrations: Vibration[] = [
  ];

  constructor(private vibrationService: VibrationService,
              private router: Router) {}

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

  onRowClick(vibration: Vibration) {
    this.router.navigate(['/admin/edit', vibration.id]);
  }

  onDownloadClick() {
    // Votre logique de téléchargement ici
     this.vibrationService.downloadFile().subscribe({
      next: (blob: any) => {
        saveAs(blob, 'vibrations.json');
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du fichier:', err);
      },
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

  getVibrationColorDescription(vibrationType:   VibrationColor): string {
    switch (vibrationType) {
      case VibrationColor.Orange:
        return 'Orange';
      case VibrationColor.Green:
        return 'Vert';
      case VibrationColor.Red:
        return 'Rouge';
      default:
        return 'Couleur Inconnu';
    }
  }

}
