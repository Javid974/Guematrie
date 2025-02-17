import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
import { Color } from 'src/models/color.model';
import { Type } from 'src/models/type.model';
import { Vibration } from 'src/models/vibration.model';
import { DisplayService } from 'src/services/display.service';
import { VibrationService } from 'src/services/vibration.service';
import * as toastr from 'toastr';

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
  public errorMessage: string = '';
  public showModal: boolean = false;
  public colors: Array<Color> = [];
  public types: Array<Type> = [];

  constructor(
    private vibrationService: VibrationService,
    private displayService : DisplayService,
    private route: ActivatedRoute,
    private router: Router)
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
    this.colors = this.displayService.getColors();
    this.types = this.displayService.getTypes();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  deleteItem() {

    this.vibrationService.delete(this.vibration.id).subscribe(
      {
        next: (v) => 
          {
            console.log('Vibrations supprimé avec succès', v);
            this.isSubmitted = false;
            const message = 'Vibrations suprrimé avec succès'
        
            this.displayService.showSuccessToast(message);
            this.router.navigate(['/admin']);
          },
        error: (v) => 
          {
            console.error('Erreur lors de la supression des vibrations');
            this.errorMessage = v.error;
            this.isSubmitted = false;
            this.displayService.showErrorToast('Erreur lors de la supression des vibrations');
          
          }
      })

    this.closeModal();

  }


  isControlInvalid(controlName: string): boolean {
    const control = this.vibrationsForm.get(controlName);
    return control !== null && this.isSubmitted && control.invalid;
  }

  onSubmit() {
    this.isSubmitted = true;
    this.errorMessage = '';
    if (this.vibrationsForm.valid) {
      this.vibrationService.update(this.vibration).subscribe(
        {
          next: (v) => 
            {
              console.log('Vibrations mise à jour avec succès', v);
              this.isSubmitted = false;
              const message = 'Vibrations mise à jour avec succès'
              this.displayService.showSuccessToast(message);
            },
          error: (v) => 
            {
              console.error('Erreur lors de la mise à jour des vibrations');
              this.errorMessage = v.error;
              this.isSubmitted = false;
              this.displayService.showErrorToast('Erreur lors de la mise à jour des vibrations');
            }
        }
      );
    }
  }

}
