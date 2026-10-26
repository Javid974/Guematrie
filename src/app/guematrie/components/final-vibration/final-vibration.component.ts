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
      this.guematrieParams.birthDate = params['birthDate'] ?? null;
      this.guematrieParams.birthTime = params['birthTime'];
      this.guematrieParams.firstNameSyllables = params['firstNameSyllables'] ?? '';
      this.guematrieParams.lastNameSyllables = params['lastNameSyllables'] ?? '';
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
        firstNameSyllables: this.guematrieParams.firstNameSyllables,
        lastNameSyllables: this.guematrieParams.lastNameSyllables,
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
      .generateFinal(
        this.guematrieParams.firstName, this.guematrieParams.lastName,
        this.guematrieParams.firstNameSyllables, this.guematrieParams.lastNameSyllables,
        this.guematrieParams.birthDate
      )
      .subscribe({
        next: (result) => {
          this.finalVibrationResult = result;
        },
        error: (v) => {
          this.errorMessage = typeof v?.error === 'string' ? v.error : v?.message ?? 'Une erreur est survenue.';
        },
      });
  }

  private createEmptyResult(): FinalVibrationResult {
    return {
      dateDetails: [],
    dateDetailGroups: [],
    shouldBeReturn: 0,
      evolvingKarma: 0,
      shouldBeReturnTarot: {
        summationTarot: 0,
        tarotCard: {
          id: '',
          name: '',
          number: 0,
          description: null,
          imagePath: '',
          vibrationId: null,
        },
      },
      evolvingKarmaTarot: {
        summationTarot: 0,
        tarotCard: {
          id: '',
          name: '',
          number: 0,
          description: null,
          imagePath: '',
          vibrationId: null,
        },
      },
      shouldBeReturnDetail: [],
      evolvingKarmaDetail: [],
    };
  }
}
