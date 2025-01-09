import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vibration } from 'src/models/vibration.model';
import { DisplayService } from 'src/services/display.service';
import { TarotService } from 'src/services/tarot.service';
import { VibrationService } from 'src/services/vibration.service';

@Component({
  selector: 'app-admin-add-tarot',
  templateUrl: './admin-add-tarot.component.html',
  styleUrls: ['./admin-add-tarot.component.css']
})
export class AdminAddTarotComponent implements OnInit {

  public tarotForm: FormGroup;
  public uploadedFile: File[] = [] ;
  public vibrations: Vibration[] = []; 
  public errorMessage: string = '';

  constructor(private fb: FormBuilder, private tarotService: TarotService, private vibrationService: VibrationService, private displayService: DisplayService) {
    this.tarotForm = this.fb.group({
      cards: this.fb.array([this.newCard()])
    });
  }

  ngOnInit(): void {
    this.loadVibrations();
  }

  loadVibrations(): void {
    this.vibrationService.getAll().subscribe(data => {
      this.vibrations = data;
    });
  }

  get cards(): FormArray {
    return this.tarotForm.get('cards') as FormArray;
  }
  
  get cardsControls() {
    return this.cards.controls;
  }
  
  newCard(): FormGroup {
    return this.fb.group({
      id: [crypto.randomUUID()],
      number: ['', Validators.required],
      name: ['', Validators.required],
      description: [''],
      vibrationId: [null],
      image: [null, Validators.required]
    });
  }

  addCard(): void {
    this.cards.push(this.newCard());
  }

  removeCard(index: number): void {
    this.cards.removeAt(index);
  }

  onFileChange(event: Event, index: number): void {
    const element = event.target as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      this.uploadedFile[index] = file;
      this.cards.at(index).get('image')?.setValue(file);
    }
  }

  onSubmit(): void {
    this.errorMessage = '';

    if (this.tarotForm.invalid) {
      this.tarotForm.markAllAsTouched();  // Marque tous les champs comme "touchés" pour afficher les erreurs
      this.errorMessage = 'Veuillez remplir tous les champs obligatoires.';
      return;
    }
    
    const formData = new FormData();
    this.cards.controls.forEach((card, index) => {
      const cardData = card.value;
      formData.append(`tarots[${index}].Id`, cardData.id);
      formData.append(`tarots[${index}].Name`, cardData.name);
      formData.append(`tarots[${index}].Number`, cardData.number.toString());
      formData.append(`tarots[${index}].Description`, cardData.description || '');
      formData.append(`tarots[${index}].Image`, this.uploadedFile[index]);
      if (cardData.vibrationId) {
        formData.append(`tarots[${index}].VibrationId`, cardData.vibrationId);
      }
    });

    this.tarotService.saveTarotCards(formData).subscribe({
      next: () => {
        this.tarotForm.reset();
        this.uploadedFile = [];
        this.cards.clear();
        this.displayService.showSuccessToast('Carte de tarot ajoutée avec succès');
        this.addCard();
      },
      error: (error) => {
        this.errorMessage = error.error;
        this.displayService.showErrorToast('Erreur lors de l’ajout de la carte de tarot.');
      }
    });
  }
}
