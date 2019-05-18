
export interface GeolocationModel {
  x: number;
  y: number;
}

export class GeolocationHelper {

  static getDistanceTwoPoint(a: GeolocationModel, b: GeolocationModel) {
    const xDistance = (a.x - b.x);
    const yDistance = (a.y - b.y);
    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
  }

}
