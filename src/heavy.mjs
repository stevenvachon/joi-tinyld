import {
  detect,
  langName,
  supportedLanguages,
  toISO2,
  toISO3,
} from 'tinyld/heavy';
import base from './base.mjs';

export default base({ detect, langName, supportedLanguages, toISO2, toISO3 });
