import { Component, OnInit } from '@angular/core';
import { Vibration } from 'src/models/vibration.model'; // Assurez-vous que le chemin d'importation est correct

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  vibrations: Vibration[] = [
    { letter: 'A', vibration: '100Hz', description: 'Initial vibration' },
    { letter: 'B', vibration: '200Hz', description: 'Secondary vibration' },
    // Ajoutez d'autres vibrations ici selon le besoin
  ];

  constructor() {}

  ngOnInit(): void {}
}
