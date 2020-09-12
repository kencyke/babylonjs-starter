import "@babylonjs/core/Debug/debugLayer"
import "@babylonjs/inspector"
import { ArcRotateCamera, Engine, HemisphericLight, Scene, Vector3, Color3, Color4 } from "@babylonjs/core"
import { createCuboid, CuboidShape } from "./cuboid"
import { CircleAroundCursor } from "./cursor"

const createScene = (canvas: HTMLCanvasElement, engine: Engine): Scene => {
  const scene = new Scene(engine)

  const camera = new ArcRotateCamera("camera", (3 * Math.PI) / 2, Math.PI / 4, 30, Vector3.Zero(), scene)
  camera.attachControl(canvas, true)

  const lowerLight = new HemisphericLight("lower-light", new Vector3(0, -1, 0), scene)
  lowerLight.intensity = 0.7
  const higherLight = new HemisphericLight("higher-light", new Vector3(0, 1, 0), scene)
  higherLight.intensity = 0.7

  const cuboidShape: CuboidShape = {
    x: 0,
    y: 0,
    z: 0,
    width: 2,
    height: 2,
    depth: 2,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0
  }
  createCuboid("cuboid", cuboidShape, Color3.Green(), scene)

  return scene
}

const init = (): void => {
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement
  const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true })
  const scene = createScene(canvas, engine)

  engine.runRenderLoop(() => {
    scene.render()
  })

  const circle = new CircleAroundCursor(80, new Color4(255, 255, 255, 0.3), false)
  scene.onPointerMove = function (evt) {
    // TODO: hide circle when cursor is out of canvas
    if (!circle.isVisible()) {
      circle.show()
    }
    circle.setPosition(evt.clientX, evt.clientY)
  }

  window.addEventListener("resize", () => {
    engine.resize()
  })

  window.addEventListener("keydown", evt => {
    if (evt.shiftKey && evt.ctrlKey && evt.altKey && evt.key === "I") {
      if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide()
      } else {
        scene.debugLayer.show()
      }
    }
  })
}

init()
