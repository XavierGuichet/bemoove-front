export class Image {
  public id: number;
  public name: string;
  public path: string;
  public absolutePath: string;
  public webPath: string;
  public file: string;
  public kind: string;
  public owner: string;
  public slugName: string;
  public base64data: string;

  constructor(
  ) {
      this.base64data = '';
  }
}
