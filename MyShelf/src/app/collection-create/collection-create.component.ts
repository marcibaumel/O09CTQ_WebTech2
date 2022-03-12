import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CollectionElement } from '../models/collection-element.model';

@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html',
  styleUrls: ['./collection-create.component.css'],
})
export class CollectionCreateComponent implements OnInit {
  element: CollectionElement;
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


  onSaveElement(){
    if (this.form.invalid) {
      console.log('Something wrong!')
      return;
    }
    this.element={
      id: 4,
      title: this.form.value.title,
      platform: this.form.value.platform,
      about: this.form.value.about,
      added: new Date(),
    }
    console.log(this.element);
  }

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)],
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
