import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GuematrieParameters } from 'src/models/GuematrieParameters';
@Component({
  selector: 'app-guematrie-form',
  templateUrl: './guematrie-form.component.html',
  styleUrls: ['./guematrie-form.component.css'],
})
export class GuematrieFormComponent {
  guematrieParams: GuematrieParameters = new GuematrieParameters();
  submitted = false;

  constructor(private router: Router) {}

  onSubmit() {
    this.submitted = true;
    if (this.guematrieParams.firstName && this.guematrieParams.lastName) {
      const firstName = this.guematrieParams.firstName;
      const lastName = this.guematrieParams.lastName;
      const birthDate = this.guematrieParams.birthDate;
      const birthTime = this.guematrieParams.birthTime;

      this.router.navigate(['/inner-vibration'], {
        queryParams: { firstName, lastName, birthDate, birthTime },
      });
    }
  }
}
