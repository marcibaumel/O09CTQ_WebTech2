import { Component, OnInit } from '@angular/core';
import { CollectionElementPlatform } from '../models/collection-element-platform.enum';
import { CollectionElement } from '../models/collection-element.model';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css'],
})
export class CollectionListComponent implements OnInit {
  collectionElements: CollectionElement[] = [
    {
      id: 1,
      title: 'Batman',
      platform: CollectionElementPlatform.DVD,
      about: 'sdghshshshshshsh',
      added: new Date(),
    },
    {
      id: 2,
      title: 'nem Batman',
      platform: CollectionElementPlatform.BLUERAY,
      about: 'dgdgdsgg',
      added: new Date(),
    },
    {
      id: 3,
      title: 'nagzon nem batman',
      platform: CollectionElementPlatform.DVD,
      about: 'dgsdghdhdshdh',
      added: new Date(),
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
