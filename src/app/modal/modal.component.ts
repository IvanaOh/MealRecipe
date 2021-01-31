import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { image } from '@tensorflow/tfjs';
import { ImageClassificationComponent } from '../image-classification/image-classification.component';
import { Recipe } from '../ingredient-component/recipe';

@Component({
  selector: 'app-ng-modal',
  templateUrl: './modal.component.html'
})

export class NgModalComponent {
  @Input() recipe: Recipe;
  constructor(
    private _NgbActiveModal: NgbActiveModal, private imageClassificator: ImageClassificationComponent
  ) { }

  get activeModal() {
    return this._NgbActiveModal;
  }

  classifyImage(){
   let picture = <HTMLImageElement> document.getElementById('imgSrc');
    this.imageClassificator.classifyImage(picture);
  }
}