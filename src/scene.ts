import GUI from "lil-gui";
import {
  AmbientLight,
  // AxesHelper,
  BoxGeometry,
  //Clock,
  DirectionalLight,
  // GridHelper,
  LoadingManager,
  Mesh,
  MeshLambertMaterial,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  // PointLight,
  // PointLightHelper,
  Scene,
  WebGLRenderer,
} from "three";
// import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
// import * as animations from "./helpers/animations";
import { toggleFullScreen } from "./helpers/fullscreen";
import { resizeRendererToDisplaySize } from "./helpers/responsiveness";
import "./style.css";
import SnowMan from "./components/snowman";
import Sky from "./components/sky";
import Ground from "./components/ground";
import Snowfalls from "./components/snowfall";

const CANVAS_ID = "scene";

let canvas: HTMLElement;
let renderer: WebGLRenderer;
let scene: Scene;
let loadingManager: LoadingManager;
let ambientLight: AmbientLight;
let directionalLight: DirectionalLight;
let cube: Mesh;
let snowfalls: Snowfalls;
let camera: PerspectiveCamera;
let cameraControls: OrbitControls;
// let dragControls: DragControls;
// let axesHelper: AxesHelper;
// let pointLightHelper: PointLightHelper;
//let clock: Clock;
let stats: Stats;
let gui: GUI;

// const animation = { enabled: false, play: true };

init();
animate();

