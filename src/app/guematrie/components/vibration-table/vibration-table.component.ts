import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-vibration-table',
  templateUrl: './vibration-table.component.html',
  styleUrls: ['./vibration-table.component.css'],
})
export class VibrationTableComponent {
  @Input() name: string = '';
  @Input() title: string = '';
  syllables: string[] = ['Ja', 'vid'];

  vibration: (number | string)[][][] = [
    [
      [600, 'text'],
      [1, 'test2'],
    ],
    [
      [700, 'test3'],
      [9, 'test4'],
      [4, 'test34'],
    ],
  ];

  ngOnInit(): void {

  }
}
