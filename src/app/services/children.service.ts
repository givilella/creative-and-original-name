import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Child } from '../interfaces/child';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ChildrenService {
  private readonly API_URL =
    'https://my-json-server.typicode.com/reversegremlin/testapi';

  private readonly CHILDREN_IMAGES: any = [
    'https://image.freepik.com/free-photo/newborn-toddler-boy-laughing-bed_115594-1502.jpg',
    'https://image.freepik.com/free-photo/toddler-kid-white-bodysuit-sitting-carpet_115594-2366.jpg',
    'https://image.freepik.com/free-photo/happy-child-orange-sweater-plays-with-feather-floor_8353-185.jpg',
  ];

  loadChildren: Subject<any> = new Subject<any>();

  private _children: Child[] = [];

  get children() {
    return this._children;
  }

  constructor(private readonly http: HttpClient) {}

  loadChildrenSuccess() {
    this.loadChildren.next();
  }

  Init(): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      try {
        const url = this.API_URL + '/children';
        this.http.get(url).subscribe((data: any) => {
          this._children = Array.from(Object.keys(data), (k) => {
            return { ...data[k], image: this.CHILDREN_IMAGES[k] };
          });
          this.loadChildrenSuccess();
        });
        resolve();
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  getChildById(id: number): Child | undefined {
    return this._children.find((child) => child.id === id);
  }

  formatDate(date: string): string {
    return moment(date).format('MM/DD/YYYY');
  }
}
