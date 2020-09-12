import { Viewport, Camera, Vector2 } from "@babylonjs/core"

declare module "@babylonjs/core/Cameras/camera" {
  interface Camera {
    getGlobalViewport(): Viewport
    getPointerVectorFromViewportOrigin(offsetX: number, offsetY: number): Vector2 | null
  }
}

Camera.prototype.getGlobalViewport = function (): Viewport {
  const engine = this.getEngine()
  const renderWidth = engine.getRenderWidth(true)
  const renderHeight = engine.getRenderHeight(true)

  return this.viewport.toGlobal(renderWidth, renderHeight)
}
