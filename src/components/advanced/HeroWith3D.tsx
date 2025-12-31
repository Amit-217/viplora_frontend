import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import * as THREE from 'three';

export default component$(() => {
  const canvasRef = useSignal<HTMLCanvasElement>();

  // eslint-disable-next-line qwik/no-use-visible-task
  useTask$(async () => {
    if (!canvasRef.value) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.value,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0.1);
    renderer.setPixelRatio(window.devicePixelRatio);
    camera.position.z = 5;

    // Particle system
    const particleCount = 1500;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);

    // Create particles
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;

      // Color gradient from cyan to purple
      const hue = Math.random();
      const color = new THREE.Color().setHSL(hue * 0.2 + 0.5, 1, 0.5);
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }

    // Geometry and material
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const material = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      opacity: 0.8,
      transparent: true,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate particles
      particles.rotation.x += 0.0001;
      particles.rotation.y += 0.0002;
      particles.rotation.z += 0.00005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  });

  return (
    <section class="relative min-h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        class="absolute inset-0 h-full w-full"
      />

      {/* Content overlay */}
      <div class="relative z-10 flex h-screen flex-col items-center justify-center px-4">
        <div class="text-center">
          <h1 class="font-display text-6xl font-bold leading-tight lg:text-8xl">
            <span class="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Future
            </span>
            <br />
            <span class="text-white">Technology</span>
          </h1>
          <p class="mt-6 text-xl text-neutral-300 lg:text-2xl">
            Powered by cutting-edge innovation
          </p>
        </div>
      </div>
    </section>
  );
});