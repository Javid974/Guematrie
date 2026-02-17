import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TarotService } from 'src/services//tarot.service';
import { environment } from 'src/environments/environment';
import { Tarot } from 'src/models/tarot.model';
import { saveAs } from 'file-saver';
import { switchMap } from 'rxjs';
import { DisplayService } from 'src/services/display.service';

@Component({
  selector: 'app-tarot',
  templateUrl: './admin-tarot.component.html',
  styleUrls: ['./admin-tarot.component.css']
})
export class AdminTarotComponent implements OnInit {
  cards: Tarot[] = [];
  @ViewChild('fileInput') fileInput: ElementRef | undefined;

  constructor(
    private tarotService: TarotService,
    private displayService: DisplayService
  ) { }

  ngOnInit(): void {
    this.loadCards();
  }

  private loadCards(): void {
    this.tarotService.getAll().subscribe({
      next: (data) => {
        this.cards = data.map((card: Tarot) => ({
          ...card,
          imagePath: `${environment.imageBaseUrl}${card.imagePath}`
        }));
      },
      error: (err) => console.error('Failed to load tarot cards:', err)
    });
  }

  onDownloadClick(): void {
    this.tarotService.downloadFile().subscribe({
      next: (blob: any) => saveAs(blob, 'tarot.json'),
      error: (err) => console.error('Erreur lors du telechargement du fichier:', err)
    });
  }

  openFileSelector(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input?.files?.length) return;

    const file: File = input.files[0];

    this.tarotService.importFile(file).pipe(
      switchMap(() => this.tarotService.getAll())
    ).subscribe({
      next: (data) => {
        this.cards = data.map((card: Tarot) => ({
          ...card,
          imagePath: `${environment.imageBaseUrl}${card.imagePath}`
        }));
        this.displayService.showSuccessToast('Import des cartes de tarot reussi');
        input.value = '';
      },
      error: (error) => {
        this.displayService.showErrorToast('Erreur lors de l import des cartes de tarot');
        console.error('Erreur lors de l\'import tarot:', error);
      }
    });
  }
}
