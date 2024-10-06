export function loadSprites(k) {
  k.loadSound("hit", "./assets/audios/buzzer.mp3");

  k.loadSprite("spritesheet", "./assets/game/spritesheet.png", {
    sliceX: 39,
    sliceY: 31,
    anims: {
      "idle-down": 936,
      "walk-down": { from: 936, to: 939, loop: true, speed: 8 },
      "idle-side": 975,
      "walk-side": { from: 975, to: 978, loop: true, speed: 8 },
      "idle-up": 1014,
      "walk-up": { from: 1014, to: 1017, loop: true, speed: 8 },
    }
  });

  k.loadSprite("map", "./assets/game/map.png");

  k.loadSprite("cat-map", "./assets/game/cat-level-map.png");

  k.loadSprite("parking", "./assets/game/parking.png");

  k.loadSprite("cats", "./assets/game/cats.png", {
    sliceX: 9,
    sliceY: 6,
    anims: {
      "idle-up": 8,
      "walk-up": { from: 0, to: 7, loop: true, speed: 8 },
      "idle-down": { from: 45, to: 53, loop: true, speed: 8 },
      "walk-down": { from: 9, to: 16, loop: true, speed: 8 },
      "idle-side": { from: 27, to: 35, loop: true, speed: 8 },
      "walk-side": { from: 18, to: 25, loop: true, speed: 8 },
      "jump": 40,
    }
  });

  k.loadSprite("water", "./assets/game/water.png");

  k.loadSprite("classroom-map", "./assets/game/classroom.png");

  k.loadSprite("desert-map", "./assets/game/desert-map.png");

  k.loadSprite("foxes", "./assets/game/foxes.png", {
    sliceX: 3,
    sliceY: 3,
    anims: {
      "idle-down": 1,
      "walk-down": { from: 0, to: 2, loop: true, speed: 8 },
      "idle-up": 7,
      "walk-up": { from: 6, to: 8, loop: true, speed: 8 },
      "idle-side": 4,
      "walk-side": { from: 3, to: 5, loop: true, speed: 8 },
    }
  });

  k.loadSprite("forest", "./assets/game/maze-of-trees.png");

  k.loadSprite("birds", "./assets/game/birds.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      "fly": { from: 0, to: 3, loop: true, speed: 8 },
    }
  });
}