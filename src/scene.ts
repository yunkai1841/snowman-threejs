import GUI from "lil-gui";
import {
  AmbientLight,
  Clock,
  DirectionalLight,
  LoadingManager,
  PCFSoftShadowMap,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
// import { DragControls } from "three/examples/jsm/controls/DragControls";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
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
let camera: PerspectiveCamera;
let cameraControls: OrbitControls;
let clock: Clock;
let stats: Stats;
let gui: GUI;

let snowfalls: Snowfalls;
let snowman: SnowMan;
let sky: Sky;
let forest: Forest;
let house: House;
let ground: Ground;

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
      canvas.classList.remove("loading");
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
    snowman = new SnowMan();
    sky = new Sky();
    ground = new Ground(loadingManager);
    forest = new Forest(loadingManager);
    house = new House(loadingManager);
    snowfalls = new Snowfalls(2000, loadingManager);

    scene.add(snowman, sky, ground, forest, house, snowfalls);
    //scene.add(ground, sky, snowfalls);
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
    cameraControls.enableDamping = true;
    cameraControls.autoRotate = false;
    cameraControls.enableZoom = false;
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
    clock = new Clock();
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

    const speedFolder = gui.addFolder("Speed");
    speedFolder.add(snowman, "speed", 0, 1).name("snowman melting speed");

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
  const delta = clock.getDelta();

  stats.update();

  [snowman, snowfalls, sky].forEach((obj) => {
    obj.update(delta);
  });
  directionalLight.position.copy(sky.sunDirectionValue);

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
  cameraControls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
