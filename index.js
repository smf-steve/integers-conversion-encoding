const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.visualViewport.width, 700);
// window.onload = function(){
//     if(window.visualViewport.width > 400){
//         camera.position.setZ(-100);
//     }
// }
changeSize = function() { 
    renderer.setSize(window.visualViewport.width, 700); 
    if(window.visualViewport.width > 400){
        camera.position.setZ(-100);
        // camera.position.Z(100)
    }
}
window.addEventListener("resize", changeSize);
camera.position.setZ(30);
camera.position.setX(-25);
camera.position.setY(8);

renderer.render(scene, camera);

const worldTexture = new THREE.TextureLoader().load('img/binary-world.jpg');

const world = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshBasicMaterial({
    map: worldTexture
  })
);

scene.add(world);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// Animation Loop
world.rotation.z = 0.5;
function animate() {
  requestAnimationFrame(animate);
  world.rotation.y += 0.005;
  //world.rotation.z += 0.001;
  renderer.render(scene, camera);
}

animate();

// DOMContentLoaded means when DOM objects are loaded, function() will be invoked
// Whenever page refreshes or is opened, takes user straight to integer conversion
document.addEventListener("DOMContentLoaded", function() {
    console.log(window.visualViewport.width);
    var text = "Integer Conversion and Encoding";
    function typeText(text, i){
        if(i < text.length){
            document.querySelector('#head').innerHTML = text.substring(0, i+1) 
            + '<span aria-hidden="true"></span>';
            setTimeout(function() {
                typeText(text, i + 1)
            }, 130);
        }else{
            setTimeout(function(){}, 200);
        }
    }
    typeText(text, 0);
});