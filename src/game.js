import { k } from "./kaboom-context";
import { scaleFactor, dialogueData, initial_conversation, final_conversation, realDialogueData } from "./constants";
import { displayDialog, displayConversation } from "./dialogue";
import { setCamScale } from "./camera";
import { loadSprites } from "./sprites-loader";

loadSprites(k);

k.setBackground(k.Color.fromHex("#311047"));

k.scene("main", async () => {
  const mapData = await (await fetch("./assets/game/map.json")).json();
  const layers = mapData.layers;

  const map = k.add([
    k.sprite("map"),
    k.pos(0),
    k.scale(scaleFactor)
  ]);

  const player = k.make([
    k.sprite("birds", { anim: "fly" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10)}),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(1.5),
    {
      speed: 250,
      // direction: "down",
      isInDialogue: false
    },
    "player"
  ])

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height)}),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;
            displayDialog(dialogueData[boundary.name], () => {
              player.isInDialogue = false;
            });
          })
        }
      }

      continue;
    }

    if (layer.name === "spawnpoints") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor,
            (map.pos.y + entity.y) * scaleFactor
          );
          k.add(player);

          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  k.onMouseDown((mouseBtn) => {
    if (mouseBtn !== "left" || player.isInDialogue) 
      return;

    const worldMousePos = k.toWorld(k.mousePos());
    player.moveTo(worldMousePos, player.speed);

    const mouseAngle = player.pos.angle(worldMousePos);

    if (Math.abs(mouseAngle) > 90) {
      player.flipX = false;
      player.direction = "right";

      return;
    }

    if (Math.abs(mouseAngle) < 90) {
      player.flipX = true;
      player.direction = "left";

      return;
    }
  });

  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;
    if (player.isInDialogue) return;

    if (keyMap[0]) {
      player.flipX = false;
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      player.direction = "down";
      player.move(0, player.speed);
    }
  })

  // function stopAnimation() {
  //   if (player.direction === "down") {
  //     player.play("idle-down");

  //     return;
  //   }

  //   if (player.direction === "up") {
  //     player.play("idle-up");

  //     return;
  //   }

  //   player.play("idle-side");
  // }

  // k.onMouseRelease(stopAnimation);
  // k.onKeyRelease(stopAnimation);
});

k.scene("lose", () => {
	k.add([
    k.text("You Lose. Press any key to play again."),
	])
	k.onKeyPress(() => k.go("cat"))
})

k.scene("cat", async () => {
  k.setGravity(2000);

  const mapData = await (await fetch("./assets/game/cat-level-map.json")).json();
  const layers = mapData.layers;

  const map = k.add([
    k.sprite("cat-map"),
    k.pos(0),
    k.scale(scaleFactor / 2)
  ]);

  const player = k.make([
    k.sprite("cats", { anim: "idle-up" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10)}),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor / 2),
    {
      speed: 350,
      direction: "up",
      isInDialogue: false
    },
    "player"
  ])

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height)}),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          if (boundary.name === "portal") {
            player.onCollide("portal", () => {
              k.go("main");
            })
          }

          player.onBeforePhysicsResolve(collision => {
            if (collision.target.is(boundary.name) && player.isJumping()) {
                collision.preventResolution()
            }
          })
        }
      }

      continue;
    }

    if (layer.name === "spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor / 2,
            (map.pos.y + entity.y) * scaleFactor / 2
          );
          k.add(player);

          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y);
  });

  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("space"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;
    if (player.isInDialogue) return;

    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.direction = "up";
      return;
    }

    if (keyMap[3]) {
      if (player.isGrounded()) {
        if (player.curAnim() !== "jump") player.play("jump");
        player.direction = "up";


        player.jump(1100);
      }
    }
  })

  function stopAnimation() {
    if (player.direction === "up") {
      player.play("idle-up");

      return;
    }

    player.play("idle-side");
  }

  k.onKeyRelease(stopAnimation);

  const water = k.add([
    k.sprite("water"),
    k.area({ shape: new k.Rect(k.vec2(0, 0), mapData.height * mapData.tileheight,  mapData.width * mapData.tilewidth)}),
    k.anchor("topleft"),
    k.pos(0, mapData.height * mapData.tileheight * 2),
    k.scale(scaleFactor * 1.5),
    {
      speed: 25
    },
    "water"
  ]);

  k.loop(0.25, () => {
    water.pos.y = water.pos.y - water.speed;
  });

  player.onCollide("water", () => {
		k.go("lose");
	})
});

