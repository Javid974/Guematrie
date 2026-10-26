import { FinalVibrationResult } from 'src/models/finalVibrationResult.model';
import { Tarot } from 'src/models/tarot.model';
import { Vibration } from 'src/models/vibration.model';
import { VibrationAdvice, VibrationResult } from 'src/models/vibrationResult.model';
import { vibrationTarot } from 'src/models/vibrationTarot.model';

export class ManualGuematrieCalculator {
  static validateSyllables(name: string, syllables: string[]): string[] {
    const normalized = syllables.map(syllable => syllable.trim().toLowerCase());
    if (!normalized.length || normalized.some(syllable => !/^\p{L}+$/u.test(syllable))) {
      throw new Error('Séparez les syllabes par des tirets, sans syllabe vide.');
    }
    const letters = (name.match(/\p{L}/gu) ?? []).join('').toLowerCase();
    if (normalized.join('') !== letters) {
      throw new Error('Les syllabes doivent reprendre toutes les lettres du nom dans le même ordre, avec les mêmes accents.');
    }
    return normalized;
  }

  static calculate(syllabes: string[], vibrations: Vibration[], tarots: Tarot[]): VibrationResult {
    const vibration = syllabes.map(syllable => this.matchVibrations(syllable, vibrations));
    const stage = vibration.map(row => row.reduce((sum, item) => sum + item.vibrationNumber, 0));
    const summation = stage.reduce((sum, value) => sum + value, 0);
    const vibrationAdvices: VibrationAdvice[] = [];
    for (let i = 0; i < stage.length - 1; i++) {
      for (let j = i + 1; j < stage.length; j++) {
        const advice = Math.abs(stage[j] - stage[i]);
        vibrationAdvices.push({ advice, adviceDetail: this.detail(advice, vibrations) });
      }
    }
    return {
      syllabes,
      vibration,
      growthStage: { stage, stageDetail: stage.map(value => this.detail(value, vibrations)) },
      vibrationSummation: { summation, summationDetail: this.detail(summation, vibrations) },
      vibrationTarot: this.tarot(summation, tarots),
      vibrationAdvices,
    };
  }

  static calculateFinal(inner: VibrationResult, external: VibrationResult, vibrations: Vibration[], tarots: Tarot[]): FinalVibrationResult {
    const first = inner.vibrationSummation.summation;
    const last = external.vibrationSummation.summation;
    const shouldBeReturn = first + last;
    const evolvingKarma = Math.abs(first - last);
    return {
      shouldBeReturn,
      evolvingKarma,
      shouldBeReturnTarot: this.tarot(shouldBeReturn, tarots),
      evolvingKarmaTarot: this.tarot(evolvingKarma, tarots),
      shouldBeReturnDetail: this.detail(shouldBeReturn, vibrations),
      evolvingKarmaDetail: this.detail(evolvingKarma, vibrations),
    };
  }

  private static matchVibrations(syllable: string, vibrations: Vibration[]): Vibration[] {
    const result: Vibration[] = [];
    for (let index = 0; index < syllable.length;) {
      let match: Vibration | undefined;
      let length = Math.min(2, syllable.length - index);
      for (; length >= 1; length--) {
        const candidate = syllable.slice(index, index + length);
        match = vibrations.find(item => item.letter?.toLowerCase() === candidate);
        if (match) break;
      }
      if (!match) throw new Error(`La vibration pour la lettre '${syllable[index]}' n'existe pas.`);
      result.push(match);
      index += length;
    }
    return result;
  }

  private static detail(number: number, vibrations: Vibration[]): Vibration[] {
    const exact = vibrations.find(item => item.vibrationNumber === number);
    if (exact) return [exact];
    if (number <= 9) return [];
    const decrement = number < 100 ? 10 : number < 1000 ? 100 : number < 10000 ? 1000 : 10000;
    const significantPart = Math.floor(number / decrement) * decrement;
    const remainder = number % decrement;
    const significant = vibrations.find(item => item.vibrationNumber === significantPart);
    if (!significant) throw new Error(`Veuillez ajouter la vibration ${significantPart}`);
    return [significant, ...(remainder > 0 ? this.detail(remainder, vibrations) : [])];
  }

  private static tarot(number: number, tarots: Tarot[]): vibrationTarot {
    const summationTarot = String(Math.abs(number)).split('').reduce((sum, digit) => sum + Number(digit), 0);
    const tarotCard = tarots.find(card => card.number === summationTarot);
    if (!tarotCard) throw new Error(`La carte de tarot pour le numéro ${summationTarot} n'existe pas.`);
    return { summationTarot, tarotCard };
  }
}
