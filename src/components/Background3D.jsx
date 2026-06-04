
// // src/components/Background3D.jsx
// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';

// const Background3D = () => {
//   const containerRef = useRef(null);
//   const frameId = useRef(null);

//   useEffect(() => {
//     const scene = new THREE.Scene();
//     scene.background = null;
//     scene.fog = new THREE.FogExp2(0x000000, 0.008);

//     const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(0, 1, 8);
//     camera.lookAt(0, 0, 0);

//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(window.devicePixelRatio);
//     renderer.setClearColor(0x000000, 0);
//     containerRef.current.appendChild(renderer.domElement);

//     // --- Lights ---
//     const ambient = new THREE.AmbientLight(0x111122);
//     scene.add(ambient);
//     const mainLight = new THREE.DirectionalLight(0xffaa88, 1);
//     mainLight.position.set(1, 2, 3);
//     scene.add(mainLight);
//     const backLight = new THREE.PointLight(0x4466ff, 0.6);
//     backLight.position.set(-2, 1, -3);
//     scene.add(backLight);
//     const fillLight = new THREE.PointLight(0xff66aa, 0.4);
//     fillLight.position.set(1, 2, 2);
//     scene.add(fillLight);

//     // --- Main object: IcosahedronGeometry with wireframe + inner glowing core ---
//     const geometry = new THREE.IcosahedronGeometry(1.2, 0); // high detail
//     const material = new THREE.MeshStandardMaterial({
//       color: 0xff5500,
//       emissive: 0x441100,
//       emissiveIntensity: 0.6,
//       wireframe: true,
//       roughness: 0.3,
//       metalness: 0.8
//     });
//     const ico = new THREE.Mesh(geometry, material);
//     scene.add(ico);

//     // Inner crystal (smaller icosahedron with transparent material)
//     const innerGeo = new THREE.IcosahedronGeometry(0.75, 0);
//     const innerMat = new THREE.MeshStandardMaterial({
//       color: 0xffaa66,
//       emissive: 0x442200,
//       emissiveIntensity: 0.8,
//       transparent: true,
//       opacity: 0.35,
//       wireframe: false
//     });
//     const innerCore = new THREE.Mesh(innerGeo, innerMat);
//     scene.add(innerCore);

//     // --- Particle ring around the object (orbiting) ---
//     const ringParticleCount = 800;
//     const ringGeo = new THREE.BufferGeometry();
//     const ringPositions = new Float32Array(ringParticleCount * 3);
//     for (let i = 0; i < ringParticleCount; i++) {
//       const angle = (i / ringParticleCount) * Math.PI * 2;
//       const radius = 1.9;
//       const x = Math.cos(angle) * radius;
//       const z = Math.sin(angle) * radius;
//       const y = Math.sin(angle * 3) * 0.3; // wavy vertical offset
//       ringPositions[i*3] = x;
//       ringPositions[i*3+1] = y;
//       ringPositions[i*3+2] = z;
//     }
//     ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
//     const ringMat = new THREE.PointsMaterial({ color: 0xff8844, size: 0.035, blending: THREE.AdditiveBlending });
//     const ring = new THREE.Points(ringGeo, ringMat);
//     scene.add(ring);

//     // Second outer ring (bigger, slower)
//     const outerRingCount = 400;
//     const outerRingGeo = new THREE.BufferGeometry();
//     const outerPos = new Float32Array(outerRingCount * 3);
//     for (let i = 0; i < outerRingCount; i++) {
//       const angle = (i / outerRingCount) * Math.PI * 2;
//       const radius = 2.5;
//       const x = Math.cos(angle) * radius;
//       const z = Math.sin(angle) * radius;
//       const y = Math.sin(angle * 2) * 0.5;
//       outerPos[i*3] = x;
//       outerPos[i*3+1] = y;
//       outerPos[i*3+2] = z;
//     }
//     outerRingGeo.setAttribute('position', new THREE.BufferAttribute(outerPos, 3));
//     const outerRingMat = new THREE.PointsMaterial({ color: 0xffaa88, size: 0.025, blending: THREE.AdditiveBlending });
//     const outerRing = new THREE.Points(outerRingGeo, outerRingMat);
//     scene.add(outerRing);

//     // --- Floating particles (inside and around) ---
//     const particleCount = 1800;
//     const particleGeo = new THREE.BufferGeometry();
//     const particlePositions = new Float32Array(particleCount * 3);
//     const particleColors = new Float32Array(particleCount * 3);
//     for (let i = 0; i < particleCount; i++) {
//       // Spherical distribution
//       const radius = 1.2 + Math.random() * 2.5;
//       const theta = Math.random() * Math.PI * 2;
//       const phi = Math.acos(2 * Math.random() - 1);
//       particlePositions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
//       particlePositions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
//       particlePositions[i*3+2] = radius * Math.cos(phi);
      
