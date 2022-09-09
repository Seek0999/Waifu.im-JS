# waifuim.js
[![Version](https://img.shields.io/github/package-json/v/Seek0999/Waifu.im-JS)](https://www.npmjs.com/package/waifuim.js)
[![Issues](https://img.shields.io/github/issues/Seek0999/Waifu.im-JS)](https://github.com/Seek0999/Waifu.im-JS/issues)
[![License](https://img.shields.io/github/license/Waifu-im/waifuim.py?style=flat-square)](https://github.com/Waifu-im/waifuim.py/blob/main/LICENSE)

A lightweight JavaScript Wrapper for the Waifu.im API

## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Docs](https://waifu.im/docs/)

## Installation

Install via npm
```shell
$ npm install waifuim.js
```

## Features
- Light Weight
- Promise Based
- Easy To Use

### Usage Examples

```javascript

const Waifu = require('waifuim.js');
const Client = new Waifu('Get your token @ https://waifu.im/dashboard/');
const Tags = Client.tags;

// Fetching Random Images:

Client.random({
  many: true,
  selected_tags: [Tags.raidenShogun]
})

// Viewing Favourited Images:

Client.favourites.view({
  user_id: '372786495867846656'
})

// Get Information About Certain Images:

Client.info({
  images: '8664e27dfd9ad62a' // Supports both Arrays & Lone Strings
})

```

- Please note that if you don't provide a token, not all functions will work as some require a token to access the API.

## License

MIT © [Seek](https://github.com/Seek0999/Waifu.im-JS/blob/master/LICENSE)
