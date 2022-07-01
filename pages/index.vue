<script setup lang="ts">
import * as THREE from "three";
import * as dat from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import typefaceFont from "three/examples/fonts/helvetiker_regular.typeface.json";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
const myCanvas = ref();

const gui = process.client ? new dat.GUI() : null;
const textureLoader = new THREE.TextureLoader();
const fontLoader = new FontLoader();
const debugEvents = {
    first: () => console.log("執行事件1"),
};

var text;
onMounted(() => {
    // console.log(mobileConsole);
    // mobileConsole.init();
    // Scene
    const scene = new THREE.Scene(); //建立場景
    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);

    scene.add(ambientLight);
    // Object
    const fontLoader = new FontLoader();

    fontLoader.load("/helvetiker_regular.typeface.json", (font) => {
        const textGeometry = new TextGeometry("Hello Three.js", {
            font: font,
            size: 0.5,
            height: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5,
        });

        textGeometry.computeBoundingBox();
        textGeometry.center();

        const textMaterial = new THREE.MeshBasicMaterial({
            wireframe: true,
        });
        text = new THREE.Mesh(textGeometry, textMaterial);
        gui.add(text.position, "x").name("x軸移動方向").min(0).max(5).step(0.1);
        gui.add(text.position, "y").name("y軸移動方向").min(0).max(5).step(0.1);
        gui.add(debugEvents, "first").name("啟動事件1");

        scene.add(text);
    });

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
        if (text != null) {
            (text as THREE.Mesh<TextGeometry, THREE.MeshBasicMaterial>).updateMatrix();
        }
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

// function ShowDebug() {
//     mobileConsole.toggle();
// }
</script>

<template>
    <div>
        <Head>
            <Script src="hnl.mobileConsole.js"></Script>
        </Head>
        dsadsadsad
        <!-- <div class="fixed top-0 left-0 z-50 bg-white shadow-md w-fit">
            <button @click="ShowDebug">show debug</button>
        </div> -->
        <canvas ref="myCanvas"> </canvas>
    </div>
</template>
