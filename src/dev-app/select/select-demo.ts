/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, TemplateRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatLegacyCardModule} from '@angular/material/legacy-card';
import {ErrorStateMatcher, ThemePalette} from '@angular/material/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';

/** Error any time control is invalid */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null): boolean {
    if (control) {
      return control.invalid;
    }
    return false;
  }
}

@Component({
  selector: 'select-demo',
  templateUrl: 'select-demo.html',
  styleUrls: ['select-demo.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatLegacyCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
})
export class SelectDemo {
  drinksRequired = false;
  drinkObjectRequired = false;
  pokemonRequired = false;
  drinksDisabled = false;
  pokemonDisabled = false;
  showSelect = false;
  currentDrink: string;
  currentDrinkObject: {} | undefined = {value: 'tea-5', viewValue: 'Tea'};
  currentPokemon: string[];
  currentPokemonFromGroup: string;
  currentDigimon: string;
  currentAppearanceValue: string | null;
  latestChangeEvent: MatSelectChange;
  floatLabel: FloatLabelType = 'auto';
  drinksWidth = 'default';
  foodControl = new FormControl('pizza-1');
  topHeightCtrl = new FormControl(0);
  drinksTheme: ThemePalette = 'primary';
  pokemonTheme: ThemePalette = 'primary';
  compareByValue = true;
  selectFormControl = new FormControl('', Validators.required);

  foods = [
    {value: null, viewValue: 'None'},
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  drinks = [
    {value: 'coke-0', viewValue: 'Coke', disabled: false},
    {
      value: 'long-name-1',
      viewValue: 'Decaf Chocolate Brownie Vanilla Gingerbread Frappuccino',
      disabled: false,
    },
    {value: 'water-2', viewValue: 'Water', disabled: false},
    {value: 'pepper-3', viewValue: 'Dr. Pepper', disabled: false},
    {value: 'coffee-4', viewValue: 'Coffee', disabled: false},
    {value: 'tea-5', viewValue: 'Tea', disabled: false},
    {value: 'juice-6', viewValue: 'Orange juice', disabled: false},
    {value: 'wine-7', viewValue: 'Wine', disabled: false},
    {value: 'milk-8', viewValue: 'Milk', disabled: true},
  ];

  pokemon = [
    {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
    {value: 'charizard-1', viewValue: 'Charizard'},
    {value: 'squirtle-2', viewValue: 'Squirtle'},
    {value: 'pikachu-3', viewValue: 'Pikachu'},
    {value: 'jigglypuff-4', viewValue: 'Jigglypuff with a really long name that will truncate'},
    {value: 'ditto-5', viewValue: 'Ditto'},
    {value: 'psyduck-6', viewValue: 'Psyduck'},
  ];

  availableThemes = [
    {value: 'primary', name: 'Primary'},
    {value: 'accent', name: 'Accent'},
    {value: 'warn', name: 'Warn'},
  ];

  pokemonGroups = [
    {
      name: 'Grass',
      pokemon: [
        {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
        {value: 'oddish-1', viewValue: 'Oddish'},
        {value: 'bellsprout-2', viewValue: 'Bellsprout'},
      ],
    },
    {
      name: 'Water',
      pokemon: [
        {value: 'squirtle-3', viewValue: 'Squirtle'},
        {value: 'psyduck-4', viewValue: 'Psyduck'},
        {value: 'horsea-5', viewValue: 'Horsea'},
      ],
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        {value: 'charmander-6', viewValue: 'Charmander'},
        {value: 'vulpix-7', viewValue: 'Vulpix'},
        {value: 'flareon-8', viewValue: 'Flareon'},
      ],
    },
    {
      name: 'Psychic',
      pokemon: [
        {value: 'mew-9', viewValue: 'Mew'},
        {value: 'mewtwo-10', viewValue: 'Mewtwo'},
      ],
    },
  ];

  digimon = [
    {value: 'mihiramon-0', viewValue: 'Mihiramon'},
    {value: 'sandiramon-1', viewValue: 'Sandiramon'},
    {value: 'sinduramon-2', viewValue: 'Sinduramon'},
    {value: 'pajiramon-3', viewValue: 'Pajiramon'},
    {value: 'vajiramon-4', viewValue: 'Vajiramon'},
    {value: 'indramon-5', viewValue: 'Indramon'},
  ];

  constructor(private _dialog: MatDialog) {}

  toggleDisabled() {
    this.foodControl.enabled ? this.foodControl.disable() : this.foodControl.enable();
  }

  setPokemonValue() {
    this.currentPokemon = ['jigglypuff-4', 'psyduck-6'];
  }

  reassignDrinkByCopy() {
    this.currentDrinkObject = {...this.currentDrinkObject};
  }

  compareDrinkObjectsByValue(d1: {value: string}, d2: {value: string}) {
    return d1 && d2 && d1.value === d2.value;
  }

  compareByReference(o1: any, o2: any) {
    return o1 === o2;
  }

  matcher = new MyErrorStateMatcher();

  toggleSelected() {
    this.currentAppearanceValue = this.currentAppearanceValue ? null : this.digimon[0].value;
  }

  openDialogWithSelectInside(dialogTemplate: TemplateRef<unknown>) {
    this._dialog.open(dialogTemplate);
  }
}
