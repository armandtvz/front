# front
A simple, lightweight front-end framework. This project is heavily influenced
by IBM's Carbon. 143.4 kB minified. 28 kB minified and gzipped.



## Why does this project exist?
- This framework aims to be lighter than a big framework but larger than a
  micro framework.
- I needed a framework for myself that is highly opinionated so I can get work
  done faster.
- I needed a collection of JS helpers.



## CSS reset
This framework uses [Normalize.css][3] as a CSS reset (v8).



## Grid
The Bootstrap grid is used (Bootstrap 5).


## Components

A list of components can be found in the docs.

However, I'm leaving a small note here on "transfer lists":

- Front will not implement the transfer list component -- such a component
  is only suitable for use on non-mobile screen sizes.



## Quickstart

1. Copy the files from the `dist` directory. Or use jsDelivr:
   ```html
   https://cdn.jsdelivr.net/gh/armandtvz/front@1.0.x/dist/front.min.css
   https://cdn.jsdelivr.net/gh/armandtvz/front@1.0.x/dist/front_head.min.js
   https://cdn.jsdelivr.net/gh/armandtvz/front@1.0.x/dist/front_body.min.js   
   https://cdn.jsdelivr.net/gh/armandtvz/front@1.0.x/dist/front.min.js
   ```

1. Add `front.min.css` to the `<head>` tag before your other styles.
   ```html
   <head>
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/armandtvz/front@1.0.x/dist/front.min.css">

           <!-- ... -->
   </head>
   ```

1. Add `front_head.min.js` before the closing `<head>` tag if you need browser
   JS detection or if you need a constant that stores the detected websocket
   protocol that should be used (`wss:` when `https:` and `ws:` when `http:`).
   The value is stored in `ws_scheme`:
   ```javascript
   console.log(ws_scheme);
   ```
   ```html
   <head>
           <!-- ... -->

           <script src="https://cdn.jsdelivr.net/gh/armandtvz/front@1.0.x/dist/front_head.min.js" charset="utf-8"></script>
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
   ```html
   <body>
           <script src="https://cdn.jsdelivr.net/gh/armandtvz/front@1.0.x/dist/front_body.min.js" charset="utf-8"></script>

           <!-- ... -->
   </body>
   ```

1. Add `front.min.js` before the closing `<body>` tag for all other scripts.
   ```html
   <body>
           <script src="https://cdn.jsdelivr.net/gh/armandtvz/front@1.0.x/dist/front.min.js" charset="utf-8"></script>

           <!-- ... -->
   </body>
   ```



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
