export class Link {
  public target: string;
  public icon: string;
  public title: string;

  constructor(title, target, icon
  ) {
    this.target = target;
    this.title = title;
    this.icon = icon;
  }
}
