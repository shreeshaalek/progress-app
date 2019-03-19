import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'progress-app';
  ngOnInit(){
    var config = {
      apiKey: "AIzaSyCE1S4-NPbnKGXUhEm5-CYDtCDK_9kaHIo",
      authDomain: "personal-growth-3cc97.firebaseapp.com",
      databaseURL: "https://personal-growth-3cc97.firebaseio.com",
      projectId: "personal-growth-3cc97",
      storageBucket: "personal-growth-3cc97.appspot.com",
      messagingSenderId: "862852263517"
    };
    firebase.initializeApp(config);
  }
}
