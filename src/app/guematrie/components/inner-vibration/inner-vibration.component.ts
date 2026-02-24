import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuematrieParameters } from 'src/models/GuematrieParameters';

@Component({
  selector: 'app-inner-vibration',
  templateUrl: './inner-vibration.component.html',
  styleUrls: ['./inner-vibration.component.css'],
})
export class InnerVibrationComponent implements OnInit {
  guematrieParams: GuematrieParameters = new GuematrieParameters();
  constructor(private route: ActivatedRoute, private router: Router) {}
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.guematrieParams.firstName = params['firstName'];
      this.guematrieParams.lastName = params['lastName'];
      this.guematrieParams.birthDate = params['birthDate'];
      this.guematrieParams.birthTime = params['birthTime'];
    });
  }

  goToExternalVibration(): void {
    this.router.navigate(['/external-vibration'], {
      queryParams: {
        firstName: this.guematrieParams.firstName,
        lastName: this.guematrieParams.lastName,
        birthDate: this.guematrieParams.birthDate,
        birthTime: this.guematrieParams.birthTime,
      },
    });
  }
}
