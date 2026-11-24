'use client';

import { useRef, useEffect, useState } from 'react';

interface SceneProps {
  scrollProgress: number;
}

export default function Scene({ scrollProgress }: SceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<{
    renderer: any;
    scene: any;
    camera: any;
    mesh: any;
    wireframe: any;
    animId: number;
    t: number;
  } | null>(null);
  const scrollRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetRotRef = useRef({ x: 0, y: 0 });
  const currentRotRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const dragDeltaRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (!mounted || !mountRef.current) return;
    let cancelled = false;

    const init = async () => {
      const THREE = await import('three');
      if (cancelled || !mountRef.current) return;

      const container = mountRef.current;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(w, h);
      renderer.setClearColor(0x000000, 0);
      renderer.domElement.style.position = 'absolute';
      renderer.domElement.style.inset = '0';
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      renderer.domElement.style.cursor = 'grab';
      container.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, w / h, 0.1, 100);
      camera.position.set(0, 0, 5);

      const geo = new THREE.IcosahedronGeometry(1.5, 4);

      const loader = new THREE.TextureLoader();
      const nightTex = await new Promise<any>((resolve) => {
        loader.load('/earth_night.jpg', resolve, undefined, () => resolve(null));
      });

      const mat = new THREE.MeshStandardMaterial({
        map: nightTex ?? undefined,
        color: nightTex ? 0xffffff : 0x3a342a,
        roughness: 0.35,
        metalness: 0.7,
        emissiveMap: nightTex ?? undefined,
        emissive: new THREE.Color(0xc8a060),
        emissiveIntensity: 0.8,
        transparent: false,
      });

      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      const wireGeo = new THREE.IcosahedronGeometry(1.52, 4);
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0xc8a870,
        wireframe: true,
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
      });
      const wireframe = new THREE.Mesh(wireGeo, wireMat);
      scene.add(wireframe);

      scene.add(new THREE.AmbientLight(0xffffff, 0.4));
      const key = new THREE.DirectionalLight(0xd4b896, 2.2);
      key.position.set(4, 5, 4);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0x9090a0, 0.6);
      fill.position.set(-4, -3, -3);
      scene.add(fill);
      const pt = new THREE.PointLight(0xc8a060, 1.8, 14);
      pt.position.set(2, 2, 3);
      scene.add(pt);

      stateRef.current = { renderer, scene, camera, mesh, wireframe, animId: 0, t: 0 };

      // ── Mouse / touch handlers ──────────────────────────────────────
      const el = renderer.domElement;

      const onMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        // Hover: normalised -1 → +1 from centre
        mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseRef.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

        if (isDraggingRef.current) {
          const dx = e.clientX - lastMouseRef.current.x;
          const dy = e.clientY - lastMouseRef.current.y;
          dragDeltaRef.current.x += dy * 0.008;
          dragDeltaRef.current.y += dx * 0.008;
          lastMouseRef.current = { x: e.clientX, y: e.clientY };
          el.style.cursor = 'grabbing';
        }
      };

      const onMouseDown = (e: MouseEvent) => {
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
        el.style.cursor = 'grabbing';
      };

      const onMouseUp = () => {
        isDraggingRef.current = false;
        el.style.cursor = 'grab';
      };

      // Touch support
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) {
          isDraggingRef.current = true;
          lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const onTouchMove = (e: TouchEvent) => {
        if (isDraggingRef.current && e.touches.length === 1) {
          const dx = e.touches[0].clientX - lastMouseRef.current.x;
          const dy = e.touches[0].clientY - lastMouseRef.current.y;
          dragDeltaRef.current.x += dy * 0.008;
          dragDeltaRef.current.y += dx * 0.008;
          lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };

      const onTouchEnd = () => { isDraggingRef.current = false; };

      el.addEventListener('mousemove', onMouseMove);
      el.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mousemove', onMouseMove);
      el.addEventListener('touchstart', onTouchStart, { passive: true });
      el.addEventListener('touchmove', onTouchMove, { passive: true });
      el.addEventListener('touchend', onTouchEnd);

      const onResize = () => {
        if (!mountRef.current || !stateRef.current) return;
        const cw = mountRef.current.clientWidth;
        const ch = mountRef.current.clientHeight;
        stateRef.current.renderer.setSize(cw, ch);
        stateRef.current.camera.aspect = cw / ch;
        stateRef.current.camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', onResize);

      const tick = () => {
        if (cancelled) return;
        const s = stateRef.current!;
        s.animId = requestAnimationFrame(tick);
        s.t += 0.008;

        const sp = scrollRef.current;

        // Hover tilt: smoothly follow mouse position
        targetRotRef.current.x = mouseRef.current.y * 0.25;
        targetRotRef.current.y = mouseRef.current.x * 0.35;

        // Lerp current rotation toward target (hover)
        currentRotRef.current.x += (targetRotRef.current.x - currentRotRef.current.x) * 0.05;
        currentRotRef.current.y += (targetRotRef.current.y - currentRotRef.current.y) * 0.05;

        // Drag accumulates into dragDelta, lerp it in and decay slowly
        dragDeltaRef.current.x *= 0.97;
        dragDeltaRef.current.y *= 0.97;

        // Final rotation = auto-spin + hover tilt + drag offset
        s.mesh.rotation.x = s.t * 0.20 + sp * 0.5 + currentRotRef.current.x + dragDeltaRef.current.x;
        s.mesh.rotation.y = s.t * 0.28 + sp * 0.8 + currentRotRef.current.y + dragDeltaRef.current.y;
        s.wireframe.rotation.x = s.mesh.rotation.x;
        s.wireframe.rotation.y = s.mesh.rotation.y;

        const scale = Math.max(0.1, 1 - sp * 0.35);
        s.mesh.scale.setScalar(scale);
        s.wireframe.scale.setScalar(scale);
        s.mesh.position.y = sp * 2;
        s.wireframe.position.y = s.mesh.position.y;

        s.renderer.render(s.scene, s.camera);
      };
      tick();

      return () => {
        window.removeEventListener('resize', onResize);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mousemove', onMouseMove);
        el.removeEventListener('mousedown', onMouseDown);
        el.removeEventListener('touchstart', onTouchStart);
        el.removeEventListener('touchmove', onTouchMove);
        el.removeEventListener('touchend', onTouchEnd);
      };
    };

    init();

    return () => {
      cancelled = true;
      if (stateRef.current) {
        cancelAnimationFrame(stateRef.current.animId);
        stateRef.current.renderer.dispose();
        if (mountRef.current && stateRef.current.renderer.domElement.parentNode === mountRef.current) {
          mountRef.current.removeChild(stateRef.current.renderer.domElement);
        }
        stateRef.current = null;
      }
    };
  }, [mounted]);

  const opacity = Math.max(0, 1 - scrollProgress * 2.2);

  if (!mounted) return null;

  return (
    <div
      ref={mountRef}
      className="absolute inset-0"
      style={{ opacity, transition: 'opacity 0.1s linear' }}
    />
  );
}
