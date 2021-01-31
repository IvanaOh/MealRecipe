import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { ApiService } from "../api-service/api.service";
import { Recipe } from "./recipe";
import { NgForm } from "@angular/forms";
import { Ingredient } from "./ingredient";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgModalComponent } from '../modal/modal.component';
import * as tf from '@tensorflow/tfjs';

@Component({

  selector: "app-ingredient-component",
  templateUrl: "./ingredient-component.component.html",
  styleUrls: ["./ingredient-component.component.css"],
  animations: [
    trigger("fadeInOut", [
      state(
        "void",
        style({
          opacity: 0,
        })
      ),
      transition("void <=> *", animate(1000)),
    ]),
  ],
})

export class IngredientComponentComponent implements OnInit {
  @ViewChild("todoForm") todoForm: NgForm;
  ingredients: Ingredient[] = [];
  ingredient: Ingredient;
  recipes: any | Recipe[];
  recipeID: number[] = [];
  receivedRecipeById;
  recipeChunks: Recipe[];
  picture: HTMLImageElement;
  predictions: any[];

  constructor(private apiService: ApiService, private modalComponent: NgbModal) { }

  ngOnInit() {

  }

  addIngredient(ingredient: Ingredient) {
    if (ingredient) {
      this.ingredients.push(ingredient);
    } else {
      alert("Field required **");
    }
    this.resetForm();
  }
  deleteItem(ingredient: Ingredient) {
    for (let i = 0; i <= this.ingredients.length; i++) {
      if (ingredient == this.ingredients[i]) {
        this.ingredients.splice(i, 1);
        if (this.ingredients.length == 0) {
          this.recipes = null;
        } else this.findRecipes(this.todoForm);
      }

    }
  }
  findRecipes(form: NgForm) {
    const value = form.value;
    if (value) {
      this.apiService.getRecipes(this.ingredients).subscribe((recipes) => {
        if (recipes.length) {
          this.recipes = recipes;
          console.log(this.recipes[0]);
          this.recipeChunks = this.chunks(recipes, 3);
          this.recipes.forEach((e) => {
            this.recipeID.push(e.id);
          });
          (err) => {
            console.log(err);
          };
        }
      });
    } else {
      alert("Field required **");
    }
  }

  getRecipeInformation(recipe: Recipe) {
    this.apiService
      .getBulkRecipeInformation(recipe.id)
      .subscribe((bulkRecipe) => {
        if (bulkRecipe.length > 0) {
          recipe.recipeInformation = bulkRecipe[0].instructions;
        }
      });
  }

  chunks(array, size) {
    let results = [];
    results = [];
    while (array.length) {
      results.push(array.splice(0, size));
    }
    return results;
  }

  openModal(recipe: Recipe) {
    this.getRecipeInformation(recipe);
    const modalRef = this.modalComponent.open(NgModalComponent, {
      windowClass: 'modal-job-scrollable'
    });
    modalRef.componentInstance.recipe = recipe;

    // upwrap the "app-ng-modal" data to enable the "modal-dialog-scrollable"
    // and make the modal scrollable
    (() => {
      const node: HTMLElement | null = document.querySelector('app-ng-modal');
      if (node) {
        while (node.firstChild) {
          (node.parentNode as HTMLElement).insertBefore(node.firstChild, node);
        }

      }

      // make the modal scrollable by adding the class .modal-dialog-scrollable
      // here wait for one second so that we can find the .modal-dialog
      setTimeout(() => {
        const modalDialog = document.querySelector('.modal-job-scrollable .modal-dialog');
        if (modalDialog) {
          modalDialog.classList.add('modal-dialog-scrollable');
        }
      }, 1000)
    })();
  }

  resetForm() {
    this.todoForm.reset();
  }

}
