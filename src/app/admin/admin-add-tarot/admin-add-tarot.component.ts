import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vibration } from 'src/models/vibration.model';
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

  constructor(private fb: FormBuilder, private tarotService: TarotService, private vibrationService:VibrationService) {
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
      vibrationId: [''],
      image: [null, Validators.required]  // Stocker le fichier réel ici
    });
  }

  addCard(): void {
    this.cards.push(this.newCard());
  }

  removeCard(index: number): void {
    this.cards.removeAt(index);
  }

  onFileChange(event: Event, card: AbstractControl): void {
    debugger;
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
  
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      // Ajouter le fichier à la liste s'il n'est pas déjà présent
      if (!this.uploadedFile.includes(file)) {
        this.uploadedFile.push(file);
      }
    }
  }

  onSubmit(): void {
    debugger;
    const formData = new FormData();
    this.cards.controls.forEach((card, index) => {
      debugger;
      const cardData = card.value;
      formData.append(`cards[${index}].name`, cardData.name);
    
      formData.append(`cards[${index}].file`, this.uploadedFile[index]);

    });

    this.tarotService.saveTarotCards(formData).subscribe({
      next: (response) => console.log('Success:', response),
      error: (error) => console.error('Error:', error)
    });
  }

}
