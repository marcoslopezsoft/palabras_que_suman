import confetti from 'canvas-confetti';

export const triggerPastelConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#F472B6', '#C084FC', '#FDE047', '#6EE7B7', '#E879F9', '#38BDF8', '#FDA4AF'],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const triggerHeartConfetti = () => {
  confetti({
    particleCount: 40,
    spread: 60,
    origin: { y: 0.8 },
    colors: ['#F43F5E', '#EC4899', '#FB7185', '#FDA4AF'],
    shapes: ['circle'],
    scalar: 1.2,
  });
};