function init() {
  // ===== 🖼️ CANVAS, RENDERER, & SCENE =====
  {
    canvas = document.querySelector(`canvas#${CANVAS_ID}`)!;
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    scene = new Scene();
  }

  // ===== 👨🏻‍💼 LOADING MANAGER =====
  {
    loadingManager = new LoadingManager();

    loadingManager.onStart = () => {
      console.log("loading started");
    };
    loadingManager.onProgress = (url, loaded, total) => {
      console.log("loading in progress:");
      console.log(`${url} -> ${loaded} / ${total}`);
    };
    loadingManager.onLoad = () => {
      console.log("loaded!");
    };
    loadingManager.onError = () => {
      console.log("❌ error while loading");
    };
  }

  // ===== 💡 LIGHTS =====
  {
    ambientLight = new AmbientLight("white", 0.4);
    directionalLight = new DirectionalLight("white", 0.9);
    directionalLight.position.set(0, 50, 30);
    scene.add(ambientLight);
    scene.add(directionalLight);
  }

  // ===== 📦 OBJECTS =====
  {
    const sideLength = 1;
    const cubeGeometry = new BoxGeometry(sideLength, sideLength, sideLength);
    const cubeMaterial = new MeshStandardMaterial({
      color: "#f69f1f",
      metalness: 0.5,
      roughness: 0.7,
    });
    cube = new Mesh(cubeGeometry, cubeMaterial);
    cube.castShadow = true;
    cube.position.y = 0.5;

    const planeGeometry = new PlaneGeometry(3, 3);
    const planeMaterial = new MeshLambertMaterial({
      color: "gray",
      emissive: "teal",
      emissiveIntensity: 0.2,
      side: 2,
      transparent: true,
      opacity: 0.4,
    });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotateX(Math.PI / 2);
    plane.receiveShadow = true;

    const snowman = new SnowMan();
    const sky = new Sky();
    const ground = new Ground();
    snowfalls = new Snowfalls();

    // scene.add(cube);
    // scene.add(plane);
    scene.add(snowman);
    scene.add(sky, ground);
    scene.add(snowfalls);
  }

  // ===== 🎥 CAMERA =====
  {
    camera = new PerspectiveCamera(
      90,
      canvas.clientWidth / canvas.clientHeight,
      1,
      1000
    );
    camera.position.set(60, 50, 200);
    camera.lookAt(scene.position);
  }

  // ===== 🕹️ CONTROLS =====
  {
    cameraControls = new OrbitControls(camera, canvas);
    cameraControls.target = cube.position.clone();
    cameraControls.enableDamping = true;
    cameraControls.autoRotate = false;
    cameraControls.update();

    // TODO: feature snowman drag controls
    /*dragControls = new DragControls( [cube], camera, renderer.domElement);
    dragControls.addEventListener("hoveron", (event) => {
      event.object.material.emissive.set("orange");
    });
    dragControls.addEventListener("hoveroff", (event) => {
      event.object.material.emissive.set("black");
    });
    dragControls.addEventListener("dragstart", (event) => {
      cameraControls.enabled = false;
      animation.play = false;
      event.object.material.emissive.set("black");
      event.object.material.opacity = 0.7;
      event.object.material.needsUpdate = true;
    });
    dragControls.addEventListener("dragend", (event) => {
      cameraControls.enabled = true;
      animation.play = true;
      event.object.material.emissive.set("black");
      event.object.material.opacity = 1;
      event.object.material.needsUpdate = true;
    });
    dragControls.enabled = false; */

    // Full screen
    window.addEventListener("dblclick", (event) => {
      if (event.target === canvas) {
        toggleFullScreen(canvas);
      }
    });
  }

  // ===== 🪄 HELPERS =====
  {
/*     axesHelper = new AxesHelper(4);
    axesHelper.visible = false;
    scene.add(axesHelper);

    pointLightHelper = new PointLightHelper(directionalLight, undefined, "orange");
    pointLightHelper.visible = false;
    scene.add(pointLightHelper);

    const gridHelper = new GridHelper(20, 20, "teal", "darkgray");
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);
 */  }

  // ===== 📈 STATS & CLOCK =====
  {
    //clock = new Clock();
    stats = new Stats();
    document.body.appendChild(stats.dom);
  }

  // ==== 🐞 DEBUG GUI ====
  {
    gui = new GUI({ title: "🐞 Debug GUI", width: 300 });
    /* 
    TODO: feature snowman position debugger
    const cubeOneFolder = gui.addFolder("Cube one");

    cubeOneFolder
      .add(cube.position, "x")
      .min(-5)
      .max(5)
      .step(0.5)
      .name("pos x");
    cubeOneFolder
      .add(cube.position, "y")
      .min(-5)
      .max(5)
      .step(0.5)
      .name("pos y");
    cubeOneFolder
      .add(cube.position, "z")
      .min(-5)
      .max(5)
      .step(0.5)
      .name("pos z");

    cubeOneFolder.add(cube.material, "wireframe");
    cubeOneFolder.addColor(cube.material, "color");
    cubeOneFolder.add(cube.material, "metalness", 0, 1, 0.1);
    cubeOneFolder.add(cube.material, "roughness", 0, 1, 0.1);

    cubeOneFolder
      .add(cube.rotation, "x", -Math.PI * 2, Math.PI * 2, Math.PI / 4)
      .name("rotate x");
    cubeOneFolder
      .add(cube.rotation, "y", -Math.PI * 2, Math.PI * 2, Math.PI / 4)
      .name("rotate y");
    cubeOneFolder
      .add(cube.rotation, "z", -Math.PI * 2, Math.PI * 2, Math.PI / 4)
      .name("rotate z");

    cubeOneFolder.add(animation, "enabled").name("animated");
 */
    /*
    TODO: snowman drag controls
    const controlsFolder = gui.addFolder("Controls");
    controlsFolder.add(dragControls, "enabled").name("drag controls");
 */
    const lightsFolder = gui.addFolder("Lights");
    lightsFolder.add(directionalLight, "visible").name("directional light");
    lightsFolder.add(ambientLight, "visible").name("ambient light");

/*     const helpersFolder = gui.addFolder("Helpers");
    helpersFolder.add(axesHelper, "visible").name("axes");
    helpersFolder.add(pointLightHelper, "visible").name("pointLight"); */

    const cameraFolder = gui.addFolder("Camera");
    cameraFolder.add(cameraControls, "autoRotate");

    // persist GUI state in local storage on changes
    gui.onFinishChange(() => {
      const guiState = gui.save();
      localStorage.setItem("guiState", JSON.stringify(guiState));
    });

    // load GUI state if available in local storage
    const guiState = localStorage.getItem("guiState");
    if (guiState) gui.load(JSON.parse(guiState));

    // reset GUI state button
    const resetGui = () => {
      localStorage.removeItem("guiState");
      gui.reset();
    };
    gui.add({ resetGui }, "resetGui").name("RESET");

    gui.close();
  }
}

function animate() {
  requestAnimationFrame(animate);

  stats.update();
 
  // if (animation.enabled && animation.play) {
  //   animations.rotate(cube, clock, Math.PI / 3);
  //   animations.bounce(cube, clock, 1, 0.5, 0.5);
  // }
snowfalls.update();
  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  cameraControls.update();

  renderer.render(scene, camera);
}