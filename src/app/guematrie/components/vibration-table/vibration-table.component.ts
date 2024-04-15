import { Component, Input } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
import { InnerVibrationResult } from 'src/models/innerVibrationResult.model';
import { Vibration } from 'src/models/vibration.model';
import { GuematrieService } from 'src/services/guematrie.service';

@Component({
  selector: 'app-vibration-table',
  templateUrl: './vibration-table.component.html',
  styleUrls: ['./vibration-table.component.css'],
})
export class VibrationTableComponent {

  @Input() firstName: string = '';
  @Input() title: string = '';
  syllables: string[] = [];
  errorMessage : string = '';
  vibrations: Vibration[][] = [[ ]];
  public result: InnerVibrationResult | undefined;

  constructor(private guematrieService: GuematrieService) {}

  ngOnInit(): void {
 
    if (this.title === 'Vibration Interieure'){
      this.guematrieService.generate(this.firstName).subscribe(
        {
          next: (vibrationResult: InnerVibrationResult) => {
            this.result = vibrationResult;
            this.syllables = this.result.syllabes;
            this.vibrations = this.result.innerVibration;
          },
          error: (v) => {
            this.errorMessage = v.error;
          }
      });
    }
  }
}
