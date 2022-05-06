# front
A simple, lightweight front-end framework. This project is heavily influenced
by IBM's Carbon.



## Why does this project exist?
- This framework aims to be lighter than a big framework but larger than a
  micro framework.
- I needed a framework for myself that is highly opinionated so I can get work
  done faster.



## CSS reset
This framework uses [Normalize.css][3] as a CSS reset (v8).



## Grid
The Bootstrap grid is used (Bootstrap 5).



## Quickstart

1. Copy the files from the `dist` directory.

1. Add `front.min.css` to the `<head>` tag before your other styles.
   ```html
   <head>
           <link rel="stylesheet" href="front.min.css">

           <!-- ... -->
   </head>
   ```

1. Add `front_head.min.js` before the closing `<head>` tag if you need browser
   JS detection or if you need a constant that stores the detected websocket
   protocol that should be used (`wss:` when `https:` and `ws:` when `http:`).
   The value is stored in `ws.scheme`:
   ```javascript
   console.log(ws.scheme);
   ```
   ```html
   <head>
           <!-- ... -->

           <script src="front_head.min.js" charset="utf-8"></script>
   </head>
   ```

   Also, for JS browser detection add the `no-js` class to the `<html>` tag.
   `no-js` will be replaced with `js` when Javascript is supported or when
   not disabled in the browser. Modernizr is used for this.
   ```html
   <html class="no-js">
   </html>
   ```

1. Add `front_body.min.js` after the opening `<body>` tag for dark/light theme
   related scripts. This script checks the `prefers-color-scheme: dark` and
   `prefers-color-scheme: light` media queries and sets the class on the `<body>`
   tag accordingly.
   ```css
   /* CSS class used for dark theme */
   .dark-theme {}
   ```

1. Add `front.min.js` before the closing `<body>` tag for all other scripts.



## Compatiblity
This framework does not support Internet Explorer or Opera Mini.



## Versioning
This project follows [semantic versioning][7] (SemVer).



## License and code of conduct
Check the root of the repo for these files.








[//]: # (Links)


[3]: https://github.com/necolas/normalize.css/
[4]: https://www.vitsoe.com/rw/about/good-design
[5]: https://en.wiktionary.org/wiki/classitis
[6]: https://hackernoon.com/bem-should-not-exist-6414005765d6
[7]: https://semver.org/
