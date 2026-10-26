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
  manualSyllables = false;

  syllableError(name: string, syllables: string): string {
    if (!this.manualSyllables || !syllables.trim()) return '';
    const parts = syllables.split('-').map(part => part.trim());
    if (parts.some(part => !/^\p{L}+$/u.test(part))) {
      return 'Séparez les syllabes par des tirets, sans syllabe vide (ex. : Ma-rie).';
    }
    const letters = (name.match(/\p{L}/gu) ?? []).join('').toLowerCase();
    return parts.join('').toLowerCase() === letters
      ? ''
      : 'Les syllabes doivent reprendre toutes les lettres dans le même ordre, avec les mêmes accents.';
  }

  constructor(private router: Router) {}

  onSubmit() {
    this.submitted = true;
    if (this.syllableError(this.guematrieParams.firstName, this.guematrieParams.firstNameSyllables) ||
        this.syllableError(this.guematrieParams.lastName, this.guematrieParams.lastNameSyllables)) return;
    if (this.guematrieParams.firstName && this.guematrieParams.lastName) {
      const firstName = this.guematrieParams.firstName;
      const lastName = this.guematrieParams.lastName;
      const birthDate = this.guematrieParams.birthDate;
      const birthTime = this.guematrieParams.birthTime;

      this.router.navigate(['/inner-vibration'], {
        queryParams: {
          firstName, lastName, birthDate, birthTime,
          firstNameSyllables: this.manualSyllables ? this.guematrieParams.firstNameSyllables.trim() : undefined,
          lastNameSyllables: this.manualSyllables ? this.guematrieParams.lastNameSyllables.trim() : undefined,
        },
      });
    }
  }
}
