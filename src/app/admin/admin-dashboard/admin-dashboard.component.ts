import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType} from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model';
import { VibrationService } from 'src/services/vibration.service';
import { saveAs } from 'file-saver'; // npm install --save file-saver @types/file-saver
import * as toastr from 'toastr';
import { catchError, switchMap, throwError } from 'rxjs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})


export class AdminDashboardComponent implements OnInit {
  
  vibrations: Vibration[] = [];
  @ViewChild('fileInput') fileInput: ElementRef | undefined;


  constructor(private vibrationService: VibrationService,
              private router: Router) {}

  ngOnInit(): void {
    this.vibrationService.getAll().subscribe(
      {
        next: (v) => 
        {
          this.vibrations = v;
        }
    });
  }

  onRowClick(vibration: Vibration) {
    this.router.navigate(['/admin/edit', vibration.id]);
  }

  onDownloadClick() {
     this.vibrationService.downloadFile().subscribe({
      next: (blob: any) => {
        saveAs(blob, 'vibrations.json');
      },
      error: (err) => {
        console.error('Erreur lors du téléchargement du fichier:', err);
      },
    });
  }

  openFileSelector() {

    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input?.files?.length) return;
  
    const file: File = input.files[0];
    
    this.vibrationService.importFile(file).pipe(
      switchMap(response => {
        console.log('Réponse du serveur:', response);
        toastr.success('Vibrations correctement sauvegardé!', '', {
          positionClass: 'toast-top-center',
          timeOut: 2000,
        });
        return this.vibrationService.getAll();
      }),
      catchError(error => {
        console.error('Erreur lors de l\'importation ou de la récupération des données', error);
        return throwError(() => new Error('Erreur lors de l\'opération'));
      })
    ).subscribe({
      next: (vibrations) => this.vibrations = vibrations,
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