k.scene("classroom", async ({ isFinalScene }) => {
  const mapData = await (await fetch("./assets/game/classroom.json")).json();
  const layers = mapData.layers;

  const map = k.add([
    k.sprite("classroom-map"),
    k.pos(0),
    k.scale(scaleFactor / 6)
  ]);

  const player = k.make([
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10)}),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor / 6),
    "player"
  ]);

  for (const layer of layers) {
    if (layer.name === "spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor / 6,
            (map.pos.y + entity.y) * scaleFactor / 6
          );
          k.add(player);

          continue;
        }
      }
    }
  }

  k.wait(3, () => {
    if (isFinalScene) {
      displayConversation(final_conversation, () => {
        window.location.href = "/public/quiz";
      });
    }  else {
      displayConversation(initial_conversation, () => {
        k.go("cat");
      });
    }
  });

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y - 100);
  });
});

k.scene("desert", async () => {
  const mapData = await (await fetch("./assets/game/desert-map.json")).json();
  const layers = mapData.layers;

  const map = k.add([
    k.sprite("desert-map"),
    k.pos(0),
    k.scale(scaleFactor / 4)
  ]);

  const player = k.make([
    k.sprite("foxes", { anim: "idle-side" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10)}),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor / 4),
    {
      speed: 250,
      direction: "right",
      isInDialogue: false
    },
    "player"
  ]);

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height)}),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;

            displayDialog(realDialogueData[boundary.name], () => {
              player.isInDialogue = false;
            });
          })
        }
      }

      continue;
    }

    if (layer.name === "spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor / 4,
            (map.pos.y + entity.y) * scaleFactor / 4
          );
          k.add(player);

          continue;
        }
      }
    }
  }

  // k.onMouseDown((mouseBtn) => {
  //   if (mouseBtn !== "left" || player.isInDialogue) 
  //     return;

  //   const worldMousePos = k.toWorld(k.mousePos());
  //   player.moveTo(worldMousePos, player.speed);

  //   const mouseAngle = player.pos.angle(worldMousePos);

  //   if (Math.abs(mouseAngle) > 90) {
  //     player.flipX = false;
  //     player.direction = "right";

  //     return;
  //   }

  //   if (Math.abs(mouseAngle) < 90) {
  //     player.flipX = true;
  //     player.direction = "left";

  //     return;
  //   }
  // });

  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;
    if (player.isInDialogue) return;

    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      player.direction = "up";
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      player.direction = "down";
      if (player.curAnim() !== "walk-down") player.play("walk-down");
      player.move(0, player.speed);
    }
  })

  function stopAnimation() {
    if (player.direction === "down") {
      player.play("idle-down");

      return;
    }

    if (player.direction === "up") {
      player.play("idle-up");

      return;
    }

    player.play("idle-side");
  }

  // k.onMouseRelease(stopAnimation);
  k.onKeyRelease(stopAnimation);
});

