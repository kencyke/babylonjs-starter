import { Color4 } from "@babylonjs/core"

const visible = "visible"
const hidden = "hidden"

export class CircleAroundCursor {
  private _cursor: HTMLDivElement

  /**
   *
   * @param radius [px]
   * @param color
   * @param isVisible
   * @param zIndex
   */
  constructor(radius: number, color: Color4, isVisible: boolean, zIndex?: number) {
    const cursor = document.createElement("div")
    cursor.style.transform = "translate(0, 0)"
    cursor.style.pointerEvents = "none"
    cursor.style.position = "fixed"
    cursor.style.top = `${-radius}px`
    cursor.style.left = `${-radius}px`
    cursor.style.width = `${2 * radius}px`
    cursor.style.height = `${2 * radius}px`
    cursor.style.background = `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, ${color.a})`
    cursor.style.border = `1px dotted rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`
    cursor.style.borderRadius = "100%"
    cursor.style.zIndex = zIndex ? `${zIndex}` : "999"
    cursor.style.transition = "width .3s, height .3s, top .3s, left .3s"
    const visibility = isVisible ? visible : hidden
    cursor.style.visibility = visibility

    this._cursor = cursor
    document.body.appendChild(this._cursor)
  }

  public isVisible(): boolean {
    return this._cursor.style.visibility === visible ? true : false
  }

  public hide(): void {
    this._cursor.style.visibility = hidden
  }

  public show(): void {
    this._cursor.style.visibility = visible
  }

  public resize(radiusPX: number): void {
    this._cursor.style.top = `${-radiusPX}px`
    this._cursor.style.left = `${-radiusPX}px`
    this._cursor.style.width = `${2 * radiusPX}px`
    this._cursor.style.height = `${2 * radiusPX}px`
  }

  public setPosition(x: number, y: number): void {
    this._cursor.style.transform = "translate(" + x + "px, " + y + "px)"
  }

  public dispose(): void {
    document.body.removeChild(this._cursor)
  }
}
