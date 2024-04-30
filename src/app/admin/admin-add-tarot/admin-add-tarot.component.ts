import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-add-tarot',
  templateUrl: './admin-add-tarot.component.html',
  styleUrl: './admin-add-tarot.component.css'
})
export class AdminAddTarotComponent implements OnInit {

  public tarotForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.tarotForm = this.fb.group({
      cards: this.fb.array([this.newCard()])
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  
  get cards(): FormArray {
    return this.tarotForm.get('cards') as FormArray;
  }
  
  get cardsControls() {
    return (this.tarotForm.get('cards') as FormArray).controls;
  }
  
  newCard(): FormGroup {
    const uuid = crypto.randomUUID();
    return this.fb.group({
      id: [uuid],
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: [null, Validators.required]  // pour simplifier, traitons l'image comme une chaîne
    });
  }

  addCard(): void {
    this.cards.push(this.newCard());
  }

  removeCard(index: number): void {
    this.cards.removeAt(index);
  }

  onSubmit(): void {
    console.log('Form Value', this.tarotForm.value);
    // Ici, vous ajouterez la logique pour envoyer les données à votre API
  }

}
