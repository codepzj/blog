---
title: particles库实现粒子效果
tags: [css]
categories: [技术分享]
permalink: posts/15.html
excerpt: 本文介绍了一个粒子动画效果的库--particles.js，包括实现的源码和效果。
poster:
  topic: null
  headline: particles库实现粒子效果
  caption: null
  color: null
date: 2024-10-09 01:57:28
updated: 2024-10-09 01:57:28
topic:
references:
repo: VincentGarreau/particles.js
---

今天分享一个粒子动画效果的库 -- particles.js

实现源码：

{% folders %}

<!-- folder index.html -->

```html index.html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>particles demo</title>
    <link rel="stylesheet" href="main.css" />
  </head>
  <body>
    <div id="particles-js"></div>
  </body>
</html>
<script type="text/javascript" src="particles.js"></script>
<script type="text/javascript" src="app.js"></script>
```

<!-- folder main.css -->

```css main.css
* {
  margin: 0;
  padding: 0;
}

#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #b61924;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
}
```

<!-- folder app.js -->

```js app.js
/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load("particles-js", "particles.json");
```

<!-- folder particles.json -->

```json particles.json
{
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 10,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 80,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 300,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 2
    },
    "move": {
      "enable": true,
      "speed": 12,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": false,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 800,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 800,
        "size": 80,
        "duration": 2,
        "opacity": 0.8,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}
```

{% endfolders %}

实现效果和[codepen 的 demo](http://codepen.io/VincentGarreau/pen/pnlso)效果类似
