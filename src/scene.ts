import GUI from "lil-gui";
import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  LoadingManager,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
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
import Forest from "./components/forest";
import House from "./components/house";

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
let snowman: SnowMan;
let sky: Sky;
let forest: Forest;
let house: House;
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

    snowman = new SnowMan();
    sky = new Sky();
    const ground = new Ground(); 
    forest = new Forest();
    house = new House();
    snowfalls = new Snowfalls();

    scene.add(snowman);
    scene.add(sky, ground);
    scene.add(forest);
    scene.add(house);
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

    // Full screen
    window.addEventListener("dblclick", (event) => {
      if (event.target === canvas) {
        toggleFullScreen(canvas);
      }
    });
  }


  // ===== 📈 STATS & CLOCK =====
  {
    //clock = new Clock();
    stats = new Stats();
    document.body.appendChild(stats.dom);
  }

  // ==== 🐞 DEBUG GUI ====
  {
    gui = new GUI({ title: "🐞 Debug GUI", width: 300 });
   
    const lightsFolder = gui.addFolder("Lights");
    lightsFolder.add(directionalLight, "visible").name("directional light");
    lightsFolder.add(ambientLight, "visible").name("ambient light");

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
  snowman.melt();
  stats.update()
  snowfalls.update();
  directionalLight.position.copy(sky.updateSunPosition());

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }

  cameraControls.update();

  renderer.render(scene, camera);
}

