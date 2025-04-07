import { expect, test as it } from 'vitest';
import Joi from 'joi';

export default (JoiTinyld) => {
  const ENGLISH = 'en';
  const FRENCH = 'fr';

  const j = () => Joi.extend(JoiTinyld);

  it('can be loaded by Joi', () => expect(() => j()).not.toThrow());

  it('only applies to string types', () => {
    for (const type of [
      j().alternatives(),
      j().any(),
      j().array(),
      j().binary(),
      j().boolean(),
      j().date(),
      j().function(),
      j().link(),
      j().number(),
      j().object(),
      j().symbol(),
    ]) {
      expect(() => type.language(ENGLISH)).toThrow();
    }
    expect(() => j().string().language(ENGLISH)).not.toThrow();
  });

  it('throws an error when no languages are provided', () => {
    expect(() => j().string().language()).toThrow();
  });

  it('throws an error when unsupported languages are provided', () => {
    const INVALID_ENGLISH = 'eng';
    const INVALID_FRENCH = 'fra';
    expect(() => j().string().language(1)).toThrow();
    expect(() => j().string().language('asdf')).toThrow();
    expect(() => j().string().language(INVALID_ENGLISH)).toThrow();
    expect(() => j().string().language(ENGLISH, INVALID_ENGLISH)).toThrow();
    expect(() => j().string().language(INVALID_ENGLISH, ENGLISH)).toThrow();
    expect(() => j().string().language(FRENCH, INVALID_FRENCH)).toThrow();
    expect(() => j().string().language(INVALID_FRENCH, FRENCH)).toThrow();
  });

  it('works', () => {
    const ENGLISH_SENTENCE = 'Yes, this is surely English.';
    const FRENCH_SENTENCE = `Oui, c'est sûrement du français.`;
    const GERMAN = 'de';
    for (const { errorMessage, input, languages, valid } of [
      //---
      { input: ENGLISH_SENTENCE, languages: [ENGLISH], valid: true },
      { input: ENGLISH_SENTENCE, languages: [FRENCH], valid: false },
      { input: ENGLISH_SENTENCE, languages: [ENGLISH, FRENCH], valid: true },
      { input: ENGLISH_SENTENCE, languages: [FRENCH, ENGLISH], valid: true },
      //---
      { input: FRENCH_SENTENCE, languages: [ENGLISH], valid: false },
      { input: FRENCH_SENTENCE, languages: [FRENCH], valid: true },
      { input: FRENCH_SENTENCE, languages: [ENGLISH, FRENCH], valid: true },
      { input: FRENCH_SENTENCE, languages: [FRENCH, ENGLISH], valid: true },
      //---
      {
        errorMessage: 'must be in German',
        input: FRENCH_SENTENCE,
        languages: [GERMAN],
        valid: false,
      },
      {
        errorMessage: 'must be in English, German',
        input: FRENCH_SENTENCE,
        languages: [ENGLISH, GERMAN],
        valid: false,
      },
      //---
      {
        input: `<html><head><script></script></head><body><table><strong>${FRENCH_SENTENCE}</strong></table><footer></footer><body></html>`,
        languages: [FRENCH],
        valid: true,
      },
      {
        input: `**${FRENCH_SENTENCE}**`,
        languages: [FRENCH],
        valid: true,
      },
    ]) {
      const { error, value } = j()
        .string()
        .language(...languages)
        .validate(input);
      if (valid) {
        expect(error).toBe(undefined);
      } else if (errorMessage) {
        expect(error).toHaveProperty(
          'message',
          expect.stringContaining(errorMessage)
        );
      } else {
        expect(error).not.toBe(undefined);
      }
      expect(value).toBe(input);
    }
  });
};
