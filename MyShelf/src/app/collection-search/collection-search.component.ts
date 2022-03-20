import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CollectionElementPlatform } from '../models/collection-element-platform.enum';
import { CollectionElement } from '../models/collection-element.model';
import { CollectionServices } from '../services/collection.service';

@Component({
  selector: 'app-collection-search',
  templateUrl: './collection-search.component.html',
  styleUrls: ['./collection-search.component.css'],
})
export class CollectionSearchComponent implements OnInit, OnDestroy {
  searchInput: string;
  successfulSearch: boolean;
  elementPlatform: CollectionElementPlatform;
  collectionElements: CollectionElement[] = [];
  searchedCollectionElements: CollectionElement[] = [];
  private collectionSub: Subscription;

  onDelete(elementId: string) {
    this.collectionService.elementDeleteById(elementId).subscribe(() => {
      this.collectionService.getCollectionElements();
    });
  }

  dateFormater(givenDate: string): Date {
    return new Date(givenDate);
  }

  whatType(object: any) {
    return typeof object;
  }

  constructor(private collectionService: CollectionServices) {}

  ngOnDestroy(): void {
    this.collectionSub.unsubscribe();
  }

  ngOnInit(): void {
    //this.successfulSearch = false;
    console.log(this.successfulSearch);
    this.collectionService.getCollectionElements();
    this.collectionSub = this.collectionService
      .getCollectionElementsUpdateListener()
      .subscribe((elements: CollectionElement[]) => {
        this.collectionElements = elements;
      });
  }

  onSearch() {
    if(this.searchInput == ""){
      this.successfulSearch = false;
      console.log("empty search")
      return
    }
    //console.log(this.successfulSearch);

    this.searchedCollectionElements = [];
    for (let i = 0; i < this.collectionElements.length; i++) {
      //console.log(this.collectionElements[i].title);
      if (this.collectionElements[i].title.includes(this.searchInput)) {
        this.searchedCollectionElements.push(this.collectionElements[i]);
      }
    }

    if(this.searchedCollectionElements.length > 0){
      this.successfulSearch = true
    }
    else{
      this.successfulSearch = false;
    }
    //console.log(this.successfulSearch);
    //console.log(this.searchedCollectionElements);
    this.searchInput = '';
  }
}
