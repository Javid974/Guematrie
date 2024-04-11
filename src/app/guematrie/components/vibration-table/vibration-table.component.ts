import { Component, Input } from '@angular/core';
import { VibrationColor } from 'src/app/emum/vibration-color.enum';
import { VibrationType } from 'src/app/emum/vibration-type.enum';
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
  syllables: string[] = ['Ja', 'vid'];

 vibration2: Vibration[][] = [
    [
      {
        id: '1',
        letter: 'A',
        vibrationNumber: 600,
        description: 'text',
        vibrationType: VibrationType.MajorVibration,
        vibrationColor: VibrationColor.Green,
        karmic: false,
        consciousness: true
      },
      {
        id: '2',
        letter: 'B',
        vibrationNumber: 1,
        description: 'test2',
        vibrationType: VibrationType.MajorVibration,
        vibrationColor: VibrationColor.Orange,
        karmic: true,
        consciousness: false
      },
    ],
    [
      {
        id: '3',
        letter: 'C',
        vibrationNumber: 700,
        description: 'test3',
        vibrationType: VibrationType.MajorVibration,
        vibrationColor: VibrationColor.Red,
        karmic: false,
        consciousness: true
      },
      // ... Ajoutez d'autres objets Vibration si nécessaire
    ],
  ];
  

  constructor(private guematrieService: GuematrieService) {}

  ngOnInit(): void {
    debugger;
    if (this.title === 'Vibration Interieure'){
      this.guematrieService.generate(this.firstName).subscribe(
        {
          next: (v) => 
          {
           
          }
      });
    }
  }
}
