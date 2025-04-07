export default ({ detect, langName, supportedLanguages, toISO2, toISO3 }) =>
  (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
      'string.language': '{{#label}} must be in {{#languages}}',
    },
    rules: {
      language: {
        args: [
          {
            name: 'languages',
            assert: joi
              .array()
              .items(joi.valid(...supportedLanguages.map((l) => toISO2(l))))
              .min(1),
          },
        ],
        method: function (...languages) {
          return this.$_addRule({ name: 'language', args: { languages } });
        },
        validate: (value, { error }, { languages }) =>
          languages.includes(detect(value))
            ? value
            : error('string.language', {
                languages: languages.map((l) => langName(toISO3(l))).join(', '),
              }),
      },
    },
  });
