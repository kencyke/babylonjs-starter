import { Scene, Mesh, StandardMaterial, MeshBuilder, Color3, Color4, Quaternion } from "@babylonjs/core"

export type CuboidShape = {
  x: number
  y: number
  z: number
  width: number
  height: number
  depth: number
  rotationX: number
  rotationY: number
  rotationZ: number
}

export function createCuboid(name: string, shape: CuboidShape, color: Color3, scene: Scene): Mesh {
  const mat = new StandardMaterial(`${name}-mat`, scene)
  mat.diffuseColor = color
  mat.alpha = 0.3
  const cuboid = MeshBuilder.CreateBox(
    name,
    { width: shape.width, height: shape.height, depth: shape.depth, updatable: true },
    scene
  )
  cuboid.position.x = shape.x
  cuboid.position.y = shape.y
  cuboid.position.z = shape.z
  cuboid.rotationQuaternion = Quaternion.FromEulerAngles(shape.rotationX, shape.rotationY, shape.rotationZ)
  // TODO: enable to render wireframe together
  cuboid.enableEdgesRendering()
  cuboid.edgesColor = Color4.FromColor3(color)
  cuboid.material = mat

  return cuboid
}
