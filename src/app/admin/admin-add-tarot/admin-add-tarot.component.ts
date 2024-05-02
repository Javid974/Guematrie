import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TarotService } from 'src/services/tarot.service';

@Component({
  selector: 'app-admin-add-tarot',
  templateUrl: './admin-add-tarot.component.html',
  styleUrl: './admin-add-tarot.component.css'
})
export class AdminAddTarotComponent implements OnInit {

  public tarotForm: FormGroup;

  constructor(private fb: FormBuilder, private tarotService: TarotService) {
    this.tarotForm = this.fb.group({
      cards: this.fb.array([this.newCard()])
    });
  }

  ngOnInit(): void {
  
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
      name: ['', Validators.required],
      description: ['', Validators.required],
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
    const fileControl = card.get('image');
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const imageFrom= card.get('image');
      // Stockez le fichier dans une propriété du composant pour une utilisation ultérieure
      if (imageFrom)
        imageFrom.setValue(fileControl);
  
      // Optionnellement, mettez à jour un autre champ du formulaire ou une propriété pour afficher le nom du fichier
     // card.get('imageName').setValue(file.name);
    }
  }

  onSubmit(): void {
    debugger;
    const formData = new FormData();
    this.cards.controls.forEach((card, index) => {
      debugger;
      const cardData = card.value;
      formData.append(`cards[${index}].name`, cardData.name);
      formData.append(`cards[${index}].description`, cardData.description);
      formData.append(`cards[${index}].file`, cardData.image);
      formData.append(`cards[${index}].imagePath`, cardData.image);
    });

    this.tarotService.saveTarotCards(formData).subscribe({
      next: (response) => console.log('Success:', response),
      error: (error) => console.error('Error:', error)
    });
  }

}
