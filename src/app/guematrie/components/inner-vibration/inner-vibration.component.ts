import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuematrieParameters } from 'src/models/GuematrieParameters';

@Component({
  selector: 'app-inner-vibration',
  templateUrl: './inner-vibration.component.html',
  styleUrls: ['./inner-vibration.component.css'],
})
export class InnerVibrationComponent implements OnInit {
  guematrieParams: GuematrieParameters = new GuematrieParameters();
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.guematrieParams.firstName = params['firstName'];
      this.guematrieParams.lastName = params['lastName'];
      this.guematrieParams.birthDate = params['birthDate'];
      this.guematrieParams.birthTime = params['birthTime'];
    });
  }
}
