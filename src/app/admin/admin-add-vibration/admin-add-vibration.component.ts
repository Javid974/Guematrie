import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
import { Color } from 'src/models/color.model';
import { Type } from 'src/models/type.model';
import { Vibration } from 'src/models/vibration.model';
import { DisplayService } from 'src/services/display.service';
import { VibrationService } from 'src/services/vibration.service';
import * as toastr from 'toastr';
@Component({
  selector: 'app-admin-add-vibration',
  templateUrl: './admin-add-vibration.component.html',
  styleUrls: ['./admin-add-vibration.component.css']
})

export class AdminAddVibrationComponent implements OnInit {
  
  public vibrationsForm: FormGroup;
  public vibrationTypes = VibrationType;
  public vibrationColor = VibrationColor;
  public vibrationsList: Vibration[] = [];
  public isSubmitted: boolean = false;
  public showToast = false;
  public errorMessage: string = '';
  public colors: Array<Color> = [];
  public types: Array<Type> = [];

  constructor(private fb: FormBuilder, private vibrationService: VibrationService, private displayService: DisplayService) {
    this.vibrationsForm = this.fb.group({
      vibrations: this.fb.array([this.createVibrationFormGroup()])
    });
    
  }

  ngOnInit(): void {
    this.colors = this.displayService.getColors();
    this.types = this.displayService.getTypes();
  }
  
  showSuccessToast() {
    toastr.success('Vibrations enregistrées avec succès', 'Succès', {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    });
  }

  showErrorToast() {
    toastr.error("Une erreur s'est produite.", '', {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    });
  }

  onSubmit() {
    this.errorMessage = '';
    this.isSubmitted = true;
    if (this.vibrationsForm.valid) {

      this.vibrationService.saveVibrations(this.vibrationsForm.value.vibrations).subscribe(
        {
          next: (v) => 
          {
            console.log('Vibrations enregistrées avec succès', v);
            this.resetForm();
            this.isSubmitted = false;
            this.showSuccessToast();
          },
          error: (v) => 
          {
            console.error('Erreur lors de l\'enregistrement des vibrations');
            this.errorMessage = v.error;
            this.isSubmitted = false;
            this.showErrorToast();
          }
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
    const uuid = crypto.randomUUID();
    return this.fb.group({
      id: [uuid],
      letter: [null],
      vibrationNumber: [null, [Validators.required, Validators.min(1)]],
      vibrationType: [null, Validators.required],
      vibrationColor: [null, Validators.required],
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
  
  getVibrationColorDescription(vibrationColor: VibrationColor): string {
    return this.displayService.getVibrationColorDescription(vibrationColor);
  }

}

