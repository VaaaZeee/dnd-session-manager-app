import { Coordinate } from '@models/coordinate';

export class CoordinateGeometryUtils {
  public static convertArrayToCoordinates(
    coordinateArray: number[]
  ): Coordinate[] {
    const result: Coordinate[] = [];
    for (let i = 2; i <= coordinateArray.length; i += 2) {
      result.push({ x: coordinateArray[i - 2], y: coordinateArray[i - 1] });
    }
    return result;
  }

  public static convertCoordinatesToNumberArray(
    coordinates: Coordinate[]
  ): number[] {
    return coordinates.reduce((acc: number[], curr: Coordinate) => {
      acc.push(curr.x, curr.y);
      return acc;
    }, []);
  }

  public static convertToSortedPointsArray(
    coordinateArray: number[],
    counterClockwise = false
  ): number[] {
    const coordinates = this.convertArrayToCoordinates(coordinateArray);
    const meanCoordinate = this.getMeanCoordinate(coordinates);
    if (counterClockwise) {
      return this.convertCoordinatesToNumberArray(
        coordinates.sort(this.sortCounterClockwise(meanCoordinate))
      );
    }
    return this.convertCoordinatesToNumberArray(
      coordinates.sort(this.sortCounterClockwise(meanCoordinate))
    );
  }

  private static getMeanCoordinate(coordinates: Coordinate[]): Coordinate {
    const res: Coordinate = { x: 0, y: 0 };
    coordinates.forEach(({ x, y }) => {
      res.x += x;
      res.y += y;
    });
    res.x /= coordinates.length;
    res.y /= coordinates.length;

    return res;
  }

  private static sortClockwise(meanCoordinate: Coordinate) {
    return function (a: Coordinate, b: Coordinate) {
      const angleA = Math.atan2(a.y - meanCoordinate.y, a.x - meanCoordinate.x);
      const angleB = Math.atan2(b.y - meanCoordinate.y, b.x - meanCoordinate.x);
      return angleA - angleB;
    };
  }

  private static sortCounterClockwise(meanCoordinate: Coordinate) {
    return function (a: Coordinate, b: Coordinate) {
      const angleA = Math.atan2(a.y - meanCoordinate.y, a.x - meanCoordinate.x);
      const angleB = Math.atan2(b.y - meanCoordinate.y, b.x - meanCoordinate.x);
      return angleB - angleA;
    };
  }
}
