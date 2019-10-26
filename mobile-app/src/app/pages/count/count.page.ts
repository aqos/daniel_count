import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count',
  templateUrl: './count.page.html',
  styleUrls: ['./count.page.scss'],
})
export class CountPage implements OnInit {
  engines: any[] = [];
  constructor() { }

  ngOnInit() {
    this.engines = [
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
      {
        img: '../../../assets/imgs/dial_icon.png',
        count: 0
      },
    ];
  }

}
