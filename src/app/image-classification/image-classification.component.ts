import { Component, Injectable, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { Rank } from '@tensorflow/tfjs';

@Component({
  selector: 'app-image-classification',
  templateUrl: './image-classification.component.html',
  styleUrls: ['./image-classification.component.css']
})
@Injectable({
  providedIn: "root"
})
export class ImageClassificationComponent implements OnInit {

  predictions:any[];
  static readonly imageClasses = [
    {key: 0, value: 'apple'},
    {key: 1, value: 'banana'}, 
    {key: 2, value: 'kiwi'},
    {key: 3, value: 'mango'},
    {key: 4, value: 'orange'},
    {key: 5, value: 'peach'},
    {key: 6, value: 'tomatoes'},
    {key: 7, value: 'apple pie'},
    {key: 8, value: 'baby ribs'},
    {key: 9, value: 'baklava'},
    {key: 10, value: 'burrito'},
    {key: 11, value: 'bruschetta'},
    {key: 12, value: 'ceasar salad'},
    {key: 13, value: 'cannoli'},
    {key: 14, value: 'cheese'},
    {key: 15, value: 'cheese cake'},
    {key: 16, value: 'chicken wings'},
    {key: 17, value: 'chocolate cake'},
    {key: 18, value: 'chocolate mouse'},
    {key: 19, value: 'club sandwich'},
    {key: 20, value: 'cup cakes,'},
    {key: 21, value: 'eggs'},
    {key: 22, value: 'donuts'},
    {key: 23, value: 'eggs benedict,'},
    {key: 24, value: 'french fries'},
    {key: 25, value: 'rice'},
    {key: 26, value: 'frozen yoghurt'},
    {key: 27, value: 'garlic bread'}, 
    {key: 28, value: 'greek salad'},
    {key: 29, value: 'hamburger'},
    {key: 30, value: 'hot soup'},
    {key: 31, value: 'hot dog'},
    {key: 32, value: 'ice cream'},
    {key: 33, value: 'lasagna'},
    {key: 34, value: 'macaroni and cheese'},
    {key: 35, value: 'macrons'},
    {key: 36, value: 'nachos'},
    {key: 37, value: 'omelete'},
    {key: 38, value: 'onion rings'},
    {key: 39, value: 'pancakes'},
    {key: 40, value: 'pizza'},
    {key: 41, value: 'pork cop'},
    {key: 42, value: 'ravioli'},
    {key: 43, value: 'spagheti bolognese'},
    {key: 44, value: 'spagheti carbonara'},
    {key: 45, value: 'steak'},
    {key: 46, value: 'cucumber'},
    {key: 47, value: 'fish'},
    {key: 48, value: 'chicken meat'},
    {key: 49, value: 'paprika'}
 ]

  constructor() { }

  ngOnInit(): void {
  }

  async classifyImage(picture:HTMLImageElement) {
    await tf.loadLayersModel('/assets/model.json').then(model => {
      //tuka modelot ti gi davat verojatnostite za slikata
      const prediction : any = model.predict(this.capture(picture));
      console.log(prediction.dataSync());
      //ova e gotova funkcija za zemanje na indeksot na elementot so max vrednost vo nizata
      console.log(prediction.argMax(1).dataSync()[0]);
      //ova e druga funkcija za zemanje na indeksot na elementot so max vrednost
      var indexOfMaxValue = prediction.dataSync().reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
      console.log(indexOfMaxValue);
      //ova e test za sortiranje na nizata
      let test = prediction.dataSync().sort(function(a, b){return a-b;});
      console.log(test[49]);
      /*console.log(test[49]);
      const results: number = prediction.argMax().dataSync()[0];
      console.log(results);
      //od ko ke se dobiet indeksot na najgolemiot element vo nizata, toj indeks se barat kako key vo imageClasses nizata,
      //za da mu go zemis valueto, t.e klasata, dali e jabolko so najgolema verojatnost, ili patlidzan itn.
      let highestProbability = ImageClassificationComponent.imageClasses.find(i => i.key === results);
      console.log(highestProbability.value);*/
    });
  }
    
 

   capture(rasterElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement ) {
    return tf.tidy(() => {
        let pixels : tf.Tensor<tf.Rank.R3> = tf.browser.fromPixels(rasterElement);
        pixels = tf.image.resizeBilinear(pixels, [224,224]);

        // Expand the outer most dimension so we have a batch size of 1
        const batchedImage = pixels.expandDims(0);
        
        // Normalize the image between -1 and a1. The image comes in between 0-255
        // so we divide by 127 and subtract 1.
        return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
    });
}

}
