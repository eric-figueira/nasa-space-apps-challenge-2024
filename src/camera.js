export function setCamScale(k) {
  const resizeFactor = k.width() / k.height();

  if (resizeFactor < 1) {
    k.camScale(k.vec2(1));

    return;
  } 

  k.camScale(k.vec2(1.5));
}