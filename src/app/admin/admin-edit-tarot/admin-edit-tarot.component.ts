

import { Component, numberAttribute, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarotService } from 'src/services/tarot.service';
import { Tarot } from 'src/models/tarot.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Vibration } from 'src/models/vibration.model';
import { VibrationService } from 'src/services/vibration.service';
import { DisplayService } from 'src/services/display.service';

@Component({
  selector: 'app-admin-edit-tarot',
  templateUrl: './admin-edit-tarot.component.html',
  styleUrls: ['./admin-edit-tarot.component.css']
})
export class AdminEditTarotComponent implements OnInit {
  card: Tarot = { id: "0", name: '', number:0, imagePath: '', description: '', vibrationId:'' };
  tarotForm: FormGroup;
  errorMessage: string | null = null;
  public vibrations: Vibration[] = []; 
  public showModal: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tarotService: TarotService,
    private vibrationService: VibrationService,
    private displayService : DisplayService,
     private router: Router
  ) {
    this.tarotForm = this.fb.group({
      id: [''],
      number:[''],
      name: [''],
      description: [''],
      vibrationId: [''],
      imagePath: ['']
    });
  }


  ngOnInit(): void {
    debugger;
    const cardId = this.route.snapshot.paramMap.get('id');

    if (cardId) {
      this.tarotService.getCardById(cardId).subscribe((data) => {
        debugger;
        this.card = data;
      });
    }

    this.loadVibrations();

  }

  loadVibrations(): void {
    this.vibrationService.getAll().subscribe(data => {
      this.vibrations = data;
    });
  }

  get cardsControls() {
    return this.cards.controls;
  }
  
  get cards(): FormArray {
    return this.tarotForm.get('cards') as FormArray;
  }
  
  onSubmit(): void {
    this.tarotService.updateCard(this.card).subscribe(
      {
        next: (v) => 
          {
           
          },
        error: (v) => 
          {
            
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
        next: (v) => 
          {
           // console.log('Vibrations supprimé avec succès', v);
            //this.isSubmitted = false;
            const message = 'carte suprrimé avec succès'
        
            this.displayService.showSuccessToast(message);
            this.router.navigate(['/admin']);
          },
        error: (v) => 
          {
            console.error('Erreur lors de la supression de la carte');
            this.errorMessage = v.error;
            //this.isSubmitted = false;
            this.displayService.showErrorToast('Erreur lors de la supression de la carte');
          
          }
      })

    this.closeModal();

  }

}
