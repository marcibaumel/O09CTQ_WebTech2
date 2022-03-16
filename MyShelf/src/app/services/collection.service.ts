import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CollectionElementPlatform } from '../models/collection-element-platform.enum';
import { CollectionElement } from '../models/collection-element.model';

@Injectable({ providedIn: 'root' })
export class CollectionServices {

  private collectionElements: CollectionElement[] = [];
  private collectionElementsUpdated = new Subject<CollectionElement[]>();

  constructor(private http: HttpClient, private router: Router) {}

  addElement(title: string, platform: CollectionElementPlatform, about: string) {
    let date = new Date()

    const element: CollectionElement = { id: null, title: title, about:about, platform:platform, added: date };
    this.http
      .post<{ message: string; collectionElementId: string }>(
        'http://localhost:3000/api/collection',
        element
      )
      .subscribe((responseData) => {
        const id = responseData.collectionElementId;
        //console.log(responseData.message);
        this.router.navigate(["/"]);
      });
  }

  getCollectionElements() {
    this.http
      .get<{ message: string; collectionElement: any }>('http://localhost:3000/api/collection')
      .pipe(
        map((collectionElementData) => {
          return collectionElementData.collectionElement.map((element) => {
            //console.log(element.title);
            return {
              title: element.title,
              about: element.about,
              platform: element.platform,
              added: element.added,
              id: element._id,
            };
          });
        })
      )
      .subscribe((transformedElements) => {
        this.collectionElements = transformedElements;
        this.collectionElementsUpdated.next([...this.collectionElements]);
      });
  }

  getCollectionElementsUpdateListener() {
    return this.collectionElementsUpdated.asObservable();
  }

  elementDeleteById(elementId: string){
    console.log(elementId)
    return this.http.delete('http://localhost:3000/api/collection/' + elementId);
  }

}
