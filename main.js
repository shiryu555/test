import * as THREE from './lib/three_jsm/three.module.js';
import { OrbitControls } from './lib/three_jsm/OrbitControls.js';
import { VRButton } from './lib/three_jsm/VRButton.js';

var scene, camera, renderer;
var geometry, material, mesh;
var imageIndex = 0;
var images = ['360eample.jpg', 'image2.jpg', 'image3.jpg']; // ここに画像のパスを追加してください
var controls; // OrbitControls用の変数を追加
var button; // ボタン用の変数を追加

init();
animate();

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;

    geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    material = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load(images[imageIndex])
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // OrbitControlsを作成
    controls = new OrbitControls(camera, renderer.domElement);

    // VRButtonを作成
    document.body.appendChild(VRButton.createButton(renderer));

    // ボタンを作成
    var buttonGeometry = new THREE.BoxGeometry(1, 1, 1);
    var buttonMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
    button = new THREE.Mesh(buttonGeometry, buttonMaterial);
    button.position.set(0, 0, -5); // ボタンの位置を設定
    scene.add(button);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // OrbitControlsの更新
    renderer.render(scene, camera);
}

// マウスダウンイベントを追加
window.addEventListener('mousedown', onMouseDown, false);

function onMouseDown(event) {
    event.preventDefault();

    var mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    var raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0 && intersects[0].object === button) {
        imageIndex++;
        if (imageIndex >= images.length) {
            imageIndex = 0;
        }
        material.map = new THREE.TextureLoader().load(images[imageIndex]);
        material.needsUpdate = true; // テクスチャの更新を通知
    }
}