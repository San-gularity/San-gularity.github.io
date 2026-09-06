// A little pixel climber that dangles off the cursor on a rope.
//
// It is a verlet pendulum: the cursor is the anchor, the climber is a bob held
// at a fixed rope length, so it swings and settles on its own as you move.
// Decorative only — aria-hidden, pointer-events: none, and it never renders on
// a touch screen or for anyone who asked for reduced motion.

const ROPE_LENGTH = 54;
const GRAVITY = 1.1;
const FRICTION = 0.94;

const coarsePointer = matchMedia('(pointer: coarse)').matches;
const stillPlease = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!coarsePointer && !stillPlease) {
  const NS = 'http://www.w3.org/2000/svg';

  const rope = document.createElementNS(NS, 'svg');
  rope.setAttribute('class', 'climber__rope');
  rope.setAttribute('aria-hidden', 'true');
  const line = document.createElementNS(NS, 'line');
  rope.append(line);

  // An original 8-bit climber — helmet, scarf, boots — not a licensed character.
  const climber = document.createElementNS(NS, 'svg');
  climber.setAttribute('class', 'climber');
  climber.setAttribute('viewBox', '0 0 11 14');
  climber.setAttribute('aria-hidden', 'true');
  climber.innerHTML = [
    '<g fill="var(--coin)"><rect x="3" y="0" width="5" height="2"/><rect x="2" y="1" width="7" height="1"/></g>',
    '<g fill="#f0c9a0"><rect x="3" y="2" width="5" height="3"/></g>',
    '<g fill="var(--frame)"><rect x="4" y="3" width="1" height="1"/><rect x="6" y="3" width="1" height="1"/></g>',
    '<g fill="#e0564f"><rect x="2" y="5" width="7" height="1"/></g>',
    '<g fill="var(--accent)"><rect x="3" y="6" width="5" height="4"/><rect x="2" y="6" width="1" height="3"/><rect x="8" y="6" width="1" height="3"/></g>',
    '<g fill="#3c4252"><rect x="3" y="10" width="2" height="3"/><rect x="6" y="10" width="2" height="3"/></g>',
    '<g fill="var(--frame)"><rect x="2" y="13" width="3" height="1"/><rect x="6" y="13" width="3" height="1"/></g>',
  ].join('');

  document.body.append(rope, climber);

  let anchorX = innerWidth / 2;
  let anchorY = innerHeight / 3;
  let x = anchorX;
  let y = anchorY + ROPE_LENGTH;
  let previousX = x;
  let previousY = y;
  let seen = false;

  addEventListener(
    'pointermove',
    (event) => {
      if (event.pointerType === 'touch') return;
      anchorX = event.clientX;
      anchorY = event.clientY;
      if (!seen) {
        // Drop in under the cursor instead of flying across the page.
        seen = true;
        x = previousX = anchorX;
        y = previousY = anchorY + ROPE_LENGTH;
      }
    },
    { passive: true },
  );

  function frame() {
    // Verlet integration: velocity is implied by the last two positions.
    const nextX = x + (x - previousX) * FRICTION;
    const nextY = y + (y - previousY) * FRICTION + GRAVITY;
    previousX = x;
    previousY = y;
    x = nextX;
    y = nextY;

    // Hold the rope taut: pull the climber back onto the circle around the cursor.
    const dx = x - anchorX;
    const dy = y - anchorY;
    const distance = Math.hypot(dx, dy) || 1;
    const correction = (distance - ROPE_LENGTH) / distance;
    x -= dx * correction;
    y -= dy * correction;

    // Hang from the rope rather than staying bolt upright.
    const swing = Math.atan2(x - anchorX, y - anchorY) * (180 / Math.PI);
    climber.style.transform = `translate(${x}px, ${y}px) rotate(${-swing}deg)`;
    line.setAttribute('x1', anchorX);
    line.setAttribute('y1', anchorY);
    line.setAttribute('x2', x);
    line.setAttribute('y2', y);

    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
