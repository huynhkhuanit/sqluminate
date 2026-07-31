"use client";

import { useEffect, useRef, useState } from "react";
import type { BufferGeometry, Material, WebGLRenderer } from "three";

type SceneState = "loading" | "ready" | "error";

const sourceLabels = [
  { name: "products", className: "scene-label scene-label-products" },
  { name: "segments", className: "scene-label scene-label-segments" },
  { name: "addresses", className: "scene-label scene-label-addresses" },
  { name: "customers", className: "scene-label scene-label-customers" },
  { name: "orders", className: "scene-label scene-label-orders" },
  { name: "campaigns", className: "scene-label scene-label-campaigns" },
  { name: "payments", className: "scene-label scene-label-payments" },
  { name: "order_items", className: "scene-label scene-label-order-items" },
] as const;

export function SqlNodeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [sceneState, setSceneState] = useState<SceneState>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;

    if (!canvas || !frame) {
      return;
    }

    const sceneCanvas = canvas;
    const sceneFrame = frame;

    let renderer: WebGLRenderer | undefined;
    let animationFrame = 0;
    let isAnimating = false;
    let isDisposed = false;
    let isSceneVisible = true;
    let removeInteractionListeners: () => void = () => undefined;
    let disconnectResizeObserver: () => void = () => undefined;
    let disconnectVisibilityObserver: () => void = () => undefined;
    const geometries = new Set<BufferGeometry>();
    const materials = new Set<Material>();

    async function mountScene() {
      try {
        const THREE = await import("three");

        if (isDisposed) {
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0.15, 7.4);

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas: sceneCanvas,
          powerPreference: "high-performance",
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setClearColor(0x000000, 0);

        const nodeField = new THREE.Group();
        nodeField.rotation.x = -0.08;
        scene.add(nodeField);

        const ambientLight = new THREE.AmbientLight(0xbefde2, 1.5);
        const keyLight = new THREE.PointLight(0x7cf2c3, 22, 10);
        keyLight.position.set(1.5, 2.5, 4);
        const rimLight = new THREE.PointLight(0xd9f99d, 12, 8);
        rimLight.position.set(-3, -1.5, 2);
        scene.add(ambientLight, keyLight, rimLight);

        const coreGeometry = new THREE.IcosahedronGeometry(0.92, 5);
        const coreMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x7cf2c3,
          emissive: 0x174d38,
          emissiveIntensity: 0.85,
          metalness: 0.05,
          opacity: 0.84,
          roughness: 0.22,
          transparent: true,
        });
        geometries.add(coreGeometry);
        materials.add(coreMaterial);
        const core = new THREE.Mesh(coreGeometry, coreMaterial);
        core.scale.set(1.12, 1.12, 1.12);
        nodeField.add(core);

        const innerGeometry = new THREE.IcosahedronGeometry(0.54, 3);
        const innerMaterial = new THREE.MeshStandardMaterial({
          color: 0xd9f99d,
          emissive: 0x91b842,
          emissiveIntensity: 0.42,
          roughness: 0.38,
        });
        geometries.add(innerGeometry);
        materials.add(innerMaterial);
        const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
        nodeField.add(innerCore);

        const ringMaterial = new THREE.MeshBasicMaterial({
          color: 0x7cf2c3,
          opacity: 0.34,
          transparent: true,
        });
        materials.add(ringMaterial);

        const ringSettings = [
          { radius: 2.08, rotation: [0.88, 0.2, 0.25] },
          { radius: 2.36, rotation: [-0.25, 0.65, -0.8] },
          { radius: 2.62, rotation: [1.2, -0.42, 0.72] },
        ] as const;

        for (const ringSetting of ringSettings) {
          const ringGeometry = new THREE.TorusGeometry(
            ringSetting.radius,
            0.012,
            8,
            128,
          );
          geometries.add(ringGeometry);
          const ring = new THREE.Mesh(ringGeometry, ringMaterial);
          ring.rotation.set(
            ringSetting.rotation[0],
            ringSetting.rotation[1],
            ringSetting.rotation[2],
          );
          nodeField.add(ring);
        }

        const nodeGeometry = new THREE.SphereGeometry(0.095, 20, 20);
        const nodeMaterial = new THREE.MeshStandardMaterial({
          color: 0xd9f99d,
          emissive: 0x7cf2c3,
          emissiveIntensity: 0.55,
          roughness: 0.3,
        });
        geometries.add(nodeGeometry);
        materials.add(nodeMaterial);

        const sourcePositions = [
          new THREE.Vector3(-2.05, 1.1, -0.32),
          new THREE.Vector3(-2.18, -0.84, -0.38),
          new THREE.Vector3(-1.62, -0.18, 0.38),
          new THREE.Vector3(0, 0, 0.98),
          new THREE.Vector3(1.58, 0.82, 0.24),
          new THREE.Vector3(2.3, 0.64, -0.48),
          new THREE.Vector3(2.12, -0.64, -0.18),
          new THREE.Vector3(0.36, -1.38, 0.2),
        ];

        for (const position of sourcePositions) {
          const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
          node.position.copy(position);
          nodeField.add(node);
        }

        const relationMaterial = new THREE.LineBasicMaterial({
          color: 0x7cf2c3,
          opacity: 0.52,
          transparent: true,
        });
        materials.add(relationMaterial);
        const relations = [
          [3, 0],
          [3, 1],
          [3, 2],
          [3, 4],
          [3, 7],
          [4, 5],
          [4, 6],
          [0, 7],
        ] as const;

        for (const [fromIndex, toIndex] of relations) {
          const relationGeometry = new THREE.BufferGeometry().setFromPoints([
            sourcePositions[fromIndex],
            sourcePositions[toIndex],
          ]);
          geometries.add(relationGeometry);
          nodeField.add(new THREE.Line(relationGeometry, relationMaterial));
        }

        const particleGeometry = new THREE.BufferGeometry();
        const particlePositions = new Float32Array(72 * 3);

        for (let index = 0; index < 72; index += 1) {
          const radius = 2.4 + ((index * 37) % 19) / 18;
          const angle = index * 2.39996;
          particlePositions[index * 3] = Math.cos(angle) * radius;
          particlePositions[index * 3 + 1] = Math.sin(angle) * radius * 0.62;
          particlePositions[index * 3 + 2] = ((index * 17) % 13) / 10 - 0.65;
        }

        particleGeometry.setAttribute(
          "position",
          new THREE.BufferAttribute(particlePositions, 3),
        );
        const particleMaterial = new THREE.PointsMaterial({
          color: 0x7cf2c3,
          opacity: 0.38,
          size: 0.024,
          transparent: true,
        });
        geometries.add(particleGeometry);
        materials.add(particleMaterial);
        nodeField.add(new THREE.Points(particleGeometry, particleMaterial));

        const resize = () => {
          if (!renderer) {
            return;
          }

          const { width, height } = sceneFrame.getBoundingClientRect();
          const renderWidth = Math.max(1, width);
          const renderHeight = Math.max(1, height);
          renderer.setSize(renderWidth, renderHeight, false);
          camera.aspect = renderWidth / renderHeight;
          camera.updateProjectionMatrix();
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(sceneFrame);
        resize();
        disconnectResizeObserver = () => resizeObserver.disconnect();

        const reduceMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        sceneFrame.dataset.motion = reduceMotion ? "reduced" : "full";
        const pointer = { x: 0, y: 0 };
        const pointerTarget = { x: 0, y: 0 };

        const handlePointerMove = (event: PointerEvent) => {
          const bounds = sceneFrame.getBoundingClientRect();
          pointerTarget.x = (event.clientX - bounds.left) / bounds.width - 0.5;
          pointerTarget.y = (event.clientY - bounds.top) / bounds.height - 0.5;
        };
        const handlePointerLeave = () => {
          pointerTarget.x = 0;
          pointerTarget.y = 0;
        };

        if (!reduceMotion) {
          sceneFrame.addEventListener("pointermove", handlePointerMove);
          sceneFrame.addEventListener("pointerleave", handlePointerLeave);
          removeInteractionListeners = () => {
            sceneFrame.removeEventListener("pointermove", handlePointerMove);
            sceneFrame.removeEventListener("pointerleave", handlePointerLeave);
          };
        }

        const animationStart = performance.now();

        const renderFrame = (timestamp: number) => {
          isAnimating = false;

          if (isDisposed || !isSceneVisible || reduceMotion) {
            return;
          }

          const elapsed = Math.max(0, (timestamp - animationStart) / 1000);
          pointer.x += (pointerTarget.x - pointer.x) * 0.045;
          pointer.y += (pointerTarget.y - pointer.y) * 0.045;
          nodeField.rotation.y = pointer.x * 0.42 + elapsed * 0.035;
          nodeField.rotation.x = -0.08 - pointer.y * 0.3;
          core.rotation.x = elapsed * 0.08;
          core.rotation.y = elapsed * 0.11;
          innerCore.rotation.y = -elapsed * 0.16;
          camera.position.x = pointer.x * 0.26;
          camera.position.y = 0.15 - pointer.y * 0.2;
          camera.lookAt(0, 0, 0);
          renderer?.render(scene, camera);
          animationFrame = window.requestAnimationFrame(renderFrame);
          isAnimating = true;
        };

        const startAnimation = () => {
          if (!isAnimating && !isDisposed && !reduceMotion) {
            animationFrame = window.requestAnimationFrame(renderFrame);
            isAnimating = true;
          }
        };
        const stopAnimation = () => {
          window.cancelAnimationFrame(animationFrame);
          isAnimating = false;
        };

        if (reduceMotion) {
          renderer.render(scene, camera);
        } else {
          const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
              isSceneVisible = entry.isIntersecting;

              if (isSceneVisible) {
                startAnimation();
              } else {
                stopAnimation();
              }
            },
            { rootMargin: "120px 0px", threshold: 0.02 },
          );
          visibilityObserver.observe(sceneFrame);
          disconnectVisibilityObserver = () => visibilityObserver.disconnect();
          startAnimation();
        }

        setSceneState("ready");
      } catch (error) {
        if (!isDisposed) {
          console.error("Unable to initialize the SQL node field.", error);
          setSceneState("error");
        }
      }
    }

    void mountScene();

    return () => {
      isDisposed = true;
      window.cancelAnimationFrame(animationFrame);
      removeInteractionListeners();
      disconnectResizeObserver();
      disconnectVisibilityObserver();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      delete sceneFrame.dataset.motion;
      renderer?.dispose();
    };
  }, []);

  return (
    <div
      aria-busy={sceneState === "loading"}
      aria-describedby="scene-description"
      aria-label="Interactive SQL node field"
      className="node-field"
      ref={frameRef}
      role="img"
    >
      <div aria-hidden="true" className="node-field-chrome">
        <span>SCENE / SQL GRAPH</span>
        <span className="node-field-mode">POINTER REACTIVE</span>
      </div>

      <canvas
        aria-hidden="true"
        className={sceneState === "ready" ? "is-ready" : ""}
        ref={canvasRef}
      />

      <div aria-hidden="true" className="scene-labels">
        {sourceLabels.map((source) => (
          <span className={source.className} key={source.name}>
            {source.name}
          </span>
        ))}
      </div>

      <div aria-hidden="true" className="scene-telemetry">
        <span>LOCAL PARSE</span>
        <strong>Browser ready</strong>
      </div>

      <div aria-hidden="true" className="scene-query-flow">
        <span>QUERY FLOW</span>
        <code>01 FROM customers</code>
        <code>02 JOIN orders</code>
        <code>03 GROUP BY customer_id</code>
      </div>

      <div aria-hidden="true" className="scene-implementation-note">
        Three.js scene <span /> Reduced motion ready
      </div>

      {sceneState === "loading" ? (
        <p className="scene-status">Building the node field...</p>
      ) : null}
      {sceneState === "error" ? (
        <p className="scene-status scene-status-error">
          The 3D layer is unavailable. The query map remains readable below.
        </p>
      ) : null}

      <p className="sr-only" id="scene-description">
        Interactive three-dimensional query map. Customers connects to orders,
        order items, addresses, and segments. Orders connects to payments and
        campaigns. Products connects to order items.
      </p>
    </div>
  );
}
