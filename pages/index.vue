<script setup lang="ts">
import * as THREE from "three";
import * as dat from "lil-gui";

import { DoubleSide } from "three";
const myCanvas = ref();

const gui = process.client ? new dat.GUI() : null;
const textureLoader = new THREE.TextureLoader();

onMounted(async () => {
    const { OrbitControls } = await import("three/examples/jsm/controls/OrbitControls");
    // Scene
    const scene = new THREE.Scene(); //建立場景
    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);

    scene.add(ambientLight);
    const material = new THREE.MeshStandardMaterial({
        side: DoubleSide,
    });

    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
    sphere.position.x = -1.5;

    const box = new THREE.Mesh(new THREE.BoxGeometry(1, 1), material);
    box.position.y = 0.35;
    box.rotation.x = Math.PI * 0.25;
    box.rotation.y = Math.PI * 0.25;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5, 20, 20), material);
    plane.rotation.x = Math.PI * -0.5;
    plane.position.y = -0.5;
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 16, 32), material);
    torus.position.x = 1.5;

    scene.add(sphere, box, plane, torus);

    // Sizes
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };
    console.log(sizes);

    // Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: myCanvas.value,
        antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);

    // Control

    //以下為最簡短操作需求
    const orbitControl = new OrbitControls(camera, myCanvas.value);

    // Animate
    const tick = () => {
        // Render

        renderer.render(scene, camera);
    };

    window.addEventListener("resize", () => {
        //Controls
        orbitControl.update();
        // Update sizes
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        // Update renderer
        renderer.setSize(sizes.width, sizes.height);
        // Update camera
        camera.aspect = sizes.width / sizes.height; //這個值是預防圖像扭曲
        camera.updateProjectionMatrix(); //然後執行這個來更新camera內部數值
    });

    renderer.setAnimationLoop(tick);
});
</script>

<template>
    <div>
        <canvas ref="myCanvas"> </canvas>
    </div>
</template>
