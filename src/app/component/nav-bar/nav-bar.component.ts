import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  private styleHeight:string;

  constructor() { }

  ngOnInit() {
    this.styleHeight = `${document.documentElement.clientHeight-67}px`;
    window.addEventListener('resize',()=>{
      this.styleHeight= `${document.documentElement.clientHeight-67}px`;
    })
    console.log(this.styleHeight);
  }

}
