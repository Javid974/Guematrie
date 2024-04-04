import { Component } from '@angular/core';
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
  }

  ngOnInit() {
    this.vibrationId = this.route.snapshot.paramMap.get('id');
    this.vibrationService.get(this.vibrationId).subscribe((vibration) => {
      this.vibration = vibration;
    });

  }

}
