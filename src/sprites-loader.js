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
  
  
  k.loadSprite("birds", "./assets/game/birds.png", {
    sliceX: 4,
    sliceY: 1,
    anims: {
      "fly": { from: 0, to: 3, loop: true, speed: 8 },
    }
  });
  
  k.loadSprite("map", "./assets/game/map.png");

  k.loadSprite("cat-map", "./assets/game/cat-level-map.png");

  k.loadSprite("cats", "./assets/game/cats.png", {
    sliceX: 10,
    sliceY: 5,
    anims: {
      "idle-up": { from: 0, to: 9, loop: true, speed: 8 },
      "walk-up": { from: 10, to: 19, loop: true, speed: 8 },
      "idle-side": { from: 43, to: 49, loop: true, speed: 8 },
      "walk-side": { from: 30, to: 37, loop: true, speed: 8 },
      "jump": 26,
    }
  });

  k.loadSprite("water", "./assets/game/water.png");

  k.loadSprite("classroom-map", "./assets/game/classroom.png");
}