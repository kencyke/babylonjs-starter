import "@babylonjs/core/Debug/debugLayer"
import "@babylonjs/inspector"
import { ArcRotateCamera, Engine, HemisphericLight, Mesh, Scene, Vector3 } from "@babylonjs/core"

const createScene = (canvas: HTMLCanvasElement, engine: Engine): Scene => {
  const scene = new Scene(engine)

  const camera = new ArcRotateCamera("camera1", (3 * Math.PI) / 2, Math.PI / 4, 30, Vector3.Zero(), scene)
  camera.attachControl(canvas, true)

  new HemisphericLight("light1", new Vector3(0, 1, 0), scene)

  const sphere = Mesh.CreateSphere("sphere1", 16, 2, scene)
  sphere.position.y = 1

  Mesh.CreateGround("ground1", 6, 6, 2, scene)

  return scene
}

const init = (): void => {
  const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement
  const engine = new Engine(canvas, true)
  const scene = createScene(canvas, engine)

  engine.runRenderLoop(() => {
    scene.render()
  })

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
