import { Component, OnInit, OnChanges, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

@Component({
  selector: 'app-app-logo',
  templateUrl: './app-logo.component.html',
  styleUrls: ['./app-logo.component.scss']
})
export class AppLogoComponent implements OnDestroy, OnInit {

  private typeText: string = 'TASKLIST';
  private switchDelay;
  private delayTime: number = 1000;
  private displayText = '';
  private typeTimeout: any;
  private eraseTimeout: any;
  private typeDelay = 100;
  private cursorChar = '_';

  constructor() { }

  ngOnInit() {
    this.typeWriter()
  }
  ngOnDestroy() {
    this.clearTimeouts();
  }

  typeWriter() {
    this.clearTimeouts();
    if (this.displayText.length < this.typeText.length) {
      this.typeTimeout = setTimeout(() => {
        this.setNewText(this.displayText.length + 1);
        this.typeWriter();
      }, this.typeDelay);
    }
    else {
      this.switchDelay = setTimeout(() => {
        this.eraseWriter()
      }, this.delayTime)
    }
  }
  eraseWriter() {
    this.clearTimeouts();
    if (this.displayText.length > 0) {
      this.eraseTimeout = setTimeout(() => {
        this.setNewText(this.displayText.length - 1);
        this.eraseWriter()
      }, this.typeDelay);
    }
    else {
      this.switchDelay = setTimeout(() => {
        this.typeWriter();
      }, this.delayTime)
    }
  }
  setNewText(strLen) {
    this.displayText = this.typeText.substring(0, strLen);
  }

  cancelTypeTimeout() {

    if (this.typeTimeout) {
      clearTimeout(this.typeTimeout);
    }
  }

  cancelEraseTimeout() {
    if (this.eraseTimeout) {
      clearTimeout(this.eraseTimeout);
    }
  }
  cancelDelayTimeout() {
    if (this.switchDelay) {
      clearTimeout(this.switchDelay);
    }
  }

  clearTimeouts() {
    this.cancelTypeTimeout();
    this.cancelEraseTimeout();
    this.cancelDelayTimeout();
  }
}
