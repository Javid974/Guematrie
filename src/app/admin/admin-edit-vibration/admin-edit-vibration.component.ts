import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
import { Vibration } from 'src/models/vibration.model';
import { VibrationService } from 'src/services/vibration.service';

@Component({
  selector: 'app-admin-edit-vibration',
  templateUrl: './admin-edit-vibration.component.html',
  styleUrls: ['./admin-edit-vibration.component.css']
})
export class AdminEditVibrationComponent {
  public vibration: Vibration;
  public vibrationId: string | null = '';
  public vibrationsForm: FormGroup;
  public isSubmitted: boolean = false;
  public vibrationTypes = VibrationType;
  public vibrationColor = VibrationColor;
  
  constructor(
    private vibrationService: VibrationService,
    private route: ActivatedRoute)
  {
    this.vibration = {
      id: '',
      letter:'',
      description:'',
      vibrationNumber:0,
      vibrationColor:VibrationColor.Green,
      vibrationType:VibrationType.MajorVibration,
      karmic:false,
      consciousness:false
    }

    this.vibrationsForm = new FormGroup({
      letter: new FormControl('', [Validators.required]),
      vibrationNumber: new FormControl('', [Validators.required, Validators.min(1)]), 
      vibrationType: new FormControl('', [Validators.required]),
      vibrationColor:new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      karmic: new FormControl(false),
      consciousness:new FormControl(false),
    });

  }

  ngOnInit() {
    this.vibrationId = this.route.snapshot.paramMap.get('id');
    this.vibrationService.get(this.vibrationId).subscribe((vibration) => {
      this.vibration = vibration;
    });

  }

  isControlInvalid(controlName: string): boolean {
    const control = this.vibrationsForm.get(controlName);
    return control !== null && this.isSubmitted && control.invalid;
  }

  onSubmit() {
    this.isSubmitted = true;
  }

}
