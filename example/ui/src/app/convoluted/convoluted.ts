

export class Convoluted {
  id: number;
  name: string;

  constructor(data: any = {}) {
    this.id = data['id'] ? data['id'] : null;
    this.name = data['name'] ? data['name'] : null;
  }
}
