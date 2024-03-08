import { Time } from '@angular/common';

export class GuematrieParameters {
  firstName: string;
  lastName: string;
  birthDate: Date | null;
  birthTime: Time | null;

  constructor(
    firstName: string = '',
    lastName: string = '',
    birthDate: Date | null = null,
    birthTime: Time | null = null
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.birthTime = birthTime;
  }
}
