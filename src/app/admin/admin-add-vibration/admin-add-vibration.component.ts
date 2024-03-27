import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model';
import { Vibration2 } from 'src/models/vibration2.model';
import { VibrationService } from 'src/services/vibration.service';

@Component({
  selector: 'app-admin-add-vibration',
  templateUrl: './admin-add-vibration.component.html',
  styleUrls: ['./admin-add-vibration.component.css']
})

export class AdminAddVibrationComponent implements OnInit {
  vibrationsForm: FormGroup;
  vibrationTypes = VibrationType;
  vibrationColor = VibrationColor;
  vibrationsList: Vibration[] = [];
  isSubmitted: boolean = false;
  vibration2: Vibration2[] = [
    { letter: 'A' },
    { letter: 'B' },
    { letter: 'C' }
  ];

  constructor(private fb: FormBuilder, private vibrationService: VibrationService) {
    this.vibrationsForm = this.fb.group({
      vibrations: this.fb.array([this.createVibrationFormGroup()])
     
    });
 
  }

  ngOnInit(): void {
  
  }
  
  onSubmit() {
    debugger;
    this.isSubmitted = true;
    if (this.vibrationsForm.valid) {
      this.vibrationService.saveVibrations2(this.vibration2).subscribe({
        next:(v) =>{
          debugger;
        }
      });
      // this.vibrationService.saveVibrations(this.vibrationsForm.value.vibrations).subscribe({next: (v) => {
      //    console.log('Vibrations enregistrées avec succès', v);
      //    this.resetForm();
      //   this.isSubmitted = false;
      // },
      // error: (v) => {
      //   console.error('Erreur lors de l\'enregistrement des vibrations');
      //   this.isSubmitted = false;
      // }
       
      // });
    }
  }


  isControlInvalid(index: number, controlName: string): boolean {
    const control = (this.vibrationsForm.get('vibrations') as FormArray).at(index).get(controlName);
    return control ? this.isSubmitted && control.invalid : false;
  }
  
  resetForm(): void {
    const formVibrations: Vibration[] = this.vibrationsForm.value.vibrations;
    // Réinitialiser la liste avec les nouvelles valeurs du formulaire
    this.vibrationsList = [...formVibrations];
    //  réinitialiser le formulaire lui-même pour une nouvelle saisie
    this.vibrationsForm.reset();
    const vibrationsArray = this.vibrationsForm.get('vibrations') as FormArray;
    vibrationsArray.clear(); 
    vibrationsArray.push(this.createVibrationFormGroup()); 
  }
  
  createVibrationFormGroup(): FormGroup {
    const uuid = crypto.randomUUID();
    return this.fb.group({
      id: [uuid],
      letter: ['', Validators.required],
      vibrationNumber: [null, [Validators.required, Validators.min(1)]],
      vibrationType: ['', Validators.required],
      vibrationColor: ['', Validators.required],
      description: ['', Validators.required],
      karmic: [false],
      consciousness: [false]
    });
  }

  addVibrationFormGroup(): void {
    const vibrations = this.vibrationsForm.get('vibrations') as FormArray;
    if (vibrations != null) {
      vibrations.push(this.createVibrationFormGroup());
    }
      
  }

  removeVibrationFormGroup(index: number): void {
    const vibrations = this.vibrationsForm.get('vibrations') as FormArray;
    if (vibrations && index > -1) {
      vibrations.removeAt(index);
    }
  }
  
  get vibrationsControls() {
    return (this.vibrationsForm.get('vibrations') as FormArray).controls;
  }
  
}
