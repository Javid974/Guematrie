import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VibrationColorEnum } from 'src/app/emum/vibration-color.enum';
import { VibrationTypeEnum } from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model';
import { VibrationService } from 'src/services/vibration.service';

@Component({
  selector: 'app-admin-add-vibration',
  templateUrl: './admin-add-vibration.component.html',
  styleUrls: ['./admin-add-vibration.component.css']
})

export class AdminAddVibrationComponent implements OnInit {
  vibrationsForm: FormGroup;
  vibrationTypes = VibrationTypeEnum;
  vibrationColor = VibrationColorEnum;
  vibrationsList: Vibration[] = [];
  isSubmitted: boolean = false
  constructor(private fb: FormBuilder, private vibrationService: VibrationService) {
    this.vibrationsForm = this.fb.group({
      vibrations: this.fb.array([this.createVibrationFormGroup()])
    });
  }

  ngOnInit(): void {}
  
  onSubmit() {
    debugger;
    this.isSubmitted = true;
    if (this.vibrationsForm.valid) {
      this.vibrationService.saveVibrations(this.vibrationsForm.value.vibrations).subscribe(response => {
        console.log('Vibrations enregistrées avec succès', response);
        this.resetForm();
        this.isSubmitted = false;
      }, error => {
        console.error('Erreur lors de l\'enregistrement des vibrations', error);
        this.isSubmitted = false;
      });
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
    return this.fb.group({
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
