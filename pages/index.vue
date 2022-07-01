<script setup lang="ts">
import * as THREE from "three";
import * as dat from "lil-gui";

// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const myCanvas = ref();
function first() {
    console.log("觸發事件1");
}

onMounted(async () => {
    const MCL = await import("mobile-console-lite");
    new MCL.MCL();
    const gui = new dat.GUI();
    // Scene
    const scene = new THREE.Scene(); //建立場景
    console.log("three");

    // Object
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const material = new THREE.MeshNormalMaterial();
    // Mesh
    const mesh = new THREE.Mesh(geometry, material);
    let debugEvents = {
        first: () => {
            console.log("觸發事件1");
        },
    };

    gui.add(mesh.position, "x").name("x軸").min(0).max(2).step(0.1);
    gui.add(mesh.position, "y").name("y軸").min(0).max(2).step(0.1);
    gui.add(debugEvents, "first").name("事件1");
    scene.add(mesh);
    console.log("two");

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
    // const orbitControl = new OrbitControls(camera, myCanvas.value);

    // Animate
    const tick = () => {
        // Render
        renderer.render(scene, camera);
    };

    window.addEventListener("resize", () => {
        //Controls
        // orbitControl.update();
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
