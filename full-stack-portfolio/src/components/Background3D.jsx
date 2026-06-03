// // src/components/Background3D.jsx
// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const Background3D = () => {
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     containerRef.current.appendChild(renderer.domElement);

//     // Wireframe Torus Knot
//     const geometry = new THREE.TorusKnotGeometry(1.5, 0.4, 128, 16, 3, 4);
//     const material = new THREE.MeshBasicMaterial({ color: 0xff7e5e, wireframe: true });
//     const knot = new THREE.Mesh(geometry, material);
//     scene.add(knot);

//     // Additional floating particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particlesCount = 800;
//     const posArray = new Float32Array(particlesCount * 3);
//     for (let i = 0; i < particlesCount * 3; i += 3) {
//       posArray[i] = (Math.random() - 0.5) * 30;
//       posArray[i+1] = (Math.random() - 0.5) * 20;
//       posArray[i+2] = (Math.random() - 0.5) * 20 - 10;
//     }
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
//     const particlesMaterial = new THREE.PointsMaterial({ color: 0xfeb47b, size: 0.05, transparent: true, opacity: 0.6 });
//     const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
//     scene.add(particlesMesh);

//     camera.position.z = 5;

//     let mouseX = 0;
//     let mouseY = 0;

//     const handleMouseMove = (event) => {
//       mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//       mouseY = (event.clientY / window.innerHeight) * 2 - 1;
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     const animate = () => {
//       requestAnimationFrame(animate);
//       knot.rotation.x += 0.005;
//       knot.rotation.y += 0.007;
//       knot.rotation.z += 0.003;
      
//       particlesMesh.rotation.y += 0.001;
//       particlesMesh.rotation.x += 0.0005;
      
//       // subtle camera movement based on mouse
//       camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
//       camera.position.y += (-mouseY * 0.5 - camera.position.y) * 0.05;
//       camera.lookAt(scene.position);
      
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', handleMouseMove);
//       if (containerRef.current) {
//         containerRef.current.removeChild(renderer.domElement);
//       }
//       renderer.dispose();
//     };
//   }, []);

//   return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
// };

// export default Background3D;

// src/components/Background3D.jsx
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Background3D = () => {
  const containerRef = useRef(null);
  const frameId = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x000000, 0.008);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // --- Lights ---
    const ambient = new THREE.AmbientLight(0x111122);
    scene.add(ambient);
    const mainLight = new THREE.DirectionalLight(0xffaa88, 1);
    mainLight.position.set(1, 2, 3);
    scene.add(mainLight);
    const backLight = new THREE.PointLight(0x4466ff, 0.6);
    backLight.position.set(-2, 1, -3);
    scene.add(backLight);
    const fillLight = new THREE.PointLight(0xff66aa, 0.4);
    fillLight.position.set(1, 2, 2);
    scene.add(fillLight);

    // --- Main object: IcosahedronGeometry with wireframe + inner glowing core ---
    const geometry = new THREE.IcosahedronGeometry(1.2, 0); // high detail
    const material = new THREE.MeshStandardMaterial({
      color: 0xff5500,
      emissive: 0x441100,
      emissiveIntensity: 0.6,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.8
    });
    const ico = new THREE.Mesh(geometry, material);
    scene.add(ico);

    // Inner crystal (smaller icosahedron with transparent material)
    const innerGeo = new THREE.IcosahedronGeometry(0.75, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xffaa66,
      emissive: 0x442200,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.35,
      wireframe: false
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    scene.add(innerCore);

    // --- Particle ring around the object (orbiting) ---
    const ringParticleCount = 800;
    const ringGeo = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringParticleCount * 3);
    for (let i = 0; i < ringParticleCount; i++) {
      const angle = (i / ringParticleCount) * Math.PI * 2;
      const radius = 1.9;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 3) * 0.3; // wavy vertical offset
      ringPositions[i*3] = x;
      ringPositions[i*3+1] = y;
      ringPositions[i*3+2] = z;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
    const ringMat = new THREE.PointsMaterial({ color: 0xff8844, size: 0.035, blending: THREE.AdditiveBlending });
    const ring = new THREE.Points(ringGeo, ringMat);
    scene.add(ring);

    // Second outer ring (bigger, slower)
    const outerRingCount = 400;
    const outerRingGeo = new THREE.BufferGeometry();
    const outerPos = new Float32Array(outerRingCount * 3);
    for (let i = 0; i < outerRingCount; i++) {
      const angle = (i / outerRingCount) * Math.PI * 2;
      const radius = 2.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 0.5;
      outerPos[i*3] = x;
      outerPos[i*3+1] = y;
      outerPos[i*3+2] = z;
    }
    outerRingGeo.setAttribute('position', new THREE.BufferAttribute(outerPos, 3));
    const outerRingMat = new THREE.PointsMaterial({ color: 0xffaa88, size: 0.025, blending: THREE.AdditiveBlending });
    const outerRing = new THREE.Points(outerRingGeo, outerRingMat);
    scene.add(outerRing);

    // --- Floating particles (inside and around) ---
    const particleCount = 1800;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // Spherical distribution
      const radius = 1.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
      particlePositions[i*3+2] = radius * Math.cos(phi);
      
      const color = new THREE.Color().setHSL(0.08 + Math.random() * 0.1, 1, 0.6);
      particleColors[i*3] = color.r;
      particleColors[i*3+1] = color.g;
      particleColors[i*3+2] = color.b;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    const particleMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, blending: THREE.AdditiveBlending });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Background stars (distant) ---
    const starCount = 2000;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i*3] = (Math.random() - 0.5) * 200;
      starPositions[i*3+1] = (Math.random() - 0.5) * 100;
      starPositions[i*3+2] = (Math.random() - 0.5) * 80 - 40;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.6 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Animated particles that move along a helix (extra flair) ---
    const helixCount = 500;
    const helixGeo = new THREE.BufferGeometry();
    const helixPositions = new Float32Array(helixCount * 3);
    for (let i = 0; i < helixCount; i++) {
      const t = i / helixCount;
      const angle = t * Math.PI * 8;
      const radius = 2.2;
      helixPositions[i*3] = Math.cos(angle) * radius;
      helixPositions[i*3+1] = (t - 0.5) * 3;
      helixPositions[i*3+2] = Math.sin(angle) * radius;
    }
    helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPositions, 3));
    const helixMat = new THREE.PointsMaterial({ color: 0xff8844, size: 0.05, blending: THREE.AdditiveBlending });
    const helix = new THREE.Points(helixGeo, helixMat);
    scene.add(helix);

    // --- Mouse interaction variables ---
    let mouseX = 0, mouseY = 0;
    let targetRotY = 0, targetRotX = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = mouseX * 0.8;
      targetRotX = mouseY * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // --- Color cycling ---
    let hue = 0.08; // start orange
    let colorDir = 0.002;

    // --- Animation loop ---
    let currentRotY = 0, currentRotX = 0;
    let time = 0;

    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      time += 0.008;

      // Color cycle
      hue += colorDir;
      if (hue > 0.6) colorDir = -0.002;
      if (hue < 0.05) colorDir = 0.002;
      const mainColor = new THREE.Color().setHSL(hue, 1, 0.5);
      const glowColor = new THREE.Color().setHSL(hue, 1, 0.7);
      material.color = mainColor;
      innerMat.color = glowColor;
      ringMat.color = mainColor;
      outerRingMat.color = glowColor;
      helixMat.color = mainColor;
      
      // Rotate main shapes
      ico.rotation.x += 0.002;
      ico.rotation.y += 0.004;
      ico.rotation.z += 0.001;
      innerCore.rotation.x -= 0.001;
      innerCore.rotation.y += 0.003;
      ring.rotation.y += 0.01;
      ring.rotation.x = Math.sin(time * 0.5) * 0.2;
      outerRing.rotation.y -= 0.005;
      outerRing.rotation.z = Math.cos(time * 0.3) * 0.1;
      helix.rotation.y += 0.008;
      helix.rotation.x = Math.sin(time * 0.7) * 0.3;
      particles.rotation.y += 0.0005;
      stars.rotation.y -= 0.0002;

      // Smooth mouse follow
      currentRotY += (targetRotY - currentRotY) * 0.05;
      currentRotX += (targetRotX - currentRotX) * 0.05;
      scene.rotation.y = currentRotY;
      scene.rotation.x = currentRotX * 0.5;

      // Camera slight movement
      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.03;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // --- Resize handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId.current) cancelAnimationFrame(frameId.current);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default Background3D;