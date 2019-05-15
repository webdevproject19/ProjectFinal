import { Component, OnInit } from '@angular/core';
import {ProviderService} from '../shared/services/provider.service';
import {ILocation, ICinema, IMovie} from '../shared/models/models';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})


export class MainComponent implements OnInit {

  constructor(private provider: ProviderService) { }
  public slideIndex = 0;

  ngOnInit() {
    this.showSlides();
  }

  showSlides() {
    const slides = document.getElementsByClassName('mySlides') ;
    for (let i = 0; i < slides.length; i++) {
      slides[i].setAttribute('style', 'display : none');
    }
    this.slideIndex++;
    if (this.slideIndex > slides.length) { this.slideIndex = 1; }
    slides[this.slideIndex - 1].setAttribute('style', 'display : block');
    setTimeout(() => this.showSlides(), 4000);
  }

  currentSlide(n: number) {
    this.slideIndex = n;
  }
}