k.scene("parking", async () => {
  const mapData = await (await fetch("./assets/game/parking.json")).json();
  const layers = mapData.layers;

  const map = k.add([
    k.sprite("parking"),
    k.pos(0),
    k.scale(scaleFactor/4)
  ]);

  const player = k.make([
    k.sprite("cats", { anim: "idle-up" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10)}),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor / 2),
    {
      speed: 350,
      direction: "up",
      isInDialogue: false
    },
    "player"
  ])

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height)}),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          if (boundary.name === "portal") {
            player.onCollide("portal", () => {
              k.go("main");
            })
          }
        }
      }

      continue;
    }

    if (layer.name === "spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor / 2,
            (map.pos.y + entity.y) * scaleFactor / 2
          );
          k.add(player);

          continue;
        }
      }
    }
  }

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y);
  });

  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("space"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;
    if (player.isInDialogue) return;

    if (keyMap[0]) {
      player.flipX = false;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      if (player.curAnim() !== "walk-side") player.play("walk-side");
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      if (player.curAnim() !== "walk-up") player.play("walk-up");
      player.direction = "up";
      return;
    }

    if (keyMap[3]) {
      if (player.isGrounded()) {
        if (player.curAnim() !== "jump") player.play("jump");
        player.direction = "up";


        player.jump(1100);
      }
    }
  })

  function stopAnimation() {
    if (player.direction === "down") {
      player.play("idle-down");

      return;
    }

    if (player.direction === "up") {
      player.play("idle-up");

      return;
    }

    player.play("idle-side");
  }

  k.onKeyRelease(stopAnimation);
});

k.scene("forest", async () => {
  const mapData = await (await fetch("./assets/game/maze-of-trees.json")).json();
  const layers = mapData.layers;

  const map = k.add([
    k.sprite("forest"),
    k.pos(0),
    k.scale(scaleFactor / 2)
  ]);

  const player = k.make([
    k.sprite("birds", { anim: "fly" }),
    k.area({ shape: new k.Rect(k.vec2(0, 3), 10, 10)}),
    k.body(),
    k.anchor("center"),
    k.pos(),
    k.scale(scaleFactor / 2),
    {
      speed: 450,
      direction: "right",
      isInDialogue: false
    },
    "player"
  ]);

  setCamScale(k);

  k.onResize(() => {
    setCamScale(k);
  });

  k.onUpdate(() => {
    k.camPos(player.pos.x, player.pos.y + 100);
  });

  for (const layer of layers) {
    if (layer.name === "boundaries") {
      for (const boundary of layer.objects) {
        map.add([
          k.area({ shape: new k.Rect(k.vec2(0), boundary.width, boundary.height)}),
          k.body({ isStatic: true }),
          k.pos(boundary.x, boundary.y),
          boundary.name,
        ]);

        if (boundary.name) {
          player.onCollide(boundary.name, () => {
            player.isInDialogue = true;

            displayDialog(realDialogueData[boundary.name], () => {
              player.isInDialogue = false;
            });
          })
        }
      }

      continue;
    }

    if (layer.name === "spawnpoint") {
      for (const entity of layer.objects) {
        if (entity.name === "player") {
          player.pos = k.vec2(
            (map.pos.x + entity.x) * scaleFactor / 2,
            (map.pos.y + entity.y) * scaleFactor / 2
          );
          k.add(player);

          continue;
        }

        // if (entity.name === "tree") {
        //   k.add([
        //     k.sprite("forest"),
        //     k.pos(0),
        //     k.scale(scaleFactor / 4)
        //   ]);
        //   player.pos = k.vec2(
        //     (map.pos.x + entity.x) * scaleFactor / 4,
        //     (map.pos.y + entity.y) * scaleFactor / 4
        //   );
        //   k.add(player);

        //   continue;
        // }
      }
    }
  }

  k.onKeyDown((key) => {
    const keyMap = [
      k.isKeyDown("right"),
      k.isKeyDown("left"),
      k.isKeyDown("up"),
      k.isKeyDown("down"),
    ];

    let nbOfKeyPressed = 0;
    for (const key of keyMap) {
      if (key) {
        nbOfKeyPressed++;
      }
    }

    if (nbOfKeyPressed > 1) return;
    if (player.isInDialogue) return;

    if (keyMap[0]) {
      player.flipX = false;
      player.direction = "right";
      player.move(player.speed, 0);
      return;
    }

    if (keyMap[1]) {
      player.flipX = true;
      player.direction = "left";
      player.move(-player.speed, 0);
      return;
    }

    if (keyMap[2]) {
      player.direction = "up";
      player.move(0, -player.speed);
      return;
    }

    if (keyMap[3]) {
      player.direction = "down";
      player.move(0, player.speed);
    }
  });
});


k.go("classroom", { isFinalScene: false });