import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'
import { FirebaseUtilsService } from '../../firebase-utils.service';

declare const gapi: any;

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})

export class GoogleAuthComponent implements OnInit {

  constructor(private router: Router, private firebaseUtils: FirebaseUtilsService) { }

  public auth2: any;
  public gapi: any;
  public authInstance: any;
  private googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        clientId: '862852263517-808c80j4mfifb36mu1s7bqh410ut0jce.apps.googleusercontent.com',
        scope: 'profile email'
      });
    });
  }

  public attachSignin() {
    this.signIn()
  }

  private signIn() {
    this.auth2.signIn().then((googleUser)=>{
      let profile = googleUser.getBasicProfile();
      this.firebaseUtils.setUserData('users/'+profile.getId(),{id:profile.getId()},{name:profile.getName()}, {profileImg:profile.getImageUrl()}, {email:profile.getEmail()})
      this.router.navigate(['/dashboard/logs'])
    });
  }

  ngOnInit() {

    window.addEventListener('gapiLoaded',()=>{
      this.googleInit();
    });
  }

}
