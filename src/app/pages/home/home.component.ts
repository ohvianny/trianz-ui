import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        $('.owl-carousel-2').owlCarousel({
            items: 4,
            animateOut: 'fadeOut',
            autoplay: true,
            autoplayTimeout: 6000,
            loop: true
        });
        $('.owl-carousel').owlCarousel({
            items: 1,
            animateOut: 'fadeOut',
            autoplay: true,
            autoplayTimeout: 6000,
            loop: true
        });

    }

}