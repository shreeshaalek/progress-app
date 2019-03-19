import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private desktopScreen:Number;
  private slideNav:String = '';
  private screenSize:Number=767;

  constructor() { }

  ngOnInit() {
    this.desktopScreen = document.documentElement.offsetWidth;
    window.addEventListener('resize',()=>{
      this.desktopScreen = document.documentElement.offsetWidth;
    })
  }
  activeSlider() {
    if(this.slideNav === 'active'){
      this.slideNav = '';
    }
    else {
      this.slideNav = 'active';
    }
  }

}
