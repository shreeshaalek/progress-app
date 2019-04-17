import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { ModalDirective } from '../../utilities/js/modal.directive'
import { Modal } from '../../utilities/js/modal'
import { HelpersService } from '../../service/helpers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  @ViewChild(ModalDirective) modalHost: ModalDirective;

  private desktopScreen: Number;
  private screenSize: Number = 768;
  private subscription;
  private modalDomProperty;
  private data;
  private openModal: Boolean = false;

  constructor(private helpersService: HelpersService, private componentFactoryResolver: ComponentFactoryResolver, private router: Router) {
    router.events.subscribe((val) => {
      if(NavigationEnd) {
        this.openModal = false;
        let viewContainerRef = this.modalHost.viewContainerRef;
        viewContainerRef.clear();
      }
    });
  }

  ngOnInit() {
    this.subscription = this.helpersService.subscriber
      .subscribe(
        modalDom => {
          let viewContainerRef
          this.openModal = true;
          this.data = modalDom.data;
          let componentFactory = this.componentFactoryResolver.resolveComponentFactory(modalDom.component);
          viewContainerRef = this.modalHost.viewContainerRef;
          viewContainerRef.clear();
          let componentRef = viewContainerRef.createComponent(componentFactory);
          if(!!modalDom.data) {
            (<Modal>componentRef.instance).data = modalDom.data;
          }
        }
      );
    // this.modalDomProperty = '<p>hwbda</p>'
    this.desktopScreen = document.documentElement.offsetWidth;
    window.addEventListener('resize', () => {
      this.desktopScreen = document.documentElement.offsetWidth;
    })
    window.addEventListener('keyup',(e)=>{
      if(e.keyCode === 27 && this.openModal){
      let viewContainerRef = this.modalHost.viewContainerRef;
      viewContainerRef.clear();
       this.openModal = false;
      }
    })
  }

}
