import * as THREE from 'three';
import gsap from 'gsap'

// adding scene
const scene = new THREE.Scene();

// adding camera
const camera = new THREE.PerspectiveCamera(75, innerWidth/innerHeight, 0.1, 1000);
camera.position.set(0, 0, 50);

// adding raycaster
const raycaster = new THREE.Raycaster()

// adding renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild( renderer.domElement );

// adding light(s)
const light = new THREE.AmbientLight( 0xffffff );
light.position.set(0, 1, 10);
scene.add(light);

// adding plane
// creating world constant to store plane width and height data
const world = {
  plane: {
    width: 400,
    height: 400,
    widthSegments: 100,
    heightSegments: 100
  }
}


// creating plane object
const planeGeometry = new THREE.PlaneBufferGeometry(
  world.plane.width,
  world.plane.height,
  world.plane.widthSegments,
  world.plane.heightSegments
)
const planeMaterial = new THREE.MeshStandardMaterial( {
  
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
  vertexColors: true,
} )

const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(planeMesh)

// function to generate plane and randomize vertexes
function generatePlane() {
  planeMesh.geometry.dispose()
  planeMesh.geometry = new THREE.PlaneGeometry(
    world.plane.width,
    world.plane.height,
    world.plane.widthSegments,
    world.plane.heightSegments
  )

  const {array} = planeMesh.geometry.attributes.position
  for (let i = 0; i < array.length; i+=3) {
    const x = array[i]
    const y = array[i + 1]
    const z = array[i + 2]

    array[i] = x + Math.random()
    array[i + 1] = y + Math.random()
    array[i + 2] = z + Math.random()
  }
  
  const colors = []
  for (let i = 0; i < planeMesh.geometry.attributes.position.count; i++) {
    colors.push(1, 1, 1)
  }
  // adding vertex initial colors
  planeMesh.geometry.setAttribute(
    'color',
    new THREE.BufferAttribute( new Float32Array( colors ), 3 )
  )
}
generatePlane()

//mouse position
const mouse = {
  x: undefined,
  y: undefined
}


// animate function
let frame = 0
function animate() {
  requestAnimationFrame(animate)
  raycaster.setFromCamera(mouse, camera)

  frame += 0.010

  

  planeMesh.geometry.attributes.position.needsUpdate = true


  const intersects = raycaster.intersectObject(planeMesh)
  if (intersects.length > 0) {
    const { color } = intersects[0].object.geometry.attributes

    // vertice 1
    color.setX(intersects[0].face.a, 0.02)
    color.setY(intersects[0].face.a, 0.79)
    color.setZ(intersects[0].face.a, 0.57)

    // vertice 2
    color.setX(intersects[0].face.b, 0.02)
    color.setY(intersects[0].face.b, 0.79)
    color.setZ(intersects[0].face.b, 0.57)

    // vertice 3
    color.setX(intersects[0].face.c, 0.02)
    color.setY(intersects[0].face.c, 0.79)
    color.setZ(intersects[0].face.c, 0.57)

    intersects[0].object.geometry.attributes.color.needsUpdate = true

    const initialColor = {
      r: 1,
      g: 1,
      b: 1
    }

    const hoverColor = {
      r: 0.02,
      g: 0.79,
      b: 0.57
    }

    gsap.to(hoverColor, {
      r: initialColor.r,
      g: initialColor.g,
      b: initialColor.b,
      duration: 1,
      onUpdate: () => {
        // vertice 1
        color.setX(intersects[0].face.a, hoverColor.r)
        color.setY(intersects[0].face.a, hoverColor.g)
        color.setZ(intersects[0].face.a, hoverColor.b)

        // vertice 2
        color.setX(intersects[0].face.b, hoverColor.r)
        color.setY(intersects[0].face.b, hoverColor.g)
        color.setZ(intersects[0].face.b, hoverColor.b)

        // vertice 3
        color.setX(intersects[0].face.c, hoverColor.r)
        color.setY(intersects[0].face.c, hoverColor.g)
        color.setZ(intersects[0].face.c, hoverColor.b)
        color.needsUpdate = true
      }
    })
  }

  renderer.render(scene, camera)
};
animate();

// event listner for mosue move
addEventListener('mousemove', (event) => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1
  mouse.y = -(event.clientY / innerHeight) * 2 + 1
})

// MOBILE MENU TOGGLE
const mobileToggle = document.querySelector('.mobile-nav-toggle');
const primaryNav = document.querySelector('.primary-nav');

mobileToggle.addEventListener('click', () => {
    const visibilty = mobileToggle.getAttribute('aria-expanded');
    if ( visibilty === 'false') {
        primaryNav.setAttribute('aria-hidden', false);
        mobileToggle.setAttribute('aria-expanded', true);
    } else {
        primaryNav.setAttribute('aria-hidden', true);
        mobileToggle.setAttribute('aria-expanded', false);
      }
})