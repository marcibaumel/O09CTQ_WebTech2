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
      id: 0,
      title: 'Batman (2022)',
      platform: CollectionElementPlatform.PS4,
      about: `When the Riddler, a sadistic serial killer, begins murdering key political figures in Gotham, Batman is forced to investigate the city's hidden corruption and question his family's involvement.`,
      added: new Date(),
    },
    {
      id: 1,
      title: 'Lego Batman',
      platform: CollectionElementPlatform.BLUERAY,
      about: `A cooler-than-ever Bruce Wayne must deal with the usual suspects as they plan to rule Gotham City, while discovering that he has accidentally adopted a teenage orphan who wishes to become his sidekick.`,
      added: new Date(),
    },
    {
      id: 2,
      title: 'Batman (1989)',
      platform: CollectionElementPlatform.DVD,
      about: `The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.`,
      added: new Date(),
    },
    {
      id: 3,
      title: '2Batman (1989)',
      platform: CollectionElementPlatform.PSP,
      about: `The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.`,
      added: new Date(),
    },
    {
      id: 4,
      title: '3Batman (1989)',
      platform: CollectionElementPlatform.XBOX,
      about: `The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker.`,
      added: new Date(),
    },
  ];

  collectionElementPlatformFormat(platform: number){
    console.log(this.collectionElements[platform].platform);
    return this.collectionElements[platform].platform;
  }

  onDelete(elementId: number){
    console.log(this.collectionElements[elementId]);
  }

  constructor() {}

  ngOnInit(): void {}
}
