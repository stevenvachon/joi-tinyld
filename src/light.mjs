import {
  detect,
  langName,
  supportedLanguages,
  toISO2,
  toISO3,
} from 'tinyld/light';
import base from './base.mjs';

export default base({ detect, langName, supportedLanguages, toISO2, toISO3 });
