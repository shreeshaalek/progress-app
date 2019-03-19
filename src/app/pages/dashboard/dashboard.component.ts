import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private desktopScreen:Number;
  private screenSize:Number=768;
  constructor() { }

  ngOnInit() {
    this.desktopScreen = document.documentElement.offsetWidth;
    window.addEventListener('resize',()=>{
      this.desktopScreen = document.documentElement.offsetWidth;
    })
  }

}
