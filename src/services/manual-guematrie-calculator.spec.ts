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
});
