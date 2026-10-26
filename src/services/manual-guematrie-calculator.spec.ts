import { ManualGuematrieCalculator as Calculator } from './manual-guematrie-calculator';
import { Vibration } from 'src/models/vibration.model';
import { Tarot } from 'src/models/tarot.model';

describe('ManualGuematrieCalculator', () => {
  const vibrations: Vibration[] = Array.from({ length: 100 }, (_, index) => ({
    id: String(index + 1), vibrationNumber: index + 1, letter: index === 0 ? 'A' : '',
    description: '', vibrationType: 0, vibrationColor: 0, karmic: false, consciousness: false,
  }));
  const tarots: Tarot[] = Array.from({ length: 19 }, (_, number) => ({
    id: String(number), number, name: '', description: null, imagePath: '', vibrationId: null,
  }));

  it('keeps exactly the entered boundaries and validates accents and compound names', () => {
    expect(Calculator.validateSyllables('Marie', ['Marie'])).toEqual(['marie']);
    expect(Calculator.validateSyllables('Marie', ['Mar', 'ie'])).toEqual(['mar', 'ie']);
    expect(Calculator.validateSyllables('Élodie', ['É', 'lo', 'die'])).toEqual(['é', 'lo', 'die']);
    expect(Calculator.validateSyllables('Jean-Luc', ['Jean', 'Luc'])).toEqual(['jean', 'luc']);
    expect(() => Calculator.validateSyllables('Marie', ['Ma', 'ri'])).toThrowError();
  });

  it('decomposes stage totals like the API and performs one tarot digit sum', () => {
    const result = Calculator.calculate(['a'.repeat(123)], vibrations.filter(item => item.vibrationNumber !== 23), tarots);
    expect(result.growthStage.stage).toEqual([123]);
    expect(result.growthStage.stageDetail[0].map(item => item.vibrationNumber)).toEqual([100, 20, 3]);
    expect(result.vibrationTarot.summationTarot).toBe(6);
    expect(Calculator.calculate(['a'.repeat(123)], vibrations, tarots).growthStage.stageDetail[0]
      .map(item => item.vibrationNumber)).toEqual([100, 23]);
    const other = Calculator.calculate(['a'.repeat(99)], vibrations, tarots);
    expect(other.vibrationTarot.summationTarot).toBe(18);
  });

  it('generates every pair of growth-stage advice and handles equal final totals', () => {
    const result = Calculator.calculate(['a', 'aa', 'aaa'], vibrations, tarots);
    expect(result.vibrationAdvices.map(item => item.advice)).toEqual([1, 2, 1]);
    const final = Calculator.calculateFinal(result, result, vibrations, tarots);
    expect(final.shouldBeReturn).toBe(12);
    expect(final.evolvingKarma).toBe(0);
    expect(final.evolvingKarmaTarot.summationTarot).toBe(0);
    expect(final.evolvingKarmaDetail).toEqual([]);
  });

  it('reports missing detail and tarot data rather than producing an incomplete result', () => {
    expect(() => Calculator.calculate(['a'.repeat(123)], vibrations.filter(item => item.vibrationNumber !== 100), tarots))
      .toThrowError('Veuillez ajouter la vibration 100');
    expect(() => Calculator.calculate(['a'], vibrations, []))
      .toThrowError(/carte de tarot/);
  });
  it('calculates the four birth-date parts locally in the same order as the backend', () => {
    expect(Calculator.calculateDateDetails('1990-10-25', vibrations).map(item => item.vibrationNumber))
      .toEqual([25, 10, 19, 90]);
    const inner = Calculator.calculate(['a'], vibrations, tarots);
    const final = Calculator.calculateFinal(inner, inner, vibrations, tarots, '1990-10-25');
    expect(final.dateDetails.map(item => item.vibrationNumber)).toEqual([25, 10, 19, 90]);
  });

  it('handles absent dates, leap days and a zero year suffix without timezone conversion', () => {
    expect(Calculator.calculateDateDetails(null, vibrations)).toEqual([]);
    expect(Calculator.calculateDateDetails('2000-02-29', vibrations).map(item => item.vibrationNumber))
      .toEqual([29, 2, 20]);
    expect(Calculator.calculateDateDetails('0001-01-01', vibrations).map(item => item.vibrationNumber))
      .toEqual([1, 1, 1]);
  });

  it('rejects impossible dates instead of silently changing the day', () => {
    for (const date of ['1990-02-29', '1900-02-29', '1990-04-31', '1990-13-01', '1990-01-00', '0000-01-01', '25/10/1990']) {
      expect(() => Calculator.calculateDateDetails(date, vibrations)).toThrowError();
    }
  });

  it('preserves 11, 08, 19 and 83 as exact date parts', () => {
    expect(Calculator.calculateDateDetails('1983-08-11', vibrations).map(item => item.vibrationNumber))
      .toEqual([11, 8, 19, 83]);
  });

  it('keeps decomposed date parts in separate groups', () => {
    const references = vibrations.filter(item => item.vibrationNumber !== 83);
    const groups = Calculator.calculateDateDetailGroups('1983-08-11', references);
    expect(groups.map(group => group.map(item => item.vibrationNumber))).toEqual([[11], [8], [19], [80, 3]]);
    const inner = Calculator.calculate(['a'], references, tarots);
    const final = Calculator.calculateFinal(inner, inner, references, tarots, '1983-08-11');
    expect(final.dateDetails.map(item => item.vibrationNumber)).toEqual([11, 8, 19, 80, 3]);
    expect(final.dateDetailGroups).toEqual(groups);
  });

});
