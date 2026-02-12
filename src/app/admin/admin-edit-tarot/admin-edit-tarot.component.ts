import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tarot } from 'src/models/tarot.model';
import { Vibration } from 'src/models/vibration.model';
import { environment } from 'src/environments/environment';
import { DisplayService } from 'src/services/display.service';
import { TarotService } from 'src/services/tarot.service';
import { VibrationService } from 'src/services/vibration.service';

@Component({
  selector: 'app-admin-edit-tarot',
  templateUrl: './admin-edit-tarot.component.html',
  styleUrls: ['./admin-edit-tarot.component.css']
})
export class AdminEditTarotComponent implements OnInit {

  card: Tarot = { id: '0', name: '', number: 0, imagePath: '', description: '', vibrationId: '' };
  tarotForm: FormGroup;
  errorMessage: string | null = null;
  selectedFileName: string | null = null;
  previewImagePath = '';
  selectedImageFile: File | null = null;

  public vibrations: Vibration[] = [];
  public showModal = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tarotService: TarotService,
    private vibrationService: VibrationService,
    private displayService: DisplayService,
    private router: Router
  ) {
    this.tarotForm = this.fb.group({
      id: [''],
      number: [''],
      name: [''],
      description: [''],
      vibrationId: [''],
      imagePath: ['']
    });
  }

  ngOnInit(): void {
    const cardId = this.route.snapshot.paramMap.get('id');

    if (cardId) {
      this.tarotService.getCardById(cardId).subscribe((data) => {
        this.card = data;
        this.tarotForm.patchValue({
          id: data.id,
          number: data.number,
          name: data.name,
          description: data.description,
          vibrationId: data.vibrationId,
          imagePath: data.imagePath
        });
        this.previewImagePath = this.buildImageUrl(data.imagePath);
      });
    }

    this.loadVibrations();
  }

  private buildImageUrl(path?: string | null): string {
    if (!path) {
      return '';
    }

    if (/^https?:\/\//i.test(path)) {
      return path;
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${environment.imageBaseUrl}${normalizedPath}`;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedImageFile = file;
    this.selectedFileName = file.name;
    this.tarotForm.patchValue({ imagePath: file.name });
    this.previewImagePath = URL.createObjectURL(file);
  }

  loadVibrations(): void {
    this.vibrationService.getAll().subscribe(data => {
      this.vibrations = data;
    });
  }

  private buildUpdateFormData(): FormData {
    const formValue = this.tarotForm.value;
    const formData = new FormData();
    formData.append('id', this.card.id);
    formData.append('number', String(formValue.number ?? this.card.number));
    formData.append('name', formValue.name ?? this.card.name ?? '');
    formData.append('description', formValue.description ?? this.card.description ?? '');
    formData.append('imagePath', formValue.imagePath ?? this.card.imagePath ?? '');

    if (formValue.vibrationId) {
      formData.append('vibrationId', formValue.vibrationId);
    }

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    return formData;
  }

  onSubmit(): void {
    this.errorMessage = null;
    const payload = this.buildUpdateFormData();

    this.tarotService.updateCard(this.card.id, payload).subscribe(
      {
        next: () => {
          this.displayService.showSuccessToast('Carte de tarot mise a jour avec succes');
          this.router.navigate(['/admin/tarot']);
        },
        error: (error) => {
          this.errorMessage = error?.error ?? 'Erreur lors de la mise a jour de la carte de tarot.';
          this.displayService.showErrorToast('Erreur lors de la mise a jour de la carte de tarot.');
        }
      });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteItem() {

    this.tarotService.delete(this.card.id).subscribe(
      {
        next: () => {
          const message = 'carte suprrime avec succes';
          this.displayService.showSuccessToast(message);
          this.router.navigate(['/admin']);
        },
        error: (v) => {
          console.error('Erreur lors de la supression de la carte');
          this.errorMessage = v.error;
          this.displayService.showErrorToast('Erreur lors de la supression de la carte');
        }
      });

    this.closeModal();
  }
}
