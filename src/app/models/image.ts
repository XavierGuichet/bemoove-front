export class Image
{
  id: number;
  name: string;
  path: string;
  absolutePath: string;
  webPath: string;
  file: string;
  kind: string;
  owner: string;
  slug_name: string;
  base64data: string;

  constructor(
  ) {
      this.base64data = '';
  }
}
