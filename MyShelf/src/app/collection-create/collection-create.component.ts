import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CollectionElementPlatform } from '../models/collection-element-platform.enum';
import { CollectionElement } from '../models/collection-element.model';
import { CollectionServices } from '../services/collection.service';

@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.css'],
})
export class CollectionCreateComponent implements OnInit {
  element: CollectionElement;
  event = new Date();

  platforms: String[] = [
    'PS4',
    'PS3',
    'PSP',
    'DVD',
    'BLUERAY',
    'VHS',
    'PCGAME',
    'STEAM',
    'XBOX',
  ];

  form: FormGroup;

  onSaveElement() {
    if (this.form.invalid) {
      console.log('Something wrong with the form!');
      return;
    }

    console.log(this.form.value.platform);

    this.collectionElementService.addElement(
      this.form.value.title,
      this.form.value.platform,
      this.form.value.about,
    );
  }

  constructor(public collectionElementService: CollectionServices) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      }),
      platform: new FormControl(null, {
        validators: [Validators.required],
      }),
      about: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }
}
