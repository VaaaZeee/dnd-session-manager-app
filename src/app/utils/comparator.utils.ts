export class ComparatorUtils {
  public static containsString(a: string, b: string): boolean {
    return a.toLocaleLowerCase().includes(b.toLocaleLowerCase());
  }
}