//       const color = new THREE.Color().setHSL(0.08 + Math.random() * 0.1, 1, 0.6);
//       particleColors[i*3] = color.r;
//       particleColors[i*3+1] = color.g;
//       particleColors[i*3+2] = color.b;
//     }
//     particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
//     particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
//     const particleMat = new THREE.PointsMaterial({ size: 0.04, vertexColors: true, blending: THREE.AdditiveBlending });
//     const particles = new THREE.Points(particleGeo, particleMat);
//     scene.add(particles);

//     // --- Background stars (distant) ---
//     const starCount = 2000;
//     const starGeo = new THREE.BufferGeometry();
//     const starPositions = new Float32Array(starCount * 3);
//     for (let i = 0; i < starCount; i++) {
//       starPositions[i*3] = (Math.random() - 0.5) * 200;
//       starPositions[i*3+1] = (Math.random() - 0.5) * 100;
//       starPositions[i*3+2] = (Math.random() - 0.5) * 80 - 40;
//     }
//     starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
//     const starMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.6 });
//     const stars = new THREE.Points(starGeo, starMat);
//     scene.add(stars);

//     // --- Animated particles that move along a helix (extra flair) ---
//     const helixCount = 500;
//     const helixGeo = new THREE.BufferGeometry();
//     const helixPositions = new Float32Array(helixCount * 3);
//     for (let i = 0; i < helixCount; i++) {
//       const t = i / helixCount;
//       const angle = t * Math.PI * 8;
//       const radius = 2.2;
//       helixPositions[i*3] = Math.cos(angle) * radius;
//       helixPositions[i*3+1] = (t - 0.5) * 3;
//       helixPositions[i*3+2] = Math.sin(angle) * radius;
//     }
//     helixGeo.setAttribute('position', new THREE.BufferAttribute(helixPositions, 3));
//     const helixMat = new THREE.PointsMaterial({ color: 0xff8844, size: 0.05, blending: THREE.AdditiveBlending });
//     const helix = new THREE.Points(helixGeo, helixMat);
//     scene.add(helix);

//     // --- Mouse interaction variables ---
//     let mouseX = 0, mouseY = 0;
//     let targetRotY = 0, targetRotX = 0;
//     const handleMouseMove = (e) => {
//       mouseX = (e.clientX / window.innerWidth) * 2 - 1;
//       mouseY = (e.clientY / window.innerHeight) * 2 - 1;
//       targetRotY = mouseX * 0.8;
//       targetRotX = mouseY * 0.4;
//     };
//     window.addEventListener('mousemove', handleMouseMove);

//     // --- Color cycling ---
//     let hue = 0.08; // start orange
//     let colorDir = 0.002;

//     // --- Animation loop ---
//     let currentRotY = 0, currentRotX = 0;
//     let time = 0;

//     const animate = () => {
//       frameId.current = requestAnimationFrame(animate);
//       time += 0.008;

//       // Color cycle
//       hue += colorDir;
//       if (hue > 0.6) colorDir = -0.002;
//       if (hue < 0.05) colorDir = 0.002;
//       const mainColor = new THREE.Color().setHSL(hue, 1, 0.5);
//       const glowColor = new THREE.Color().setHSL(hue, 1, 0.7);
//       material.color = mainColor;
//       innerMat.color = glowColor;
//       ringMat.color = mainColor;
//       outerRingMat.color = glowColor;
//       helixMat.color = mainColor;
      
//       // Rotate main shapes
//       ico.rotation.x += 0.002;
//       ico.rotation.y += 0.004;
//       ico.rotation.z += 0.001;
//       innerCore.rotation.x -= 0.001;
//       innerCore.rotation.y += 0.003;
//       ring.rotation.y += 0.01;
//       ring.rotation.x = Math.sin(time * 0.5) * 0.2;
//       outerRing.rotation.y -= 0.005;
//       outerRing.rotation.z = Math.cos(time * 0.3) * 0.1;
//       helix.rotation.y += 0.008;
//       helix.rotation.x = Math.sin(time * 0.7) * 0.3;
//       particles.rotation.y += 0.0005;
//       stars.rotation.y -= 0.0002;

//       // Smooth mouse follow
//       currentRotY += (targetRotY - currentRotY) * 0.05;
//       currentRotX += (targetRotX - currentRotX) * 0.05;
//       scene.rotation.y = currentRotY;
//       scene.rotation.x = currentRotX * 0.5;

