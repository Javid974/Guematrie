import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vibration } from 'src/models/vibration.model';
import { DisplayService } from 'src/services/display.service';
import { TarotService } from 'src/services/tarot.service';
import { VibrationService } from 'src/services/vibration.service';

@Component({
  selector: 'app-admin-add-tarot',
  templateUrl: './admin-add-tarot.component.html',
  styleUrl: './admin-add-tarot.component.css'
})
export class AdminAddTarotComponent implements OnInit {

  public tarotForm: FormGroup;
  public uploadedFile: File[] = [] ;
  public vibrations: Vibration[] = []; 
  public errorMessage: string = '';

  constructor(private fb: FormBuilder, private tarotService: TarotService, private vibrationService:VibrationService,  private displayService: DisplayService) {
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
    return (this.tarotForm.get('cards') as FormArray).controls;
  }
  
  newCard(): FormGroup {
    return this.fb.group({
      id: [crypto.randomUUID()],
      number: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      vibrationId: [null],
      image: [null, Validators.required]  // Stocker le fichier réel ici
    });
  }

  addCard(): void {
    this.cards.push(this.newCard());
  }

  removeCard(index: number): void {
    this.cards.removeAt(index);
  }

  onFileChange(event: Event): void {
   
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
  
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      if (!this.uploadedFile.includes(file)) {
        this.uploadedFile.push(file);
      }
      
    }
  }

  onSubmit(): void {

    this.errorMessage = '';
    const formData = new FormData();
    
    this.cards.controls.forEach((card, index) => {
 
      const cardData = card.value;
      formData.append(`tarots[${index}].Name`, cardData.name);
      formData.append(`tarots[${index}].Number`, cardData.number.toString());
      formData.append(`tarots[${index}].Description`, cardData.description || '');
      formData.append(`tarots[${index}].Image`, this.uploadedFile[index]);
      if (cardData.vibrationId) {
        formData.append(`tarots[${index}].VibrationId`, cardData.vibrationId);
      }
    });

    this.tarotService.saveTarotCards(formData).subscribe({
      next: (response) => {
        this.tarotForm.reset(); // Réinitialise le formulaire
        this.uploadedFile = [];  // Vide la liste des fichiers uploadés
        this.cards.clear(); 
        const message = 'Carte de tarot mise à jour avec succès'
        this.displayService.showSuccessToast(message);
        this.addCard();
      },
      error: (error) => {
        this.errorMessage = error.error;

        this.displayService.showErrorToast('Erreur lors de la mise à jour de la carte de taror');
      }
    });
  }

}
