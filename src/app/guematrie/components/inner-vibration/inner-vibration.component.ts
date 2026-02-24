import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GuematrieParameters } from 'src/models/GuematrieParameters';
import { VibrationResult } from 'src/models/vibrationResult.model';
import { GuematrieService } from 'src/services/guematrie.service';

@Component({
  selector: 'app-inner-vibration',
  templateUrl: './inner-vibration.component.html',
  styleUrls: ['./inner-vibration.component.css'],
})
export class InnerVibrationComponent implements OnInit {
  guematrieParams: GuematrieParameters = new GuematrieParameters();
  vibrationResult: VibrationResult = this.createEmptyResult();
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private guematrieService: GuematrieService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.guematrieParams.firstName = params['firstName'];
      this.guematrieParams.lastName = params['lastName'];
      this.guematrieParams.birthDate = params['birthDate'];
      this.guematrieParams.birthTime = params['birthTime'];
      this.loadInnerVibration();
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

  private loadInnerVibration(): void {
    this.errorMessage = '';
    this.vibrationResult = this.createEmptyResult();

    if (!this.guematrieParams.firstName) {
      return;
    }

    this.guematrieService.generate(this.guematrieParams.firstName).subscribe({
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
