import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuematrieParameters } from 'src/models/GuematrieParameters';
import { VibrationResult } from 'src/models/vibrationResult.model';
import { GuematrieService } from 'src/services/guematrie.service';

@Component({
  selector: 'app-external-vibration',
  templateUrl: './external-vibration.component.html',
  styleUrls: ['./external-vibration.component.css'],
})
export class ExternalVibrationComponent implements OnInit {
  guematrieParams: GuematrieParameters = new GuematrieParameters();
  vibrationResult: VibrationResult = this.createEmptyResult();
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
      this.loadExternalVibration();
    });
  }

  goToInnerVibration(): void {
    this.router.navigate(['/inner-vibration'], {
      queryParams: {
        firstName: this.guematrieParams.firstName,
        lastName: this.guematrieParams.lastName,
        birthDate: this.guematrieParams.birthDate,
        birthTime: this.guematrieParams.birthTime,
      },
    });
  }

  private loadExternalVibration(): void {
    this.errorMessage = '';
    this.vibrationResult = this.createEmptyResult();

    if (!this.guematrieParams.lastName) {
      return;
    }

    this.guematrieService.generate(this.guematrieParams.lastName).subscribe({
      next: (result) => {
        this.vibrationResult = result;
      },
      error: (v) => {
        this.errorMessage = v?.error ?? 'Une erreur est survenue.';
      },
    });
  }

  private createEmptyResult(): VibrationResult {
    return {
      syllabes: [],
      innerVibration: [[]],
      growthStage: { stage: [], stageDetail: [[]] },
      vibrationSummation: { summation: 0, summationDetail: [] },
      vibrationTarot: {
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
      vibrationAdvices: [],
    };
  }
}
