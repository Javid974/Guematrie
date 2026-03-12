import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinalVibrationResult } from 'src/models/finalVibrationResult.model';
import { GuematrieParameters } from 'src/models/GuematrieParameters';
import { GuematrieService } from 'src/services/guematrie.service';

@Component({
  selector: 'app-final-vibration',
  templateUrl: './final-vibration.component.html',
  styleUrls: ['./final-vibration.component.css'],
})
export class FinalVibrationComponent implements OnInit {
  guematrieParams: GuematrieParameters = new GuematrieParameters();
  finalVibrationResult: FinalVibrationResult = this.createEmptyResult();
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guematrieService: GuematrieService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.guematrieParams.firstName = params['firstName'];
      this.guematrieParams.lastName = params['lastName'];
      this.guematrieParams.birthDate = params['birthDate'];
      this.guematrieParams.birthTime = params['birthTime'];
      this.loadFinalVibration();
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

  private loadFinalVibration(): void {
    this.errorMessage = '';
    this.finalVibrationResult = this.createEmptyResult();

    if (!this.guematrieParams.firstName || !this.guematrieParams.lastName) {
      return;
    }

    this.guematrieService
      .generateFinal(this.guematrieParams.firstName, this.guematrieParams.lastName)
      .subscribe({
        next: (result) => {
          this.finalVibrationResult = result;
        },
        error: (v) => {
          this.errorMessage = v?.error ?? 'Une erreur est survenue.';
        },
      });
  }

  private createEmptyResult(): FinalVibrationResult {
    return {
      shouldBeReturn: 0,
      evolvingKarma: 0,
      shouldBeReturnDetail: [],
      evolvingKarmaDetail: [],
    };
  }
}
