# Generic-rrweb-recorder

![](https://img.badgesize.io/Telecom-Paris/generic-rrweb-recorder-ui/master/srcs/recorder-ui.js)
![](https://img.badgesize.io/Telecom-Paris/generic-rrweb-recorder/master/srcs/recorder-ui.js?compression=gzip)

### What is generic-rrweb-recorder ?

Generic-rrweb-recorder is a tool to record the dom of a web page as well as the sound of the microphone.

The advantage compared to a video?

You can copy/paste the text, and the files are extremely light!

Test it [here](https://telecom-paris.github.io/generic-rrweb-recorder-ui/example.html)

### Cloning this repo

This repo is using submodules.

Do not forget to clone the repo using ```--recursive``` option

```
git clone --recursive https://github.com/Telecom-Paris/generic-rrweb-recorder-ui.git
```

To test it, you need to use a server, due to security reasons.

### How to install it ?

Just include a line in the header of your website :

(or at the bottom of the body if you want your website to load faster)

```
<script type="text/javascript" src="path/to/recorder-ui.js"></script>
```

See the [example](./example.html) page for more info

### Customize it as you want:

The script has a basic configuration, but here is what you can customize:
- Path to the script folder /!\ should end with a ```/``` /!\ (default is **generic-rrweb-recorder**)
- if script is lauching when page is loaded (default is **true**)
- position (default is **"bottom-right"**)
  list of available position:
  - bottom
  - bottom-right
  - bottom-left
  - top
  - top-right
  - top-left
  - middle
  - middle-right
  - middle-left
- if the buttons are movable (default is **true**)
- if the log is printed or not (default is **true**)
- Color of the record Button (The main Button) (default is **red**);
- Color of the pause / download Button (default is **yellow**);

### More documentation

To build the documentation, you need [jsdoc](https://jsdoc.app/index.html).

Once installed, you can build the documentation using:
```jsdoc srcs/*.js README.md -d docs/generated-doc/```

You will find it under the docs folder, in HTML format. ([here](docs/generated-doc))
You can also find answers to common questions [here](docs/FAQ.md)

### The minified version

### Licences and credits

This project use the following libraries:

[rrweb](https://github.com/rrweb-io/rrweb)

[jszip](https://github.com/Stuk/jszip)

[WebAudioRecorder](https://github.com/higuma/web-audio-recorder-js)

[ConcatenateBlob](https://github.com/muaz-khan/ConcatenateBlobs)

[simple-mp3-cutter](https://github.com/lubenard/simple-mp3-cutter)

Because the images we use are free, here is the websites where we found them:
- https://www.flaticon.com
- https://material.io/resources/icons
- https://icons8.com/
