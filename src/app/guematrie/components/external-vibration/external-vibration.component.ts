import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuematrieParameters } from 'src/models/GuematrieParameters';

@Component({
  selector: 'app-external-vibration',
  templateUrl: './external-vibration.component.html',
  styleUrls: ['./external-vibration.component.css'],
})
export class ExternalVibrationComponent implements OnInit {
  guematrieParams: GuematrieParameters = new GuematrieParameters();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.guematrieParams.firstName = params['firstName'];
      this.guematrieParams.lastName = params['lastName'];
      this.guematrieParams.birthDate = params['birthDate'];
      this.guematrieParams.birthTime = params['birthTime'];
    });
  }
}
