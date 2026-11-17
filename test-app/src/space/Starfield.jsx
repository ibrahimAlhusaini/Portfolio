import { useEffect, useRef } from 'react';

const random = (minimum, maximum) => minimum + Math.random() * (maximum - minimum);
const wrap = (value, size) => ((value % size) + size) % size;

export default function Starfield({ paused }) {
  const canvasRef = useRef(null);
  const updatePlayback = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const stars = Array.from({ length: 170 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: random(0.25, 1.7),
      brightness: random(0.18, 0.83),
      depth: random(0.25, 1),
      phase: random(0, Math.PI * 2),
    }));
    const rocks = Array.from({ length: 15 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: random(1.2, 4.4),
      speed: random(8, 28),
      angle: random(0, Math.PI * 2),
      vertices: Array.from({ length: 7 }, () => random(0.65, 1.2)),
    }));

    let width = 1;
    let height = 1;
    let elapsed = 0;
    let previousTime;
    let frame;

    function draw() {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const x = wrap(star.x * width - elapsed * star.depth * 2.8, width);
        const y = wrap(star.y * height + elapsed * star.depth * 1.1, height);
        context.beginPath();
        context.arc(x, y, star.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(215, 229, 255, ${star.brightness * (0.78 + 0.22 * Math.sin(elapsed * 1.4 + star.phase))})`;
        context.fill();
      }

      for (const rock of rocks) {
        const x = wrap(rock.x * width - elapsed * rock.speed, width + 36) - 18;
        const y = wrap(rock.y * height + elapsed * rock.speed * 0.29, height + 36) - 18;
        context.save();
        context.translate(x, y);
        context.rotate(rock.angle + elapsed * 0.26);
        context.beginPath();
        rock.vertices.forEach((vertex, index) => {
          const angle = index * Math.PI * 2 / rock.vertices.length;
          context.lineTo(Math.cos(angle) * rock.size * vertex, Math.sin(angle) * rock.size * vertex);
        });
        context.closePath();
        const surface = context.createLinearGradient(-rock.size, -rock.size, rock.size, rock.size);
        surface.addColorStop(0, '#837e94');
        surface.addColorStop(0.6, '#343344');
        surface.addColorStop(1, '#11121e');
        context.fillStyle = surface;
        context.fill();
        context.strokeStyle = 'rgba(174, 163, 185, .25)';
        context.lineWidth = 0.6;
        context.stroke();
        context.restore();
      }

      const streak = elapsed % 9;
      if (streak > 2.9 && streak < 4.05) {
        const progress = (streak - 2.9) / 1.15;
        const offset = Math.floor(elapsed / 9) % 3;
        const x = width * (0.96 - progress * 0.74);
        const y = height * (0.07 + offset * 0.15 + progress * 0.27);
        const tail = context.createLinearGradient(x, y, x + 100, y - 31);
        tail.addColorStop(0, `rgba(244, 225, 208, ${Math.sin(progress * Math.PI)})`);
        tail.addColorStop(1, 'transparent');
        context.strokeStyle = tail;
        context.lineWidth = 1.5;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 100, y - 31);
        context.stroke();
      }
    }

    function resize() {
      width = canvas.clientWidth || 1;
      height = canvas.clientHeight || 1;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }

    function animate(timestamp) {
      if (previousTime !== undefined) elapsed += Math.min((timestamp - previousTime) / 1000, 0.05);
      previousTime = timestamp;
      draw();
      frame = window.requestAnimationFrame(animate);
    }

    updatePlayback.current = (isPaused) => {
      window.cancelAnimationFrame(frame);
      previousTime = undefined;
      if (!isPaused) frame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    return () => {
      updatePlayback.current = null;
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    updatePlayback.current?.(paused);
  }, [paused]);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
