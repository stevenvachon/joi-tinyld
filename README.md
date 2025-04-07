# joi-tinyld [![NPM Version][npm-image]][npm-url] ![Build Status][ghactions-image] [![Coverage Status][codecov-image]][codecov-url]

> Natural language detection for Joi validation.

## Usage

```js
import JoiBase from 'joi';
import JoiTinyld from 'joi-tinyld';

const Joi = JoiBase.extend(JoiTinyld);

Joi.string().language('en');
Joi.string().language('en', 'fr');
```

For the "light" version:

```js
import JoiTinyld from 'joi-tinyld/light';
```

For the "heavy" version:

```js
import JoiTinyld from 'joi-tinyld/heavy';
```

Check the tinyld docs for the differences. You might have to dig a little.

[npm-image]: https://img.shields.io/npm/v/joi-tinyld
[npm-url]: https://npmjs.org/joi-tinyld
[ghactions-image]: https://img.shields.io/github/actions/workflow/status/stevenvachon/joi-tinyld/test.yml
[codecov-image]: https://img.shields.io/codecov/c/github/stevenvachon/joi-tinyld
[codecov-url]: https://app.codecov.io/github/stevenvachon/joi-tinyld
