import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionElementPlatform } from '../models/collection-element-platform.enum';
import { CollectionElement } from '../models/collection-element.model';
import { CollectionServices } from '../services/collection.service';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css'],
})
export class CollectionListComponent implements OnInit, OnDestroy {


  elementPlatform: CollectionElementPlatform;
  collectionElements: CollectionElement[]= [];
  private collectionSub: Subscription;

  onDelete(elementId: string){
    this.collectionService.elementDeleteById(elementId).subscribe(() => {
      this.collectionService.getCollectionElements()
    });;
  }

  dateFormater(givenDate: string):Date{
    return new Date(givenDate);
  }

  whatType(object: any){
    return typeof object
  }

  constructor(private collectionService: CollectionServices) {}

  ngOnDestroy(): void {
    this.collectionSub.unsubscribe();
  }

  ngOnInit(): void {
    this.collectionService.getCollectionElements();
    this.collectionSub = this.collectionService.getCollectionElementsUpdateListener()
    .subscribe((elements: CollectionElement[]) =>{
      this.collectionElements = elements;
    })

  }
}
