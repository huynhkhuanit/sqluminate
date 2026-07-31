"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BufferGeometry, Material, Object3D, WebGLRenderer } from "three";

export type ThreeSceneVariant =
  "relationships" | "flow" | "structure" | "beacon";

type SceneState = "loading" | "ready" | "error";

interface ThreeSceneCardProps {
  className?: string;
  label: string;
  variant: ThreeSceneVariant;
}

const sceneMetadata: Record<
  ThreeSceneVariant,
  { code: string; description: string }
> = {
  relationships: {
    code: "RELATION MODEL",
    description:
      "A spatial JOIN model with a central source connected to four related tables.",
  },
  flow: {
    code: "CLAUSE SEQUENCE",
    description:
      "A three-dimensional path connecting FROM, JOIN, WHERE, GROUP BY, and SELECT stages.",
  },
  structure: {
    code: "QUERY LAYERS",
    description:
      "Nested wireframe layers representing the clauses and scopes inside a SQL query.",
  },
  beacon: {
    code: "LOCAL VISUAL",
    description:
      "A compact three-dimensional SQLuminate beacon with orbiting query paths.",
  },
};

function joinClassNames(...classNames: Array<string | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

export function ThreeSceneCard({
  className,
  label,
  variant,
}: ThreeSceneCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const descriptionId = useId();
  const [sceneState, setSceneState] = useState<SceneState>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;

    if (!canvas || !frame) {
      return;
    }

    const sceneCanvas = canvas;
    const sceneFrame = frame;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    sceneFrame.dataset.motion = reduceMotion ? "reduced" : "full";

    let renderer: WebGLRenderer | undefined;
    let animationFrame = 0;
    let isAnimating = false;
    let isDisposed = false;
    let isInView = false;
    let hasMountedScene = false;
    let startAnimation: () => void = () => undefined;
    let stopAnimation: () => void = () => undefined;
    let removeInteractionListeners: () => void = () => undefined;
    let disconnectResizeObserver: () => void = () => undefined;
    const geometries = new Set<BufferGeometry>();
    const materials = new Set<Material>();

    async function mountScene() {
      if (hasMountedScene || isDisposed) {
        return;
      }

      hasMountedScene = true;

      try {
        const THREE = await import("three");

        if (isDisposed) {
          return;
        }

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
        camera.position.set(0, 0, variant === "beacon" ? 5.2 : 6.3);

        renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          canvas: sceneCanvas,
          powerPreference: "high-performance",
        });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));
        renderer.setClearColor(0x000000, 0);

        const root = new THREE.Group();
        scene.add(root);

        const ambientLight = new THREE.AmbientLight(0xdafbea, 1.35);
        const keyLight = new THREE.PointLight(0x7cf2c3, 18, 10);
        keyLight.position.set(2.5, 3, 4);
        const rimLight = new THREE.PointLight(0xd9f99d, 10, 8);
        rimLight.position.set(-3, -1.5, 2.5);
        scene.add(ambientLight, keyLight, rimLight);

        const registerGeometry = <T extends BufferGeometry>(geometry: T) => {
          geometries.add(geometry);
          return geometry;
        };
        const registerMaterial = <T extends Material>(material: T) => {
          materials.add(material);
          return material;
        };

        let updateVariant: (elapsed: number) => void = () => undefined;

        if (variant === "relationships") {
          root.rotation.set(-0.18, -0.28, -0.06);

          const nodeGeometry = registerGeometry(
            new THREE.IcosahedronGeometry(0.2, 2),
          );
          const centralGeometry = registerGeometry(
            new THREE.IcosahedronGeometry(0.48, 3),
          );
          const nodeMaterial = registerMaterial(
            new THREE.MeshStandardMaterial({
              color: 0xd9f99d,
              emissive: 0x2b6d50,
              emissiveIntensity: 0.55,
              roughness: 0.32,
            }),
          );
          const centralMaterial = registerMaterial(
            new THREE.MeshPhysicalMaterial({
              color: 0x7cf2c3,
              emissive: 0x174d38,
              emissiveIntensity: 0.8,
              opacity: 0.9,
              roughness: 0.2,
              transparent: true,
            }),
          );
          const lineMaterial = registerMaterial(
            new THREE.LineBasicMaterial({
              color: 0x7cf2c3,
              opacity: 0.48,
              transparent: true,
            }),
          );

          const positions = [
            new THREE.Vector3(0, 0, 0.5),
            new THREE.Vector3(-1.75, 0.9, -0.2),
            new THREE.Vector3(1.7, 0.85, -0.25),
            new THREE.Vector3(-1.45, -1.1, 0.15),
            new THREE.Vector3(1.35, -1.2, -0.05),
          ];

          positions.forEach((position, index) => {
            const node = new THREE.Mesh(
              index === 0 ? centralGeometry : nodeGeometry,
              index === 0 ? centralMaterial : nodeMaterial,
            );
            node.position.copy(position);
            root.add(node);

            if (index > 0) {
              const relationGeometry = registerGeometry(
                new THREE.BufferGeometry().setFromPoints([
                  positions[0],
                  position,
                ]),
              );
              root.add(new THREE.Line(relationGeometry, lineMaterial));
            }
          });

          const orbitGeometry = registerGeometry(
            new THREE.TorusGeometry(1.15, 0.012, 6, 80),
          );
          const orbitMaterial = registerMaterial(
            new THREE.MeshBasicMaterial({
              color: 0xd9f99d,
              opacity: 0.3,
              transparent: true,
            }),
          );
          const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
          orbit.rotation.set(1.1, 0.25, 0.2);
          root.add(orbit);

          updateVariant = (elapsed) => {
            orbit.rotation.z = elapsed * 0.22;
            root.children[0]?.rotation.set(elapsed * 0.12, elapsed * 0.16, 0);
          };
        }

        if (variant === "flow") {
          root.rotation.set(-0.2, -0.36, -0.12);

          const stageGeometry = registerGeometry(
            new THREE.BoxGeometry(0.78, 0.34, 0.62),
          );
          const stageMaterial = registerMaterial(
            new THREE.MeshStandardMaterial({
              color: 0x1d4735,
              emissive: 0x102c21,
              emissiveIntensity: 0.6,
              metalness: 0.08,
              roughness: 0.45,
            }),
          );
          const activeMaterial = registerMaterial(
            new THREE.MeshStandardMaterial({
              color: 0x7cf2c3,
              emissive: 0x2b6d50,
              emissiveIntensity: 0.65,
              roughness: 0.28,
            }),
          );
          const pathMaterial = registerMaterial(
            new THREE.LineBasicMaterial({
              color: 0x7cf2c3,
              opacity: 0.42,
              transparent: true,
            }),
          );
          const pulseGeometry = registerGeometry(
            new THREE.SphereGeometry(0.09, 14, 14),
          );
          const pulseMaterial = registerMaterial(
            new THREE.MeshBasicMaterial({ color: 0xd9f99d }),
          );

          const stages = [
            new THREE.Vector3(-1.75, -0.65, 0.1),
            new THREE.Vector3(-0.9, 0.15, -0.15),
            new THREE.Vector3(0, -0.1, 0.25),
            new THREE.Vector3(0.9, 0.65, -0.2),
            new THREE.Vector3(1.75, 0.35, 0.1),
          ];

          stages.forEach((position, index) => {
            const stage = new THREE.Mesh(
              stageGeometry,
              index === 2 ? activeMaterial : stageMaterial,
            );
            stage.position.copy(position);
            stage.rotation.y = index % 2 === 0 ? 0.16 : -0.16;
            root.add(stage);
          });

          const pathGeometry = registerGeometry(
            new THREE.BufferGeometry().setFromPoints(stages),
          );
          root.add(new THREE.Line(pathGeometry, pathMaterial));

          const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
          root.add(pulse);

          updateVariant = (elapsed) => {
            const pathProgress = (elapsed * 0.34) % (stages.length - 1);
            const stageIndex = Math.floor(pathProgress);
            const localProgress = pathProgress - stageIndex;
            pulse.position.lerpVectors(
              stages[stageIndex],
              stages[stageIndex + 1],
              localProgress,
            );
            pulse.scale.setScalar(0.85 + Math.sin(elapsed * 4) * 0.16);
          };
        }

        if (variant === "structure") {
          root.rotation.set(-0.24, 0.52, 0.08);

          const lineMaterials = [0x7cf2c3, 0x63cda2, 0xd9f99d].map((color) =>
            registerMaterial(
              new THREE.LineBasicMaterial({
                color,
                opacity: color === 0xd9f99d ? 0.55 : 0.38,
                transparent: true,
              }),
            ),
          );
          const layerSizes = [3.3, 2.45, 1.55];
          const layers: Object3D[] = [];

          layerSizes.forEach((size, index) => {
            const boxGeometry = registerGeometry(
              new THREE.BoxGeometry(size, size * 0.58, 0.62 + index * 0.18),
            );
            const edgeGeometry = registerGeometry(
              new THREE.EdgesGeometry(boxGeometry),
            );
            const layer = new THREE.LineSegments(
              edgeGeometry,
              lineMaterials[index],
            );
            layer.position.z = index * 0.38 - 0.35;
            root.add(layer);
            layers.push(layer);
          });

          const coreGeometry = registerGeometry(
            new THREE.BoxGeometry(0.72, 0.42, 0.72),
          );
          const coreMaterial = registerMaterial(
            new THREE.MeshStandardMaterial({
              color: 0x7cf2c3,
              emissive: 0x245b43,
              emissiveIntensity: 0.62,
              opacity: 0.82,
              roughness: 0.24,
              transparent: true,
            }),
          );
          const core = new THREE.Mesh(coreGeometry, coreMaterial);
          root.add(core);

          updateVariant = (elapsed) => {
            layers.forEach((layer, index) => {
              layer.rotation.z =
                Math.sin(elapsed * 0.3 + index * 0.8) * (0.06 + index * 0.015);
            });
            core.rotation.x = elapsed * 0.18;
            core.rotation.y = -elapsed * 0.23;
          };
        }

        if (variant === "beacon") {
          const coreGeometry = registerGeometry(
            new THREE.IcosahedronGeometry(0.72, 4),
          );
          const coreMaterial = registerMaterial(
            new THREE.MeshPhysicalMaterial({
              color: 0x7cf2c3,
              emissive: 0x174d38,
              emissiveIntensity: 0.8,
              opacity: 0.86,
              roughness: 0.2,
              transparent: true,
            }),
          );
          const core = new THREE.Mesh(coreGeometry, coreMaterial);
          root.add(core);

          const ringMaterial = registerMaterial(
            new THREE.MeshBasicMaterial({
              color: 0xd9f99d,
              opacity: 0.36,
              transparent: true,
            }),
          );
          const rings: Object3D[] = [];

          [1.16, 1.5, 1.82].forEach((radius, index) => {
            const ringGeometry = registerGeometry(
              new THREE.TorusGeometry(radius, 0.012, 6, 72),
            );
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.set(0.6 + index * 0.44, index * 0.34, index * 0.46);
            root.add(ring);
            rings.push(ring);
          });

          updateVariant = (elapsed) => {
            core.rotation.x = elapsed * 0.14;
            core.rotation.y = elapsed * 0.2;
            rings.forEach((ring, index) => {
              ring.rotation.z = elapsed * (0.09 + index * 0.035);
            });
          };
        }

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
          renderer.render(scene, camera);
        };

        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(sceneFrame);
        resize();
        disconnectResizeObserver = () => resizeObserver.disconnect();

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

          if (isDisposed || !isInView || reduceMotion) {
            return;
          }

          const elapsed = Math.max(0, (timestamp - animationStart) / 1000);
          pointer.x += (pointerTarget.x - pointer.x) * 0.06;
          pointer.y += (pointerTarget.y - pointer.y) * 0.06;
          root.rotation.y +=
            (pointer.x * 0.38 - root.rotation.y * 0.02) * 0.035;
          root.rotation.x +=
            (-pointer.y * 0.25 - root.rotation.x * 0.015) * 0.025;
          camera.position.x = pointer.x * 0.22;
          camera.position.y = -pointer.y * 0.16;
          camera.lookAt(0, 0, 0);
          updateVariant(elapsed);
          renderer?.render(scene, camera);
          animationFrame = window.requestAnimationFrame(renderFrame);
          isAnimating = true;
        };

        startAnimation = () => {
          if (!reduceMotion && !isAnimating && !isDisposed) {
            animationFrame = window.requestAnimationFrame(renderFrame);
            isAnimating = true;
          }
        };
        stopAnimation = () => {
          window.cancelAnimationFrame(animationFrame);
          isAnimating = false;
        };

        if (reduceMotion) {
          renderer.render(scene, camera);
        } else if (isInView) {
          startAnimation();
        }

        setSceneState("ready");
      } catch (error) {
        if (!isDisposed) {
          console.error(`Unable to initialize the ${variant} scene.`, error);
          setSceneState("error");
        }
      }
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isInView = entry.isIntersecting;

        if (isInView && !hasMountedScene) {
          void mountScene();
        } else if (isInView) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { rootMargin: "180px 0px", threshold: 0.02 },
    );
    visibilityObserver.observe(sceneFrame);

    return () => {
      isDisposed = true;
      visibilityObserver.disconnect();
      stopAnimation();
      removeInteractionListeners();
      disconnectResizeObserver();
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      delete sceneFrame.dataset.motion;
      renderer?.dispose();
    };
  }, [variant]);

  const metadata = sceneMetadata[variant];

  return (
    <div
      aria-busy={sceneState === "loading"}
      aria-describedby={descriptionId}
      aria-label={label}
      className={joinClassNames(
        "three-scene-card",
        `three-scene-card-${variant}`,
        className,
      )}
      data-three-scene={variant}
      ref={frameRef}
      role="img"
    >
      <canvas
        aria-hidden="true"
        className={sceneState === "ready" ? "is-ready" : ""}
        ref={canvasRef}
      />

      <div aria-hidden="true" className="three-scene-chrome">
        <span>{metadata.code}</span>
        <span>MOVE TO EXPLORE</span>
      </div>

      {sceneState === "loading" ? (
        <p className="three-scene-status">Preparing 3D view...</p>
      ) : null}
      {sceneState === "error" ? (
        <p className="three-scene-status three-scene-status-error">
          3D view unavailable
        </p>
      ) : null}

      <p className="sr-only" id={descriptionId}>
        {metadata.description}
      </p>
    </div>
  );
}
