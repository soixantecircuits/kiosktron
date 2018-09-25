# kiosktron 🤖

> A kiosk app that rotates on URL list

## Why ?

Because you want to test url trhough Electron and see how it works.
Because, you want to automatically test a series of URL and see how they run.
Because, you just want to run your site in an electron process and make sure you catch errors
Because, you'd like to control remotely a browser and display it in fullscreen on Windows, macOS and Linux.

## Features

- timer to automatically change url from settings
- error logged if issue arised
- library integration

## Usage

Feel the URL list in `settings/settings.json` and choose a timeout between each of the URL :

```json
{
  "app": {
    "sites": [
        "file://Users/gabrielstuff/Downloads/faceDemo/index.html",
        "https://threejs.org/examples/#webgl_animation_cloth",
        "https://threejs.org/examples/?q=shado#webgl_shadowmap_performance",
        "https://codepen.io/",
        "https://tympanus.net/Tutorials/TheAviator/",
        "https://gl-transitions.com/"
    ]
  },
  "durations": {
    "intervalRotation": 10000
  }
}
```

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```

## Support library injection

Should support library injection :
https://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined