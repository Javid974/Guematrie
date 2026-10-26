import { Time } from '@angular/common';

export class GuematrieParameters {
  firstNameSyllables: string = '';
  lastNameSyllables: string = '';
  firstName: string;
  lastName: string;
  birthDate: string | null;
  birthTime: Time | null;

  constructor(
    firstName: string = '',
    lastName: string = '',
    birthDate: string | null = null,
    birthTime: Time | null = null
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.birthTime = birthTime;
  }
}
