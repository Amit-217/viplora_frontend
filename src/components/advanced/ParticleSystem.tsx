import { component$, useSignal, useTask$ } from '@builder.io/qwik';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  size?: number;
  speed?: number;
  color?: string;
}

export default component$<ParticleSystemProps>(
  ({ count = 1000, size = 0.05, speed = 0.0001, color = '#00D9FF' }) => {
    const canvasRef = useSignal<HTMLCanvasElement>();

    // eslint-disable-next-line qwik/no-use-visible-task
    useTask$(async () => {
      if (!canvasRef.value) return;

      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvasRef.value.clientWidth / canvasRef.value.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });

      renderer.setSize(canvasRef.value.clientWidth, canvasRef.value.clientHeight);
      renderer.setClearColor(0x000000, 0.0);
      renderer.setPixelRatio(window.devicePixelRatio);
      camera.position.z = 75;

      // Create particles
      const geometry = new THREE.BufferGeometry();
      const posArray = new Float32Array(count * 3);
      const velocityArray = new Float32Array(count * 3);

      for (let i = 0; i < count * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 200;
        posArray[i + 1] = (Math.random() - 0.5) * 200;
        posArray[i + 2] = (Math.random() - 0.5) * 200;

        velocityArray[i] = (Math.random() - 0.5) * 2;
        velocityArray[i + 1] = (Math.random() - 0.5) * 2;
        velocityArray[i + 2] = (Math.random() - 0.5) * 2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      geometry.setAttribute('velocity', new THREE.BufferAttribute(velocityArray, 3));

      const material = new THREE.PointsMaterial({
        size: size,
        color: color,
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

        // Update particle positions
        const positions = geometry.attributes.position.array as Float32Array;
        const velocities = geometry.attributes.velocity.array as Float32Array;

        for (let i = 0; i < count * 3; i += 3) {
          positions[i] += velocities[i] * speed * 100;
          positions[i + 1] += velocities[i + 1] * speed * 100;
          positions[i + 2] += velocities[i + 2] * speed * 100;

          // Wrap around
          if (Math.abs(positions[i]) > 100) velocities[i] *= -1;
          if (Math.abs(positions[i + 1]) > 100) velocities[i + 1] *= -1;
          if (Math.abs(positions[i + 2]) > 100) velocities[i + 2] *= -1;
        }

        geometry.attributes.position.needsUpdate = true;

        // Rotate particles
        particles.rotation.x += speed * 0.01;
        particles.rotation.y += speed * 0.02;

        renderer.render(scene, camera);
      };

      animate();

      // Handle resize
      const handleResize = () => {
        const width = canvasRef.value!.clientWidth;
        const height = canvasRef.value!.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      };
    });

    return (
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    );
  }
);