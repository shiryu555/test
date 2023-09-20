// Three.jsのシーンを作成
var scene = new THREE.Scene();

// カメラを作成
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1;

// レンダラーを作成
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 360度画像のテクスチャを作成
var texture = new THREE.TextureLoader().load('360eample.jpg');

// テクスチャを使用して球体を作成
var geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1); // 球体を反転（内側にテクスチャが見えるようにする）

var material = new THREE.MeshBasicMaterial({
    map: texture
});

var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// レンダリングループ
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// マウスやスマホのタッチで視点をコントロールするためのOrbitControlsを設定
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;