//       // Camera slight movement
//       camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.03;
//       camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.03;
//       camera.lookAt(0, 0, 0);

//       renderer.render(scene, camera);
//     };
//     animate();

//     // --- Resize handler ---
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
//     window.addEventListener('resize', handleResize);

//     // Cleanup
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', handleMouseMove);
//       if (frameId.current) cancelAnimationFrame(frameId.current);
//       renderer.dispose();
//       if (containerRef.current && renderer.domElement) {
//         containerRef.current.removeChild(renderer.domElement);
//       }
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
    // --- Setup ---
    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.FogExp2(0x000000, 0.006);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0.5, 12);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    // --- Enhanced Lighting ---
    const ambientLight = new THREE.AmbientLight(0x050510);
    scene.add(ambientLight);
    
    const mainLight = new THREE.DirectionalLight(0xffaa88, 1.2);
    mainLight.position.set(2, 3, 4);
    scene.add(mainLight);
    
    const backLight = new THREE.PointLight(0x3366ff, 0.8);
    backLight.position.set(-2, 1, -4);
    scene.add(backLight);
    
    const fillLight = new THREE.PointLight(0xff44aa, 0.5);
    fillLight.position.set(1.5, 2, 2);
    scene.add(fillLight);
    
    const rimLight = new THREE.PointLight(0xffaa33, 0.7);
    rimLight.position.set(1, 1.5, -3);
    scene.add(rimLight);
    
    // Dynamic light that moves
    const movingLight = new THREE.PointLight(0xff3366, 0.6);
    scene.add(movingLight);

    // --- Central Object: TorusKnot with wireframe + glow effect ---
    const knotGeo = new THREE.TorusKnotGeometry(1.1, 0.28, 180, 24, 3, 4);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0xff3366,
      emissive: 0x331122,
      emissiveIntensity: 0.5,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.85,
      transparent: true,
      opacity: 0.92
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(torusKnot);
    
    // Inner glowing sphere with pulsing effect
    const coreGeo = new THREE.SphereGeometry(0.55, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff66aa,
      emissive: 0xff2288,
      emissiveIntensity: 0.9,
      roughness: 0.1,
      metalness: 0.3,
      transparent: true,
      opacity: 0.7
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    scene.add(coreSphere);
    
    // --- Floating Particles: Two orbiting rings with different colors ---
    const ringCount = 1200;
    const ringGeo = new THREE.BufferGeometry();
    const ringPositions = new Float32Array(ringCount * 3);
    const ringColors = new Float32Array(ringCount * 3);
    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const radius = 1.9;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 4) * 0.35;
      ringPositions[i*3] = x;
      ringPositions[i*3+1] = y;
      ringPositions[i*3+2] = z;
      
      const col = new THREE.Color().setHSL(0.55 + Math.sin(angle) * 0.1, 1, 0.6);
      ringColors[i*3] = col.r;
      ringColors[i*3+1] = col.g;
      ringColors[i*3+2] = col.b;
    }
    ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPositions, 3));
    ringGeo.setAttribute('color', new THREE.BufferAttribute(ringColors, 3));
    const ringPoints = new THREE.Points(ringGeo, new THREE.PointsMaterial({ size: 0.04, vertexColors: true, blending: THREE.AdditiveBlending }));
    scene.add(ringPoints);
    
    // Second ring (outer, slower, larger)
    const outerRingCount = 800;
    const outerRingGeo = new THREE.BufferGeometry();
    const outerPos = new Float32Array(outerRingCount * 3);
    const outerColors = new Float32Array(outerRingCount * 3);
    for (let i = 0; i < outerRingCount; i++) {
      const angle = (i / outerRingCount) * Math.PI * 2;
      const radius = 2.6;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(angle * 2) * 0.5;
      outerPos[i*3] = x;
      outerPos[i*3+1] = y;
      outerPos[i*3+2] = z;
      
      const col = new THREE.Color().setHSL(0.65 + Math.cos(angle) * 0.1, 1, 0.55);
      outerColors[i*3] = col.r;
      outerColors[i*3+1] = col.g;
      outerColors[i*3+2] = col.b;
    }
    outerRingGeo.setAttribute('position', new THREE.BufferAttribute(outerPos, 3));
    outerRingGeo.setAttribute('color', new THREE.BufferAttribute(outerColors, 3));
    const outerRingPoints = new THREE.Points(outerRingGeo, new THREE.PointsMaterial({ size: 0.03, vertexColors: true, blending: THREE.AdditiveBlending }));
    scene.add(outerRingPoints);
    
    // --- Swarm Particles (dynamically updated for fluid motion) ---
    const swarmCount = 2500;
    const swarmGeo = new THREE.BufferGeometry();
    const swarmPositions = new Float32Array(swarmCount * 3);
    const swarmVelocities = [];
    for (let i = 0; i < swarmCount; i++) {
      const radius = 2.0 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      swarmPositions[i*3] = radius * Math.sin(phi) * Math.cos(theta);
      swarmPositions[i*3+1] = radius * Math.sin(phi) * Math.sin(theta) * 0.7;
      swarmPositions[i*3+2] = radius * Math.cos(phi);
      swarmVelocities.push({
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.008
      });
    }
    swarmGeo.setAttribute('position', new THREE.BufferAttribute(swarmPositions, 3));
    const swarmMat = new THREE.PointsMaterial({ color: 0x77aaff, size: 0.035, blending: THREE.AdditiveBlending, transparent: true, opacity: 0.7 });
    const swarm = new THREE.Points(swarmGeo, swarmMat);
    scene.add(swarm);
    
    // --- Nebula / Cloud particles (static but rotating, with gradient) ---
    const cloudCount = 4000;
    const cloudGeo = new THREE.BufferGeometry();
    const cloudPositions = new Float32Array(cloudCount * 3);
    const cloudColors = new Float32Array(cloudCount * 3);
    for (let i = 0; i < cloudCount; i++) {
      const r = 3.5 + Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      cloudPositions[i*3] = r * Math.sin(phi) * Math.cos(theta);
      cloudPositions[i*3+1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      cloudPositions[i*3+2] = r * Math.cos(phi);
      
      const hue = 0.55 + Math.random() * 0.2;
      const col = new THREE.Color().setHSL(hue, 0.8, 0.5);
      cloudColors[i*3] = col.r;
      cloudColors[i*3+1] = col.g;
      cloudColors[i*3+2] = col.b;
    }
    cloudGeo.setAttribute('position', new THREE.BufferAttribute(cloudPositions, 3));
    cloudGeo.setAttribute('color', new THREE.BufferAttribute(cloudColors, 3));
    const cloudMatPoints = new THREE.PointsMaterial({ size: 0.025, vertexColors: true, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
    const cloudPoints = new THREE.Points(cloudGeo, cloudMatPoints);
    scene.add(cloudPoints);
    
    // --- Glowing Dust Particles (tiny, high count) ---
    const dustCount = 6000;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i*3] = (Math.random() - 0.5) * 18;
      dustPositions[i*3+1] = (Math.random() - 0.5) * 10;
      dustPositions[i*3+2] = (Math.random() - 0.5) * 15 - 5;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xffaa88, size: 0.015, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending });
    const dust = new THREE.Points(dustGeo, dustMat);
    scene.add(dust);
    
    // --- Waveform Ribbon (curved line of particles) ---
    const ribbonCount = 800;
    const ribbonGeo = new THREE.BufferGeometry();
    const ribbonPositions = new Float32Array(ribbonCount * 3);
    for (let i = 0; i < ribbonCount; i++) {
      const t = i / ribbonCount;
      const angle = t * Math.PI * 6;
      const radius = 2.1;
      ribbonPositions[i*3] = Math.cos(angle) * radius;
      ribbonPositions[i*3+1] = Math.sin(angle * 2) * 0.8;
      ribbonPositions[i*3+2] = Math.sin(angle) * radius;
    }
    ribbonGeo.setAttribute('position', new THREE.BufferAttribute(ribbonPositions, 3));
    const ribbonMat = new THREE.PointsMaterial({ color: 0xff66cc, size: 0.045, blending: THREE.AdditiveBlending });
    const ribbon = new THREE.Points(ribbonGeo, ribbonMat);
    scene.add(ribbon);
    
    // --- Background Stars (layered) ---
    const starLayer1 = new THREE.BufferGeometry();
    const starPos1 = new Float32Array(1500 * 3);
    for (let i = 0; i < 1500; i++) {
      starPos1[i*3] = (Math.random() - 0.5) * 200;
      starPos1[i*3+1] = (Math.random() - 0.5) * 120;
      starPos1[i*3+2] = (Math.random() - 0.5) * 100 - 50;
    }
    starLayer1.setAttribute('position', new THREE.BufferAttribute(starPos1, 3));
    const stars1 = new THREE.Points(starLayer1, new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.5 }));
    scene.add(stars1);
    
    const starLayer2 = new THREE.BufferGeometry();
    const starPos2 = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      starPos2[i*3] = (Math.random() - 0.5) * 300;
      starPos2[i*3+1] = (Math.random() - 0.5) * 180;
      starPos2[i*3+2] = (Math.random() - 0.5) * 150 - 80;
    }
    starLayer2.setAttribute('position', new THREE.BufferAttribute(starPos2, 3));
    const stars2 = new THREE.Points(starLayer2, new THREE.PointsMaterial({ color: 0xaaccff, size: 0.05, transparent: true, opacity: 0.4 }));
    scene.add(stars2);
    
    // --- Mouse Interaction ---
    let mouseX = 0, mouseY = 0;
    let targetRotY = 0, targetRotX = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotY = mouseX * 0.6;
      targetRotX = mouseY * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // --- Animation State ---
    let time = 0;
    let hue = 0.55;
    let colorDir = 0.0015;
    let currentRotY = 0, currentRotX = 0;
    let pulseScale = 1;
    let pulseDir = 0.005;
    
    // Store swarm positions reference for updates
    const swarmPosAttr = swarmGeo.attributes.position;
    
    // --- Animation Loop ---
    const animate = () => {
      frameId.current = requestAnimationFrame(animate);
      time += 0.012;
      
      // Color cycling for main elements
      hue += colorDir;
      if (hue > 0.75) colorDir = -0.0015;
      if (hue < 0.45) colorDir = 0.0015;
      const mainColor = new THREE.Color().setHSL(hue, 1, 0.55);
      const accentColor = new THREE.Color().setHSL(hue + 0.15, 1, 0.65);
      
      knotMat.color = mainColor;
      coreMat.emissiveIntensity = 0.9 + Math.sin(time * 2) * 0.3;
      ribbonMat.color = accentColor;
      
      // Pulsing core sphere
      pulseScale += pulseDir;
      if (pulseScale > 1.08) pulseDir = -0.003;
      if (pulseScale < 0.94) pulseDir = 0.003;
      coreSphere.scale.set(pulseScale, pulseScale, pulseScale);
      
      // Dynamic light movement
      movingLight.position.x = Math.sin(time * 0.7) * 2;
      movingLight.position.y = Math.cos(time * 0.5) * 1.5;
      movingLight.position.z = Math.sin(time * 0.3) * 2;
      movingLight.intensity = 0.5 + Math.sin(time * 1.2) * 0.2;
      
      // Rotations
      torusKnot.rotation.x += 0.003;
      torusKnot.rotation.y += 0.005;
      torusKnot.rotation.z += 0.002;
      
      coreSphere.rotation.x += 0.001;
      coreSphere.rotation.y += 0.002;
      
      ringPoints.rotation.y += 0.008;
      ringPoints.rotation.x = Math.sin(time * 0.6) * 0.15;
      ringPoints.rotation.z = Math.cos(time * 0.4) * 0.1;
      
      outerRingPoints.rotation.y -= 0.004;
      outerRingPoints.rotation.z = Math.sin(time * 0.5) * 0.12;
      
      ribbon.rotation.y += 0.006;
      ribbon.rotation.x = Math.sin(time * 0.8) * 0.2;
      
      cloudPoints.rotation.y += 0.0008;
      cloudPoints.rotation.x += 0.0004;
      
      stars1.rotation.y -= 0.00015;
      stars2.rotation.y += 0.0001;
      
      dust.rotation.y += 0.0003;
      dust.rotation.x += 0.0002;
      
      // Update swarm particles for organic motion
      const positions = swarmPosAttr.array;
      for (let i = 0; i < swarmCount; i++) {
        const idx = i * 3;
        positions[idx] += swarmVelocities[i].x;
        positions[idx+1] += swarmVelocities[i].y;
        positions[idx+2] += swarmVelocities[i].z;
        
        // Wrap around boundaries
        const limit = 4.5;
        if (Math.abs(positions[idx]) > limit) swarmVelocities[i].x *= -1;
        if (Math.abs(positions[idx+1]) > limit) swarmVelocities[i].y *= -1;
        if (Math.abs(positions[idx+2]) > limit) swarmVelocities[i].z *= -1;
      }
      swarmPosAttr.needsUpdate = true;
      
      // Smooth mouse follow
      currentRotY += (targetRotY - currentRotY) * 0.06;
      currentRotX += (targetRotX - currentRotX) * 0.06;
      scene.rotation.y = currentRotY;
      scene.rotation.x = currentRotX * 0.4;
      
      // Camera subtle movement
      camera.position.x += (mouseX * 0.25 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.2 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // --- Resize Handler ---
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    
    // --- Cleanup ---
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