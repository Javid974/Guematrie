import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VibrationTypeEnum } from 'src/app/emum/vibration-type.enum';

@Component({
  selector: 'app-admin-add-vibration',
  templateUrl: './admin-add-vibration.component.html',
  styleUrls: ['./admin-add-vibration.component.css']
})
export class AdminAddVibrationComponent implements OnInit {
  vibrationsForm: FormGroup;
  vibrationTypes = VibrationTypeEnum;
  vibrationTypeOptions = [
    { label: 'Vibration Majeure', value: VibrationTypeEnum.MajorVibration },
    { label: 'Vibration Mineure', value: VibrationTypeEnum.MinorVibration }
  ];

  constructor(private fb: FormBuilder) {
    this.vibrationsForm = this.fb.group({
      vibrations: this.fb.array([this.createVibrationFormGroup()])
    });
  }

  ngOnInit(): void {}

  createVibrationFormGroup(): FormGroup {
    return this.fb.group({
      letter: ['', Validators.required],
      vibration: ['', Validators.required],
      vibrationType: ['', Validators.required],
      description: ['', Validators.required]
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
